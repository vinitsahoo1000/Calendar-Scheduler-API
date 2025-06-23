import mongoose from "mongoose";

export interface IEvent extends mongoose.Document {
    title: string;
    description?: string;
    start: Date;
    end: Date;
    calendar: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    reminders?: number[]; 
    recurrence?: "daily" | "weekly" | "monthly";
    timezone: string;
}


const eventSchema = new mongoose.Schema<IEvent>(
    {
        title: { type: String, required: true },
        description: { type: String },
        start: { type: Date, required: true },
        end: { type: Date, required: true },

        calendar: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        reminders: [{ type: Number }],
        recurrence: { type: String, enum: ["daily", "weekly", "monthly"] },

        timezone: { type: String, default: "UTC" }
    },
    { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
