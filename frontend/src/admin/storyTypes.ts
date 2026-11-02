export type Strategy = { icon: string; title: string; description: string };
export type Outcome = { title: string; description: string };

export type Story = {
  _id?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  projectName: string;
  projectDescription: string;
  projectHistory: string;
  projectImage: string;
  projectLogo: string;
  impact?: string;
  challenges?: string;
  strategyOverview: string;
  strategies: Strategy[];
  resultsOverview: string;
  keyOutcomes: Outcome[];
  conclusion: string;
  galleryEnabled: boolean;
  gallery: string[];
};

export type Note = { ok: boolean; text: string } | null;

export const LIST_HASH = "stories";

export const emptyStory = (): Story => ({
  projectName: "",
  projectDescription: "",
  projectHistory: "",
  projectImage: "",
  projectLogo: "",
  impact: "",
  challenges: "",
  strategyOverview: "",
  strategies: [],
  resultsOverview: "",
  keyOutcomes: [],
  conclusion: "",
  galleryEnabled: false,
  gallery: [],
});

const REQUIRED_FIELDS: [keyof Story, string][] = [
  ["projectName", "Project Name"],
  ["projectDescription", "Project Description"],
  ["projectHistory", "Project History"],
  ["projectImage", "Project Image"],
  ["projectLogo", "Project Logo"],
  ["strategyOverview", "Strategy and Implementation"],
  ["resultsOverview", "Results and Impact"],
  ["conclusion", "Conclusion"],
];

/** The names of the required fields that are still empty. */
export const missingFieldLabels = (story: Story): string[] =>
  REQUIRED_FIELDS.filter(([key]) => !String(story[key] ?? "").trim()).map(([, label]) => label);

export const lastChanged = (story: Story): string => story.updatedAt ?? story.createdAt ?? "";

export const formatDate = (iso?: string): string =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";