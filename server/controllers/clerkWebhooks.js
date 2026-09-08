import User from "../models/User.js";

import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const rawBody = req.body && Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body || {});
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            return res.status(500).json({ success: false, message: "CLERK_WEBHOOK_SECRET is not configured." });
        }

        await whook.verify(rawBody, headers);

        const payload = JSON.parse(rawBody);
        const { data, type } = payload;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.username || "User",
                    avatar: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true, setDefaultsOnInsert: true });
                break;
            }

            case "user.updated": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.username || "User",
                    avatar: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true, setDefaultsOnInsert: true });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        return res.status(200).json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks