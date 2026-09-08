import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectDB from "./config/db.js";
import conversationRouter from "./routes/conversationRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import userRouter from "./routes/userRoutes.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("CORS blocked by server"));
    },
    credentials: true,
}));

app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

await connectDB();

app.get("/api/protected-route", requireAuth(), (req, res) => {
    const { userId } = req.auth();
    res.json({ success: true, message: "Token is valid.", userId });
});

app.post("/api/webhooks/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/conversations", conversationRouter);
app.use("/api/chat", chatRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
