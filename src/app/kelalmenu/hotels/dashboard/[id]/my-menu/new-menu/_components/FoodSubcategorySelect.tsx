"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type CategoryOption = {
  group: string;
  items: string[];
};

const categories: CategoryOption[] = [
  {
    group: "Breakfast",
    items: ["Pancakes", "Omelette", "Paratha", "Croissant", "Coffee"],
  },
  {
    group: "Lunch",
    items: ["Pasta", "Burger", "Pizza", "Salad", "Rice Bowl"],
  },
  {
    group: "Dinner",
    items: ["Steak", "Curry", "Soup", "Noodles", "Grilled Fish"],
  },
  {
    group: "Drinks & Juice",
    items: ["Orange Juice", "Smoothie", "Milkshake", "Tea", "Cocktail"],
  },
  {
    group: "Snacks & Desserts",
    items: ["Fries", "Cake", "Ice Cream", "Donut", "Chips"],
  },
  {
    group: "All Day / Others",
    items: ["Sandwich", "Wrap", "Shawarma", "Tacos", "Falafel"],
  },
];

export function FoodSubcategorySelect({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [customOptions, setCustomOptions] = React.useState<string[]>([]);

  const allItems = React.useMemo(() => {
    const flattened = categories.flatMap((cat) =>
      cat.items.map((item) => ({ label: item, group: cat.group }))
    );
    return [
      ...flattened,
      ...customOptions.map((item) => ({ label: item, group: "Custom" })),
    ];
  }, [customOptions]);

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (selected: string) => {
    onChange(selected);
    setOpen(false);
  };

  const handleAddCustom = () => {
    if (!search.trim()) return;
    if (!customOptions.includes(search)) {
      setCustomOptions([...customOptions, search]);
      onChange(search);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select subcategory..."}
          <ChevronsUpDown className="opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or add subcategory..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <Button
                onClick={handleAddCustom}
                variant="ghost"
                className="w-full justify-start"
              >
                <Plus className="h-4 w-4 mr-2" /> Add “{search}”
              </Button>
            </CommandEmpty>

            {categories.map((category) => {
              const groupItems = filteredItems.filter(
                (item) => item.group === category.group
              );

              if (groupItems.length === 0) return null;

              return (
                <CommandGroup key={category.group} heading={category.group}>
                  {groupItems.map((item) => (
                    <CommandItem
                      key={item.label}
                      onSelect={() => handleSelect(item.label)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}

            {customOptions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Custom">
                  {customOptions.map((item) => (
                    <CommandItem key={item} onSelect={() => handleSelect(item)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
