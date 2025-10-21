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
