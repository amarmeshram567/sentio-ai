import { useEffect, useRef, useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
// import {
//     Settings as SettingsIcon,
//     Palette,
//     Cpu,
//     User,
//     BrainCircuit,
//     Bell,
//     Shield,
//     Lock,
//     Code,
//     CreditCard,
//     Plug,
//     ArrowLeft,
//     Check,
//     LogOut,
//     Camera,
//     Trash2,
//     ShieldCheck,
//     Mail,
//     HelpCircle,
//     MessageCircle,
//     BookOpen,
//     ExternalLink,
//     LifeBuoy,
//     Loader2,
//     ChevronDown,
// } from "lucide-react";


import {
    Settings as SettingsIcon,
    Palette,
    Cpu,
    User,
    BrainCircuit,
    Bell,
    Shield,
    Lock,
    Code,
    CreditCard,
    Plug,
    ArrowLeft,
    Check,
    LogOut,
    Camera,
    Trash2,
    ShieldCheck,
    Mail,
    HelpCircle,
    MessageCircle,
    BookOpen,
    ExternalLink,
    LifeBuoy,
    Loader2,
    ChevronDown,
    Smartphone,
    Flame,
    Download,
    Key,
    Fingerprint,
    Laptop,
    Sparkles,
    Receipt,
    RefreshCw,
    Database,
} from "lucide-react";
import { THEMES, useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import ApiSettings from "./ApiSettings";

const SECTIONS = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "account", label: "Account", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "models", label: "AI Models", icon: Cpu },
    { id: "personalization", label: "Personalization", icon: User },
    { id: "memory", label: "Memory", icon: BrainCircuit },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "api", label: "API", icon: Code },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "help", label: "Help & Support", icon: HelpCircle },
];


const FAQS = [
    {
        q: "How do I switch between AI models?",
        a: "Go to Settings → AI Models and pick a default model from the dropdown. You can also switch per-conversation from the composer's tools menu.",
    },
    {
        q: "Where is my data stored?",
        a: "Your conversations and account details are stored securely and are only accessible from your signed-in account.",
    },
    {
        q: "How do I delete my account?",
        a: "Reach out via Contact Support below and we'll guide you through permanently deleting your account and data.",
    },
    {
        q: "Can I use SENTIO on multiple devices?",
        a: "Yes — sign in with the same account on any device and your conversations stay in sync.",
    },
];

