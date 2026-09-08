import { useEffect, useRef, useState } from "react";

import { useAppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import SettingsView from "../components/workspaces/SettingsView";
import TopNav from "../components/workspaces/TopNav";
import WelcomeScreen from "../components/workspaces/WelcomeScreen";
import MessageBubble from "../components/workspaces/Message";
import ThinkingIndicator from "../components/workspaces/ThinkingIndicator";
import Composer from "../components/workspaces/Composer";
import ContextPanel from "../components/workspaces/ContextPanel";
import ModelSelectorModal from "../components/workspaces/ModelSelectorModal";

export function SentioWorkspace() {
    const {
        conversations,
        activeConversationId,
        currentMessages,
        sendMessage,
        isStreaming,
        contextPanelOpen,
        setContextPanelOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
    } = useAppContext();

    const [modelModalOpen, setModelModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [settingsSection, setSettingsSection] = useState("general");
    const [thinking, setThinking] = useState(false);

    const scrollRef = useRef(null);
    const bottomRef = useRef(null);
    const prevConvoRef = useRef(activeConversationId);

    const activeConversation =
        (conversations || []).find(
            (c) => (c._id || c.id) === activeConversationId
        ) || null;

    // Intelligent Scroll: Top on chat switch, smooth bottom scroll on streaming/thinking
    useEffect(() => {
        if (!scrollRef.current) return;

        if (prevConvoRef.current !== activeConversationId) {
            prevConvoRef.current = activeConversationId;
            scrollRef.current.scrollTop = 0;
            return;
        }

        if (isStreaming || thinking) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentMessages, isStreaming, thinking, activeConversationId]);

    // Automatically collapse sidebar on mobile viewport mount
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarCollapsed(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setSidebarCollapsed]);

    const handleSend = (text, attachments) => {
        sendMessage(text, attachments);
    };

    const handleRegenerate = () => {
        if (!activeConversation) return;
        const msgs = currentMessages;
        const lastUserMsg = [...msgs].reverse().find((m) => m.role === "user");
        if (lastUserMsg) handleSend(lastUserMsg.content);
    };

    return (
        <div className="theme-workspace h-dvh w-screen flex bg-obsidian-950 font-ui text-silver-200 overflow-hidden selection:bg-theme-accent/20 selection:text-white">
            {/* Sidebar Navigation */}
            <Sidebar
                onOpenSettings={(section = "general") => {
                    setSettingsOpen(true);
                    setSettingsSection(section);
                }}
                onOpenModelSelector={() => {
                    setModelModalOpen(true);
                }}
            />

            {/* Main Stage & Chat Surface */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-obsidian-950 relative">
                {settingsOpen ? (
                    <SettingsView
                        onClose={() => setSettingsOpen(false)}
                        initialSection={settingsSection}
                    />
                ) : (
                    <div className="flex-1 flex overflow-hidden relative">
                        <main className="flex-1 flex flex-col min-w-0 h-full relative">
                            {!activeConversation || currentMessages.length === 0 ? (
                                <div className="flex-1 overflow-y-auto no-scrollbar">
                                    <TopNav
                                        onOpenModelModal={() => setModelModalOpen(true)}
                                        onOpenSettings={() => {
                                            setSettingsOpen(true);
                                            setSettingsSection("general");
                                        }}
                                        onToggleMobileSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    />
                                    <WelcomeScreen onPrompt={handleSend} />
                                </div>
                            ) : (
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto px-3 sm:px-6 no-scrollbar pb-36"
                                >
                                    <TopNav
                                        onOpenModelModal={() => setModelModalOpen(true)}
                                        onOpenSettings={() => {
                                            setSettingsOpen(true);
                                            setSettingsSection("general");
                                        }}
                                        onToggleMobileSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    />

                                    <div className="max-w-3xl mx-auto pt-1 sm:pt-2 space-y-4 sm:space-y-6">
                                        {currentMessages.map((m, index) => (
                                            <MessageBubble
                                                key={m._id || `${m.role}-${index}`}
                                                message={m}
                                                isLast={index === currentMessages.length - 1}
                                                onRegenerate={handleRegenerate}
                                            />
                                        ))}

                                        {thinking && (
                                            <div className="pb-28 sm:pb-32 pt-2">
                                                <ThinkingIndicator />
                                            </div>
                                        )}

                                        {/* Scroll anchor target */}
                                        <div ref={bottomRef} className="h-px" />
                                    </div>
                                </div>
                            )}

                            {/* Bottom Composer Floating Bar */}
                            <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none px-3 pb-3 pt-8 sm:px-6 sm:pb-5 bg-gradient-to-t from-obsidian-950/70 via-obsidian-950/40 to-transparent">
                                <div className="max-w-3xl mx-auto w-full pointer-events-auto">
                                    <Composer onSend={handleSend} disabled={isStreaming} />
                                </div>
                            </div>
                        </main>

                        {/* RENDER CONTEXT PANEL HERE AS AN OVERLAY DRAWER */}
                        <ContextPanel
                            open={contextPanelOpen}
                            onClose={() => setContextPanelOpen(false)}
                        />
                    </div>
                )}
            </div>

            {/* Model Switcher Modal */}
            <ModelSelectorModal
                open={modelModalOpen}
                onClose={() => setModelModalOpen(false)}
            />
        </div>
    );
}


