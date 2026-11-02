
import { useCallback, useEffect, useState } from "react";
import { SECTIONS, SECTION_BY_KEY, emptyValue, hasContent } from "./serviceSections";
import type { Doc, Obj } from "./serviceTypes";

const omitKey = (object: Obj, key: string): Obj =>
  Object.fromEntries(Object.entries(object).filter(([name]) => name !== key));

const prefersReducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useSectionList() {
  const [keys, setKeys] = useState<string[]>([]); // sections on the page, in order
  const [values, setValues] = useState<Obj>({}); // section key -> content
  const [hidden, setHidden] = useState<string[]>([]); // switched off for the website (content is kept)
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [focusKey, setFocusKey] = useState<string | null>(null);

  // Bring a newly added (or invalid) section into view.
  useEffect(() => {
    if (!focusKey) return;

    const card = document.getElementById(`sv-sec-${focusKey}`);
    if (card) {
      card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      (card.querySelector("input,textarea,select") as HTMLElement | null)?.focus({ preventScroll: true });
    }
    setFocusKey(null);
  }, [focusKey]);

  /** Sections that have content, in the saved order (the rest follow in the website's default order). */
  const loadFrom = useCallback((doc: Doc) => {
    const present = SECTIONS.map((section) => section.key).filter((key) => hasContent(doc[key]));
    const saved = (doc.sectionOrder ?? []).filter((key) => present.includes(key));
    const ordered = [...saved, ...present.filter((key) => !saved.includes(key))];

    setKeys(ordered);
    setValues(Object.fromEntries(ordered.map((key) => [key, doc[key]])));
    setHidden((doc.hiddenSections ?? []).filter((key) => ordered.includes(key)));
  }, []);

  /** Opens a section card and scrolls to it. */
  const reveal = useCallback((key: string) => {
    setOpen((current) => ({ ...current, [key]: true }));
    setFocusKey(key);
  }, []);

  const add = (key: string) => {
    if (keys.includes(key)) return;

    setKeys((current) => [...current, key]);
    setValues((current) => ({ ...current, [key]: current[key] ?? emptyValue(SECTION_BY_KEY[key]) }));
    reveal(key);
  };

  const remove = (key: string) => {
    const def = SECTION_BY_KEY[key];
    const confirmed =
      !hasContent(values[key]) ||
      window.confirm(
        `Remove "${def.label}"? Its content is deleted when you save.\n\nTo keep it but hide it on the website, use "Show on website" instead.`
      );
    if (!confirmed) return;

    setKeys((current) => current.filter((item) => item !== key));
    setHidden((current) => current.filter((item) => item !== key));
    setValues((current) => omitKey(current, key));
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;

    setKeys((current) => {
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const toggleShown = (key: string) =>
    setHidden((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));

  const toggleOpen = (key: string) => setOpen((current) => ({ ...current, [key]: !current[key] }));

  const setValue = (key: string, value: unknown) => setValues((current) => ({ ...current, [key]: value }));

  return { keys, values, hidden, open, loadFrom, reveal, add, remove, move, toggleShown, toggleOpen, setValue };
}