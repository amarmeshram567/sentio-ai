import { motion, AnimatePresence } from "framer-motion";
import { X, FileStack, Link2, Wrench, BrainCircuit } from "lucide-react";

export default function ContextPanel({ open, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.aside
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute right-0 top-0 bottom-0 z-50 w-72 sm:w-80 bg-[#090a10]/90 backdrop-blur-2xl border-l border-white/[0.08] shadow-2xl flex flex-col font-ui"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
                        <span className="text-[11px] font-semibold tracking-wider text-silver-400/80 uppercase">
                            Context
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded-lg text-silver-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
                        <PanelRow icon={FileStack} label="Files" value="3 documents" />
                        <PanelRow icon={Link2} label="Sources" value="12 references" />
                        <PanelRow icon={Wrench} label="Tools" value="Web Search" />
                        <PanelRow icon={BrainCircuit} label="Memory" value="Enabled" active />
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

function PanelRow({ icon: Icon, label, value, active }) {
    return (
        <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Icon
                        size={14}
                        className={active ? "text-theme-accent" : "text-silver-400"}
                    />
                    <span className="text-[12.5px] font-medium text-silver-200">{label}</span>
                </div>
            </div>
            <p className={`text-[11.5px] ${active ? "text-theme-accent font-medium" : "text-silver-400/70"}`}>
                {value}
            </p>
        </div>
    );
}