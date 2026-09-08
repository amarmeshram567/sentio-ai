import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        attachments: [{
            data: { type: String, required: true },
            mimeType: { type: String, required: true },
            name: { type: String },
        }],
    },
    { timestamps: true, _id: true }
);

const conversationSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: "User",
            required: false,
        },
        title: {
            type: String,
            default: "New conversation",
        },
        model: {
            type: String,
            default: "sentio-pro"
        },
        favorite: {
            type: Boolean,
            default: false
        },
        archived: {
            type: Boolean,
            default: false
        },
        messages: [messageSchema],
    },
    {
        timestamps: true
    }
);


const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation


