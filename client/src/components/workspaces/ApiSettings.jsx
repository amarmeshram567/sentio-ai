import { useState } from "react";
import {
    KeyRound,
    Copy,
    Check,
    Eye,
    EyeOff,
    RefreshCw,
    Zap,
    Activity,
    ShieldCheck,
    Sparkles
} from "lucide-react";
import { toast } from "react-hot-toast"

export default function ApiSettings({ SettingRow }) {
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isPinging, setIsPinging] = useState(false);
    const [latency, setLatency] = useState(24);
    const [pingStatus, setPingStatus] = useState("optimal");
    const [apiKey, setApiKey] = useState("sk_live_948fbc203e48109dca8201");

    // Fun copy simulation
    const handleCopy = () => {
        navigator.clipboard?.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("API Key copied to clipboard!")
    };

    // Fun ping test simulation
    const triggerPing = () => {
        setIsPinging(true);
        setPingStatus("checking");
        setTimeout(() => {
            const simulatedLatency = Math.floor(Math.random() * (45 - 18 + 1)) + 18;
            setLatency(simulatedLatency);
            setIsPinging(false);
            setPingStatus("optimal");
        }, 600);
    };

    // Fun roll key simulation
    const handleRollKey = () => {
        const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
        setApiKey(`sk_live_${randomHex}`);
        toast.success("API Key rolled!")
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto w-full transition-all">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-white tracking-tight">API Command Deck</h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400 border border-cyan-500/20">
                            <Sparkles className="w-3 h-3 animate-pulse" /> v2.4 Live
                        </span>
                    </div>
                    <p className="text-[12.5px] text-silver-400/80 mt-1 leading-relaxed">
                        Plug your keys, measure network reflexes, and stay in orbit.
                    </p>
                </div>

                {/* Quick Speed Test Button */}
                <button
                    onClick={triggerPing}
                    disabled={isPinging}
                    className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 border border-white/10 text-xs font-medium text-silver-300 transition-all cursor-pointer select-none"
                >
                    <Activity className={`w-3.5 h-3.5 text-cyan-400 ${isPinging ? "animate-spin" : ""}`} />
                    <span>{isPinging ? "Pinging..." : "Test Pulse"}</span>
                </button>
            </div>

            {/* Secret Key Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />

                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-cyan-400">
                            <KeyRound className="w-4 h-4" />
                        </div>
                        <label className="text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                            Secret API Key
                        </label>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-medium text-emerald-400">Armed</span>
                    </div>
                </div>

                {/* Input & Action Buttons - Fully Responsive */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1 group">
                        <input
                            type={showKey ? "text" : "password"}
                            readOnly
                            value={apiKey}
                            className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-silver-200 font-mono tracking-wider focus:outline-none focus:border-cyan-500/40 select-all transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-silver-400/60 hover:text-silver-200 transition-colors p-1"
                            title={showKey ? "Hide key" : "Reveal key"}
                        >
                            {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium rounded-xl bg-white/[0.07] hover:bg-white/[0.12] active:scale-95 text-white border border-white/[0.08] transition-all cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400 font-semibold">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 text-silver-400" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleRollKey}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium rounded-xl bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-red-400 border border-red-500/20 transition-all cursor-pointer group"
                        >
                            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                            <span>Roll</span>
                        </button>
                    </div>
                </div>

                <p className="text-[11.5px] text-silver-400/60 mt-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80 flex-shrink-0" />
                    <span>Keep this strictly server-side. Never push to public git commits!</span>
                </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Latency Tile */}
                <div className="rounded-2xl border border-white/[0.07] bg-obsidian-900/40 p-3.5 backdrop-blur-xl flex flex-col justify-between">
                    <span className="text-[11.5px] text-silver-400 font-medium flex items-center justify-between">
                        Latency
                        <Zap className="w-3 h-3 text-amber-400" />
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-xl font-bold font-mono text-white transition-all">
                            {latency}
                        </span>
                        <span className="text-[11px] text-silver-400/80 font-mono">ms</span>
                    </div>
                </div>

                {/* Quota Gauge */}
                <div className="rounded-2xl border border-white/[0.07] bg-obsidian-900/40 p-3.5 backdrop-blur-xl flex flex-col justify-between">
                    <span className="text-[11.5px] text-silver-400 font-medium">Monthly Fuel</span>
                    <div className="mt-2">
                        <div className="flex justify-between text-[11px] font-mono text-silver-300 mb-1">
                            <span>84.2k</span>
                            <span className="text-silver-400/60">100k</span>
                        </div>
                        <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[84%] rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Health */}
                <div className="rounded-2xl border border-white/[0.07] bg-obsidian-900/40 p-3.5 backdrop-blur-xl flex flex-col justify-between">
                    <span className="text-[11.5px] text-silver-400 font-medium">Gateway Node</span>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                        <span className="text-xs font-semibold font-mono text-silver-200">
                            global-edge-01
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}