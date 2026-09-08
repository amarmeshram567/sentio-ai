import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import {
    Plus,
    Search,
    MessageSquare,
    FolderKanban,
    BookMarked,
    Paperclip,
    ChevronsLeft,
    ChevronsRight,
    Star,
    MoreHorizontal,
    Pencil,
    Trash2,
    Archive,
    Copy,
    X,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Logo from "../components/landing-pages/Logo";

function groupByDate(items) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const weekAgo = today - 86400000 * 7;

    const groups = { Today: [], Yesterday: [], "Previous 7 days": [], Earlier: [] };

    for (const item of items) {
        const time = new Date(item.updatedAt || item.createdAt).getTime();
        if (time >= today) groups["Today"].push(item);
        else if (time >= yesterday) groups["Yesterday"].push(item);
        else if (time >= weekAgo) groups["Previous 7 days"].push(item);
        else groups["Earlier"].push(item);
    }
    return groups;
}

export default function Sidebar({ onOpenSettings }) {
    const { user: clerkUser } = useUser();
    const {
        user,
        conversations,
        activeConversationId,
        setActiveConversationId,
        createNewConversation,
        sidebarCollapsed,
        setSidebarCollapsed,
        deleteConversation,
        updateConversationMeta,
    } = useAppContext();

    const avatarSrc = clerkUser?.imageUrl || user?.avatar;
    const displayName =
        clerkUser?.fullName ||
        clerkUser?.firstName ||
        clerkUser?.username ||
        user?.username ||
        "User";

    const [query, setQuery] = useState("");
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [renamingId, setRenamingId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [workspaceView, setWorkspaceView] = useState("Conversations");

    const visible = useMemo(
        () =>
            (conversations || [])
                .filter((c) => !c.archived)
                .filter((c) => (c.title || "").toLowerCase().includes(query.toLowerCase())),
        [conversations, query]
    );

    const favorites = visible.filter((c) => c.favorite);
    const grouped = groupByDate(visible.filter((c) => !c.favorite));

    const handleRename = (id, newTitle) => {
        if (newTitle.trim()) {
            updateConversationMeta(id, { title: newTitle.trim() });
        }
        setRenamingId(null);
    };

    const handleToggleFavorite = (id, currentFavorite) => {
        updateConversationMeta(id, { favorite: !currentFavorite });
    };

    const handleArchive = (id) => {
        updateConversationMeta(id, { archived: true });
    };

    const handleDuplicate = async (convo) => {
        await createNewConversation(`${convo.title} (Copy)`, convo.model);
    };

    const springTransition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {!sidebarCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarCollapsed(true)}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Smooth Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    // On desktop (md+): toggle between 70px (collapsed) and 280px (expanded)
                    // On mobile (<768px): always stay full 280px wide (no weird 70px squish)
                    width: typeof window !== "undefined" && window.innerWidth < 768
                        ? 280
                        : sidebarCollapsed ? 70 : 280,
                    // On mobile: slide completely off-screen (-100%) when collapsed, 0 when open
                    // On desktop: always stay at x: 0 (it shrinks in place)
                    x: typeof window !== "undefined" && window.innerWidth < 768 && sidebarCollapsed
                        ? "-100%"
                        : 0,
                }}
                transition={springTransition}
                className="theme-sidebar fixed inset-y-0 left-0 z-50 md:relative md:z-20 shrink-0 flex flex-col bg-obsidian-950 backdrop-blur-2xl border-r border-white/[0.06] shadow-2xl md:shadow-glass h-full font-ui overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-5 pb-4 shrink-0 min-h-[68px]">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="shrink-0 flex items-center justify-center w-8">
                            <Logo />
                        </div>
                        <AnimatePresence>
                            {!sidebarCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="font-['Instrument_Serif'] text-[21px] tracking-wide text-white whitespace-nowrap italic"
                                >
                                    Sentio <span className="not-italic font-sans text-xs tracking-widest uppercase font-semibold text-theme-accent ml-1">AI</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 rounded-xl text-silver-400 hover:text-white hover:bg-white/[0.05] transition-all shrink-0"
                        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {sidebarCollapsed ? (
                            <ChevronsRight size={17} />
                        ) : (
                            <>
                                <ChevronsLeft size={17} className="hidden md:block" />
                                <X size={17} className="md:hidden" />
                            </>
                        )}
                    </button>
                </div>

                {/* Action: New Conversation */}
                <div className="px-3 mb-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => {
                            createNewConversation();
                            if (window.innerWidth < 768) setSidebarCollapsed(true);
                        }}
                        className={`group relative flex items-center rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent hover:border-theme-accent/40 hover:bg-theme-accent/10 hover:shadow-theme-glow-sm transition-all duration-300 text-[13px] font-medium text-white overflow-hidden ${sidebarCollapsed
                            ? "w-11 h-11 mx-auto justify-center p-0"
                            : "w-full px-3.5 py-2.5 justify-between"
                            }`}
                        title="New conversation"
                    >
                        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
                        <div className="flex items-center gap-2.5">
                            <Plus
                                size={16}
                                className="text-theme-accent transition-transform duration-300 group-hover:rotate-90 shrink-0"
                            />
                            {!sidebarCollapsed && <span className="whitespace-nowrap">New conversation</span>}
                        </div>
                        {!sidebarCollapsed && (
                            <span className="text-[10.5px] font-mono tracking-tight text-silver-400/50 uppercase border border-white/[0.06] rounded px-1.5 py-0.5">
                                ⌘S
                            </span>
                        )}
                    </button>
                </div>

                {/* Expandable Body Elements */}
                <AnimatePresence>
                    {!sidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex-1 flex flex-col min-h-0 overflow-hidden"
                        >
                            {/* Search */}
                            {workspaceView === "Conversations" && (
                                <div className="px-3 mb-3.5 shrink-0">
                                    <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] focus-within:border-theme-accent/50 focus-within:shadow-theme-glow-sm transition-all duration-300">
                                        <Search size={14} className="text-silver-400/70 shrink-0" />
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search threads..."
                                            className="w-full border-none bg-transparent text-[12.5px] text-white outline-none placeholder:text-silver-400/50 focus:border-none focus:outline-none focus:ring-0"
                                        />
                                        {query && (
                                            <button
                                                type="button"
                                                onClick={() => setQuery("")}
                                                className="text-silver-400 hover:text-white p-0.5"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Scroll Area */}
                            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                <div>
                                    <p className="px-2 mb-1.5 text-[10.5px] font-semibold tracking-[0.14em] text-silver-400/60 uppercase select-none">
                                        Workspace
                                    </p>
                                    <div className="space-y-0.5">
                                        {[
                                            { icon: MessageSquare, label: "Conversations" },
                                            { icon: FolderKanban, label: "Projects" },
                                            { icon: BookMarked, label: "Library" },
                                            { icon: Paperclip, label: "Files" },
                                        ].map((item) => {
                                            const isActive = workspaceView === item.label;
                                            return (
                                                <button
                                                    key={item.label}
                                                    type="button"
                                                    onClick={() => setWorkspaceView(item.label)}
                                                    className={`group relative w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-200 outline-none ${isActive
                                                        ? "bg-white/[0.08] text-white border border-white/[0.1] shadow-sm"
                                                        : "text-silver-400 border border-transparent hover:text-silver-200 hover:bg-white/[0.03]"
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <span className="absolute left-1 inset-y-2 w-0.5 rounded-full bg-theme-accent shadow-[0_0_8px_rgb(var(--color-accent))]" />
                                                    )}
                                                    <item.icon
                                                        size={15}
                                                        className={`transition-colors duration-200 ${isActive
                                                            ? "text-theme-accent"
                                                            : "text-silver-400/80 group-hover:text-silver-200"
                                                            }`}
                                                    />
                                                    <span>{item.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {workspaceView === "Conversations" ? (
                                    <>
                                        {favorites.length > 0 && (
                                            <ConversationGroup
                                                title="Favorites"
                                                items={favorites}
                                                activeId={activeConversationId}
                                                onSelect={(id) => {
                                                    setActiveConversationId(id);
                                                    if (window.innerWidth < 768) setSidebarCollapsed(true);
                                                }}
                                                menuOpenId={menuOpenId}
                                                setMenuOpenId={setMenuOpenId}
                                                renamingId={renamingId}
                                                setRenamingId={setRenamingId}
                                                renameValue={renameValue}
                                                setRenameValue={setRenameValue}
                                                onRename={handleRename}
                                                onDelete={deleteConversation}
                                                onToggleFavorite={handleToggleFavorite}
                                                onArchive={handleArchive}
                                                onDuplicate={handleDuplicate}
                                            />
                                        )}

                                        {Object.entries(grouped).map(
                                            ([label, items]) =>
                                                items.length > 0 && (
                                                    <ConversationGroup
                                                        key={label}
                                                        title={label}
                                                        items={items}
                                                        activeId={activeConversationId}
                                                        onSelect={(id) => {
                                                            setActiveConversationId(id);
                                                            if (window.innerWidth < 768) setSidebarCollapsed(true);
                                                        }}
                                                        menuOpenId={menuOpenId}
                                                        setMenuOpenId={setMenuOpenId}
                                                        renamingId={renamingId}
                                                        setRenamingId={setRenamingId}
                                                        renameValue={renameValue}
                                                        setRenameValue={setRenameValue}
                                                        onRename={handleRename}
                                                        onDelete={deleteConversation}
                                                        onToggleFavorite={handleToggleFavorite}
                                                        onArchive={handleArchive}
                                                        onDuplicate={handleDuplicate}
                                                    />
                                                )
                                        )}

                                        {visible.length === 0 && (
                                            <p className="px-2 py-4 text-[12px] text-silver-400/60 text-center">
                                                No conversations found.
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <WorkspacePanel view={workspaceView} />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty Spacer when collapsed to keep footer pinned */}
                {sidebarCollapsed && <div className="flex-1" />}

                {/* Footer User Profile */}
                <div className="border-t border-white/[0.06] p-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => {
                            onOpenSettings?.("account");
                            if (window.innerWidth < 768) setSidebarCollapsed(true);
                        }}
                        className={`flex items-center rounded-full border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all text-left group ${sidebarCollapsed
                            ? "w-10 h-10 mx-auto justify-center p-0"
                            : "w-full p-2 justify-between"
                            }`}
                        title={displayName}
                    >
                        <div className="flex items-center gap-2.5 truncate">
                            {avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full object-cover border border-white/[0.1] group-hover:border-theme-accent transition-colors shrink-0"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-theme-accent/20 flex items-center justify-center text-[12px] font-semibold text-white border border-theme-accent/30 shrink-0">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {!sidebarCollapsed && (
                                <div className="flex flex-col truncate">
                                    <span className="text-[13px] font-medium text-white/90 leading-tight truncate">
                                        {displayName}
                                    </span>
                                    <span className="text-[10.5px] text-theme-accent font-mono mt-0.5">
                                        Preferences
                                    </span>
                                </div>
                            )}
                        </div>

                        {!sidebarCollapsed && (
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" />
                        )}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}



function ConversationGroup({
    title,
    items,
    activeId,
    onSelect,
    menuOpenId,
    setMenuOpenId,
    renamingId,
    setRenamingId,
    renameValue,
    setRenameValue,
    onRename,
    onDelete,
    onToggleFavorite,
    onArchive,
    onDuplicate,
}) {
    return (
        <div className="mb-3.5">
            <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-[0.14em] text-silver-400/60 uppercase select-none">
                {title}
            </p>
            <div className="space-y-1">
                {items.map((c) => {
                    const convoId = c._id || c.id;
                    const isActive = activeId === convoId;

                    return (
                        <div key={convoId} className="relative group">
                            {renamingId === convoId ? (
                                <input
                                    autoFocus
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    onBlur={() => onRename(convoId, renameValue)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") onRename(convoId, renameValue);
                                        if (e.key === "Escape") setRenamingId(null);
                                    }}
                                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] text-[12.5px] text-white outline-none border border-theme-accent/70 shadow-theme-glow-sm"
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onSelect(convoId)}
                                    className={`w-full flex items-center gap-2 pl-3 pr-8 py-2 rounded-xl text-[12.5px] truncate transition-all text-left ${isActive
                                        ? "bg-white/[0.08] text-white border border-white/[0.1] shadow-sm font-medium"
                                        : "text-silver-400 border border-transparent hover:text-white hover:bg-white/[0.03]"
                                        }`}
                                >
                                    {c.favorite && (
                                        <Star size={12} className="shrink-0 fill-theme-accent text-theme-accent" />
                                    )}
                                    <span className="truncate">{c.title || "Untitled Conversation"}</span>
                                </button>
                            )}

                            {/* Dropdown Options Trigger */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpenId(menuOpenId === convoId ? null : convoId);
                                }}
                                className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-silver-400 hover:text-white hover:bg-white/[0.08] transition-opacity ${menuOpenId === convoId ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    }`}
                            >
                                <MoreHorizontal size={14} />
                            </button>

                            {/* Context Menu Dropdown */}
                            <AnimatePresence>
                                {menuOpenId === convoId && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                        transition={{ duration: 0.12 }}
                                        className="absolute right-0 top-8 z-30 w-44 py-1.5 rounded-2xl bg-obsidian-900 border border-white/[0.1] shadow-2xl backdrop-blur-xl"
                                    >
                                        <MenuItem
                                            icon={Pencil}
                                            label="Rename"
                                            onClick={() => {
                                                setRenamingId(convoId);
                                                setRenameValue(c.title || "");
                                                setMenuOpenId(null);
                                            }}
                                        />
                                        <MenuItem
                                            icon={Star}
                                            label={c.favorite ? "Unfavorite" : "Favorite"}
                                            onClick={() => {
                                                onToggleFavorite(convoId, c.favorite);
                                                setMenuOpenId(null);
                                            }}
                                        />
                                        <MenuItem
                                            icon={Copy}
                                            label="Duplicate"
                                            onClick={() => {
                                                onDuplicate(c);
                                                setMenuOpenId(null);
                                            }}
                                        />
                                        <MenuItem
                                            icon={Archive}
                                            label="Archive"
                                            onClick={() => {
                                                onArchive(convoId);
                                                setMenuOpenId(null);
                                            }}
                                        />
                                        <MenuItem
                                            icon={Trash2}
                                            label="Delete"
                                            danger
                                            onClick={() => {
                                                onDelete(convoId);
                                                setMenuOpenId(null);
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function WorkspacePanel({ view }) {
    const copy = {
        Projects: "Organize custom prompts and workspaces.",
        Library: "Saved prompt templates and model instructions.",
        Files: "Attachments and uploaded session documents.",
    };

    return (
        <div className="px-2 py-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
            <p className="mb-1 text-[10.5px] font-semibold tracking-[0.14em] text-silver-400/60 uppercase">
                {view}
            </p>
            <p className="text-[12px] text-silver-400/80 leading-relaxed">{copy[view]}</p>
        </div>
    );
}

function MenuItem({ icon: Icon, label, onClick, danger }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] transition-colors ${danger
                ? "text-red-400 hover:bg-red-500/10"
                : "text-silver-300 hover:text-white hover:bg-white/[0.06]"
                }`}
        >
            <Icon size={13} className={danger ? "text-red-400" : "text-silver-400"} />
            <span>{label}</span>
        </button>
    );
}
