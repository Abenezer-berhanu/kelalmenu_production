"use client";
import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Badge } from "@/components/ui/badge";
import { images, links } from "@/lib/exporter";
import Link from "next/link";
import { HotelType } from "../../../../../../../type";
import Spinner from "@/components/Spinner";
import BigInfo from "@/components/BigInfo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { updateHotelProfile } from "@/actions/hotel";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import LoadingDialog from "@/components/LoadingDialog";
import { ArrowBigDown, Trash } from "lucide-react";
import DashboardButton from "@/components/DashboardButton";

type Props = { hotel: HotelType | null | undefined };

export default function HotelEditor({ hotel }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [homeName, setHomeName] = useState(hotel?.home_name ?? "");
  const [primaryPhone, setPrimaryPhone] = useState(hotel?.primary_phone ?? "");
  const [secondaryPhones, setSecondaryPhones] = useState<string[]>(
    hotel?.secondary_phones ?? []
  );

  const parsedAddress = useMemo(() => {
    const ma = hotel?.main_address as Record<string, unknown> | undefined;
    return ma?.["main_address"] && typeof ma["main_address"] === "string"
      ? (ma["main_address"] as string)
      : "";
  }, [hotel?.main_address]);

  const parsedCity = useMemo(() => {
    const ma = hotel?.main_address as Record<string, unknown> | undefined;
    return ma?.["city"] && typeof ma["city"] === "string"
      ? (ma["city"] as string)
      : "";
  }, [hotel?.main_address]);

  const [city, setCity] = useState(parsedCity);
  const [mainAddress, setMainAddress] = useState(parsedAddress);
  const [offerDelivery, setOfferDelivery] = useState<boolean>(
    !!hotel?.offer_delivery
  );
  const [logoPreview, setLogoPreview] = useState<string | undefined>(
    hotel?.home_logo ? hotel?.home_logo?.url : images.logo_url
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Track what changed
  const changedFields = useMemo(() => {
    const changes: Partial<HotelType> = {};

    if (homeName !== (hotel?.home_name ?? "")) changes.home_name = homeName;
    if (primaryPhone !== (hotel?.primary_phone ?? ""))
      changes.primary_phone = primaryPhone;

    const origSec = hotel?.secondary_phones ?? [];
    if (
      origSec.length !== secondaryPhones.length ||
      origSec.some((p, i) => p !== secondaryPhones[i])
    )
      changes.secondary_phones = secondaryPhones;

    if (offerDelivery !== (hotel?.offer_delivery ?? false))
      changes.offer_delivery = offerDelivery;

    const origCity = parsedCity;
    const origAddress = parsedAddress;
    if (city !== origCity || mainAddress !== origAddress)
      changes.main_address = { city, main_address: mainAddress };

    if (logoFile)
      changes.home_logo = {
        ...hotel?.home_logo,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        url: logoFile as any,
        image_id: hotel?.home_logo.image_id || "",
      };

    return changes;
  }, [
    homeName,
    primaryPhone,
    secondaryPhones,
    offerDelivery,
    city,
    mainAddress,
    logoFile,
    hotel,
    parsedCity,
    parsedAddress,
  ]);

  const isDirty = Object.keys(changedFields).length > 0;

  const canAddPhone = useMemo(() => {
    const plan = hotel?.plan ?? "FREE";
    return plan === "FREE"
      ? secondaryPhones.length === 0
      : secondaryPhones.length < 3;
  }, [secondaryPhones.length, hotel?.plan]);

  const addPhone = () => {
    if (!canAddPhone) return;
    setSecondaryPhones((s) => [...s, ""]);
  };
  const updateSecondaryPhone = (idx: number, val: string) =>
    setSecondaryPhones((s) => s.map((p, i) => (i === idx ? val : p)));
  const removeSecondaryPhone = (idx: number) =>
    setSecondaryPhones((s) => s.filter((_, i) => i !== idx));

  const onLogoChange = (file?: File) => {
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!hotel) return;
    try {
      setLoading(true);
      const res = await updateHotelProfile({
        pathname,
        id: hotel.id,
        data: changedFields,
      });

      if (res.success) {
        toast.success(res.message || "Hotel profile updated successfully");
        location.reload();
      } else if (res.error) {
        toast.error(res.message || "Failed to update hotel profile");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 p-2">
      {loading && <LoadingDialog open={loading} />}
      {/* Header */}
      <DashboardButton id={hotel.id} />
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>
            <BigInfo info="Hotel Dashboard" className="text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="capitalize font-bold">{hotel.home_name}</div>
              <div className="text-xs text-muted-foreground">
                Plan: {hotel.plan ?? "N/A"}
              </div>
            </div>
            <Badge
              className={`${
                hotel.status === "PENDING"
                  ? "bg-yellow-500 text-black"
                  : hotel.status === "APPROVED"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              } font-semibold`}
            >
              {hotel.status ?? "UNKNOWN"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>
            <BigInfo info="Profile" className="text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-xs">Hotel Name</Label>
          <Input
            className="w-full rounded-md border p-2 mt-1"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            placeholder="Hotel name"
          />
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>
            <BigInfo info="Contact" className="text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Primary Phone</Label>
          <div className="max-w-[320px] w-full mt-1">
            <PhoneInput
              country={"us"}
              value={primaryPhone}
              onChange={(v: unknown) => setPrimaryPhone(String(v || ""))}
              inputStyle={{ width: "100%" }}
            />
          </div>

          <div className="mt-4">
            <Label>Secondary Phones</Label>
            <div className="flex flex-col gap-2 mt-2">
              {secondaryPhones.map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="flex-1">
                    <PhoneInput
                      country={"us"}
                      value={p}
                      onChange={(v: unknown) =>
                        updateSecondaryPhone(idx, String(v || ""))
                      }
                      inputStyle={{ width: "100%" }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSecondaryPhone(idx)}
                    className="text-sm text-red-600"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
              <Button
                variant={"outline"}
                disabled={!canAddPhone}
                onClick={addPhone}
              >
                Add phone
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>
            <BigInfo info="Address" className="text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label>City</Label>
          <Input
            className="w-full rounded-md border p-2 mt-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />

          <Label>Main Address</Label>
          <textarea
            className="w-full rounded-md border p-2 mt-1"
            value={mainAddress}
            onChange={(e) => setMainAddress(e.target.value)}
            placeholder="Street, area"
          />
        </CardContent>
      </Card>

      {/* Logo & Settings */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <BigInfo info="Appearance & Settings" className="text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden border">
              <Image
                src={logoPreview ?? images.logo_url}
                alt="logo"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-3"
              onChange={(e) => onLogoChange(e.target.files?.[0] || undefined)}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">Offer Delivery</div>
            <input
              type="checkbox"
              checked={offerDelivery}
              onChange={(e) => setOfferDelivery(e.target.checked)}
              className="h-5 w-9"
              aria-label="Offer delivery"
            />
          </div>

          {hotel.status === "SUSPENDED" && (
            <div className="mt-3 text-sm text-red-600">
              Reason: {hotel.reason}
            </div>
          )}

          <div className="mt-3 text-sm">Visit count: {hotel.visit ?? 0}</div>

          <div className="mt-3">
            {hotel.plan === "FREE" && (
              <Link href={links.hotel_dashboard + `/${hotel.id}/upgrade-plan`}>
                <Button>Upgrade plan</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Buttons */}
      <div className="fixed bottom-2 bg-white/90 dark:bg-black/90 py-2 rounded-lg">
        {isDirty && (
          <span className="text-red-500 text-xs flex mb-3">
            <i className="animate-bounce">
              <ArrowBigDown size={18} />
            </i>{" "}
            &nbsp; You have unsaved changes
          </span>
        )}
        <div className="flex gap-3 ">
          <Button onClick={handleSave} disabled={!isDirty} className="flex-1">
            Save changes
          </Button>
          <Link
            href={links.hotel_dashboard + `/${hotel.id}/my-ads`}
            className="flex-1"
          >
            <Button variant="outline">Promote / Ads</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
