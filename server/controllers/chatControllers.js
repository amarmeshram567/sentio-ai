import { streamGeminiChat } from "../services/geminiService.js";

// @desc    Stream AI response using Server-Sent Events (SSE)
// @route   POST /api/chat
// @access  Public/Protected
export const streamChat = async (req, res) => {
    const { messages, model } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({
            success: false,
            error: "`messages` must be a non-empty array.",
        });
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    let isAborted = false;

    // Handle client closing connection early (e.g. user stops generation)
    req.on("close", () => {
        isAborted = true;
    });

    const send = (data) => {
        if (!isAborted && !res.writableEnded) {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    };

    try {
        await streamGeminiChat(messages, model, (text) => {
            if (isAborted) return;
            send({ text });
        });

        if (!isAborted && !res.writableEnded) {
            res.write("data: [DONE]\n\n");
            res.end();
        }
    } catch (err) {
        console.error("Gemini chat streaming error:", err.message);

        if (!res.headersSent) {
            return res.status(500).json({ success: false, error: err.message });
        }

        send({ error: err.message || "Something went wrong talking to NOVA." });
        res.end();
    }
};