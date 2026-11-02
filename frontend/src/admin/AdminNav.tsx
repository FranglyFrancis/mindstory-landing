import type { ComponentType, ReactNode } from "react";
import type { PageProps } from "./adminPage";
import SuccessStoriesPage from "./SuccessStoriesPage";
import ServicesPage from "./ServicesPage";
import BrandsPage from "./BrandsPage";
import BlogsPage from "./BlogsPage";
import FaqsPage from "./FaqsPage";
import UsersPage from "./UsersPage";
import { BlogIcon, BrandsIcon, FaqIcon, ServicesIcon, StoriesIcon, UsersIcon } from "./AdminIcons";

export type NavItem = {
  id: string; // also the URL hash: #stories
  label: string;
  icon: ReactNode;
  page: ComponentType<PageProps>;
  superOnly?: boolean; // visible to super admins only
};

export const NAV_ITEMS: NavItem[] = [
  { id: "stories", label: "Success Stories", icon: <StoriesIcon />, page: SuccessStoriesPage },
  { id: "services", label: "Services", icon: <ServicesIcon />, page: ServicesPage },
  { id: "brands", label: "Brands", icon: <BrandsIcon />, page: BrandsPage },
  { id: "blogs", label: "Blogs", icon: <BlogIcon />, page: BlogsPage },
  { id: "faqs", label: "FAQs", icon: <FaqIcon />, page: FaqsPage },
  { id: "users", label: "Users", icon: <UsersIcon />, page: UsersPage, superOnly: true },
];