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
import { categories } from "@/lib/exporter";
import { X } from "lucide-react";
import React, { useState } from "react";
import { FoodSubcategorySelect } from "./FoodSubcategorySelect";
import { Checkbox } from "@/components/ui/checkbox";

function MenuForm({
  plan,
}: {
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE";
}) {
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

  return (
    <form className="space-y-2 max-w-lg mx-auto p-3">
      <div>
        <Label htmlFor="name">Food Name</Label>
        <Input type="text" id="name" name="name" placeholder="" />
      </div>

      {/* currency */}
      <div className="">
        <Label htmlFor="currency">Currency</Label>
        <Select>
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
        <Input type="file" id="image" name="image" placeholder="" />
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
        <Select>
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
        <Label htmlFor="category">Category</Label>
        <small className="inline-block">
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
          onChange={(e) => setPrice(parseFloat(e.target.value))}
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
    </form>
  );
}

export default MenuForm;
