import { Schema, model } from "mongoose";

const text = { type: String, required: true, trim: true };

// "Add Strategy+" items
const strategySchema = new Schema(
  {
    icon: { type: String, default: "" },
    title: text,
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

// "Add Key Outcomes+" items
const outcomeSchema = new Schema(
  { 
    title: text,
    description: { type: String, default: "", trim: true } 
  },
  { _id: false });

const successStorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true }, // used for the card link: /success-stories/<slug>
    projectName: text,
    projectDescription: text, // short text: shown on the homepage card and at the top of the project page
    projectHistory: text,
    projectImage: text, // card image
    projectLogo: text,
    impact: text, // "Impact of Mindstory"
    challenges: text, // "Challenges faced"
    strategyOverview: text, // "Strategy and Implementation"
    strategies: { type: [strategySchema], default: [] },
    resultsOverview: text, // "Results and Impact"
    keyOutcomes: { type: [outcomeSchema], default: [] },
    galleryEnabled: { type: Boolean, default: false },
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const SuccessStory = model("SuccessStory", successStorySchema);
