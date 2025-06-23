import mongoose from "mongoose";

export interface ICalendar extends mongoose.Document {
    name: string;
    user: mongoose.Types.ObjectId;
}

const calendarSchema = new mongoose.Schema<ICalendar>(
    {
        name: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

export const CalendarModel = mongoose.model<ICalendar>("Calendar", calendarSchema);
