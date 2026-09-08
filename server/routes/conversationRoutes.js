import { Router } from "express";
import {
    getConversations,
    getConversationById,
    createConversation,
    addMessage,
    updateConversation,
    deleteConversation,
} from "../controllers/conversationControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const conversationRouter = Router();

conversationRouter.use(protect);

// Apply auth to all conversation routes (optional)


conversationRouter.get("/", protect, getConversations);
conversationRouter.get("/:id", protect, getConversationById);
conversationRouter.post("/", protect, createConversation);
conversationRouter.post("/:id/messages", protect, addMessage);
conversationRouter.put("/:id", protect, updateConversation);
conversationRouter.delete("/:id", protect, deleteConversation);



export default conversationRouter;