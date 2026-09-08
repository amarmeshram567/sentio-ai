import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import {
    ChevronDown,
    Search,
    Share2,
    Bell,
    Settings,
    X,
    Plus,
    MessageSquare,
    Sparkles,
    PanelRight,
    MenuIcon,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import Logo from "../landing-pages/Logo";
import toast from "react-hot-toast";

export default function TopNav({
    onOpenModelModal,
    onOpenSettings,
    onToggleMobileSidebar,
}) {
    const { user: clerkUser } = useUser();

    const {
        conversations,
        activeConversationId,
        setActiveConversationId,
        currentMessages,
        createNewConversation,
        selectedModel,
        isStreaming,
        contextPanelOpen,
        setContextPanelOpen,
        sidebarCollapsed,
        user: contextUser,
    } = useAppContext();

    const avatarSrc = clerkUser?.imageUrl || contextUser?.avatar;
    const displayName =
        clerkUser?.fullName ||
        clerkUser?.username ||
        contextUser?.username ||
        clerkUser?.firstName ||
        "User";

    const firstName = clerkUser?.firstName || displayName.split(" ")[0];

    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [query, setQuery] = useState("");

    const navRef = useRef(null);

    // Close popovers on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                closePopovers();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeConversation =
        (conversations || []).find(
            (c) => (c._id || c.id) === activeConversationId
        ) || null;

    const searchResults = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return (conversations || []).slice(0, 6);

        return (conversations || [])
            .filter((conversation) => {
                const titleMatch = (conversation.title || "")
                    .toLowerCase()
                    .includes(needle);
                const messageMatch = (conversation.messages || []).some((message) =>
                    (message.content || "").toLowerCase().includes(needle)
                );
                return titleMatch || messageMatch;
            })
            .slice(0, 8);
    }, [conversations, query]);


    const closePopovers = () => {
        setSearchOpen(false);
        setNotificationOpen(false);
        setAccountOpen(false);
    };

    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.warn("Clipboard API failed, attempting textarea fallback", err);
            }
        }
        // Fallback for non-HTTPS or permission restricted contexts
        try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "-9999px";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textarea);
            return success;
        } catch (err) {
            console.error("Fallback copy failed", err);
            return false;
        }
    };

    const handleShare = async () => {
        console.log("handleShare clicked", {
            activeConversationId,
            messagesCount: currentMessages?.length,
        });

        const notify = typeof toast === "function" ? toast : (msg) => console.log(msg);

        if (!activeConversationId || !currentMessages || currentMessages.length === 0) {
            notify("Start a conversation before sharing.");
            return;
        }

        const title = activeConversation?.title || "Conversation";
        const lines = [
            title,
            "",
            ...currentMessages.map(
                (message) => `${message.role === "user" ? "You" : "SENTIO"}: ${message.content}`
            ),
        ];

        const success = await copyText(lines.join("\n"));
        if (success) {
            toast("Conversation copied to clipboard.");
        } else {
            toast("Copy failed. Clipboard permission denied.");
        }
    };

    return (
        <header
            ref={navRef}
            className="theme-topbar sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-2 border-b border-white/[0.06] backdrop-blur-xl bg-transparent font-ui"
        >
            {/* Top glass reflection rim */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* ==================== MOBILE LAYOUT (< md) ==================== */}
            <div className="flex md:hidden items-center justify-between w-full">
                {/* Left Profile Greeting */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            const next = !accountOpen;
                            closePopovers();
                            setAccountOpen(next);
                        }}
                        className={`relative w-11 h-11 rounded-full overflow-hidden flex items-center justify-center text-sm font-semibold text-white shadow-glass shrink-0 outline-none ${accountOpen ? "border-theme-accent shadow-theme-glow-sm" : "border-white/[0.1] hover:border-white/[0.25]"}`}
                        title={displayName}
                    >
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-theme-accent/20 flex items-center justify-center font-mono">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>

                    <div className="flex flex-col justify-center text-left select-none">
                        <span className="text-[11px] sm:text-[12px] font-medium tracking-wide text-theme-muted leading-none">
                            Welcome Back!
                        </span>
                        <span className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight leading-none flex items-center gap-1">
                            <span>Hi,</span>
                            <span className="text-accent-glow font-bold normal-case">{firstName}</span>
                        </span>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={sidebarCollapsed ? onToggleMobileSidebar : onOpenModelModal}
                    className="relative group flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 active:scale-95 transition-all overflow-hidden"
                    title={sidebarCollapsed ? "Open sidebar" : "Model selector"}
                >
                    {/* Default State: Your Brand Logo */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform group-hover:scale-75 group-hover:opacity-0 group-hover:rotate-12">
                        <Logo className="w-5 h-5 object-contain" />
                    </div>

                    {/* Hover State: Menu Icon */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0 text-silver-200">
                        <MenuIcon className="w-4 h-4" />
                    </div>
                </button>
            </div>

            {/* Left Controls: Title / Brand */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                    {sidebarCollapsed && (
                        <span className="hidden md:inline">
                            <Logo />
                        </span>
                    )}
                    {activeConversation?.title && (
                        <>
                            <span className="hidden md:inline text-silver-400/40 text-xs">/</span>
                            <span className="hidden md:inline text-xs text-silver-400/80 max-w-[160px] lg:max-w-[220px] truncate">
                                {activeConversation.title}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Center Pill: Model Selector */}
            <button
                type="button"
                onClick={onOpenModelModal}
                className="hidden md:flex group relative items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-theme-accent/40 hover:bg-white/[0.06] hover:shadow-theme-glow-sm transition-all duration-300 outline-none"
            >
                <Sparkles size={13} className="text-theme-accent transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[12px] font-medium text-silver-300 group-hover:text-white transition-colors">
                    Intelligence
                </span>
                <span className="text-[11.5px] sm:text-[12px] font-semibold text-theme-accent max-w-[90px] sm:max-w-[130px] truncate">
                    {selectedModel || "sentio-pro"}
                </span>
                <ChevronDown
                    size={12}
                    className="text-silver-400/70 group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5"
                />
            </button>

            {/* Right Action Icons & Profile */}
            <div className="hidden md:flex items-center gap-1 sm:gap-1.5">
                <IconBtn
                    icon={Search}
                    label="Search"
                    active={searchOpen}
                    onClick={() => {
                        const next = !searchOpen;
                        closePopovers();
                        setSearchOpen(next);
                    }}
                />

                <span className="hidden sm:inline-block">
                    <IconBtn icon={Share2} label="Share" onClick={handleShare} />
                </span>

                <span className="hidden sm:inline-block">
                    <IconBtn
                        icon={Bell}
                        label="Notifications"
                        active={notificationOpen}
                        badge={isStreaming}
                        onClick={() => {
                            const next = !notificationOpen;
                            closePopovers();
                            setNotificationOpen(next);
                        }}
                    />
                </span>

                <IconBtn
                    icon={Settings}
                    label="Settings"
                    onClick={() => {
                        closePopovers();
                        onOpenSettings?.("general");
                    }}
                />

                <span className="hidden lg:inline-block">
                    <IconBtn
                        icon={PanelRight}
                        label="Toggle Context"
                        active={contextPanelOpen}
                        onClick={() => {
                            closePopovers();
                            setContextPanelOpen(!contextPanelOpen);
                        }}
                    />
                </span>

                {/* Profile Avatar Button */}
                <button
                    type="button"
                    onClick={() => {
                        const next = !accountOpen;
                        closePopovers();
                        setAccountOpen(next);
                    }}
                    className={`relative ml-1 sm:ml-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border transition-all duration-300 flex items-center justify-center text-[11.5px] font-semibold text-white shadow-glass outline-none ${accountOpen
                        ? "border-theme-accent shadow-theme-glow-sm"
                        : "border-white/[0.1] hover:border-white/[0.25]"
                        }`}
                    title={displayName}
                >
                    {avatarSrc ? (
                        <img
                            src={avatarSrc}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-theme-accent/20 flex items-center justify-center font-mono">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </button>
            </div>

            {/* Popovers */}
            <AnimatePresence>
                {/* Search Popover */}
                {searchOpen && (
                    <Popover className="right-3 sm:right-16 top-12 w-[calc(100vw-24px)] sm:w-[310px]">
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
                            <Search size={12} className="text-theme-accent shrink-0" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") setSearchOpen(false);
                                }}
                                placeholder="Search conversations..."
                                className="w-full border-none bg-transparent text-[11.5px] text-white outline-none placeholder:text-silver-400/50 focus:border-none focus:outline-none focus:ring-0"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-silver-400 hover:text-white p-0.5 rounded"
                                >
                                    <X size={11} />
                                </button>
                            )}
                        </div>

                        <div className="max-h-56 overflow-y-auto p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            {searchResults.length > 0 ? (
                                searchResults.map((conversation) => {
                                    const convoId = conversation._id || conversation.id;
                                    const preview =
                                        conversation.messages?.[conversation.messages.length - 1]?.content ||
                                        "No messages yet.";

                                    return (
                                        <button
                                            key={convoId}
                                            type="button"
                                            onClick={() => {
                                                setActiveConversationId(convoId);
                                                setSearchOpen(false);
                                                setQuery("");
                                            }}
                                            className="w-full rounded-lg px-2.5 py-1.5 text-left hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all group"
                                        >
                                            <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-silver-200 group-hover:text-white">
                                                <MessageSquare size={11} className="text-theme-accent shrink-0" />
                                                <span className="truncate">
                                                    {conversation.title || "Untitled Conversation"}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 line-clamp-1 text-[10.5px] leading-tight text-silver-400/70 font-mono">
                                                {preview}
                                            </p>
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="px-2 py-4 text-center text-[11px] text-silver-400/60">
                                    No matching conversations.
                                </p>
                            )}
                        </div>
                    </Popover>
                )}

                {/* Notifications Popover */}
                {notificationOpen && (
                    <Popover className="right-3 sm:right-12 top-14 w-[calc(100vw-24px)] sm:w-80">
                        <PanelHeader
                            title="System Status"
                            onClose={() => setNotificationOpen(false)}
                        />
                        <div className="space-y-2 p-3 pt-0">
                            <StatusItem
                                title="Active Engine"
                                text={`${selectedModel || "sentio-pro"} configured for standard reasoning.`}
                            />
                            <StatusItem
                                title="Inference Pipeline"
                                text={
                                    isStreaming
                                        ? "Active SSE stream in progress..."
                                        : "Cluster idle and ready for queries."
                                }
                                status={isStreaming ? "active" : "ready"}
                            />
                        </div>
                    </Popover>
                )}

                {/* Account / Profile Popover */}
                {accountOpen && (
                    <Popover className="left-4 right-auto sm:left-auto sm:right-6 top-16 sm:top-14 w-64 max-w-[85vw]">
                        <PanelHeader
                            title={displayName}
                            onClose={() => setAccountOpen(false)}
                        />
                        <div className="p-2 pt-0 space-y-1">
                            <button
                                type="button"
                                onClick={() => {
                                    createNewConversation();
                                    setAccountOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] font-medium text-silver-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                            >
                                <Plus size={14} className="text-theme-accent" />
                                <span>New conversation</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setAccountOpen(false);
                                    onOpenSettings?.("general");
                                }}
                                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] font-medium text-silver-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                            >
                                <Settings size={14} className="text-silver-400" />
                                <span>Workspace settings</span>
                            </button>

                            <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11.5px] font-medium text-white/90">
                                        Pro Workspace
                                    </span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-theme-accent shadow-[0_0_6px_rgb(var(--color-accent))]" />
                                </div>
                                <p className="mt-1 text-[11px] text-silver-400/80">
                                    {conversations?.length || 0} active threads synced.
                                </p>
                            </div>
                        </div>
                    </Popover>
                )}
            </AnimatePresence>
        </header>
    );
}

