// Home
import { ComponentType, ReactNode } from "react";

export type Blog = {
    id: number;
    image: string;
    title: string;
    description: string;
    url: string;
}

export type Brand = {
    id: number;
    image: string;
    brand: string; 
}

export type Card = {
    id: number;
    image: string;
    title: string;
}

export type Faq = {
    id: number;
    question: string;
    answer: string;
}

export type HomeList = {
    id: number;
    title: string;
    description: string;
    image: string;
}

export type Testimony = {
    id: number;
    name: string;
    text: string;
}

// Services
export type CommonService = {
    id: number;
    slug: string;
    image: string;
    title: string;
    description: string;
    Section: ComponentType;
}

export type Service = {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string;
}

export type ServiceHero = {
    title: string;
    description: string;
    image: string;
}

export type SectionItem = {
        id: number;
        title: string;
        description: string;
}

export type Section = {
    id: number;
    title: string;
    image: string;
    content: SectionItem[]
}

export type SectionData = {
    image: string;
    description: string;
}

export type List = {
    id: number;
    icon: string;
    title: string;
    description: string;
}
