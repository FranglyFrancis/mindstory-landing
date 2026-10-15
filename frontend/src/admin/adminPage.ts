import { createContext, useContext, useEffect } from "react";
import type { AdminUser } from "./api";

/** Every dashboard page receives the signed-in user and the rest of the URL hash.
 *  Example: #stories/edit/42  ->  page "stories", path ["edit", "42"].
 *  Existing pages that only take { user } keep working unchanged. */
export type PageProps = { user: AdminUser; path: string[] };

export const PageCrumbContext = createContext<(label: string | null) => void>(() => undefined);

/** A page calls this to add a last breadcrumb, e.g. usePageCrumb("Add story"). */
export function usePageCrumb(label: string | null): void {
  const set = useContext(PageCrumbContext);
  useEffect(() => {
    set(label);
    return () => set(null);
  }, [label, set]);
}
