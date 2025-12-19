import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    work_policy: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    employment_type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true
    },

    experience_level: {
      type: String,
      enum: ["Junior", "Mid", "Senior", "Lead"],
      required: true
    },

    job_type: {
      type: String,
      enum: ["Tech", "Non-Tech", "Management", "Design"],
      required: true
    },

    salary_range: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: "INR"
      }
    },

    job_slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    
    },

    posted_days_ago: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
