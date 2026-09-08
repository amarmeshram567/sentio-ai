import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Paperclip,
    Sparkles,
    Mic,
    ArrowUp,
    X,
    FileText,
    Square,
} from "lucide-react";
import ToolsMenu from "./ToolsMenu";
import { useAppContext } from "../../context/AppContext";

const MAX_IMAGE_EDGE = 1600;
const IMAGE_QUALITY = 0.82;
const MAX_ATTACHMENTS = 4;

export default function Composer({ onSend, disabled }) {
    const { sendMessage, isStreaming, stopStreaming, activeTheme } = useAppContext();

    const [value, setValue] = useState("");
    const [toolsOpen, setToolsOpen] = useState(false);
    const [activeTool, setActiveTool] = useState(null);
    const [files, setFiles] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [inputError, setInputError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [justSent, setJustSent] = useState(false);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);
    const voiceBaseRef = useRef("");

    // Fallback theme accent if activeTheme is pending hydration
    const themeAccent = activeTheme?.accentHex || activeTheme?.accent || "#8b5cf6";
    const themeGlow = activeTheme?.glowColor || "rgba(139,92,246,0.35)";

    const grow = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 200) + "px";
    };

    const submit = () => {
        if (isStreaming) {
            stopStreaming();
            return;
        }

        if ((!value.trim() && files.length === 0) || disabled) return;

        if (onSend) {
            onSend(value.trim() || "Please analyze these images.", files);
        } else {
            sendMessage(value.trim());
        }

        setJustSent(true);
        setTimeout(() => setJustSent(false), 400);

        setValue("");
        setFiles([]);
        setActiveTool(null);
        setInputError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        requestAnimationFrame(grow);
    };

    const loadImage = (file) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            const url = URL.createObjectURL(file);
            image.onload = () => {
                URL.revokeObjectURL(url);
                resolve(image);
            };
            image.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error("Could not read image."));
            };
            image.src = url;
        });

    const compressImage = async (file) => {
        const image = await loadImage(file);
        const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Image processing is not available.");
        context.drawImage(image, 0, 0, width, height);

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Could not compress image."));
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        const dataUrl = String(reader.result || "");
                        resolve({
                            data: dataUrl.split(",")[1] || "",
                            mimeType: blob.type || "image/jpeg",
                            byteSize: blob.size,
                        });
                    };
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(blob);
                },
                "image/jpeg",
                IMAGE_QUALITY
            );
        });
    };

    const handleFiles = async (fileList) => {
        if (!fileList) return;
        setInputError(null);

        const selected = Array.from(fileList);
        const imageFiles = selected.filter((file) => file.type.startsWith("image/"));
        const availableSlots = Math.max(0, MAX_ATTACHMENTS - files.length);
        const filesToAdd = imageFiles.slice(0, availableSlots);

        if (imageFiles.length !== selected.length) {
            setInputError("Only images are supported currently.");
        }
        if (imageFiles.length > availableSlots) {
            setInputError(`Up to ${MAX_ATTACHMENTS} images allowed per prompt.`);
        }

        try {
            const next = await Promise.all(
                filesToAdd.map(async (file) => {
                    const compressed = await compressImage(file);
                    return {
                        id: Math.random().toString(36).slice(2),
                        name: file.name,
                        mimeType: compressed.mimeType,
                        data: compressed.data,
                        size: (compressed.byteSize / (1024 * 1024)).toFixed(1) + " MB",
                    };
                })
            );
            setFiles((current) => [...current, ...next]);
        } catch {
            setInputError("Could not prepare that image. Try a smaller file.");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const toggleVoiceInput = () => {
        setInputError(null);
        const Recognition = window.speechRecognition || window.webkitSpeechRecognition;

        if (!Recognition) {
            setInputError("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const recognition = new Recognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = navigator.language || "en-US";
        voiceBaseRef.current = value.trim();

        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = 0; i < event.results.length; i += 1) {
                transcript += event.results[i][0]?.transcript || "";
            }
            setValue([voiceBaseRef.current, transcript.trim()].filter(Boolean).join(" "));
            requestAnimationFrame(grow);
        };
        recognition.onerror = (event) => {
            setInputError(
                event.error === "not-allowed"
                    ? "Microphone access blocked."
                    : "Speech input encountered an issue."
            );
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    };

    useEffect(() => {
        return () => recognitionRef.current?.abort();
    }, []);

    const canSend = value.trim() || files.length > 0;

    return (
        <div className="w-full">
            <div className="w-full max-w-3xl mx-auto ">
                {/* Attached Files Carousel / Stack */}
                <AnimatePresence>
                    {files.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex flex-wrap gap-2 mb-2 px-1 overflow-hidden"
                        >
                            <AnimatePresence>
                                {files.map((f) => (
                                    <motion.div
                                        key={f.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.85, y: 6 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl"
                                    >
                                        <FileText size={13} className="text-theme-accent shrink-0" />
                                        <div className="leading-tight">
                                            <p className="text-[11.5px] sm:text-[12px] text-zinc-200 truncate max-w-[100px] sm:max-w-[130px]">
                                                {f.name}
                                            </p>
                                            <p className="text-[10px] text-emerald-400">✓ {f.size}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFiles((fs) => fs.filter((x) => x.id !== f.id))}
                                            className="text-zinc-400 hover:text-white transition-colors p-0.5"
                                        >
                                            <X size={12} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Active Tool Chip */}
                <AnimatePresence>
                    {activeTool && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -4 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full border border-theme-accent/40 bg-theme-accent/10 text-[11px] sm:text-[11.5px] text-zinc-200 backdrop-blur-md shadow-theme-glow-sm"
                        >
                            <Sparkles size={11} className="text-theme-accent animate-pulse" />
                            <span>{activeTool}</span>
                            <button
                                type="button"
                                onClick={() => setActiveTool(null)}
                                className="text-zinc-400 hover:text-white transition-colors ml-0.5"
                            >
                                <X size={11} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Composer Box */}
                <div className="relative group/composer">
                    {/* 1. Ambient Halo */}
                    <motion.div
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            opacity: isFocused ? 0.85 : 0.25,
                            scale: isFocused ? 1.01 : 1,
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            backgroundSize: "250% 250%",
                            backgroundImage: `linear-gradient(90deg, ${themeAccent}, #38bdf8, ${themeAccent}, #818cf8)`,
                            boxShadow: isFocused ? `0 0 30px ${themeGlow}` : "none",
                        }}
                        className="absolute -inset-1 rounded-[22px] blur-lg pointer-events-none -z-10 transition-all duration-300"
                    />

                    {/* 2. Flowing Perimeter Border */}
                    <motion.div
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            backgroundSize: "250% 250%",
                            backgroundImage: `linear-gradient(90deg, ${themeAccent}, rgba(255,255,255,0.25), ${themeAccent})`,
                        }}
                        className="relative rounded-2xl p-[1px] transition-all"
                    >
                        {/* Popups go here so they are not clipped */}
                        <div className="absolute bottom-full mb-3 left-2 z-50">
                            <ToolsMenu
                                open={toolsOpen}
                                onClose={() => setToolsOpen(false)}
                                onSelect={setActiveTool}
                            />
                        </div>

                        {/* 3. Frosted Glass Interior */}
                        <div className="relative w-full rounded-[15px] bg-obsidian-950/40 backdrop-blur-2xl border border-white/[0.05] overflow-hidden">
                            {/* Sent Flash Reflection */}
                            <AnimatePresence>
                                {justSent && (
                                    <motion.div
                                        initial={{ opacity: 0.6 }}
                                        animate={{ opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                        style={{ background: themeGlow }}
                                        className="absolute inset-0 pointer-events-none z-20"
                                    />
                                )}
                            </AnimatePresence>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFiles(e.target.files)}
                            />

                            {/* Prompt Input Textarea */}
                            <textarea
                                ref={textareaRef}
                                value={value}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    grow();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        submit();
                                    }
                                }}
                                rows={1}
                                placeholder="Ask anything..."
                                className="relative w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none px-3.5 sm:px-5 pt-3.5 sm:pt-4 pb-2 text-[13.5px] sm:text-[14.5px] text-zinc-100 placeholder:text-zinc-500/80 max-h-[200px] leading-relaxed selection:bg-theme-accent/20"
                            />

                            {/* Bottom Controls Bar */}
                            <div className="relative flex items-center justify-between px-2.5 sm:px-3.5 pb-2.5 sm:pb-3 pt-1 border-t border-white/[0.04] bg-transparent">
                                <div className="flex items-center gap-1 sm:gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                                        title="Attach photos"
                                    >
                                        <Paperclip size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setToolsOpen((v) => !v)}
                                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11.5px] sm:text-[12px] font-medium transition-all ${toolsOpen
                                            ? "text-white bg-white/[0.08]"
                                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                                            }`}
                                    >
                                        <Sparkles size={13} className="text-theme-accent" />
                                        <span>Tools</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={toggleVoiceInput}
                                        disabled={disabled}
                                        className={`relative p-2 rounded-xl transition-colors ${isListening
                                            ? "text-red-400 bg-red-500/10"
                                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                                            }`}
                                        title={isListening ? "Stop listening" : "Voice input"}
                                    >
                                        {isListening && (
                                            <motion.span
                                                className="absolute inset-0 rounded-xl bg-red-500/20"
                                                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                                            />
                                        )}
                                        <Mic size={15} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="hidden sm:inline text-[10.5px] text-zinc-500 font-mono select-none">
                                        {isStreaming ? "Thinking..." : "⏎ to send"}
                                    </span>

                                    {/* Action Send / Stop Button */}
                                    <motion.button
                                        type="button"
                                        onClick={submit}
                                        disabled={(!canSend && !isStreaming) || (disabled && !isStreaming)}
                                        whileHover={canSend || isStreaming ? { scale: 1.05 } : {}}
                                        whileTap={canSend || isStreaming ? { scale: 0.92 } : {}}
                                        style={{
                                            backgroundColor: isStreaming
                                                ? undefined
                                                : canSend && !disabled
                                                    ? themeAccent
                                                    : undefined,
                                            boxShadow:
                                                canSend && !disabled && !isStreaming
                                                    ? `0 0 16px ${themeGlow}`
                                                    : undefined,
                                        }}
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isStreaming
                                            ? "bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                                            : canSend && !disabled
                                                ? "text-obsidian-950 font-bold"
                                                : "bg-white/[0.05] text-zinc-600 cursor-not-allowed border border-white/[0.04]"
                                            }`}
                                        title={isStreaming ? "Stop generation" : "Send message"}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {isStreaming ? (
                                                <motion.span
                                                    key="stop"
                                                    initial={{ scale: 0, rotate: -90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 90 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    <Square size={11} className="fill-current" />
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="send"
                                                    initial={{ scale: 0, rotate: 90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, y: -6, opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    <ArrowUp size={15} strokeWidth={2.6} />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {inputError && (
                        <motion.p
                            initial={{ opacity: 0, y: -4, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-center text-[11px] text-red-400 mt-2 bg-red-500/10 border border-red-500/20 py-1 px-3 rounded-lg w-fit mx-auto"
                        >
                            {inputError}
                        </motion.p>
                    )}
                </AnimatePresence>

                <p className="text-center text-[10px] sm:text-[10.5px] text-zinc-500 mt-2 tracking-tight select-none">
                    SENTIO can make mistakes. Verify critical facts.
                </p>
            </div>
        </div>
    );
}