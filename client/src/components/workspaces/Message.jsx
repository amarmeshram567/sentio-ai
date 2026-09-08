import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Copy, RotateCcw, MoreHorizontal, Pencil, Check, Download, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";
import { useAppContext } from "../../context/AppContext";
import "katex/dist/katex.min.css";
import Logo from "../landing-pages/Logo";
import ThinkingIndicator from "./ThinkingIndicator";

// Framer Motion Variants for Message Bubble Animations
const userBubbleVariants = {
    initial: { opacity: 0, x: 28, scale: 0.97 },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
};

const assistantBubbleVariants = {
    initial: { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

const blockVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut", delay },
    }),
};

const attachmentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut", delay },
    }),
};


// Disable animations while streaming to achieve smooth, 60fps text updates
function useAnimatedBlock(blockIndexRef, isStreaming) {
    return function AnimatedBlock({ as: Tag = "div", className, children, ...rest }) {
        // If actively streaming, skip framer-motion entirely and render plain HTML
        if (isStreaming) {
            return (
                <Tag className={className} {...rest}>
                    {children}
                </Tag>
            );
        }

        const i = blockIndexRef.current++;
        const delay = Math.min(i * 0.045, 0.45);
        return (
            <motion.div
                as={Tag}
                custom={delay}
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                className={className}
                style={{ display: Tag === "li" ? "list-item" : undefined }}
                {...rest}
            >
                {children}
            </motion.div>
        );
    };
}


