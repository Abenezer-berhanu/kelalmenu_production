import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="inline-block cursor-pointer"
    >
      {pending ? <Spinner /> : text}
    </Button>
  );
}
