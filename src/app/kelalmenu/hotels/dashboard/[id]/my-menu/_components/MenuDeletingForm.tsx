"use client";
import { deleteMenuItem } from "@/actions/menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function MenuDeletingForm({ name, menuId }: { name?: string; menuId: string }) {
  const pathname = usePathname();
  const [isloading, setisloading] = React.useState(false);
  const deleteMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setisloading(true);
      e.preventDefault();
      const res = await deleteMenuItem(menuId, pathname);
      if (res?.error) {
        toast.error("Delete menu failed");
      } else {
        toast.success("Menu deleted successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setisloading(false);
    }
  };
  return (
    <form onSubmit={deleteMenu} className="w-full">
      <Button
        variant={"destructive"}
        className="w-full"
        type="submit"
        disabled={isloading}
      >
        {isloading ? "Deleting" : "Delete"} {name}
      </Button>
    </form>
  );
}

export default MenuDeletingForm;
