import { Schema, model } from "mongoose";

const requiredText = { type: String, required: true, trim: true };
const optionalText = { type: String, default: "", trim: true };

// "Add Strategy+" items
const strategySchema = new Schema(
  {
    icon: { type: String, default: "" },
    title: requiredText,
    description: optionalText,
  },
  { _id: false }
);

// "Add Key Outcomes+" items
const outcomeSchema = new Schema(
  {
    title: requiredText,
    description: optionalText,
  },
  { _id: false }
);

const successStorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true }, // used for the card link: /success-stories/<slug>

    // ---- Card and page header ----
    projectName: requiredText,
    projectDescription: requiredText, // short text: shown on the homepage card and at the top of the project page
    projectHistory: requiredText,
    projectImage: requiredText, // card image
    projectLogo: requiredText,

    // ---- Story sections ----
    impact: { type: String, trim: true }, // "Impact of Mindstory"
    challenges: { type: String, trim: true }, // "Challenges faced"
    strategyOverview: requiredText, // "Strategy and Implementation"
    strategies: { type: [strategySchema], default: [] },
    resultsOverview: requiredText, // "Results and Impact"
    keyOutcomes: { type: [outcomeSchema], default: [] },
    conclusion: requiredText, // "Conclusions"

    // ---- Gallery ----
    galleryEnabled: { type: Boolean, default: false },
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const SuccessStory = model("SuccessStory", successStorySchema);