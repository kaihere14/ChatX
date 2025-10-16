import express from "express";
import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { sendSignupEmail } from "./email.controller.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const generateTokens = async (email) => {
  const user = await User.findOne({ email });
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: "User already registered with this email address." });
    }

    const user2 = await User.create({
      fullName,
      email,
      password,
    });

    const { accessToken, refreshToken } = await generateTokens(email);

    const mailSend = await sendSignupEmail(user2.email, user2.fullName);

    console.log("✅ Signup data:", user2, accessToken, refreshToken);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.status(200).json({ message: "Signup data is valid!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
