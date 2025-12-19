import mongoose from "mongoose";

const ContentSectionSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    order: {
      type: Number,
      required: true
    }
  },

);

const BenefitCardSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },

);


const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    tagline: {
      type: String
    },
    logoUrl: {
      type: String
    },
    bannerUrl: {
      type: String
    },
    primaryColor: {
      type: String,
      default: "#4f46e5"
    },
    secondaryColor: {
      type: String,
      default: "#111827"
    },
    cultureVideoUrl: {
      type: String
    },
    contentSections: {
      type: [ContentSectionSchema],
      default: []
    },
    benefitCards: {
      type: [BenefitCardSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
