
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
    },

    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Efficiently find active sessions of a user
SessionSchema.index({
  userId: 1,
  revoked: 1,
});

// Prevent duplicate refresh token hashes
SessionSchema.index(
  { refreshTokenHash: 1 },
  { unique: true }
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;
