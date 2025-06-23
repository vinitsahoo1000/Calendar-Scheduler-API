import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import dotenv from "dotenv";
import { UserModel } from "../models/User";


dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    await UserModel.deleteOne({ email: "authuser@example.com" });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth Routes", () => {
    const testUser = {
        email: "authuser@example.com",
        password: "password123",
        timezone: "Asia/Kolkata",
    };

    it("should register a new user", async () => {
        const res = await request(app).post("/api/v1/user/register").send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
    });

    it("should login the user", async () => {
        const res = await request(app).post("/api/v1/user/login").send({
        email: testUser.email,
        password: testUser.password,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
