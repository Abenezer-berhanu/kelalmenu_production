"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, links } from "@/lib/exporter";
import { X } from "lucide-react";
import React, { useState } from "react";
import { FoodSubcategorySelect } from "./FoodSubcategorySelect";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createHotelMenu } from "@/actions/menu";
import { useRouter } from "next/navigation";

function MenuForm({
  plan,
  id,
}: {
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE";
  id: string;
}) {
  const { push } = useRouter();
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<number | "">("");
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [prepTimeValue, setPrepTimeValue] = useState<number | "">("");
  const [prepTimeLabel, setPrepTimeLabel] = useState<
    "seconds" | "minutes" | "hours"
  >("minutes");
  const [name, setName] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!currency) return "Currency is required";
    if (!category) return "Category is required";
    if (!items.length) return "At least one ingredient is required";
    if (!imageFile) return "Image is required";
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
    try {
      e.preventDefault();
      const err = validate();
      if (err) {
        toast.error(err);
        return;
      }

      setSubmitting(true);

      const payload = {
        id: id,
        name: name.trim(),
        currency: currency,
        hotel_id: id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: imageFile ? { url: imageFile as any, image_id: "" } : null,
        ingredients: items,
        category: category,
        sub_category: subCategory ?? "",
        price: typeof price === "number" ? price : Number(price),
        is_new: isNew === null ? null : Boolean(isNew),
        is_recommended_by_hotel_for_customers:
          isRecommended === null ? null : Boolean(isRecommended),
        preparation_time: {
          label: prepTimeLabel,
          value:
            typeof prepTimeValue === "number"
              ? prepTimeValue
              : Number(prepTimeValue),
        },
      } as const;

      const res = await createHotelMenu(payload, plan);
      if (res.error) {
        toast.error(res.message || "Failed to create menu item.");
        return;
      }
      toast.success("Menu item created successfully.");
      push(`${links.hotel_dashboard}/${id}/my-menu`);
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-4 max-w-lg mx-auto p-4 bg-white rounded-2xl shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="name">Food Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* currency */}
      <div className="">
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

      {/* image */}
      <div className="">
        <Label htmlFor="image">Food image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          placeholder=""
          onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            setImageFile(f || null);
          }}
        />
      </div>

      {/* ingredients */}
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="ingredients">Ingredients</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Type and press Enter or click Add"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleAdd} type="button">
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat: { plan: string; label: string }, idx) => (
              <SelectItem
                disabled={cat.plan !== "all" && plan === "FREE"}
                key={idx}
                value={cat.label}
              >
                {cat.label}
                {cat.plan !== "all" && plan === "FREE" && (
                  <small className="text-blue-500"> (Upgrade to access)</small>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/*sub category */}
      <div>
        <Label htmlFor="subcategory">Sub Category</Label>
        <small className="inline-block text-[11px] text-blue-500">
          if you didn{"'"}t find what you want type it and click Add
        </small>
        <FoodSubcategorySelect
          value={subCategory}
          onChange={(value) => setSubCategory(value)}
        />
      </div>

      {/* price */}
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => {
            const val = e.target.value;
            setPrice(val === "" ? "" : parseFloat(val));
          }}
        />
      </div>

      {/* Is New */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isNew"
          checked={isNew === true}
          onCheckedChange={(val) => setIsNew(val ? true : false)}
        />
        <Label htmlFor="isNew">Is Food New</Label>
      </div>

      {/* Recommended by Hotel */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRecommended"
          checked={isRecommended === true}
          onCheckedChange={(val) => setIsRecommended(val ? true : false)}
        />
        <Label htmlFor="isRecommended">Recommended by Hotel</Label>
      </div>

      {/* Preparation Time */}
      <div className="flex space-x-2 items-end">
        <div className="flex-1">
          <Label htmlFor="prepTimeValue">Preparation Time</Label>
          <Input
            id="prepTimeValue"
            type="number"
            placeholder="Enter value"
            value={prepTimeValue}
            onChange={(e) => setPrepTimeValue(parseFloat(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="prepTimeLabel">Unit</Label>
          <Select
            value={prepTimeLabel}
            onValueChange={(val) =>
              setPrepTimeLabel(val as "seconds" | "minutes" | "hours")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seconds">Seconds</SelectItem>
              <SelectItem value="minutes">Minutes</SelectItem>
              <SelectItem value="hours">Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full mt-2" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Create"}
      </Button>
    </form>
  );
}

export default MenuForm;