export default function SettingsView({ onClose, initialSection = "general" }) {
    const [active, setActive] = useState(initialSection);
    const [openFaq, setOpenFaq] = useState(null);

    const { user: clerkUser } = useUser();
    const { selectedModel, setSelectedModel, userStats, theme, setTheme } = useAppContext();

    const fileInputRef = useRef(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null);

    const [integrations, setIntegrations] = useState([
        { id: "github", name: "GitHub", desc: "Automate repo deployments and trigger webhook pipelines", connected: true },
        { id: "slack", name: "Slack", desc: "Stream bot notifications and chat transcripts into channels", connected: true },
        { id: "discord", name: "Discord", desc: "Community bot integration and workspace activity hooks", connected: false },
    ]);


    const [notifications, setNotifications] = useState([
        { id: "email", name: "Email Digests", desc: "Weekly workspace summary and quota warnings", enabled: true, icon: Mail },
        { id: "push", name: "Browser Push Alerts", desc: "Real-time task completion and execution alerts", enabled: false, icon: Smartphone },
        { id: "security_alerts", name: "Security Radar", desc: "Immediate dispatches on new logins or revoked keys", enabled: true, icon: Flame },
    ]);

    const [privacyOptions, setPrivacyOptions] = useState([
        { id: "telemetry", name: "Diagnostic Telemetry", desc: "Share anonymized crash data to improve model inference", enabled: false, icon: ShieldCheck },
        { id: "export", name: "Export Workspace Archive", desc: "Download all prompt histories and session records as JSON", action: "Download", icon: Download },
        { id: "purge", name: "Erase Cloud History", desc: "Permanently flush stored context memory across edge nodes", action: "Purge", danger: true, icon: Trash2 },
    ]);

    const [securityItems, setSecurityItems] = useState([
        { id: "2fa", name: "Two-Factor Auth (2FA)", desc: "Require authenticator app verification on sign-in", enabled: true, icon: Key },
        { id: "passkeys", name: "Passkeys / WebAuthn", desc: "Authenticate via Touch ID, Windows Hello, or YubiKey", enabled: false, icon: Fingerprint },
        { id: "session", name: "Active Session (macOS)", desc: "Current authorized device • Pune, IN", activeSession: true, action: "Revoke", icon: Laptop },
    ]);

    const [billingItems, setBillingItems] = useState([
        {
            id: "tier",
            name: "Free Community Tier",
            desc: "$0/mo • Free forever with standard inference limits",
            current: true,
            action: "Upgrade",
            icon: Sparkles
        },
        {
            id: "payment",
            name: "Payment Method",
            desc: "No card on file • Not required for free tier",
            current: false,
            action: "Add Card",
            icon: CreditCard
        },
        {
            id: "invoices",
            name: "Invoices & Receipts",
            desc: "No billing history available on free tier",
            current: false,
            action: "View",
            icon: Receipt
        },
    ]);
    const [memoryItems, setMemoryItems] = useState([
        { id: "adaptive", name: "Adaptive Context Recall", desc: "Allow the model to reference past project conversations", enabled: true, icon: BrainCircuit },
        { id: "codebase", name: "Codebase Indexing", desc: "Cache workspace file structures for instant file lookup", enabled: true, icon: Database },
        { id: "flush_mem", name: "Flush Vector Memory", desc: "Clear long-term embeddings without deleting chat history", action: "Clear", icon: RefreshCw },
    ]);


    const toggleItem = (setter, id) => {
        setter((prev) =>
            prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
        );
    };

    const toggleIntegration = (id) => {
        setIntegrations((prev) =>
            prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
        );
    };


    useEffect(() => {
        setActive(initialSection);
    }, [initialSection]);

    useEffect(() => {
        if (clerkUser) {
            setFirstName(clerkUser.firstName || "");
            setLastName(clerkUser.lastName || "");
        }
    }, [clerkUser]);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (!clerkUser) return;
        setIsSaving(true);

        try {
            await clerkUser.update({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error(err.errors?.[0]?.message || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !clerkUser) return;

        setStatusMsg(null);
        try {
            await clerkUser.setProfileImage({ file });
            toast.success("Avatar updated!");
        } catch (err) {
            toast.error(err.errors?.[0]?.message || "Could not upload image.");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveAvatar = async () => {
        if (!clerkUser) return;
        setStatusMsg(null);

        try {
            await clerkUser.setProfileImage({ file: null });
            toast.success("Avatar removed!");
        } catch (err) {
            toast.error(err.errors?.[0]?.message || "Could not remove avatar.");
        }
    };


    return (
        <div className="flex-1 flex flex-col h-full bg-obsidian-950 font-ui text-silver-200">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 md:px-6 py-3.5 md:py-4 border-b border-white/[0.06] bg-obsidian-950/90 backdrop-blur-xl shrink-0">
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-silver-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                    title="Back"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="text-[15px] font-semibold tracking-wide text-white">Settings</h1>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-obsidian-950/80 backdrop-blur-2xl">
                {/* Responsive Navigation Rail */}
                <div className="w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] bg-obsidian-900/40 p-2 md:p-3.5 flex md:flex-col overflow-x-auto md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-1.5 md:gap-1">
                    <p className="hidden md:block px-2.5 mb-2 text-[10.5px] font-semibold tracking-[0.14em] text-silver-400/60 uppercase select-none">
                        Preferences
                    </p>

                    {SECTIONS.map((s) => {
                        const isActive = active === s.id;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setActive(s.id)}
                                className={`group relative flex items-center gap-2.5 px-3.5 py-2 md:py-2.5 rounded-xl text-[12.5px] md:text-[13px] font-medium tracking-wide transition-all duration-200 shrink-0 select-none outline-none ${isActive
                                    ? "bg-white/[0.08] text-white border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                                    : "text-silver-400 border border-transparent hover:text-silver-200 hover:bg-white/[0.03]"
                                    }`}
                            >
                                {isActive && (
                                    <>
                                        <span className="hidden md:block absolute left-1 inset-y-2 w-1 rounded-full bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.8)]" />
                                        <span className="md:hidden absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.8)]" />
                                    </>
                                )}

                                <s.icon
                                    size={15}
                                    className={`transition-colors duration-200 ${isActive ? "text-white" : "text-silver-400/70 group-hover:text-silver-300"
                                        }`}
                                />
                                <span className="truncate">{s.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Pane */}
                <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 max-w-3xl">
                    {/* GENERAL */}
                    {active === "general" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">General</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5">Workspace defaults and session insights.</p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 md:p-5 backdrop-blur-xl divide-y divide-white/[0.04]">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <SettingRow label="Language" value="English (US)" />
                                <SettingRow label="Startup view" value="New conversation" />
                                <SettingRow label="Send message with" value="Enter" />
                                <SettingRow label="Total Conversations" value={String(userStats?.totalChats || 0)} />
                            </div>
                        </div>
                    )}

                    {/* ACCOUNT */}
                    {active === "account" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Account</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5">Manage your avatar, identity credentials, and browser session.</p>
                            </div>

                            {statusMsg && (
                                <div
                                    className={`rounded-xl border px-3.5 py-2.5 text-[12px] font-medium backdrop-blur-md transition-all ${statusMsg.type === "success"
                                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                        : "border-red-500/30 bg-red-500/10 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                        }`}
                                >
                                    {statusMsg.text}
                                </div>
                            )}

                            {/* Avatar Section */}
                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-5 backdrop-blur-xl">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver-400/70 mb-4">
                                    Profile Picture
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-5">
                                    <div className="relative group shrink-0">
                                        <div className="h-20 w-20 rounded-2xl overflow-hidden border border-white/[0.12] bg-obsidian-800 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                                            <img
                                                src={clerkUser?.imageUrl}
                                                alt="Profile Avatar"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white"
                                            title="Upload photo"
                                        >
                                            <Camera size={20} />
                                        </button>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />

                                    <div className="flex flex-col gap-2.5 items-center sm:items-start text-center sm:text-left">
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_0_15px_rgba(148,163,184,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.2] active:scale-[0.98]"
                                            >
                                                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />
                                                <span>Change Photo</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl border border-red-500/20 bg-red-500/[0.04] px-3 py-1.5 text-[12px] font-medium text-red-300/80 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200 active:scale-[0.98]"
                                            >
                                                <Trash2 size={13} className="transition-transform duration-300 group-hover:scale-110 text-red-400" />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-silver-500/80">JPG, PNG, or WebP up to 5MB.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Name Details */}
                            <form onSubmit={handleUpdateName} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-5 backdrop-blur-xl space-y-4">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver-400/70">
                                    Personal Details
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="group flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold tracking-wider uppercase text-silver-400 group-focus-within:text-slate-200 transition-colors duration-200">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-slate-700/0 via-gray-500/0 to-slate-600/0 opacity-0 blur-md transition-all duration-500 group-focus-within:from-slate-700/30 group-focus-within:via-gray-500/20 group-focus-within:to-slate-600/30 group-focus-within:opacity-100" />
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="e.g. Alex"
                                                className="relative w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white placeholder-silver-500/40 backdrop-blur-xl transition-all duration-300 outline-none hover:border-slate-500/30 focus:border-slate-400/60 focus:bg-slate-900/40 focus:shadow-[0_0_18px_rgba(148,163,184,0.15)]"
                                            />
                                        </div>
                                    </div>

                                    <div className="group flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold tracking-wider uppercase text-silver-400 group-focus-within:text-slate-200 transition-colors duration-200">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-r from-slate-700/0 via-gray-500/0 to-slate-600/0 opacity-0 blur-md transition-all duration-500 group-focus-within:from-slate-700/30 group-focus-within:via-gray-500/20 group-focus-within:to-slate-600/30 group-focus-within:opacity-100" />
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="e.g. Morgan"
                                                className="relative w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-white placeholder-silver-500/40 backdrop-blur-xl transition-all duration-300 outline-none hover:border-slate-500/30 focus:border-slate-400/60 focus:bg-slate-900/40 focus:shadow-[0_0_18px_rgba(148,163,184,0.15)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-black/30 via-slate-800 to-slate-600 px-5 py-2.5 text-xs font-semibold tracking-wide text-white border border-white/10 shadow-[0_0_20px_rgba(148,163,184,0.15)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(148,163,184,0.25)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
                                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={13} className="animate-spin" />
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Check size={14} className="transition-transform group-hover:scale-110" />
                                                <span>Save Changes</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Security Info */}
                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-5 backdrop-blur-xl space-y-4">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver-400/70">
                                    Login & Security
                                </p>

                                <div className="space-y-1 divide-y divide-white/[0.04]">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 gap-2.5">
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-silver-300">
                                                <Mail size={15} />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium text-white/90">Email Address</p>
                                                <p className="text-[11.5px] tracking-wide text-silver-400 font-mono break-all">
                                                    {clerkUser?.primaryEmailAddress?.emailAddress || "Not linked"}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-medium tracking-wide text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                            Verified
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 pb-1">
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-silver-300">
                                                <ShieldCheck size={15} className="text-emerald-400/90" />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium text-white/90">Authentication</p>
                                                <p className="text-[11.5px] text-silver-400/80">Managed via Clerk Secure Auth</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-silver-400">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sign Out Container */}
                            <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-950/20 via-obsidian-950/40 to-transparent p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-red-300/30 to-transparent" />
                                <div>
                                    <p className="text-[13.5px] font-medium tracking-tight text-silver-200">Session & Sign Out</p>
                                    <p className="text-[11.5px] text-silver-400/80 mt-0.5">Sign out of your account on this browser session.</p>
                                </div>

                                <SignOutButton redirectUrl="/">
                                    <button
                                        type="button"
                                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-b from-red-500/15 to-red-950/40 px-4 py-2 text-[12.5px] font-medium tracking-wide text-red-200/90 shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-red-500/50 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] active:scale-[0.98] shrink-0"
                                    >
                                        <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-red-300/40 to-transparent" />
                                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                                        <LogOut size={13.5} className="text-red-400 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-red-300" />
                                        <span>Sign Out</span>
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    )}

                    {active === "appearance" && (
                        <div className="space-y-6 px-1 sm:px-0 select-none">
                            {/* Section Header with Active Theme Preview Pill */}
                            {(() => {
                                const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
                                return (
                                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                                        <div>
                                            <h2 className="text-[17px] font-semibold text-white tracking-tight">Appearance</h2>
                                            <p className="text-[12px] text-zinc-400 mt-0.5">
                                                Select your ambient aura & theme
                                            </p>
                                        </div>

                                        {/* Active Theme Chip */}
                                        <div
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-inner"
                                            style={{ borderColor: activeTheme.accent }}
                                        >
                                            <span
                                                className="w-2.5 h-2.5 rounded-full animate-pulse"
                                                style={{
                                                    backgroundColor: activeTheme.accent,
                                                    boxShadow: `0 0 10px ${activeTheme.accent}`,
                                                }}
                                            />
                                            <span className="text-[12px] font-medium text-zinc-200">
                                                {activeTheme.name.split(" ")[0]}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Theme Grid Mobile */}
                            <div className="sm:hidden">
                                <div className="grid grid-cols-4 gap-y-5 gap-x-3">
                                    {THEMES.map((t) => {
                                        const isSelected = theme === t.id;

                                        return (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() => setTheme(t.id)}
                                                className="group flex flex-col items-center gap-2 outline-none"
                                            >
                                                <div
                                                    className={`relative flex items-center justify-center w-[64px] h-[64px] rounded-full transition-all duration-300 active:scale-90 ${isSelected ? "scale-105" : "hover:scale-95"
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <div
                                                            className="absolute -inset-2 rounded-full blur-md opacity-80 animate-pulse"
                                                            style={{ background: t.glowColor }}
                                                        />
                                                    )}

                                                    <div
                                                        className="relative w-full h-full rounded-full overflow-hidden border p-[2px] shadow-lg flex items-center justify-center transition-all duration-300"
                                                        style={{
                                                            borderColor: isSelected ? t.accent : "rgba(255, 255, 255, 0.12)",
                                                            background: t.previewGradient,
                                                            boxShadow: isSelected
                                                                ? `0 0 20px ${t.glowColor}, inset 0 2px 4px rgba(255,255,255,0.6)`
                                                                : "inset 0 1px 2px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.5)",
                                                        }}
                                                    >
                                                        <div className="absolute top-1 inset-x-2.5 h-4 rounded-full bg-gradient-to-b from-white/60 via-white/10 to-transparent blur-[0.5px] pointer-events-none" />

                                                        {isSelected ? (
                                                            <div className="z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                                                                <Check size={13} className="text-white stroke-[3]" />
                                                            </div>
                                                        ) : (
                                                            <span
                                                                className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm opacity-80 group-hover:scale-125 transition-transform"
                                                                style={{ backgroundColor: t.accent }}
                                                            />
                                                        )}

                                                        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                                    </div>
                                                </div>

                                                <span
                                                    className={`text-[11px] text-center tracking-tight truncate max-w-[68px] transition-colors leading-tight ${isSelected
                                                        ? "font-semibold text-white"
                                                        : "font-normal text-zinc-400 group-hover:text-zinc-200"
                                                        }`}
                                                >
                                                    {t.name.split(" ")[0]}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* =========================================================
        DESKTOP ONLY: High-End Interactive Studio Cards
       ========================================================= */}
                            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {THEMES.map((t) => {
                                    const isSelected = theme === t.id;

                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => setTheme(t.id)}
                                            style={{
                                                borderColor: isSelected ? t.accent : undefined,
                                            }}
                                            className={`group relative flex flex-col p-4 rounded-2xl border text-left transition-all duration-300 backdrop-blur-2xl outline-none hover:-translate-y-1 active:scale-[0.98] overflow-hidden ${isSelected
                                                ? "bg-zinc-950/90 shadow-2xl ring-1"
                                                : "border-white/[0.08] bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-white/20 shadow-md"
                                                }`}
                                        >
                                            {/* Ambient Background Aura Glow on Hover/Active */}
                                            <div
                                                className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${isSelected ? "opacity-35" : "opacity-0 group-hover:opacity-20"
                                                    }`}
                                                style={{ background: t.glowColor || t.accent }}
                                            />

                                            {/* Specular Top Light Reflection */}
                                            <span
                                                className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                                                style={{
                                                    background: isSelected
                                                        ? `linear-gradient(90deg, transparent, ${t.accent}, transparent)`
                                                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                                                }}
                                            />

                                            {/* Simulated UI Window Preview Canvas */}
                                            <div
                                                className="relative w-full h-24 rounded-xl mb-3.5 overflow-hidden border border-white/10 shadow-inner flex flex-col justify-between p-2.5 transition-transform duration-300 group-hover:scale-[1.01]"
                                                style={{ background: t.previewGradient }}
                                            >
                                                {/* Top Convex Sheen */}
                                                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

                                                {/* Window Controls & Accent Dots */}
                                                <div className="flex items-center justify-between w-full z-10">
                                                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                                                        <span
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: t.accent, boxShadow: `0 0 6px ${t.accent}` }}
                                                        />
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full opacity-70"
                                                            style={{ backgroundColor: t.secondaryAccent || t.accent }}
                                                        />
                                                    </div>

                                                    <span className="text-[10px] font-mono tracking-wider text-white/80 font-semibold uppercase bg-black/35 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                                                        {t.id.split("-")[0]}
                                                    </span>
                                                </div>

                                                {/* Wireframe Mock UI Lines */}
                                                <div className="space-y-1.5 z-10 w-full">
                                                    <div className="h-1.5 w-1/2 rounded-full bg-white/40 backdrop-blur-sm" />
                                                    <div className="flex items-center gap-1.5">
                                                        <div
                                                            className="h-1.5 w-1/4 rounded-full"
                                                            style={{ backgroundColor: t.accent }}
                                                        />
                                                        <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Theme Meta Info & Selection State */}
                                            <div className="flex items-center justify-between w-full mt-auto pt-1">
                                                <div>
                                                    <span className="text-[14px] font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors block leading-tight">
                                                        {t.name}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors mt-0.5 block">
                                                        {t.accent}
                                                    </span>
                                                </div>

                                                {/* Floating Status Check / Radio Pill */}
                                                <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${isSelected
                                                        ? "border-transparent"
                                                        : "border-white/15 bg-white/[0.03] group-hover:border-white/30"
                                                        }`}
                                                    style={{
                                                        backgroundColor: isSelected ? t.accent : undefined,
                                                        boxShadow: isSelected ? `0 0 14px ${t.glowColor || t.accent}` : "none",
                                                    }}
                                                >
                                                    {isSelected ? (
                                                        <Check size={12} className="text-zinc-950 stroke-[3]" />
                                                    ) : (
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity"
                                                            style={{ backgroundColor: t.accent }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* PERSONALIZATION */}
                    {active === "personalization" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Preferences</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5">Customize your chat interaction and editor behavior.</p>
                            </div>

                            <div className="space-y-2.5">
                                {[
                                    { title: "Auto-scroll during response", desc: "Keep the latest text in view while generating", checked: true },
                                    { title: "Press Enter to send", desc: "Use Shift + Enter for an intentional line break", checked: true },
                                    { title: "Code block line numbers", desc: "Show line counts on generated code snippets", checked: true },
                                    { title: "Sound effects", desc: "Play subtle audio cues when generation completes", checked: false },
                                ].map((item, idx) => (
                                    <label
                                        key={idx}
                                        className="group relative flex items-center justify-between rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
                                    >
                                        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        <div className="pr-4">
                                            <p className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors">
                                                {item.title}
                                            </p>
                                            <p className="text-[11.5px] text-silver-400/80 mt-0.5">{item.desc}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            defaultChecked={item.checked}
                                            className="h-4.5 w-4.5 rounded-lg border-white/[0.15] bg-obsidian-800 accent-slate-400 cursor-pointer transition-all"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MODELS */}
                    {active === "models" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">AI Models</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5">Configure default intelligence routing and generation parameters.</p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 md:p-5 backdrop-blur-xl divide-y divide-white/[0.04]">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <div className="flex items-center justify-between py-3.5">
                                    <span className="text-[13px] text-silver-300 font-medium">Default model</span>
                                    <div className="relative">
                                        <select
                                            value={selectedModel || "sentio-pro"}
                                            onChange={(e) => setSelectedModel?.(e.target.value)}
                                            className="appearance-none bg-white/[0.04] border border-white/[0.1] text-white text-[12.5px] rounded-xl pl-3 pr-8 py-1.5 outline-none hover:border-white/20 focus:border-slate-400/60 focus:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all cursor-pointer backdrop-blur-md"
                                        >
                                            <option value="sentio-pro" className="bg-obsidian-900 text-white">sentio-pro</option>
                                            <option value="sentio-1.5-pro" className="bg-obsidian-900 text-white">sentio-1.5-pro</option>
                                            <option value="sentio-1.5-flash" className="bg-obsidian-900 text-white">sentio-1.5-flash</option>
                                        </select>
                                        <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-silver-400" />
                                    </div>
                                </div>
                                <SettingRow label="Response length" value="Balanced" />
                                <SettingRow label="Temperature" value="0.7" />
                            </div>
                        </div>
                    )}

                    {/* API */}
                    {active === "api" && (
                        <>
                            <ApiSettings />
                        </>
                    )}

                    {/* HELP */}
                    {active === "help" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Help & Resources</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5">Documentation, system uptime, and developer assistance.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <a
                                    href="mailto:support@sentio.app"
                                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.18]"
                                >
                                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
                                    <MessageCircle size={18} className="text-violet-400 mb-2.5 transition-transform group-hover:scale-110" />
                                    <p className="text-[13px] font-medium text-white/90">Contact Support</p>
                                    <p className="text-[11.5px] text-silver-500/80 mt-0.5">Reply within 24 hours</p>
                                </a>

                                <a
                                    href="#"
                                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.18]"
                                >
                                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                                    <BookOpen size={18} className="text-cyan-400 mb-2.5 transition-transform group-hover:scale-110" />
                                    <p className="text-[13px] font-medium text-white/90">Documentation</p>
                                    <p className="text-[11.5px] text-silver-500/80 mt-0.5">Guides & architecture</p>
                                </a>

                                <a
                                    href="#"
                                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.18]"
                                >
                                    <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                                    <LifeBuoy size={18} className="text-emerald-400 mb-2.5 transition-transform group-hover:scale-110" />
                                    <p className="text-[13px] font-medium text-white/90">Status Page</p>
                                    <p className="text-[11.5px] text-silver-500/80 mt-0.5">Realtime cluster uptime</p>
                                </a>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-5 backdrop-blur-xl space-y-3">
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-silver-400/70">
                                    Frequently Asked Questions
                                </p>

                                <div className="space-y-2">
                                    {FAQS.map((faq, i) => {
                                        const isOpen = openFaq === i;
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/[0.05] bg-white/[0.02] overflow-hidden transition-all"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenFaq(isOpen ? null : i)}
                                                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
                                                >
                                                    <span className="text-[13px] text-silver-200 font-medium pr-4">{faq.q}</span>
                                                    <span
                                                        className={`text-silver-400 text-[16px] leading-none transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : ""
                                                            }`}
                                                    >
                                                        +
                                                    </span>
                                                </button>
                                                {isOpen && (
                                                    <p className="px-4 pb-3.5 text-[12.5px] text-silver-400/80 leading-relaxed border-t border-white/[0.03] pt-2.5">
                                                        {faq.a}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-md">
                                <div>
                                    <p className="text-[13px] font-medium text-white/90">SENTIO</p>
                                    <p className="text-[11px] text-silver-500">v1.0.0 (Build 2026.4)</p>
                                </div>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Release notes <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    )}


                    {active === "memory" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Context & Memory</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Configure long-term conversational memory buffers and workspace embeddings.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {memoryItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2 rounded-xl bg-white/[0.04] text-silver-300 border border-white/[0.06]">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                        {item.enabled && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                <Check className="w-2.5 h-2.5" /> Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                                </div>
                                            </div>

                                            {item.action ? (
                                                <button
                                                    type="button"
                                                    className="px-3 py-1.5 text-xs font-medium rounded-xl border bg-white/[0.06] hover:bg-white/[0.12] text-silver-200 border-white/[0.08] transition-all"
                                                >
                                                    {item.action}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleItem(setMemoryItems, item.id)}
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${item.enabled
                                                        ? "bg-white/[0.04] text-silver-300 hover:text-white border-white/[0.06]"
                                                        : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20"
                                                        }`}
                                                >
                                                    {item.enabled ? "Disable" : "Enable"}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* INTEGRATIONS */}
                    {active === "integrations" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Third-Party Bridges</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Connect external services to synchronize webhooks and notifications.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {integrations.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                    >
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                {item.connected && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                        <Check className="w-2.5 h-2.5" /> Connected
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleIntegration(item.id)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${item.connected
                                                ? "bg-white/[0.04] text-silver-300 hover:text-rose-400 hover:border-rose-500/30 border-white/[0.06]"
                                                : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20"
                                                }`}
                                        >
                                            {item.connected ? "Disconnect" : "Connect"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* NOTIFICATIONS */}
                    {active === "notifications" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Notification Channels</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Decide where and when you receive service and activity pings.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {notifications.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2 rounded-xl bg-white/[0.04] text-silver-300 border border-white/[0.06]">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                        {item.enabled && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                <Check className="w-2.5 h-2.5" /> Enabled
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleItem(setNotifications, item.id)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${item.enabled
                                                    ? "bg-white/[0.04] text-silver-300 hover:text-white border-white/[0.06]"
                                                    : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20"
                                                    }`}
                                            >
                                                {item.enabled ? "Disable" : "Enable"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}


                    {/* PRIVACY */}
                    {active === "privacy" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Data & Privacy Control</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Manage telemetry, export records, or wipe personal history from nodes.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {privacyOptions.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div
                                                    className={`p-2 rounded-xl border ${item.danger
                                                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                        : "bg-white/[0.04] text-silver-300 border-white/[0.06]"
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                        {item.enabled && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                <Check className="w-2.5 h-2.5" /> Allowed
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                                </div>
                                            </div>

                                            {item.action ? (
                                                <button
                                                    type="button"
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${item.danger
                                                        ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/20"
                                                        : "bg-white/[0.06] hover:bg-white/[0.12] text-silver-200 border-white/[0.08]"
                                                        }`}
                                                >
                                                    {item.action}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleItem(setPrivacyOptions, item.id)}
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${item.enabled
                                                        ? "bg-white/[0.04] text-silver-300 hover:text-white border-white/[0.06]"
                                                        : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20"
                                                        }`}
                                                >
                                                    {item.enabled ? "Turn Off" : "Turn On"}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}


                    {/* SECURITY */}
                    {active === "security" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Security & Safeguards</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Protect your workspace with hardware keys, MFA, and active session controls.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {securityItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2 rounded-xl bg-white/[0.04] text-silver-300 border border-white/[0.06]">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                        {item.enabled && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                <Check className="w-2.5 h-2.5" /> Enforced
                                                            </span>
                                                        )}
                                                        {item.activeSession && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                                                                Current Device
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => !item.action && toggleItem(setSecurityItems, item.id)}
                                                className="px-3 py-1.5 text-xs font-medium rounded-xl border bg-white/[0.04] hover:bg-white/[0.1] text-silver-300 hover:text-white border-white/[0.06] transition-all"
                                            >
                                                {item.action || (item.enabled ? "Configure" : "Enable")}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}


                    {/* BILLING */}
                    {active === "billing" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white tracking-tight">Subscription & Invoices</h2>
                                <p className="text-[12.5px] text-silver-400/80 mt-0.5 leading-relaxed">
                                    Review current plan allocations, payment sources, and download statements.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {billingItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-obsidian-900/50 backdrop-blur-xl hover:border-white/[0.14] transition-all"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2 rounded-xl bg-white/[0.04] text-silver-300 border border-white/[0.06]">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-[13px] font-semibold text-white">{item.name}</h4>
                                                        {item.current && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11.5px] text-silver-400/70">{item.desc}</p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className="px-3 py-1.5 text-xs font-medium rounded-xl border bg-white/[0.06] hover:bg-white/[0.12] text-silver-200 hover:text-white border-white/[0.08] transition-all"
                                            >
                                                {item.action}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


}

function SettingRow({ label, value, good }) {
    return (
        <div className="flex items-center justify-between py-3.5">
            <span className="text-[13px] text-silver-400">{label}</span>
            <span
                className={`text-[13px] font-medium ${good ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" : "text-silver-200"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}


