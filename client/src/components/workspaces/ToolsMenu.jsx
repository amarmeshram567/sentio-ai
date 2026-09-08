import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ImageIcon, BarChart3, Globe, FileSearch, PenLine } from "lucide-react";
import Logo from "../landing-pages/Logo";

const TOOLS = [
    { icon: Logo, title: "Deep Research", desc: "Search, analyze and synthesize information" },
    { icon: Terminal, title: "Code", desc: "Write, run and debug software" },
    { icon: ImageIcon, title: "Image Generation", desc: "Create original visuals from text" },
    { icon: BarChart3, title: "Data Analysis", desc: "Explore spreadsheets and datasets" },
    { icon: Globe, title: "Web Search", desc: "Pull live information from the web" },
    { icon: FileSearch, title: "File Analysis", desc: "Read and summarize documents" },
    { icon: PenLine, title: "Writing", desc: "Draft, edit and refine text" },
];

export default function ToolsMenu({ open, onClose, onSelect }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={onClose} />

                    {/* Menu Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 340, damping: 26 }}
                        className="relative z-50 w-80 bg-obsidian-900/95 backdrop-blur-2xl border border-obsidian-700/80 rounded-2xl p-2 shadow-2xl font-ui"
                    >
                        <p className="px-3 pt-2 pb-1.5 text-[10.5px] font-semibold tracking-[0.14em] text-silver-400/70 uppercase">
                            AI Tools
                        </p>

                        <div className="space-y-0.5">
                            {TOOLS.map((t) => (
                                <button
                                    key={t.title}
                                    onClick={() => {
                                        onSelect(t.title);
                                        onClose();
                                    }}
                                    className="w-full flex items-start gap-3 px-3 py-2 rounded-xl hover:bg-obsidian-800/80 hover:border-obsidian-600/50 border border-transparent transition-all duration-200 text-left group"
                                >
                                    <div className="w-8 h-8 shrink-0 rounded-lg bg-obsidian-800 border border-obsidian-700/80 group-hover:border-core-violet/40 group-hover:bg-core-violet/15 flex items-center justify-center text-silver-400 group-hover:text-core-cyan transition-all duration-200">
                                        <t.icon size={15} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-silver-200 group-hover:text-silver-200">
                                            {t.title}
                                        </p>
                                        <p className="text-[11.5px] text-silver-400 leading-snug">
                                            {t.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}