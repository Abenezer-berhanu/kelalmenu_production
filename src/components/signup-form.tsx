"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { constants, countryList, links } from "@/lib/exporter";
import { registerUser } from "@/actions/auth";

const signupSchema = z
  .object({
    home_name: z.string().min(2, "Home name is required (min 2 chars)"),
    primary_phone: z
      .string()
      .min(4, "Please enter a valid phone number")
      .max(20, "Phone number too long"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    country: z.string().min(1, "Please select a country"),
    city: z.string().min(1, "Please enter your city"),
    main_address: z.string().min(5, "Please provide your main address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SignupValues = z.infer<typeof signupSchema>;

// ✅ Password input with toggle visibility
const PasswordInput = React.forwardRef<
  HTMLInputElement,
  {
    id: keyof SignupValues;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
>(({ id, label, value, onChange, error }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <LabelInputContainer className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
        />
        <Button
          variant={"ghost"}
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-600 hover:text-neutral-900"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </LabelInputContainer>
  );
});
PasswordInput.displayName = "PasswordInput";

export default function SignupForm() {
  const [formState, setFormState] = React.useState<SignupValues>({
    home_name: "",
    primary_phone: "",
    email: "",
    country: "",
    city: "",
    main_address: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = React.useState<
    Partial<Record<keyof SignupValues, string>>
  >({});
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const result = signupSchema.safeParse(formState);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupValues, string>> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof SignupValues | undefined;
        if (path) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(result.data);
      if (data?.success) {
        toast.success("Registration successful");
      } else {
        toast.error(data?.message || "Registration failed");
        if (data?.message?.toLowerCase().includes("email"))
          setErrors({ email: data.message });
        if (data?.message?.toLowerCase().includes("home name"))
          setErrors({ home_name: data.message });
      }
    } catch (err) {
      console.error("register API error", err);
      toast.error("Registration failed, try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((s) => ({ ...s, [id]: value }));
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to {constants.name}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register to {constants.name} and make your menu digital
      </p>

      <form className="my-8" onSubmit={handleSubmit} noValidate>
        <LabelInputContainer>
          <Label htmlFor="home_name">Home name</Label>
          <Input
            id="home_name"
            placeholder="Haile Resort"
            value={formState.home_name}
            onChange={handleChange}
          />
          {errors.home_name && (
            <p className="mt-1 text-sm text-red-600">{errors.home_name}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="primary_phone">Primary phone</Label>
          <PhoneInput
            country={"us"}
            value={formState.primary_phone}
            onChange={(val) =>
              setFormState((s) => ({ ...s, primary_phone: val }))
            }
            inputStyle={{ maxWidth: "260px" }}
          />
          {errors.primary_phone && (
            <p className="mt-1 text-sm text-red-600">{errors.primary_phone}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email Address (optional)</Label>
          <Input
            id="email"
            placeholder="haile@gmail.com"
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="country">Country</Label>
          <Select
            value={formState.country}
            onValueChange={(v) => setFormState((s) => ({ ...s, country: v }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Addis Ababa"
            value={formState.city}
            onChange={handleChange}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="main_address">Main address</Label>
          <Textarea
            id="main_address"
            placeholder="Addis Ababa - Bole Medhanialem - near X store"
            value={formState.main_address}
            onChange={handleChange}
          />
          {errors.main_address && (
            <p className="mt-1 text-sm text-red-600">{errors.main_address}</p>
          )}
        </LabelInputContainer>

        <PasswordInput
          id="password"
          label="Password"
          value={formState.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordInput
          id="confirm_password"
          label="Confirm password"
          value={formState.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
        />

        <Button className="mt-4 w-full" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign up →"}
        </Button>

        <div className="my-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Already registered?{" "}
          <Link href={links.login} className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

// Helper container
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2 mb-3", className)}>
    {children}
  </div>
);
