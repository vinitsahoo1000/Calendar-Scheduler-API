import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { registerSchema, loginSchema } from "../validations/user.schema";
import dotenv from 'dotenv';
import { ZodError } from "zod";



dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    try {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.flatten().fieldErrors });
        }

        const { email, password, timezone } = validation.data;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
        email,
        password: hashedPassword,
        timezone: timezone || "UTC",
        });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ message: "User registered successfully" , token });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.flatten().fieldErrors });
        }
        
        const { email, password } = validation.data;

        const user = await UserModel.findOne({ email });
        if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            timezone: user.timezone,
        },
        });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
    }
};
