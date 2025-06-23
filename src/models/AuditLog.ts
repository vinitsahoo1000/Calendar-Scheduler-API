import mongoose from "mongoose";

export interface IAuditLog extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    event: mongoose.Types.ObjectId;
    action: "create" | "update" | "delete";
    timestamp: Date;
}

const auditLogSchema = new mongoose.Schema<IAuditLog>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    action: { type: String, enum: ["create", "update", "delete"], required: true },
    timestamp: { type: Date, default: Date.now },
});

export const AuditLogModel = mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
