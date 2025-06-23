import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import dotenv from "dotenv";


dotenv.config();

let token: string;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);

    const res = await request(app).post("/api/v1/user/login").send({
        email: "authuser@example.com",
        password: "password123",
    });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Calendar Routes", () => {
    let calendarId: string;

    it("should create a calendar", async () => {
        const res = await request(app)
        .post("/api/v1/calendar")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Test Calendar" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        calendarId = res.body._id;
    });

    it("should fetch all calendars", async () => {
        const res = await request(app)
        .get("/api/v1/calendar")
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should delete the calendar", async () => {
        const res = await request(app)
        .delete(`/api/v1/calendar/${calendarId}`)
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Calendar deleted");
    });
});
