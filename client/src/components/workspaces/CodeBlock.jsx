import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Maximize2, Minimize2, Download } from "lucide-react";

export default function CodeBlock({ language, value }) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const download = () => {
        const ext = language || "txt";
        const blob = new Blob([value], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `snippet.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div
            className={`my-3.5 rounded-xl overflow-hidden border border-obsidian-700 bg-obsidian-900/90 shadow-glass font-ui ${expanded ? "fixed inset-4 z-50 flex flex-col bg-obsidian-950/95 backdrop-blur-2xl border-obsidian-600" : ""
                }`}
        >
            {/* Code Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-obsidian-700/80 bg-obsidian-950/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 mr-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-obsidian-700" />
                    </div>
                    <span className="text-[11.5px] font-mono text-silver-400 uppercase tracking-wider font-medium">
                        {language || "text"}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={download}
                        className="p-1.5 rounded-lg text-silver-400 hover:text-silver-200 hover:bg-obsidian-800 transition-all duration-200"
                        title="Download snippet"
                    >
                        <Download size={13.5} />
                    </button>
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="p-1.5 rounded-lg text-silver-400 hover:text-silver-200 hover:bg-obsidian-800 transition-all duration-200"
                        title={expanded ? "Exit Fullscreen" : "Fullscreen"}
                    >
                        {expanded ? <Minimize2 size={13.5} /> : <Maximize2 size={13.5} />}
                    </button>
                    <button
                        onClick={copy}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium text-silver-400 hover:text-silver-200 hover:bg-obsidian-800 transition-all duration-200 ml-0.5 border border-transparent hover:border-obsidian-700"
                    >
                        {copied ? (
                            <>
                                <Check size={13} className="text-core-cyan drop-shadow-[0_0_6px_rgba(91,208,255,0.6)]" />
                                <span className="text-core-cyan">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={13} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Area */}
            <div className={`overflow-auto bg-obsidian-950/60 ${expanded ? "flex-1" : "max-h-[420px]"}`}>
                <SyntaxHighlighter
                    language={language || "text"}
                    style={oneDark}
                    showLineNumbers
                    customStyle={{
                        margin: 0,
                        padding: "16px",
                        background: "transparent",
                        fontSize: "12.5px",
                        lineHeight: 1.6,
                    }}
                    lineNumberStyle={{ color: "#202024", minWidth: "2.2em" }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}