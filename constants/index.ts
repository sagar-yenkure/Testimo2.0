export const SPACE_DETAIL_TABS = ["All", "Video", "Text", "Highlighted", "Liked", "Archived", "Spam"];

export const SEND_MSG_MIN_LIMIT = 100;
export const SEND_MSG_MAX_LIMIT = 500;

export const SIDEBAR_SPACES = [
    { label: "Gojo Satoru's Space", value: "gojo" },
    { label: "Obsidian Logic App", value: "obsidian" },
    { label: "Testimo Marketing", value: "testimo" },
];

export const NAVIGATION_GROUPS = {
    MANAGEMENT: [
        { label: "Inbox", icon: "Monitor" },
        { label: "Embed Widgets", icon: "LayoutGrid" },
        { label: "Integrations", icon: "Sparkles" },
    ],
    SUPPORT: [
        { label: "Help Center", icon: "HelpCircle" },
        { label: "What's New", icon: "Star" },
    ]
};

export const THEMES = ["light", "dark", "system"] as const;
export const BG_STYLES = ["none", "dots", "grid", "waves", "circles"] as const;
export const FONT_STYLES = ["inter", "roboto", "outfit"] as const;
export const LANGUAGES = ["en", "ar", "jn"] as const;