function MarkdownImage({ src, alt, ...props }) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async (e) => {
        e.stopPropagation();
        if (!src || downloading) return;

        try {
            setDownloading(true);

            if (src.startsWith("data:")) {
                const link = document.createElement("a");
                link.href = src;
                link.download = `ai-generated-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            const res = await fetch(src);
            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `ai-generated-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error("Failed to download image:", err);
            window.open(src, "_blank", "noopener,noreferrer");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="w-full flex justify-center my-4">
            <div className="relative group/img inline-block max-w-lg w-full rounded-2xl overflow-hidden border border-obsidian-700 bg-obsidian-900/60 shadow-glass">
                <motion.img
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    src={src}
                    alt={alt || "Generated visual"}
                    className="w-full h-auto max-h-[500px] object-cover block rounded-2xl"
                    {...props}
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-obsidian-950/80 backdrop-blur-md border border-white/10 p-1.5 rounded-xl shadow-lg">
                    <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        title="Open full size"
                        className="p-1.5 text-silver-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ExternalLink size={13} />
                    </a>

                    <button
                        type="button"
                        onClick={handleDownload}
                        title="Download image"
                        disabled={downloading}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                        <Download size={13} className={downloading ? "animate-bounce" : ""} />
                        <span>{downloading ? "Saving..." : "Save"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MessageBubble({ message, onRegenerate, isLast }) {
    const { isStreaming } = useAppContext();
    const [copied, setCopied] = useState(false);
    const blockIndexRef = useRef(0);
    const bottomRef = useRef(null);
    const scrollRef = useRef(null);
    const prevConvoRef = useRef(null);
    const { activeConversationId, currentMessages, thinking } = useAppContext();


    const isUser = message?.role === "user";
    const content = message?.content || "";
    const isMessageStreaming = !isUser && isLast && isStreaming;

    // Pass isMessageStreaming into the hook
    const AnimatedBlock = useAnimatedBlock(blockIndexRef, isMessageStreaming);
    blockIndexRef.current = 0;

    const copy = async () => {
        if (!content) return;
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
    };

    if (isStreaming || thinking) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }


    useEffect(() => {
        if (!scrollRef.current) return;

        if (prevConvoRef.current !== activeConversationId) {
            prevConvoRef.current = activeConversationId;
            scrollRef.current.scrollTop = 0;
            return;
        }

        if (isStreaming || thinking) {
            // Direct scrollTop is hardware accelerated and never stutters
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentMessages, isStreaming, thinking, activeConversationId]);

    return (
        <motion.div
            variants={isUser ? userBubbleVariants : assistantBubbleVariants}
            initial="initial"
            animate="animate"
            className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-4 font-ui`}
        >
            <div className={`flex items-start gap-3 w-full ${isUser ? "justify-end" : "justify-start"}`}>

                {/* 1. Assistant Logo Avatar placed neatly beside the AI response */}
                {!isUser && content && (
                    <div className="shrink-0 mt-1 select-none">
                        <div className="w-6 h-6 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                            <Logo className="w-5 h-5 object-contain" />
                        </div>
                    </div>
                )}

                {/* 2. Chat Bubble Content */}
                <div className={isUser ? "max-w-[85%] sm:max-w-[75%]" : "flex-1 min-w-0"}>
                    <div
                        className={
                            isUser
                                ? "px-4 py-2.5 rounded-2xl bg-obsidian-800/90 border border-obsidian-700 text-[14px] leading-relaxed text-silver-200 inline-block shadow-glass"
                                : "text-[14.5px] leading-relaxed text-silver-200 w-full"
                        }
                    >
                        {isUser ? (
                            <>
                                {message?.attachments?.length ? (
                                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                                        {message.attachments.map((attachment, i) => (
                                            <motion.img
                                                key={attachment.id}
                                                custom={i * 0.06}
                                                variants={attachmentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                src={`data:${attachment.mimeType};base64,${attachment.data}`}
                                                alt={attachment.name}
                                                className="max-h-44 w-full rounded-xl object-cover border border-obsidian-700"
                                            />
                                        ))}
                                    </div>
                                ) : null}
                                <p className="whitespace-pre-wrap">{content}</p>
                            </>
                        ) : (
                            <AnimatePresence mode="wait">
                                {isMessageStreaming && !content ? (
                                    <ThinkingIndicator key="thinking" />
                                ) : (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="markdown-body text-silver-200"
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm, remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                            components={{
                                                h1: (p) => (
                                                    <AnimatedBlock as="h1" className="text-[20px] font-semibold mt-5 mb-2 text-silver-200" {...p} />
                                                ),
                                                h2: (p) => (
                                                    <AnimatedBlock as="h2" className="text-[17px] font-semibold mt-4 mb-2 text-silver-200" {...p} />
                                                ),
                                                h3: (p) => (
                                                    <AnimatedBlock as="h3" className="text-[15px] font-semibold mt-3 mb-1.5 text-silver-200" {...p} />
                                                ),
                                                p: (p) => (
                                                    <AnimatedBlock as="p" className="mb-3 text-silver-300 leading-relaxed" {...p} />
                                                ),
                                                ul: (p) => <ul className="list-disc pl-5 mb-3 space-y-1.5 marker:text-core-cyan" {...p} />,
                                                ol: (p) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 marker:text-core-cyan" {...p} />,
                                                li: (p) => <AnimatedBlock as="li" className="text-silver-300" {...p} />,
                                                a: (p) => (
                                                    <a
                                                        className="text-core-cyan underline underline-offset-2 hover:text-core-blue transition-colors"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        {...p}
                                                    />
                                                ),
                                                blockquote: (p) => (
                                                    <AnimatedBlock
                                                        as="blockquote"
                                                        className="border-l-2 border-core-violet pl-3.5 my-3 text-silver-400 italic bg-obsidian-900/40 py-1 rounded-r-lg"
                                                        {...p}
                                                    />
                                                ),
                                                hr: () => <hr className="my-4 border-obsidian-700" />,
                                                table: (p) => (
                                                    <AnimatedBlock
                                                        as="div"
                                                        className="overflow-x-auto my-3 rounded-xl border border-obsidian-700 bg-obsidian-900/40 shadow-sm"
                                                    >
                                                        <table className="w-full text-[13px]" {...p} />
                                                    </AnimatedBlock>
                                                ),
                                                thead: (p) => <thead className="bg-obsidian-800/80 border-b border-obsidian-700" {...p} />,
                                                th: (p) => (
                                                    <th className="text-left px-3.5 py-2 font-medium text-silver-200" {...p} />
                                                ),
                                                td: (p) => <td className="px-3.5 py-2 border-b border-obsidian-700/60 text-silver-400" {...p} />,
                                                img: (props) => <MarkdownImage {...props} />,
                                                pre: ({ children }) => <>{children}</>,
                                                code(props) {
                                                    const { inline, className, children, node } = props;
                                                    const isInline = inline || node?.type === "inlineCode";
                                                    const match = /language-(\w+)/.exec(className || "");
                                                    if (isInline) {
                                                        return (
                                                            <code className="px-1.5 py-0.5 rounded-md bg-obsidian-800 border border-obsidian-700 text-core-cyan font-mono text-[12.5px]">
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                    return (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                                        >
                                                            <CodeBlock
                                                                language={match?.[1] || ""}
                                                                value={String(children).replace(/\n$/, "")}
                                                            />
                                                        </motion.div>
                                                    );
                                                },
                                            }}
                                        >
                                            {/* Appending inline cursor during streaming so it doesn't break to a new line */}
                                            {isMessageStreaming ? `${content} ▍` : content}
                                        </ReactMarkdown>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Assistant Actions Bar */}
                    {!isUser && content && !isMessageStreaming && (
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ActionBtn icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy"} onClick={copy} active={copied} />
                            {onRegenerate && <ActionBtn icon={RotateCcw} label="Regenerate" onClick={onRegenerate} />}
                            <ActionBtn icon={MoreHorizontal} label="More" />
                        </div>
                    )}

                    {/* User Actions Bar */}
                    {isUser && (
                        <div className="flex justify-end items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ActionBtn icon={Pencil} label="Edit" />
                            <ActionBtn icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy"} onClick={copy} active={copied} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ActionBtn({ icon: Icon, label, onClick, active }) {
    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11.5px] transition-all duration-200 ${active
                ? "text-core-cyan bg-obsidian-800 border border-obsidian-700"
                : "text-silver-400 hover:text-silver-200 hover:bg-obsidian-800/80 hover:border-obsidian-700 border border-transparent"
                }`}
        >
            <Icon size={12} className={active ? "text-core-cyan" : ""} />
            <span>{label}</span>
        </motion.button>
    );
}