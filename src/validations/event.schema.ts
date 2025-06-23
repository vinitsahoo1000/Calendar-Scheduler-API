import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    start: z.coerce.date({ invalid_type_error: "Start must be a valid date" }),
    end: z.coerce.date({ invalid_type_error: "End must be a valid date" }),
    calendarId: z.string().min(1, "calendarId is required"), 
    reminders: z.array(z.number().min(0)).optional(),
    recurrence: z.enum(["daily", "weekly", "monthly"]).optional(),
    timezone: z.string().default("UTC"),
});


export const updateEventSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    calendarId: z.string().min(1).optional(),
    reminders: z.array(z.number().min(0)).optional(),
    recurrence: z.enum(["daily", "weekly", "monthly"]).optional(),
    timezone: z.string().optional(),
});