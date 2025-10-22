// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      primary_phone: string;
      home_name: string;
      country: string;
      home_logo: string;
      main_address: string;
    };
  }

  interface User {
    id: string;
    email: string;
    primary_phone: string;
    home_name: string;
    country: string;
    home_logo: string;
    main_address: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    primary_phone: string;
    home_name: string;
    country: string;
    home_logo: string;
    main_address: string;
  }
}
