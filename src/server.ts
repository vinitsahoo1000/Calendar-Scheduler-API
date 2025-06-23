import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import mainRouter from "./routes";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/api/v1", mainRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
});
}).catch((err) => {
    console.error("❌ Failed to connect to DB", err);
});