import { Request, Response } from "express";
import { EventModel } from "../models/Event";
import { createEventSchema, updateEventSchema } from "../validations/event.schema";

export const createEvent = async (req: Request, res: Response) => {
    try{
        const validation = createEventSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.flatten().fieldErrors });
        }

        const { title, description, start, end, calendarId, reminders, recurrence, timezone } = validation.data;
        const userId = req.userId;

        const event = await EventModel.create({
            title,
            description,
            start,
            end,
            calendar: calendarId,
            user: userId,
            reminders,
            recurrence,
            timezone,
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Failed to create event", error });
    }
};

export const getEvents = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const events = await EventModel.find({ user: userId }).populate("calendar");
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const userId = req.userId;

        const validation = updateEventSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.flatten().fieldErrors });
        }

        const event = await EventModel.findOneAndUpdate(
            { _id: eventId, user: userId },
            req.body,
            { new: true }
        );

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Failed to update event", error });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const userId = req.userId;

        const deleted = await EventModel.findOneAndDelete({ _id: eventId, user: userId });
        if (!deleted) return res.status(404).json({ message: "Event not found" });

        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete event", error });
    }
};
