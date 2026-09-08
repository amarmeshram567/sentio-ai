import mongoose from "mongoose";
import Conversation from "../models/Conversations.js";

// In-memory fallback store when MongoDB is not connected
const memoryStore = new Map();

const getUserId = (req) => req.userId || req.user?._id || req.auth()?.userId;

// Helper to check MongoDB connection status (1 = connected)
const isDbReady = () => mongoose.connection.readyState === 1;

// @desc    Get all conversations (sorted newest first)
// @route   GET /api/conversations
// @access  Protected/Public
export const getConversations = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { archived, favorite } = req.query;

        if (isDbReady()) {
            const filter = {};
            if (userId) filter.user = userId;
            if (archived !== undefined) filter.archived = archived === "true";
            if (favorite !== undefined) filter.favorite = favorite === "true";

            const convos = await Conversation.find(filter)
                .select("-messages") // Exclude heavy message arrays for list view
                .sort({ updatedAt: -1 })
                .limit(200);

            return res.status(200).json({ success: true, count: convos.length, data: convos });
        }

        // In-memory fallback
        let convos = Array.from(memoryStore.values());

        if (userId) convos = convos.filter((c) => String(c.user) === String(userId));
        if (archived !== undefined) convos = convos.filter((c) => c.archived === (archived === "true"));
        if (favorite !== undefined) convos = convos.filter((c) => c.favorite === (favorite === "true"));

        const listData = convos
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map(({ messages, ...rest }) => rest);

        return res.status(200).json({ success: true, count: listData.length, data: listData });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single conversation by ID (with full message history)
// @route   GET /api/conversations/:id
// @access  Protected/Public
export const getConversationById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isDbReady()) {
            const convo = await Conversation.findOne({ _id: id, user: getUserId(req) });
            if (!convo) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }
            return res.status(200).json({ success: true, data: convo });
        }

        // In-memory fallback
        const convo = memoryStore.get(id);
        if (convo && String(convo.user) !== String(getUserId(req))) return res.status(404).json({ success: false, message: "Conversation not found" });
        if (!convo) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        return res.status(200).json({ success: true, data: convo });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a new conversation
// @route   POST /api/conversations
// @access  Protected/Public
export const createConversation = async (req, res) => {
    try {
        const { title, model } = req.body || {};
        const defaultTitle = title || "New conversation";
        const selectedModel = model || "sentio-pro";
        const userId = getUserId(req);

        if (isDbReady()) {
            const convo = await Conversation.create({
                title: defaultTitle,
                model: selectedModel,
                user: userId || undefined,
                favorite: false,
                archived: false,
                messages: [],
            });
            return res.status(201).json({ success: true, data: convo });
        }

        // In-memory fallback
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        const now = new Date();
        const convo = {
            _id: id,
            id,
            title: defaultTitle,
            model: selectedModel,
            user: userId || null,
            favorite: false,
            archived: false,
            messages: [],
            createdAt: now,
            updatedAt: now,
        };

        memoryStore.set(id, convo);
        return res.status(201).json({ success: true, data: convo });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add a message (user or assistant) to a conversation
// @route   POST /api/conversations/:id/messages
// @access  Protected/Public
export const addMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, content, attachments = [] } = req.body || {};

        if (!role || !content) {
            return res.status(400).json({
                success: false,
                message: "Both 'role' (user/assistant) and 'content' are required",
            });
        }

        if (!["user", "assistant"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role must be either 'user' or 'assistant'",
            });
        }

        if (!Array.isArray(attachments) || attachments.some((attachment) => (
            !attachment || typeof attachment.data !== "string" || typeof attachment.mimeType !== "string"
        ))) {
            return res.status(400).json({
                success: false,
                message: "Attachments must include valid data and mimeType values",
            });
        }

        if (isDbReady()) {
            const convo = await Conversation.findOne({ _id: id, user: getUserId(req) });
            if (!convo) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }

            convo.messages.push({ role, content, attachments });
            await convo.save();

            const savedMessage = convo.messages[convo.messages.length - 1];
            return res.status(201).json({ success: true, data: savedMessage });
        }

        // In-memory fallback
        const convo = memoryStore.get(id);
        if (convo && String(convo.user) !== String(getUserId(req))) return res.status(404).json({ success: false, message: "Conversation not found" });
        if (!convo) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        const newMessage = {
            _id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            role,
            content,
            attachments,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        convo.messages.push(newMessage);
        convo.updatedAt = new Date();
        memoryStore.set(id, convo);

        return res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update conversation meta (title, favorite, archived, model)
// @route   PATCH /api/conversations/:id
// @access  Protected/Public
export const updateConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, favorite, archived, model } = req.body || {};

        const updates = {};
        if (title !== undefined) updates.title = title;
        if (favorite !== undefined) updates.favorite = favorite;
        if (archived !== undefined) updates.archived = archived;
        if (model !== undefined) updates.model = model;

        if (isDbReady()) {
            const convo = await Conversation.findOneAndUpdate(
                { _id: id, user: getUserId(req) },
                { $set: updates },
                { new: true, runValidators: true }
            );

            if (!convo) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }

            return res.status(200).json({ success: true, data: convo });
        }

        // In-memory fallback
        const convo = memoryStore.get(id);
        if (!convo || String(convo.user) !== String(getUserId(req))) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        Object.assign(convo, updates, { updatedAt: new Date() });
        memoryStore.set(id, convo);

        return res.status(200).json({ success: true, data: convo });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a conversation
// @route   DELETE /api/conversations/:id
// @access  Protected/Public
export const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;

        if (isDbReady()) {
            const convo = await Conversation.findOneAndDelete({ _id: id, user: getUserId(req) });
            if (!convo) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }
            return res.status(204).end();
        }

        // In-memory delete
        const convo = memoryStore.get(id);
        if (!convo || String(convo.user) !== String(getUserId(req))) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        memoryStore.delete(id);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};