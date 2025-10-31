"use client";
import React, { useActionState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createMyQrCode } from "@/actions/menu";
import { toast } from "sonner";

function GenerateQrCodeForm({
  hotelId,
  hotelName,
}: {
  hotelId: string;
  hotelName: string;
}) {
  const [state, formAction] = useActionState(createMyQrCode, null);

  if (state?.success) {
    toast.success("QR-code Generated Successfully");
    location.reload();
  }

  if (state?.error) {
    toast.error(state.message || "Failed to Generate QR-code");
  }

  return (
    <form className="my-3" action={formAction}>
      <p className="mb-4">
        QR-code For <b>{hotelName}</b> has not been Generated, Please Generate
        One.
      </p>
      <input type="hidden" name="hotelId" value={hotelId} />

      <SubmitButton text="Generate My QR-code" />
    </form>
  );
}

export default GenerateQrCodeForm;
