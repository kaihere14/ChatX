import express from "express";
import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { sendSignupEmail } from "./email.controller.js";
import jwt from "jsonwebtoken";
import cloudinary from "../database/cloudinary.js";


if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("JWT secret environment variables are not defined");
    }

const generateTokens = async (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: userId },
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

    const option = {
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict"
    }

    const { accessToken, refreshToken } = generateTokens(user2._id);

    const mailSend = await sendSignupEmail(user2.email, user2.fullName);


    res.cookie("accessToken", accessToken,option);
    res.cookie("refreshToken", refreshToken,option);
    res.status(200).json({ message: "Signup data is valid!"});
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const {accessToken,refreshToken} = await generateTokens(user._id)

     
     const option = {
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict"
    }

    res.cookie("accessToken", accessToken,option);
    res.cookie("refreshToken", refreshToken,option);

      res.status(200).json({message: "Login successful",});
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0), // expire immediately
      };
      res.cookie("accessToken", "", cookieOptions);
      res.cookie("refreshToken", "", cookieOptions);
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};


export const profileUpdate = async(req,res)=>{
  try {
    const {profilePic} = req.body
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"})
    }
    const userId = req.user._id

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser =await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(500).json({message:"Internal server error"})
    
  }
}