function IconBtn({ icon: Icon, label, active, onClick, badge }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            className={`relative p-2 rounded-xl border transition-all duration-200 outline-none ${active
                ? "bg-white/[0.08] text-white border-white/[0.12] shadow-sm"
                : "text-silver-400 border-transparent hover:text-white hover:bg-white/[0.04]"
                }`}
        >
            <Icon size={15} />
            {badge && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-theme-accent shadow-[0_0_6px_rgb(var(--color-accent))] animate-pulse" />
            )}
        </button>
    );
}

function Popover({ className, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-40 overflow-hidden rounded-2xl border border-white/[0.1] bg-obsidian-900/95 backdrop-blur-2xl shadow-2xl ${className}`}
        >
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {children}
        </motion.div>
    );
}

function PanelHeader({ title, onClose }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <p className="text-[12.5px] font-semibold tracking-wide text-white truncate pr-2">{title}</p>
            <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-silver-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
                <X size={13} />
            </button>
        </div>
    );
}

function StatusItem({ title, text, status }) {
    return (
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-0.5">
                <p className="text-[12px] font-medium text-white/90">{title}</p>
                {status && (
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${status === "active"
                            ? "bg-theme-accent shadow-[0_0_6px_rgb(var(--color-accent))] animate-pulse"
                            : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                            }`}
                    />
                )}
            </div>
            <p className="text-[11.5px] leading-relaxed text-silver-400/80">
                {text}
            </p>
        </div>
    );
}