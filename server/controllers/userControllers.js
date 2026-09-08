import User from "../models/User.js";
import Conversation from "../models/Conversations.js";
import { clerkClient } from "@clerk/express";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.auth()?.userId || req.user?._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        let user = await User.findById(userId);

        // Agar DB me user nahi mila, toh Clerk se fetch karke auto-create karein
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);
            const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
            const username =
                clerkUser.username ||
                [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
                clerkUser.fullName ||
                "User";
            const avatar = clerkUser.imageUrl || "";

            user = await User.create({
                _id: userId,
                email,
                username,
                avatar,
            });
        }

        console.log(user)

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Sync or register user from frontend Clerk session
// @route   POST /api/users/sync
// @access  Protected
export const syncUser = async (req, res) => {
    try {
        const clerkId = req.auth()?.userId;
        const { email, username, avatar } = req.body;

        if (!clerkId) {
            return res.status(401).json({ success: false, message: "Not authenticated with Clerk" });
        }

        // Find and update if exists, or insert new record (upsert)
        const user = await User.findByIdAndUpdate(
            clerkId,
            {
                _id: clerkId,
                email,
                username,
                avatar,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile data (e.g. username/avatar)
// @route   PATCH /api/users/me
// @access  Protected
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.auth()?.userId || req.user?._id;
        const { username, avatar } = req.body;

        const updates = {};
        if (username !== undefined) updates.username = username;
        if (avatar !== undefined) updates.avatar = avatar;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get aggregate user stats (total chats, favorites, archived)
// @route   GET /api/users/stats
// @access  Protected
export const getUserStats = async (req, res) => {
    try {
        const userId = req.auth()?.userId || req.user?._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const [totalChats, favoriteChats, archivedChats] = await Promise.all([
            Conversation.countDocuments({ user: userId }),
            Conversation.countDocuments({ user: userId, favorite: true }),
            Conversation.countDocuments({ user: userId, archived: true }),
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalChats,
                favoriteChats,
                archivedChats,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};