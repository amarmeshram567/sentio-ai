import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "https://sentio-ai-xi.vercel.app";



export const THEMES = [
    {
        id: "sentio-prism",
        name: "Sentio Prism",
        accent: "#38bdf8",
        secondaryAccent: "#818cf8",
        background: "#060913",
        surface: "#0b1220",
        elevated: "#121d33",
        hover: "#1a2947",
        previewGradient: "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #1e1b4b 100%)",
        glowColor: "rgba(56, 189, 248, 0.45)",
        borderHighlight: "rgba(129, 140, 248, 0.45)",
    },
    {
        id: "monaco-gold",
        name: "Monaco Royal",
        accent: "#f5c067",
        secondaryAccent: "#eab308",
        background: "#080705",
        surface: "#120f0a",
        elevated: "#1d1912",
        hover: "#2a241a",
        previewGradient: "linear-gradient(135deg, #fcd34d 0%, #d97706 50%, #451a03 100%)",
        glowColor: "rgba(245, 192, 103, 0.4)",
        borderHighlight: "rgba(252, 211, 77, 0.45)",
    },
    {
        id: "obsidian-titanium",
        name: "Obsidian Titanium",
        accent: "#cbd5e1",
        secondaryAccent: "#38bdf8",
        background: "#040405",
        surface: "#0b0c0e",
        elevated: "#131418",
        hover: "#1c1e24",
        previewGradient: "linear-gradient(135deg, #e2e8f0 0%, #475569 60%, #090d16 100%)",
        glowColor: "rgba(203, 213, 225, 0.3)",
        borderHighlight: "rgba(255, 255, 255, 0.35)",
    },
    {
        id: "neural-amethyst",
        name: "Neural Amethyst",
        accent: "#a855f7",
        secondaryAccent: "#ec4899",
        background: "#090511",
        surface: "#130b24",
        elevated: "#1c1135",
        hover: "#28194a",
        previewGradient: "linear-gradient(135deg, #c084fc 0%, #7e22ce 50%, #2e1065 100%)",
        glowColor: "rgba(168, 85, 247, 0.45)",
        borderHighlight: "rgba(192, 132, 252, 0.4)",
    },
    {
        id: "quantum-azure",
        name: "Quantum Azure",
        accent: "#06b6d4",
        secondaryAccent: "#3b82f6",
        background: "#030c12",
        surface: "#071620",
        elevated: "#0c2130",
        hover: "#123045",
        previewGradient: "linear-gradient(135deg, #22d3ee 0%, #0284c7 60%, #082f49 100%)",
        glowColor: "rgba(6, 182, 212, 0.45)",
        borderHighlight: "rgba(103, 232, 249, 0.45)",
    },
    {
        id: "cortex-emerald",
        name: "Cortex Mint",
        accent: "#10b981",
        secondaryAccent: "#22d3ee",
        background: "#030e0a",
        surface: "#061812",
        elevated: "#0b261d",
        hover: "#10392b",
        previewGradient: "linear-gradient(135deg, #34d399 0%, #059669 60%, #022c22 100%)",
        glowColor: "rgba(16, 185, 129, 0.45)",
        borderHighlight: "rgba(110, 231, 183, 0.4)",
    },
    {
        id: "synth-rose",
        name: "Synth Rose",
        accent: "#f43f5e",
        secondaryAccent: "#fb7185",
        background: "#0f0408",
        surface: "#1b0810",
        elevated: "#290d18",
        hover: "#3d1324",
        previewGradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 60%, #4c0519 100%)",
        glowColor: "rgba(244, 63, 94, 0.45)",
        borderHighlight: "rgba(251, 113, 133, 0.4)",
    },
    {
        id: "stellar-amber",
        name: "Stellar Magma",
        accent: "#fb923c",
        secondaryAccent: "#ef4444",
        background: "#0e0603",
        surface: "#1a0b06",
        elevated: "#28120a",
        hover: "#3d1b0e",
        previewGradient: "linear-gradient(135deg, #fdba74 0%, #ea580c 60%, #431407 100%)",
        glowColor: "rgba(251, 146, 60, 0.4)",
        borderHighlight: "rgba(253, 186, 116, 0.4)",
    },
    {
        id: "liquid-frost",
        name: "Liquid Glass",
        accent: "#f8fafc",
        secondaryAccent: "#38bdf8",
        background: "#030712",
        surface: "rgba(255, 255, 255, 0.03)",
        elevated: "rgba(255, 255, 255, 0.07)",
        hover: "rgba(255, 255, 255, 0.12)",
        previewGradient: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(56,189,248,0.3) 50%, rgba(15,23,42,0.9) 100%)",
        glowColor: "rgba(255, 255, 255, 0.28)",
        borderHighlight: "rgba(255, 255, 255, 0.55)",
    },
    {
        id: "prism-crystal",
        name: "Prism Crystal",
        accent: "#a78bfa",
        secondaryAccent: "#22d3ee",
        background: "#05060f",
        surface: "rgba(167, 139, 250, 0.05)",
        elevated: "rgba(34, 211, 238, 0.08)",
        hover: "rgba(167, 139, 250, 0.15)",
        previewGradient: "linear-gradient(135deg, #c084fc 0%, #38bdf8 50%, #1e1b4b 100%)",
        glowColor: "rgba(167, 139, 250, 0.4)",
        borderHighlight: "rgba(255, 255, 255, 0.45)",
    },
    {
        id: "aurora-glass",
        name: "Aurora Borealis",
        accent: "#2dd4bf",
        secondaryAccent: "#a855f7",
        background: "#02090d",
        surface: "rgba(45, 212, 191, 0.04)",
        elevated: "rgba(168, 85, 247, 0.08)",
        hover: "rgba(45, 212, 191, 0.14)",
        previewGradient: "linear-gradient(135deg, #2dd4bf 0%, #6366f1 50%, #3b0764 100%)",
        glowColor: "rgba(45, 212, 191, 0.42)",
        borderHighlight: "rgba(94, 234, 212, 0.5)",
    },
    {
        id: "obsidian-glass",
        name: "Smoked Glass",
        accent: "#e2e8f0",
        secondaryAccent: "#64748b",
        background: "#020203",
        surface: "rgba(255, 255, 255, 0.025)",
        elevated: "rgba(255, 255, 255, 0.05)",
        hover: "rgba(255, 255, 255, 0.09)",
        previewGradient: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(30,41,59,0.8) 60%, rgba(2,2,3,1) 100%)",
        glowColor: "rgba(226, 232, 240, 0.25)",
        borderHighlight: "rgba(255, 255, 255, 0.4)",
    },
    {
        id: "royal-noir",
        name: "Royal Noir",
        accent: "#d4af37",
        secondaryAccent: "#8b5cf6",
        background: "#070609",
        surface: "#100d14",
        elevated: "#1a1420",
        hover: "#281e30",
        previewGradient: "linear-gradient(135deg, #f5d76e 0%, #a855f7 52%, #240b36 100%)",
        glowColor: "rgba(212, 175, 55, 0.38)",
        borderHighlight: "rgba(212, 175, 55, 0.42)",
    },
    {
        id: "velvet-plum",
        name: "Velvet Plum",
        accent: "#e879f9",
        secondaryAccent: "#c026d3",
        background: "#0a040b",
        surface: "#160914",
        elevated: "#231020",
        hover: "#35182f",
        previewGradient: "linear-gradient(135deg, #f0abfc 0%, #c026d3 55%, #4a044e 100%)",
        glowColor: "rgba(232, 121, 249, 0.4)",
        borderHighlight: "rgba(240, 171, 252, 0.42)",
    },
    {
        id: "emerald-royale",
        name: "Emerald Royale",
        accent: "#34d399",
        secondaryAccent: "#84cc16",
        background: "#020a07",
        surface: "#06140e",
        elevated: "#0b2117",
        hover: "#123522",
        previewGradient: "linear-gradient(135deg, #6ee7b7 0%, #059669 55%, #022c22 100%)",
        glowColor: "rgba(52, 211, 153, 0.4)",
        borderHighlight: "rgba(110, 231, 183, 0.42)",
    },
    {
        id: "copper-shadow",
        name: "Copper Shadow",
        accent: "#fb923c",
        secondaryAccent: "#c2410c",
        background: "#090503",
        surface: "#160b06",
        elevated: "#24130b",
        hover: "#382014",
        previewGradient: "linear-gradient(135deg, #fed7aa 0%, #c2410c 55%, #431407 100%)",
        glowColor: "rgba(251, 146, 60, 0.38)",
        borderHighlight: "rgba(254, 215, 170, 0.42)",
    },
    {
        id: "arctic-luxury",
        name: "Arctic Luxury",
        accent: "#e0f2fe",
        secondaryAccent: "#38bdf8",
        background: "#02070c",
        surface: "#07131c",
        elevated: "#0d202c",
        hover: "#143243",
        previewGradient: "linear-gradient(135deg, #f0f9ff 0%, #38bdf8 52%, #0c4a6e 100%)",
        glowColor: "rgba(224, 242, 254, 0.32)",
        borderHighlight: "rgba(224, 242, 254, 0.55)",
    },
    {
        id: "cyber-magenta",
        name: "Cyber Magenta",
        accent: "#f0abfc",
        secondaryAccent: "#06b6d4",
        background: "#07030b",
        surface: "#120817",
        elevated: "#1e0e27",
        hover: "#30153c",
        previewGradient: "linear-gradient(135deg, #f0abfc 0%, #d946ef 48%, #0891b2 100%)",
        glowColor: "rgba(217, 70, 239, 0.42)",
        borderHighlight: "rgba(240, 171, 252, 0.45)",
    },
    {
        id: "toxic-neon",
        name: "Toxic Neon",
        accent: "#a3e635",
        secondaryAccent: "#22c55e",
        background: "#030703",
        surface: "#081108",
        elevated: "#101d0f",
        hover: "#1a2e17",
        previewGradient: "linear-gradient(135deg, #d9f99d 0%, #65a30d 55%, #14532d 100%)",
        glowColor: "rgba(163, 230, 53, 0.4)",
        borderHighlight: "rgba(190, 242, 100, 0.45)",
    },
    {
        id: "deep-ocean",
        name: "Deep Ocean",
        accent: "#2dd4bf",
        secondaryAccent: "#0284c7",
        background: "#02080b",
        surface: "#061318",
        elevated: "#0b2027",
        hover: "#12333c",
        previewGradient: "linear-gradient(135deg, #5eead4 0%, #0284c7 55%, #082f49 100%)",
        glowColor: "rgba(45, 212, 191, 0.4)",
        borderHighlight: "rgba(94, 234, 212, 0.45)",
    },
    {
        id: "ruby-onyx",
        name: "Ruby Onyx",
        accent: "#fb7185",
        secondaryAccent: "#b91c1c",
        background: "#080304",
        surface: "#150709",
        elevated: "#250c10",
        hover: "#3a1218",
        previewGradient: "linear-gradient(135deg, #fda4af 0%, #b91c1c 55%, #450a0a 100%)",
        glowColor: "rgba(251, 113, 133, 0.4)",
        borderHighlight: "rgba(253, 164, 175, 0.42)",
    },
    {
        id: "champagne-glass",
        name: "Champagne Glass",
        accent: "#fde68a",
        secondaryAccent: "#f59e0b",
        background: "#080705",
        surface: "rgba(255, 248, 220, 0.035)",
        elevated: "rgba(253, 230, 138, 0.07)",
        hover: "rgba(245, 158, 11, 0.12)",
        previewGradient: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(253,230,138,0.45) 45%, rgba(120,53,15,0.9) 100%)",
        glowColor: "rgba(253, 230, 138, 0.3)",
        borderHighlight: "rgba(254, 243, 199, 0.55)",
    },
    {
        id: "lavender-mist",
        name: "Lavender Mist",
        accent: "#c4b5fd",
        secondaryAccent: "#818cf8",
        background: "#07060d",
        surface: "#100e1b",
        elevated: "#19172a",
        hover: "#27233e",
        previewGradient: "linear-gradient(135deg, #ddd6fe 0%, #818cf8 52%, #312e81 100%)",
        glowColor: "rgba(196, 181, 253, 0.38)",
        borderHighlight: "rgba(221, 214, 254, 0.45)",
    },
    {
        id: "solar-flare",
        name: "Solar Flare",
        accent: "#fbbf24",
        secondaryAccent: "#f97316",
        background: "#0a0502",
        surface: "#170b04",
        elevated: "#261306",
        hover: "#3b1d0a",
        previewGradient: "linear-gradient(135deg, #fde68a 0%, #f97316 52%, #7c2d12 100%)",
        glowColor: "rgba(251, 191, 36, 0.42)",
        borderHighlight: "rgba(253, 230, 138, 0.45)",
    },
    {
        id: "electric-violet",
        name: "Electric Violet",
        accent: "#8b5cf6",
        secondaryAccent: "#06b6d4",
        background: "#05030a",
        surface: "#0d0718",
        elevated: "#170d29",
        hover: "#251541",
        previewGradient: "linear-gradient(135deg, #c4b5fd 0%, #7c3aed 52%, #164e63 100%)",
        glowColor: "rgba(139, 92, 246, 0.45)",
        borderHighlight: "rgba(196, 181, 253, 0.42)",
    },
    {
        id: "moonstone",
        name: "Moonstone",
        accent: "#dbeafe",
        secondaryAccent: "#a5b4fc",
        background: "#030509",
        surface: "#080d17",
        elevated: "#101727",
        hover: "#1a2539",
        previewGradient: "linear-gradient(135deg, #f8fafc 0%, #a5b4fc 52%, #1e293b 100%)",
        glowColor: "rgba(219, 234, 254, 0.3)",
        borderHighlight: "rgba(248, 250, 252, 0.48)",
    },
    {
        id: "black-cherry",
        name: "Black Cherry",
        accent: "#e11d48",
        secondaryAccent: "#7f1d1d",
        background: "#060204",
        surface: "#110609",
        elevated: "#1d0a0f",
        hover: "#301018",
        previewGradient: "linear-gradient(135deg, #fb7185 0%, #be123c 50%, #450a0a 100%)",
        glowColor: "rgba(225, 29, 72, 0.42)",
        borderHighlight: "rgba(251, 113, 133, 0.42)",
    },
    {
        id: "royal-burgundy",
        name: "Royal Burgundy",
        accent: "#C77D8A",
        secondaryAccent: "#E7B0B8",
        background: "#140B0E",
        surface: "#201116",
        elevated: "#2C171D",
        hover: "#381D25",
        previewGradient: "linear-gradient(135deg, #140B0E 0%, #7A2638 100%)",
        glowColor: "rgba(199,125,138,0.20)",
        borderHighlight: "#743541",
    },
    {
        id: "espresso",
        name: "Espresso Noir",
        accent: "#D7A86E",
        secondaryAccent: "#F0CFA4",
        background: "#100C09",
        surface: "#1B1410",
        elevated: "#261B14",
        hover: "#32231A",
        previewGradient: "linear-gradient(135deg, #100C09 0%, #70472A 100%)",
        glowColor: "rgba(215,168,110,0.16)",
        borderHighlight: "#69472F",
    },
    {
        id: "olive-luxury",
        name: "Olive Luxury",
        accent: "#A6A16B",
        secondaryAccent: "#C8C294",
        background: "#11120D",
        surface: "#1B1C14",
        elevated: "#27281B",
        hover: "#323321",
        previewGradient: "linear-gradient(135deg, #11120D 0%, #62633A 100%)",
        glowColor: "rgba(166,161,107,0.14)",
        borderHighlight: "#57583A",
    },
    {
        id: "forest-reserve",
        name: "Forest Reserve",
        accent: "#79A887",
        secondaryAccent: "#A9C9AF",
        background: "#09110D",
        surface: "#101B15",
        elevated: "#17251C",
        hover: "#1F3025",
        previewGradient: "linear-gradient(135deg, #09110D 0%, #28563A 100%)",
        glowColor: "rgba(121,168,135,0.17)",
        borderHighlight: "#315C42",
    },
    {
        id: "mediterranean",
        name: "Mediterranean",
        accent: "#3C7E8F",
        secondaryAccent: "#79B4BE",
        background: "#0D1517",
        surface: "#142125",
        elevated: "#1B2D32",
        hover: "#243A40",
        previewGradient: "linear-gradient(135deg, #0D1517 0%, #347687 100%)",
        glowColor: "rgba(60,126,143,0.17)",
        borderHighlight: "#37626B",
    },
    {
        id: "lavender-twilight", // <-- Renamed from duplicate lavender-mist
        name: "Lavender Twilight",
        accent: "#8F8BB8",
        secondaryAccent: "#B9B6D8",
        background: "#101015",
        surface: "#181820",
        elevated: "#22222D",
        hover: "#2C2C3A",
        previewGradient: "linear-gradient(135deg, #101015 0%, #5C5887 100%)",
        glowColor: "rgba(143,139,184,0.16)",
        borderHighlight: "#54516F",
    },
    {
        id: "graphite",
        name: "Graphite Minimal",
        accent: "#AEB4BD",
        secondaryAccent: "#D2D6DC",
        background: "#0D0E10",
        surface: "#15171A",
        elevated: "#1E2125",
        hover: "#282C31",
        previewGradient: "linear-gradient(135deg, #0D0E10 0%, #565C64 100%)",
        glowColor: "rgba(174,180,189,0.10)",
        borderHighlight: "#3B3F45",
    },
    {
        id: "carbon-red",
        name: "Carbon Red",
        accent: "#E05D65",
        secondaryAccent: "#F0959A",
        background: "#0D0D0F",
        surface: "#171416",
        elevated: "#211A1C",
        hover: "#2D2022",
        previewGradient: "linear-gradient(135deg, #0D0D0F 0%, #742B32 100%)",
        glowColor: "rgba(224,93,101,0.18)",
        borderHighlight: "#632C31",
    },
];


