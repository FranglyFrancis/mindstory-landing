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
    image: string;
    brand: string; 
}

export type Card = {
    id: number;
    image: string;
    title: string;
}

export type Faq = {
    question: string;
    answer: string;
}

export type HomeList = {
    title: string;
    description: string;
    image: string;
}

export type Testimony = {
    id: number | string;
    name: string;
    text: string;
    rating?: number;
    photo?: string; 
    when?: string;  
};

// Services
export type CommonService = {
    slug: string;
    image: string;
    title: string;
    description: string;
    Section: ComponentType;
}

export type Service = {
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

export type SectionHeading = {
    title: string;
    description: string;
}

export type SectionItem = {
        title: string;
        description: string;
}

export type ExpertiseCard = {
    title: string;
    url: string;
    image: string;
}

export type Section = {
    title: string;
    image: string;
    content: SectionItem[]
}

export type ImageItem = {
    image: string;
    description: string;
}

export type List = {
    icon: string;
    title: string;
    description: string;
}

export type ServiceData = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  order: number;
  hero: { title: string; description: string; image: string };

  heading?: { title: string; description?: string };
  intro?: { title: string; left: string; right: string[] };
  article?: { heading?: string; paragraphs: string[] };
  summary?: string;
  mainImage?: string;
  lists?: { icon: string; title: string; description: string }[];
  titleCards?: { title: string; description: string }[];
  iconCards?: { icon: string; title: string; description: string }[];
  features?: {
    title?: string;
    description: string;
    image: string;
    imagePosition: "left" | "right";
  }[];
  sections?: {
    title: string;
    image: string;
    content: { title: string; description: string }[];
  }[];
  brands?: { image: string; brand: string }[];
  faqs?: { question: string; answer: string }[];
};
