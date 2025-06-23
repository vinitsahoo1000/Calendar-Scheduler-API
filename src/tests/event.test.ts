import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import dotenv from "dotenv";


dotenv.config();

let token: string;
let calendarId: string;
let eventId: string;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);


    const loginRes = await request(app).post("/api/v1/user/login").send({
        email: "authuser@example.com",
        password: "password123",
    });
    token = loginRes.body.token;


    const calRes = await request(app)
        .post("/api/v1/calendar")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Test Calendar" });

    calendarId = calRes.body._id;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Event Routes", () => {
    it("should create an event", async () => {
        const res = await request(app)
        .post("/api/v1/event")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Test Meeting",
            start: new Date(),
            end: new Date(Date.now() + 3600000),
            calendarId,
            timezone: "UTC",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        eventId = res.body._id;
    });

    it("should fetch events", async () => {
        const res = await request(app)
        .get("/api/v1/event")
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should update the event", async () => {
        const res = await request(app)
        .put(`/api/v1/event/${eventId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated Meeting" });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Meeting");
    });

    it("should delete the event", async () => {
        const res = await request(app)
        .delete(`/api/v1/event/${eventId}`)
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Event deleted");
    });
});
