import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    role: {
      type: String,
      enum: ["TEAM_LEADER", "DEVELOPER"],
      default: "DEVELOPER"
    },

    avatar: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);