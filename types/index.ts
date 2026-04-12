export interface ActivityItem {
    type: 'video' | 'text' | 'member';
    title: string;
    desc: string;
    time: string;
}

export interface Space {
    name: string;
    avatar: string;
    description: string;
    textCount: number;
    videoCount: number;
    members?: string;
    slug: string;
}

export interface Badge {
    label: string;
    css: string;
}

export interface Testimonial {
    id: string;
    name: string;
    title?: string;
    avatar?: string;
    initials?: string;
    bg?: string;
    rating?: number;
    ratingPos?: 'name' | 'bottom' | 'right' | 'none';
    badge?: Badge;
    content: string;
    isVideo?: boolean;
    teamReply?: string;
    date?: string;
    action?: string | null;
    actionIcon?: boolean;
}

export type ViewMode = 'grid' | 'list';
