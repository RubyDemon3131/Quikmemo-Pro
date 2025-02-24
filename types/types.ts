import { LucideIcon } from "lucide-react";

export interface IUser {
    userImage?: string | null;
    userName?: string;
    userEmail?: string;
}
export interface IFeatures {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface IUseCases {
    title: string;
    description: string;
    photo: string;
}

export interface ITestimonials {
    avatar: string;
    name: string;
    title: string;
    quote: string
}

export interface IFAQs {
    id: number;
    question: string;
    answer: string
}

export interface IFooter {
    title: string;
    links: string[]
}

export interface INote {
    id: string;
    title: string;
    content: string;
    tags?: string[];
    lastEdited?: string;
    isArchived?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

