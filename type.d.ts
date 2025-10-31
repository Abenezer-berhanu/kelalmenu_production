export interface RegisterUserParams {
  email?: string;
  city: string;
  primary_phone: string;
  password: string;
  confirm_password: string;
  country: string;
  home_name: string;
  main_address: string;
}

export interface ReturnType {
  error: boolean;
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string;
}

export interface HotelType {
  id: string;
  home_name: string;
  primary_phone: string;
  secondary_phones: string[] | null;
  email: string;
  password: string;
  main_address: unknown;
  status: "PENDING" | "APPROVED" | "SUSPENDED" | null;
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE" | null;
  currency: string | null;
  subscription_start: Date | null;
  subscription_end: Date | null;
  plan_history: unknown;
  home_logo: { url: string; image_id: string };
  offer_delivery: boolean | null;
  ads_controlled_by: "SELF" | "SYSTEM" | null;
  period: string | null;
  created_at: Date | null;
  reason: string | null;
  visit: number | null;
  country: string | null;
  isQrGenerated?: boolean;
  qrCode: { url: string; image_id: string };
}
[];

export interface MenuItemType {
  id: string;
  name: string;
  currency: string;
  hotel_id: string;
  image: { url: string; image_id: string } | null;
  ingredients: string[];
  category: string;
  sub_category: string;
  price: number;
  is_new: boolean | null;
  is_recommended_by_hotel_for_customers: boolean | null;
  preparation_time: {
    label: "seconds" | "minutes" | "hours";
    value: float;
  };
}
