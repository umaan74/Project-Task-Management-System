
import mongoose from "mongoose";

const organizationMember_Schema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

organizationMember_Schema.index(
  { organizationId: 1, userId: 1 },
  { unique: true }
);

const OrganizationMember = mongoose.model(
  "OrganizationMember",
  organizationMember_Schema
);

export default OrganizationMember;
