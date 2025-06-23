import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    timezone?: string;
    googleId?: string;
    googleAccessToken?: string;
    googleRefreshToken?: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        timezone: { type: String, default: "UTC" },

        googleId: { type: String },
        googleAccessToken: { type: String },
        googleRefreshToken: { type: String },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