export const MODELS = [
    { id: "sentio-ultra", name: "SENTIO Ultra", tagline: "Maximum intelligence", desc: "Best for complex reasoning" },
    { id: "sentio-pro", name: "SENTIO Pro", tagline: "Balanced performance", desc: "Best for everyday work" },
    { id: "sentio-fast", name: "SENTIO Fast", tagline: "Lightning fast", desc: "Best for quick answers" },
    { id: "reasoning", name: "Reasoning", tagline: "Deliberate, stepwise", desc: "Best for hard logic & math" },
    { id: "creative", name: "Creative", tagline: "Expressive & original", desc: "Best for writing & ideation" },
    { id: "code", name: "Code", tagline: "Precision engineering", desc: "Best for building software" },
];

// Helper: Converts hex color strings (#RRGGBB) to "R G B" format for Tailwind opacity support
const hexToRgb = (hex) => {
    if (!hex) return "148 163 184";
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { getToken, isSignedIn } = useAuth();
    const { user: clerkUser } = useUser();

    const navigate = useNavigate();

    // ----------------- State Management -----------------
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState({ totalChats: 0, favoriteChats: 0, archivedChats: 0 });
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [selectedModel, setSelectedModel] = useState("sentio-pro");
    const [model, setModel] = useState(false);
    const [id, setId] = useState("");

    // UI & Status states
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [filterFavorites, setFilterFavorites] = useState(false);
    const [filterArchived, setFilterArchived] = useState(false);
    const [loadingConversations, setLoadingConversations] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [contextPanelOpen, setContextPanelOpen] = useState(false);

    // ----------------- Theme State & Sync -----------------
    const [theme, setThemeState] = useState(() => {
        return localStorage.getItem("sentio_theme") || "obsidian-mono";
    });

    const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

    const setTheme = useCallback((themeId) => {
        setThemeState(themeId);
        localStorage.setItem("sentio_theme", themeId);
        toast.success(`Theme changed to ${THEMES.find((t) => t.id === themeId)?.name || "Unknown"}`);
    }, []);


    useEffect(() => {
        if (!activeTheme) return;

        const root = document.documentElement;

        // Accent colors
        root.style.setProperty(
            "--color-accent",
            hexToRgb(activeTheme.accent)
        );

        root.style.setProperty(
            "--color-accent-secondary",
            hexToRgb(activeTheme.secondaryAccent)
        );

        // Theme surfaces
        root.style.setProperty(
            "--theme-background",
            hexToRgb(activeTheme.background)
        );

        root.style.setProperty(
            "--theme-surface",
            hexToRgb(activeTheme.surface)
        );

        root.style.setProperty(
            "--theme-elevated",
            hexToRgb(activeTheme.elevated)
        );

        root.style.setProperty(
            "--theme-hover",
            hexToRgb(activeTheme.hover)
        );

        // ⭐ ADD: Border
        root.style.setProperty(
            "--theme-border",
            hexToRgb(activeTheme.borderHighlight)
        );

        // ⭐ ADD: Theme gradient
        root.style.setProperty(
            "--theme-gradient",
            activeTheme.previewGradient
        );

        // ⭐ ADD: Theme glow
        if (activeTheme.glowColor) {
            root.style.setProperty(
                "--color-accent-glow",
                activeTheme.glowColor
            );

            root.style.setProperty(
                "--theme-glow",
                activeTheme.glowColor
            );
        }
    }, [activeTheme]);

    // Abort controller ref to stop streaming anytime
    const abortControllerRef = useRef(null);

    // ----------------- Axios Interceptor for Clerk Auth -----------------
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(async (config) => {
            if (isSignedIn) {
                const token = await getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        });

        return () => axios.interceptors.request.eject(interceptor);
    }, [isSignedIn, getToken]);

    // ----------------- User APIs -----------------
    const syncCurrentUser = useCallback(async () => {
        if (!isSignedIn || !clerkUser) return;
        try {
            const displayName =
                clerkUser.username ||
                [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
                clerkUser.fullName ||
                "User";

            const res = await axios.post("/api/users/sync", {
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
                username: displayName,
                avatar: clerkUser.imageUrl || "",
            });
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (error) {
            console.error("Error syncing user:", error?.response?.data?.message || error.message);
        }
    }, [isSignedIn, clerkUser]);

    const fetchUserStats = useCallback(async () => {
        if (!isSignedIn) return;
        try {
            const res = await axios.get("/api/users/stats");
            if (res.data.success) {
                setUserStats(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error?.response?.data?.message || error.message);
        }
    }, [isSignedIn]);

    const updateUserProfile = useCallback(async (updates = {}) => {
        if (!isSignedIn) return null;
        try {
            const res = await axios.patch("/api/users/me", updates);
            if (res.data.success) {
                setUser(res.data.data);
                return res.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error updating user profile:", error?.response?.data?.message || error.message);
            return null;
        }
    }, [isSignedIn]);

    // ----------------- Conversation APIs -----------------
    const fetchConversations = useCallback(async () => {
        if (!isSignedIn) return;
        setLoadingConversations(true);
        try {
            const params = {};
            if (filterFavorites) params.favorite = "true";
            if (filterArchived) params.archived = "true";

            const res = await axios.get("/api/conversations", { params });
            if (res.data.success) {
                setConversations(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching conversations:", error?.response?.data?.message || error.message);
        } finally {
            setLoadingConversations(false);
        }
    }, [isSignedIn, filterFavorites, filterArchived]);

    const loadConversationDetails = useCallback(async (conversationId) => {
        if (!conversationId) return;
        setLoadingChat(true);
        try {
            const res = await axios.get(`/api/conversations/${conversationId}`);
            if (res.data.success) {
                setCurrentMessages(res.data.data.messages || []);
                setSelectedModel(res.data.data.model || "sentio-pro");
                setActiveConversationId(conversationId);
            }
        } catch (error) {
            console.error("Error loading chat:", error?.response?.data?.message || error.message);
        } finally {
            setLoadingChat(false);
        }
    }, []);

    const createNewConversation = async (title = "New conversation", modelToUse = selectedModel) => {
        try {
            const res = await axios.post("/api/conversations", { title, model: modelToUse });
            if (res.data.success) {
                const newConvo = res.data.data;
                setConversations((prev) => [newConvo, ...prev]);
                setActiveConversationId(newConvo._id);
                setCurrentMessages([]);
                fetchUserStats();
                return newConvo;
            }
        } catch (error) {
            console.error("Error creating conversation:", error?.response?.data?.message || error.message);
        }
    };

    const updateConversationMeta = async (conversationId, updates) => {
        try {
            const res = await axios.put(`/api/conversations/${conversationId}`, updates);
            if (res.data.success) {
                setConversations((prev) =>
                    prev.map((c) => (c._id === conversationId ? { ...c, ...updates } : c))
                );
                fetchUserStats();
            }
        } catch (error) {
            console.error("Error updating conversation:", error?.response?.data?.message || error.message);
        }
    };

    const deleteConversation = async (conversationId) => {
        try {
            await axios.delete(`/api/conversations/${conversationId}`);
            setConversations((prev) => prev.filter((c) => c._id !== conversationId));

            if (activeConversationId === conversationId) {
                setActiveConversationId(null);
                setCurrentMessages([]);
            }
            fetchUserStats();
        } catch (error) {
            console.error("Error deleting conversation:", error?.response?.data?.message || error.message);
        }
    };

    // ----------------- SSE Streaming Chat Handler -----------------
    const sendMessage = async (userText = "", attachments = []) => {
        if (!isSignedIn) {
            navigate("/");
            return;
        }

        if ((!userText.trim() && attachments.length === 0) || isStreaming) return;

        const messageText = userText.trim() || "Please analyze these images.";
        let convoId = activeConversationId;

        if (!convoId) {
            const title = messageText.slice(0, 30) + (messageText.length > 30 ? "..." : "");
            const newConvo = await createNewConversation(title, selectedModel);
            if (!newConvo) return;
            convoId = newConvo._id;
        }

        const userMsg = { role: "user", content: messageText, attachments };
        const updatedMessages = [...currentMessages, userMsg];

        setCurrentMessages(updatedMessages);
        setIsStreaming(true);

        try {
            await axios.post(`/api/conversations/${convoId}/messages`, userMsg);
        } catch (error) {
            console.error("Error saving user message:", error?.response?.data?.message || error.message);
        }

        setCurrentMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const token = await getToken();
            const response = await fetch(`${axios.defaults.baseURL || ""}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    messages: updatedMessages,
                    model: selectedModel,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`Chat API error: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantFullText = "";
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
                if (done) buffer += decoder.decode();

                const events = buffer.split("\n\n");
                buffer = events.pop() || "";

                for (const line of events) {
                    if (line.startsWith("data: ")) {
                        const payload = line.replace("data: ", "").trim();
                        if (payload === "[DONE]") break;

                        try {
                            const parsed = JSON.parse(payload);
                            if (parsed.text) {
                                assistantFullText += parsed.text;
                                setCurrentMessages((prev) => {
                                    const next = [...prev];
                                    next[next.length - 1] = {
                                        role: "assistant",
                                        content: assistantFullText,
                                    };
                                    return next;
                                });
                            }
                        } catch {
                            // Incomplete chunk parse skip
                        }
                    }
                }

                if (done) break;
            }

            if (assistantFullText) {
                await axios.post(`/api/conversations/${convoId}/messages`, {
                    role: "assistant",
                    content: assistantFullText,
                });
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Stream failed:", error);
            }
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
        }
    };

    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setIsStreaming(false);
        }
    };

    // ----------------- Lifecycle Triggers -----------------
    useEffect(() => {
        if (isSignedIn) {
            syncCurrentUser();
            fetchUserStats();
            fetchConversations();
        } else {
            setUser(null);
            setConversations([]);
            setActiveConversationId(null);
            setCurrentMessages([]);
        }
    }, [isSignedIn, syncCurrentUser, fetchUserStats, fetchConversations]);

    useEffect(() => {
        if (activeConversationId) {
            loadConversationDetails(activeConversationId);
        }
    }, [activeConversationId, loadConversationDetails]);

    const value = {
        // State
        user,
        userStats,
        conversations,
        activeConversationId,
        currentMessages,
        selectedModel,
        sidebarCollapsed,
        filterFavorites,
        filterArchived,
        loadingConversations,
        loadingChat,
        isStreaming,
        model,
        contextPanelOpen,
        theme,
        activeTheme,
        id,
        navigate,

        // State Setters
        setActiveConversationId,
        setTheme,
        setSelectedModel,
        setSidebarCollapsed,
        setFilterFavorites,
        setFilterArchived,
        setModel,
        setContextPanelOpen,
        setId,

        // Actions / APIs
        sendMessage,
        stopStreaming,
        createNewConversation,
        updateConversationMeta,
        deleteConversation,
        fetchConversations,
        fetchUserStats,
        updateUserProfile,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};


