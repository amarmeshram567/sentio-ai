import { motion } from "framer-motion";
import { Command, Compass, Palette, Code2, ArrowUpRight, } from "lucide-react";
import Logo from "../landing-pages/Logo";

const CARDS = [
    {
        icon: Code2,
        title: "Build",
        desc: "Create a full-stack application",
        accentGlow: "rgba(59,130,246,0.3)",
        borderHover: "hover:border-blue-500/40",
        badge: "from-blue-500/20 to-indigo-500/10",
        iconColor: "text-blue-400",
    },
    {
        icon: Command,
        title: "Code",
        desc: "Debug and improve my code",
        accentGlow: "rgba(168,85,247,0.3)",
        borderHover: "hover:border-purple-500/40",
        badge: "from-purple-500/20 to-pink-500/10",
        iconColor: "text-purple-400",
    },
    {
        icon: Compass,
        title: "Research",
        desc: "Analyze a complex topic",
        accentGlow: "rgba(20,184,166,0.3)",
        borderHover: "hover:border-teal-500/40",
        badge: "from-teal-500/20 to-emerald-500/10",
        iconColor: "text-teal-400",
    },
    {
        icon: Palette,
        title: "Create",
        desc: "Generate ideas and content",
        accentGlow: "rgba(244,63,94,0.3)",
        borderHover: "hover:border-rose-500/40",
        badge: "from-rose-500/20 to-orange-500/10",
        iconColor: "text-rose-400",
    },
];

const MOBILE_TAGS = ["Cyberpunk +", "Space +", "Movie +", "City +"];

