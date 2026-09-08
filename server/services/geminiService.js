import { GoogleGenerativeAI } from "@google/generative-ai";

// Read API key purely from environment variables
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Maps sentio's model aliases to active Gemini API models
const MODEL_MAP = {
    "sentio-ultra": "gemini-3.7-flash",
    "sentio-pro": "gemini-3.6-flash",
    "sentio-fast": "gemini-3.5-flash-lite",
    reasoning: "gemini-3.7-flash",
    creative: "gemini-3.6-flash",
    code: "gemini-3.7-flash",
};

const SYSTEM_PROMPT = `You are Sentio, a premium, sophisticated AI assistant embedded in a luxury AI workspace. Respond with clarity and depth, format with Markdown (headings, lists, tables, and fenced code blocks with a language tag) whenever it improves readability, and keep a confident, polished, and helpful tone.`;

function resolveModel(sentioModelId) {
    return MODEL_MAP[sentioModelId] || MODEL_MAP["sentio-pro"];
}

function toGeminiParts(message) {
    const parts = [];
    if (message.content) {
        parts.push({ text: message.content });
    }

    if (Array.isArray(message.attachments)) {
        for (const attachment of message.attachments) {
            if (!attachment?.data || !attachment?.mimeType?.startsWith("image/")) continue;
            parts.push({
                inlineData: {
                    mimeType: attachment.mimeType,
                    data: attachment.data,
                },
            });
        }
    }

    return parts.length ? parts : [{ text: "" }];
}

function toGeminiHistory(messages) {
    // Gemini expects alternating user/model roles; drop any leading assistant turn.
    const trimmed = [...messages];
    while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();

    return trimmed.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: toGeminiParts(m),
    }));
}

/**
 * Streams a chat response from Gemini.
 * @param {{role: string, content: string, attachments?: {mimeType: string, data: string}[]}[]} messages
 * @param {string} sentioModelId
 * @param {(chunkText: string) => void} onChunk
 */
export async function streamGeminiChat(messages, sentioModelId, onChunk) {
    if (!genAI) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
    }

    const model = genAI.getGenerativeModel({
        model: resolveModel(sentioModelId),
        systemInstruction: SYSTEM_PROMPT,
    });

    const history = toGeminiHistory(messages);
    const lastUserMessage = history.pop();

    if (!lastUserMessage) {
        throw new Error("No user message to send.");
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastUserMessage.parts);

    for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) onChunk(text);
    }
}
