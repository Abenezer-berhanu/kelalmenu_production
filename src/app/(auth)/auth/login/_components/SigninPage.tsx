"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import LogoText from "@/components/LogoText";
import { links } from "@/lib/exporter";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signInHotel } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [identifierType, setIdentifierType] = useState<"email" | "phone">(
    "email"
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      toast.error(`Please enter your ${identifierType}`);
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      // Replace with actual sign-in logic
      const res = await signInHotel({
        identifierType,
        identifier: formData.identifier,
        password: formData.password,
      });

      console.log(res);

      if (res.error) {
        toast.error(res.message);
        return;
      }

      if (res.success && res.data) {
        await signIn("credentials", {
          id: res.data.id,
          primary_phone: res.data.primary_phone,
          email: res.data.email,
          home_name: res.data.home_name,
          home_logo: res.data.home_logo,
          country: res.data.country,
          main_address: res.data.main_address,
          redirect: false,
        });
        toast.success(res.message);
        router.push(links.hotel_dashboard + `/${res.data.id}`);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIdentifierType = () => {
    setIdentifierType(identifierType === "email" ? "phone" : "email");
    setFormData({ ...formData, identifier: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <LogoText className="text-4xl mb-2" />
          <h2 className="text-center text-xl font-extrabold text-gray-900 mt-2 flex gap-1 items-center justify-center">
            Welcome back to{" "}
            <LogoText className="text-black text-xl font-extrabold" />
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your digital menu
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Identifier Field (Name or Phone) */}
              <div>
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <p>
                      {identifierType === "email" ? "Email" : "Phone Number"}
                    </p>
                  </Label>
                  <button
                    type="button"
                    onClick={toggleIdentifierType}
                    className="text-xs text-primary hover:text-green-700 font-medium"
                  >
                    Use {identifierType === "email" ? "phone" : "email"} instead
                  </button>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {identifierType === "phone" ? (
                    <div className="max-w-[320px] w-full">
                      <PhoneInput
                        country={"us"}
                        value={formData.identifier}
                        inputStyle={{ width: "100%" }}
                        onChange={(val: unknown) =>
                          setFormData((s) => ({
                            ...s,
                            identifier: String(val),
                          }))
                        }
                        buttonStyle={{ borderRadius: "6px 0 0 6px" }}
                      />
                    </div>
                  ) : (
                    <input
                      id="identifier"
                      name="identifier"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.identifier}
                      onChange={(e) =>
                        setFormData({ ...formData, identifier: e.target.value })
                      }
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {identifierType === "email" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Spinner />
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 flex gap-1 items-center justify-center">
                    New to <LogoText className="text-sm" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={links.register}
                className="w-full flex justify-center py-3 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-8 text-center">
          <Link href={link.termsAndPrivacy} className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <b className="text-primary hover:text-green-700">
              Terms of Service
            </b>{" "}
            and{" "}
            <b className="text-primary hover:text-green-700">Privacy Policy</b>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SignInPage;
