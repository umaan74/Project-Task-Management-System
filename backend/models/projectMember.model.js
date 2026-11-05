
import mongoose from "mongoose";

const ProjectMemberSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Same user can join multiple projects,
// but cannot be added twice to the same project.
ProjectMemberSchema.index(
  { projectId: 1, userId: 1 },
  { unique: true }
);

const ProjectMember = mongoose.model(
  "ProjectMember",
  ProjectMemberSchema
);

export default ProjectMember;
