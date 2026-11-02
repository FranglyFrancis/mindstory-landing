import { useEffect, useState } from "react";

const NARROW_QUERY = "(max-width: 800px)";
const SIDEBAR_PREF_KEY = "ad-sidebar"; // same key as before, so saved choices carry over

/* ---------- sidebar preference ---------- */
const readSidebarPref = (): string | null => {
  try {
    return localStorage.getItem(SIDEBAR_PREF_KEY);
  } catch {
    return null;
  }
};

export const writeSidebarPref = (value: "open" | "closed"): void => {
  try {
    localStorage.setItem(SIDEBAR_PREF_KEY, value);
  } catch {
    /* storage unavailable */
  }
};

// Phones: closed. Desktop: whatever was chosen last time (open if never chosen).
export const defaultSidebarOpen = (narrow: boolean): boolean =>
  !narrow && readSidebarPref() !== "closed";

/* ---------- screen size ---------- */
export function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(NARROW_QUERY);
    const handleChange = () => setNarrow(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return narrow;
}

/* ---------- hash route ---------- */
// "#stories/edit/42" -> ["stories", "edit", "42"]
const readHash = (): string[] =>
  window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);

// The page lives in the URL hash (#stories, #stories/new) so refresh and the back button keep your place.
export function useHashRoute(): string[] {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const handleHashChange = () => setRoute(readHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route;
}