export default function WelcomeScreen({ onPrompt }) {
    return (
        <div className="welcome-surface relative flex-1 w-full min-h-full flex flex-col items-center justify-start overflow-y-auto select-none no-scrollbar">

            {/* Atmospheric Glow Background (Shared) */}
            <div className="welcome-atmosphere absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="welcome-orb welcome-orb-primary absolute top-[-5%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[450px] rounded-full" />
                <div className="welcome-orb welcome-orb-secondary absolute top-[15%] -left-[10%] w-[320px] sm:w-[500px] h-[260px] sm:h-[380px] rounded-full" />
                <div className="welcome-orb welcome-orb-secondary absolute top-[20%] -right-[10%] w-[300px] sm:w-[460px] h-[240px] sm:h-[350px] rounded-full" />
                <div className="welcome-vignette absolute inset-0" />
            </div>

            {/* Mobile view */}
            <div className="flex sm:hidden flex-col justify-between w-full min-h-screen p-5 pb-7 text-white z-10">

                {/* Center Hero: Floating Liquid Glass Orb with Sentio Logo & Caption */}
                <div className="flex flex-col items-center justify-center my-auto py-2">

                    {/* Hero Title & Subtitle Caption */}
                    <div className="relative flex flex-col items-center text-center pb-4 max-w-xl mx-auto select-none mb-4">
                        {/* Ambient background glow */}
                        <div
                            aria-hidden="true"
                            className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent blur-3xl pointer-events-none rounded-full"
                        />

                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-theme-gradient animate-pulse" />
                            <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase text-zinc-400">
                                Sentio Intelligence
                            </span>
                        </div>

                        {/* Headline with metallic gradient */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
                            What can I do for you today?
                        </h1>

                        {/* Subtitle with better typography and balance */}
                        <p className="mt-3 text-sm sm:text-base font-normal leading-relaxed text-zinc-400 max-w-md text-balance">
                            Ask complex questions, generate code, or brainstorm ideas with instant, expert-level AI guidance.
                        </p>
                    </div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex items-center justify-center w-60 h-60 mb-10"
                    >
                        {/* 1. Ultra-Wide Atmospheric Neon Corona */}
                        <motion.div
                            animate={{
                                scale: [1, 1.18, 1],
                                opacity: [0.45, 0.8, 0.45],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/40 via-blue-600/35 to-violet-600/30 blur-3xl pointer-events-none"
                        />

                        {/* 2. Micro Particle/Synapse Orbit Ring */}
                        <div className="absolute inset-2 rounded-full border border-cyan-400/20 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] animate-[spin_22s_linear_infinite] pointer-events-none">
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]" />
                        </div>

                        {/* 3. Deep Liquid Glass Sphere Body */}
                        <div className="relative w-48 h-48 rounded-full bg-gradient-to-b from-[#1b2b4a]/75 via-[#0c162d]/90 to-[#040814]/95 border border-cyan-200/40 backdrop-blur-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-16px_32px_rgba(2,132,199,0.55),0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(56,189,248,0.25)] flex items-center justify-center overflow-hidden">

                            {/* Curved Specular Rim Highlight */}
                            <div className="absolute top-2 inset-x-8 h-12 rounded-full bg-gradient-to-b from-white/60 via-cyan-100/20 to-transparent blur-[1.5px] pointer-events-none" />

                            {/* Secondary Inner Shadow Depth Ring */}
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_35px_rgba(3,7,18,0.9)] pointer-events-none" />

                            {/* Dynamic Light Sweep Sheen */}
                            <motion.div
                                initial={{ x: "-160%", y: "-40%" }}
                                animate={{ x: "160%", y: "40%" }}
                                transition={{
                                    duration: 3.2,
                                    repeat: Infinity,
                                    repeatDelay: 2.5,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute w-2/3 h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -skew-x-12 blur-sm"
                            />

                            {/* Bottom Ambient Up-Glow */}
                            <div className="absolute bottom-[-10px] inset-x-6 h-16 rounded-full bg-gradient-to-t from-cyan-400/40 via-indigo-500/20 to-transparent blur-md pointer-events-none" />

                            {/* 4. Sentio Prism Mark with Inner Depth Floating */}
                            <motion.div
                                animate={{ scale: [1, 1.04, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <Logo
                                    size={72}
                                    className="drop-shadow-[0_0_24px_rgba(56,189,248,0.85)] filter contrast-125"
                                />
                            </motion.div>
                        </div>

                        {/* 5. Soft Ground Contact Shadow */}
                        <motion.div
                            animate={{ scale: [1, 0.88, 1], opacity: [0.6, 0.35, 0.6] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-7 w-32 h-4 rounded-full bg-cyan-950/80 blur-md pointer-events-none"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex flex-col items-center w-full pt-16 sm:pt-20 pb-44 px-6 z-10">

                {/* Desktop Hero Emblem Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center mb-6 shrink-0 group cursor-pointer"
                >
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/30 via-indigo-600/40 to-violet-500/25 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl group-hover:opacity-100 group-hover:-inset-4"
                    />

                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05, y: -6 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative flex items-center justify-center p-3 rounded-3xl bg-slate-900/60 border border-white/[0.12] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_30px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-500 group-hover:border-cyan-400/30 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_40px_rgba(56,189,248,0.2)]"
                    >
                        <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        <motion.div
                            initial={{ x: "-150%" }}
                            animate={{ x: "150%" }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                            className="pointer-events-none absolute -inset-y-2 -inset-x-6 w-1/3 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12"
                        />
                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                            <Logo
                                size={35}
                                className="drop-shadow-[0_0_14px_rgba(56,189,248,0.45)] hover:scale-125 transition-all duration-500 group-hover:drop-shadow-[0_0_22px_rgba(56,189,248,0.85)]"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Desktop Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="text-[48px] md:text-[54px] font-semibold text-center tracking-tight mb-2.5 font-display leading-[1.12]"
                >
                    <span className="text-white">What will you </span>
                    <span className="bg-gradient-to-r from-[#4ef2bb] via-[#818cf8] to-[#f472b6] bg-clip-text text-transparent font-bold">
                        create today?
                    </span>
                </motion.h1>

                {/* Desktop Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="text-[14.5px] text-zinc-400 text-center mb-10 max-w-lg font-normal leading-relaxed"
                >
                    Think deeper. Create faster. Build something extraordinary with SENTIO Intelligence.
                </motion.p>

                {/* Desktop Action Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full max-w-3xl">
                    {CARDS.map((c, i) => (
                        <motion.button
                            key={c.title}
                            type="button"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.18 + i * 0.05 }}
                            whileHover={{ y: -3, transition: { duration: 0.18 } }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onPrompt?.(c.desc)}
                            className={`relative text-left p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl transition-all duration-300 group overflow-hidden ${c.borderHover} shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
                        >
                            <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div
                                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: c.accentGlow }}
                            />

                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.badge} border border-white/10 flex items-center justify-center ${c.iconColor} shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-200`}
                                >
                                    <c.icon size={15} />
                                </div>
                                <ArrowUpRight
                                    size={14}
                                    className="text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                                />
                            </div>

                            <p className="text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                {c.title}
                            </p>
                            <p className="text-[11.5px] text-zinc-400 mt-0.5 leading-snug line-clamp-2">
                                {c.desc}
                            </p>
                        </motion.button>
                    ))}
                </div>
            </div>

        </div>
    );
}



