import { HERO, SECTION_BY_KEY, cleanValue, validateValue } from "./serviceSections";
import { SLUG_PATTERN } from "./serviceTypes";
import type { Details, Obj } from "./serviceTypes";

type BuildInput = {
  details: Details;
  hero: Obj;
  keys: string[]; // sections on the page, in order
  values: Obj; // section key -> content
  hidden: string[]; // sections switched off for the website
};

// revealKey is the section to open and scroll to, when the problem is inside a section.
export type BuildResult = { body: Obj } | { error: string; revealKey?: string };

const fail = (error: string, revealKey?: string): BuildResult => ({ error, revealKey });

/** Checks everything in the form. Returns the request body, or the first problem as a sentence. */
export function buildServiceBody({ details, hero, keys, values, hidden }: BuildInput): BuildResult {
  const title = details.title.trim();
  const slug = details.slug.trim();
  const cardTitle = details.cardTitle.trim();
  const description = details.description.trim();

  if (!title) return fail("Enter the service name.");
  if (!SLUG_PATTERN.test(slug)) return fail("The page address can only use lowercase letters, numbers and hyphens.");
  if (!details.image) return fail("Upload the card image.");
  if (!Number.isFinite(Number(details.order))) return fail("Order must be a number.");
  if (!details.category) return fail("Choose the navbar category.");
  if (!description) return fail("Enter the short description shown on the service card.");
  if (!cardTitle) return fail("Enter the Service Card title.");
  if (!details.cardImage.trim()) return fail("Upload the Service Card image.");

  const heroClean = cleanValue(HERO, hero);
  const heroProblem = validateValue(HERO, heroClean, "Hero banner");
  if (heroProblem) return fail(heroProblem);

  const body: Obj = {
    title,
    slug,
    image: details.image,
    order: Number(details.order),
    category: details.category,
    cardTitle,
    description,
    cardImage: details.cardImage,
    hero: heroClean,
    sectionOrder: keys,
    hiddenSections: hidden.filter((key) => keys.includes(key)),
  };

  for (const key of keys) {
    const def = SECTION_BY_KEY[key];
    const cleaned = cleanValue(def, values[key]);
    const problem = validateValue(def, cleaned, def.label);
    if (problem) return fail(problem, key);
    body[key] = cleaned;
  }

  return { body };
}