import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Gauge, Brain, Zap, Compass, Feather, Code2, Sparkles } from "lucide-react";
import { MODELS, useAppContext } from "../../context/AppContext";

const ICONS = {
    "sentio-ultra": Brain,
    "sentio-pro": Gauge,
    "sentio-fast": Zap,
    reasoning: Compass,
    creative: Feather,
    code: Code2,
};

export default function ModelSelectorModal({ open, onClose }) {
    const { selectedModel, setSelectedModel, model, setModel, activeTheme } = useAppContext();

    // Use whichever state is active in context
    const currentModel = selectedModel || model || "sentio-pro";

    const handleSelectModel = (modelId) => {
        if (setSelectedModel) setSelectedModel(modelId);
        if (setModel) setModel(modelId);
        onClose();
    };

    const themeAccent = activeTheme?.accentHex || "#8b5cf6";
    const themeGlow = activeTheme?.glowColor || "rgba(139,92,246,0.35)";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-obsidian-950/80 backdrop-blur-md px-0 sm:px-4 font-ui"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 24 }}
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col bg-obsidian-900/95 border border-white/[0.08] rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
                    >
                        {/* Prismatic Top Edge Highlight */}
                        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                        {/* Mobile Drag Indicator Bar */}
                        <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-4 shrink-0" />

                        {/* Header */}
                        <div className="flex items-start justify-between mb-4 sm:mb-5 shrink-0">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Sparkles size={16} className="text-theme-accent" />
                                    <h2 className="text-[16px] sm:text-[17px] font-semibold text-white tracking-wide">
                                        Choose Intelligence
                                    </h2>
                                </div>
                                <p className="text-[12px] sm:text-[12.5px] text-silver-400/80 mt-0.5">
                                    Select the reasoning model best suited to your task.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-silver-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
                                title="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Model Grid: Scrollable on small screens */}
                        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pr-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            {MODELS.map((m) => {
                                const Icon = ICONS[m.id] || Brain;
                                const isSelected = currentModel === m.id;

                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => handleSelectModel(m.id)}
                                        style={{
                                            boxShadow: isSelected ? `0 0 20px ${themeGlow}` : "none",
                                            borderColor: isSelected ? themeAccent : undefined,
                                        }}
                                        className={`group relative text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 outline-none backdrop-blur-xl hover:scale-[1.01] active:scale-[0.99] ${isSelected
                                            ? "bg-white/[0.06]"
                                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                                            }`}
                                    >
                                        {/* Card Top Reflection */}
                                        <span
                                            className="pointer-events-none absolute inset-x-3 top-0 h-px transition-opacity duration-300"
                                            style={{
                                                background: isSelected
                                                    ? `linear-gradient(to right, transparent, ${themeAccent}, transparent)`
                                                    : "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                                            }}
                                        />

                                        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                                            <div
                                                style={{
                                                    backgroundColor: isSelected ? themeAccent : undefined,
                                                    boxShadow: isSelected ? `0 0 12px ${themeGlow}` : "none",
                                                }}
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${isSelected
                                                    ? "text-obsidian-950 font-bold"
                                                    : "bg-white/[0.04] text-silver-300 border border-white/[0.08] group-hover:text-white"
                                                    }`}
                                            >
                                                <Icon size={15} />
                                            </div>

                                            {isSelected && (
                                                <div
                                                    style={{
                                                        backgroundColor: themeAccent,
                                                        boxShadow: `0 0 8px ${themeGlow}`,
                                                    }}
                                                    className="w-5 h-5 rounded-full flex items-center justify-center"
                                                >
                                                    <Check size={12} className="text-obsidian-950 stroke-[2.5]" />
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-[13px] sm:text-[13.5px] font-semibold text-white/95 tracking-tight group-hover:text-white transition-colors">
                                            {m.name}
                                        </p>
                                        <p className="text-[11.5px] sm:text-[12px] text-theme-accent font-medium mt-0.5">
                                            {m.tagline}
                                        </p>
                                        <p className="text-[11px] sm:text-[11.5px] text-silver-400/80 leading-relaxed mt-1 line-clamp-2">
                                            {m.desc}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}