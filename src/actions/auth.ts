"use server";

import { errors, success } from "@/lib/exporter";
import { HotelType, RegisterUserParams, ReturnType } from "../../type";
import {
  isEmailRegistered,
  isHomeNameRegistered,
  isPhoneRegistered,
} from "@/lib/helpers";
import bcrypt from "bcrypt";
import db from "@/db";
import { hotel } from "@/lib/schema";
import { comparePasswords } from "@/lib/password";

export const registerUser = async (params: RegisterUserParams) => {
  const {
    email,
    city,
    primary_phone,
    password,
    confirm_password,
    country,
    home_name,
    main_address,
  } = params;

  if (password !== confirm_password) {
    return {
      ...errors.somethingWentWrong,
      message: "Password and confirm password do not match",
    };
  }

  if (
    !primary_phone ||
    !city ||
    !password ||
    !confirm_password ||
    !country ||
    !home_name ||
    !main_address
  ) {
    return {
      ...errors.somethingWentWrong,
      message: "Please fill in all required fields",
    };
  }

  if (password.length < 8) {
    return {
      ...errors.somethingWentWrong,
      message: "Password must be at least 8 characters long",
    };
  }
  try {
    if (email) {
      const exists = await isEmailRegistered(email);
      if (exists.success) {
        return {
          ...errors.somethingWentWrong,
          message: "Email is already registered",
        };
      }
    }

    if (home_name) {
      const existsName = await isHomeNameRegistered(home_name);
      if (existsName.success) {
        return {
          ...errors.somethingWentWrong,
          message: "Home name is already registered",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 15);

      const newHotel = await db.insert(hotel).values({
        email: email || "",
        home_name,
        primary_phone,
        password: hashedPassword,
        main_address: { city, main_address },
        country,
      });

      return { ...success, data: newHotel };
    }
  } catch (err) {
    console.error("registerUser error:", err);
    return {
      ...errors.somethingWentWrong,
      message: "Registration failed, please try again later",
    };
  }
};

export const signInHotel = async (params: {
  identifierType: "phone" | "email";
  identifier: string;
  password: string;
}): Promise<ReturnType> => {
  try {
    const { identifierType, identifier, password } = params;

    // Find user by email or phone
    const hotel =
      identifierType === "phone"
        ? await isPhoneRegistered(identifier)
        : await isEmailRegistered(identifier);

    if (!hotel.success) {
      return {
        ...errors.somethingWentWrong,
        message: "Hotel is not registered with provided credentials",
      };
    }

    // Check password
    const isValid = await comparePasswords(
      password,
      hotel.data!.password || ""
    );
    if (!isValid) {
      return {
        ...errors.somethingWentWrong,
        message: `Invalid password or ${identifierType}`,
      };
    }

    return {
      ...success,
      data: { ...(hotel.data as HotelType), password: "" },
      message: "Sign in successful",
    };
  } catch (error) {
    console.log(error);
    return {
      ...errors.somethingWentWrong,
    };
  }
};
