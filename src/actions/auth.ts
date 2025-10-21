"use server";

import { errors, success } from "@/lib/exporter";
import { RegisterUserParams, ReturnType } from "../../type";
import { isEmailRegistered, isHomeNameRegistered } from "@/lib/helpers";
import bcrypt from "bcrypt";
import db from "@/db";
import { hotel } from "@/lib/schema";

export const registerUser = async (
  params: RegisterUserParams
): Promise<ReturnType> => {
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
      if (exists) {
        return {
          ...errors.somethingWentWrong,
          message: "Email is already registered",
        };
      }
    }

    if (home_name) {
      const existsName = await isHomeNameRegistered(home_name);
      if (existsName) {
        return {
          ...errors.somethingWentWrong,
          message: "Home name is already registered",
        };
      }
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
  } catch (err) {
    console.error("registerUser error:", err);
    return {
      ...errors.somethingWentWrong,
      message: "Registration failed, please try again later",
    };
  }
};
