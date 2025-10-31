"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

import { categories } from "@/lib/exporter";
import { toast } from "sonner";
import { MenuItemType } from "../../../../../../../../../type";
import { FoodSubcategorySelect } from "../../new-menu/_components/FoodSubcategorySelect";
import Image from "next/image";
import { updateMenuItem } from "@/actions/menu";

type PrepLabel = "seconds" | "minutes" | "hours";

export default function MenuUpdateForm({
  initial,
  plan,
  hotelId,
  menuId,
}: {
  initial: MenuItemType;
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE";
  hotelId: string;
  menuId: string;
}) {
  const [home_name, setName] = useState<string>(initial.name || "");
  const [currency, setCurrency] = useState<string>(initial.currency || "");
  const [category, setCategory] = useState<string>(initial.category || "");
  const [subCategory, setSubCategory] = useState<string | null>(
    initial.sub_category || null
  );
  const [items, setItems] = useState<string[]>(initial.ingredients || []);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState<number | "">(initial.price ?? "");
  const [isNew, setIsNew] = useState<boolean | null>(initial.is_new ?? null);
  const [isRecommended, setIsRecommended] = useState<boolean | null>(
    initial.is_recommended_by_hotel_for_customers ?? null
  );
  const [prepTimeValue, setPrepTimeValue] = useState<number | "">(
    initial.preparation_time?.value ?? ""
  );
  const [prepTimeLabel, setPrepTimeLabel] = useState<PrepLabel>(
    initial.preparation_time?.label ?? "minutes"
  );
  const [imageFile, setImageFile] = useState<{
    url: File | string;
    image_id: string;
  } | null>(initial.image);
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setValue("");
    }
  };

  const handleRemove = (item: string) => {
    setItems(items.filter((i) => i !== item));
  };

  const validate = () => {
    if (!home_name.trim()) return "Name is required";
    if (!currency) return "Currency is required";
    if (!category) return "Category is required";
    // category plan limits: check categories list
    const catObj = categories.find(
      (c: { label: string; plan: string }) => c.label === category
    );
    if (catObj && catObj.plan !== "all" && plan === "FREE") {
      return `Category \"${category}\" is not available on FREE plan`;
    }
    if (!items.length) return "At least one ingredient is required";
    const p = typeof price === "number" ? price : Number(price);
    if (!p || Number.isNaN(p) || p <= 0)
      return "Price must be a positive number";
    const pt =
      typeof prepTimeValue === "number" ? prepTimeValue : Number(prepTimeValue);
    if (!pt || Number.isNaN(pt) || pt <= 0)
      return "Preparation time must be a positive number";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);
    const changed: Record<string, unknown> = {};
    if (home_name.trim() !== (initial.name || ""))
      changed.name = home_name.trim();
    if (currency !== (initial.currency || "")) changed.currency = currency;
    if (category !== (initial.category || "")) changed.category = category;
    if ((initial.sub_category || null) !== subCategory)
      changed.sub_category = subCategory;
    const initIngredients = Array.isArray(initial.ingredients)
      ? initial.ingredients
      : [];
    if (JSON.stringify(initIngredients) !== JSON.stringify(items))
      changed.ingredients = items;
    if (
      (initial.price ?? null) !==
      (typeof price === "number" ? price : Number(price))
    )
      changed.price = typeof price === "number" ? price : Number(price);
    if ((initial.is_new ?? null) !== (isNew === null ? null : Boolean(isNew)))
      changed.is_new = isNew === null ? null : Boolean(isNew);
    if (
      (initial.is_recommended_by_hotel_for_customers ?? null) !==
      (isRecommended === null ? null : Boolean(isRecommended))
    )
      changed.is_recommended_by_hotel_for_customers =
        isRecommended === null ? null : Boolean(isRecommended);
    // preparation time
    const initPrep = initial.preparation_time || { label: null, value: null };
    const curPrep = {
      label: prepTimeLabel,
      value:
        typeof prepTimeValue === "number"
          ? prepTimeValue
          : Number(prepTimeValue),
    };
    if (
      initPrep.label !== curPrep.label ||
      Number(initPrep.value) !== Number(curPrep.value)
    )
      changed.preparation_time = curPrep;
    // image
    if (imageFile) {
      typeof imageFile.url === "string"
        ? (changed.image = imageFile)
        : (changed.image = {
            url: imageFile.url,
            image_id: imageFile.image_id,
          });
    }

    const res = await updateMenuItem(menuId, hotelId, plan, changed);
    if (res.error) {
      toast.error(res.message);
      return;
    }

    if (res.success) {
      toast.success("Menu item updated successfully");
      location.reload();
    }

    setSubmitting(false);
  };

  return (
    <form className="space-y-3 max-w-lg mx-auto p-3" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Food Name</Label>
        <Input
          id="name"
          value={home_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={(val) => setCurrency(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="ETB">ETB</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image">Food image</Label>
        {imageFile && typeof imageFile.url === "string" ? (
          <Image
            src={imageFile.url as string}
            alt={initial.name}
            className="w-18 h-18 object-cover my-3 rounded-full"
            width={80}
            height={80}
          />
        ) : (
          ""
        )}
        <Input
          type="file"
          onChange={(e) =>
            setImageFile({ url: e.target.files?.[0] ?? "", image_id: "" })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ingredients">Ingredients</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Type and press Enter or click Add"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <Button type="button" onClick={handleAdd}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <Badge
              key={it}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {it}
              <button
                type="button"
                onClick={() => handleRemove(it)}
                className="hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(
              (cat: { label: string; plan: string }, idx: number) => (
                <SelectItem
                  key={idx}
                  value={cat.label}
                  disabled={cat.plan !== "all" && plan === "FREE"}
                >
                  {cat.label}
                  {cat.plan !== "all" && plan === "FREE" && (
                    <small className="text-blue-500"> (Upgrade)</small>
                  )}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sub Category</Label>
        <small className="inline-block">
          If you don{"'"}t find what you want type it and click Add
        </small>
        <FoodSubcategorySelect
          value={subCategory}
          onChange={(v) => setSubCategory(v)}
        />
      </div>

      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : parseFloat(e.target.value))
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isNew"
          checked={isNew === true}
          onCheckedChange={(val) => setIsNew(val ? true : false)}
        />
        <Label htmlFor="isNew">Is Food New</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRecommended"
          checked={isRecommended === true}
          onCheckedChange={(val) => setIsRecommended(val ? true : false)}
        />
        <Label htmlFor="isRecommended">Recommended by Hotel</Label>
      </div>

      <div className="flex space-x-2 items-end">
        <div className="flex-1">
          <Label>Preparation Time</Label>
          <Input
            type="number"
            value={prepTimeValue ?? 0}
            onChange={(e) => setPrepTimeValue(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <Label>Unit</Label>
          <Select
            value={prepTimeLabel}
            onValueChange={(val) => setPrepTimeLabel(val as PrepLabel)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seconds">Seconds</SelectItem>
              <SelectItem value="minutes">Minutes</SelectItem>
              <SelectItem value="hours">Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={submitting}>
        {submitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
