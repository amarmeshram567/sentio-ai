import { motion } from "framer-motion";

// 5 Vibrant AI Colors for Smooth Morphing
const COLOR_CYCLE = ["#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#fb7185", "#38bdf8"];

export default function ThinkingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 pb-10 rounded-full  backdrop-blur-xl shadow-lg w-fit select-none"
        >
            {/* ── 1. Dynamic Multi-Color Core Orb ── */}
            <div className="relative w-4 h-4 flex items-center justify-center">
                {/* Expanding Ring 1 */}
                <motion.span
                    className="absolute w-4 h-4 rounded-full border"
                    animate={{
                        scale: [0.7, 1.8],
                        opacity: [0.7, 0],
                        borderColor: COLOR_CYCLE,
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />

                {/* Expanding Ring 2 (Delayed) */}
                <motion.span
                    className="absolute w-4 h-4 rounded-full border"
                    animate={{
                        scale: [0.7, 1.8],
                        opacity: [0.5, 0],
                        borderColor: COLOR_CYCLE,
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.6,
                    }}
                />

                {/* Pulsing Core Particle with Matching Shadow Glow */}
                <motion.span
                    className="w-2 h-2 rounded-full"
                    animate={{
                        scale: [0.9, 1.25, 0.9],
                        backgroundColor: COLOR_CYCLE,
                        boxShadow: [
                            "0 0 10px #38bdf8",
                            "0 0 14px #818cf8",
                            "0 0 14px #c084fc",
                            "0 0 14px #f472b6",
                            "0 0 14px #fb7185",
                            "0 0 10px #38bdf8",
                        ],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* ── 2. Shimmering Multi-Color Gradient Text ── */}
            <motion.span
                className="text-[12.5px] font-medium tracking-wide bg-clip-text text-transparent bg-[length:250%_100%]"
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, #38bdf8, #818cf8, #c084fc, #f472b6, #fb7185, #38bdf8)",
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                Thinking
            </motion.span>

            {/* ── 3. Wave Bouncing Dots with Staggered Color Cycle ── */}
            <div className="flex items-center gap-1 ml-0.5">
                {[0, 0.18, 0.36].map((delay, i) => (
                    <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        animate={{
                            y: [0, -3.5, 0],
                            opacity: [0.4, 1, 0.4],
                            backgroundColor: COLOR_CYCLE,
                        }}
                        transition={{
                            y: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay,
                            },
                            opacity: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay,
                            },
                            backgroundColor: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: delay * 1.5,
                            },
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}