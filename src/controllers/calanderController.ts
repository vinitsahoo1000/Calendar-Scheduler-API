import { Request, Response } from "express";
import { CalendarModel } from "../models/Calander";

export const createCalendar = async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.userId;

    const calendar = await CalendarModel.create({ name, user: userId });
    res.status(201).json(calendar);
};

export const getCalendars = async (req: Request, res: Response) => {
    const userId = req.userId
    const calendars = await CalendarModel.find({ user: userId });
    res.json(calendars);
};

export const deleteCalendar = async (req: Request, res: Response) => {
    const calendarId = req.params.id;
    const userId = req.userId;

    const calendar = await CalendarModel.findOneAndDelete({ _id: calendarId, user: userId });
    if (!calendar) return res.status(404).json({ message: "Calendar not found" });

    res.json({ message: "Calendar deleted" });
};
