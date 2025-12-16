import argon from "argon2";
import { Request, Response } from "express";
import { accessTokenCookie, refreshTokenCookie } from "../config/cookies";
import { prisma } from "../lib/prisma";
import {
  findOneUserByEmail,
  findOneUserById,
  generateToken,
} from "./auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await findOneUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await argon.hash(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        role: "DEVELOPER",
      },
    });

    const tokens = await generateToken({
      sub: newUser.id,
    });

    res
      .cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findOneUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const tokens = await generateToken({
      sub: user.id,
    });

    res.cookie("accessToken", tokens.accessToken, accessTokenCookie);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookie);

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const tokens = await generateToken({
      sub: user?.sub,
    });
    res.cookie("accessToken", tokens.accessToken, accessTokenCookie);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookie);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const isExist = await findOneUserById(user?.sub!);

    if (!isExist) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ data: isExist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getMe, login, refreshToken, register };
