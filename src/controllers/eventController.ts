import { Request, Response } from "express";
import { EventModel } from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
    const { title, description, start, end, calendarId, reminders, recurrence, timezone } = req.body;
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
};

export const getEvents = async (req: Request, res: Response) => {
    const userId = req.userId;
    const events = await EventModel.find({ user: userId }).populate("calendar");
    res.json(events);
};

export const updateEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userId = req.userId;

    const event = await EventModel.findOneAndUpdate(
        { _id: eventId, user: userId },
        req.body,
        { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userId = req.userId;

    const deleted = await EventModel.findOneAndDelete({ _id: eventId, user: userId });
    if (!deleted) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted" });
};
