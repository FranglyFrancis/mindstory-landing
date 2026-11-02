import { createContext, useContext, useEffect } from "react";
import type { AdminUser } from "./api";

export type PageProps = { user: AdminUser; path: string[] };

export const PageCrumbContext = createContext<(label: string | null) => void>(() => undefined);

/** A page calls this to add a last breadcrumb, e.g. usePageCrumb("Add story"). */
export function usePageCrumb(label: string | null): void {
  const setCrumb = useContext(PageCrumbContext);

  useEffect(() => {
    setCrumb(label);
    return () => setCrumb(null); // cleared when the page unmounts, so no stale crumb after switching sections
  }, [label, setCrumb]);
}