import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "node:dns";
import ConnectDB from "./config/db.js";

import authRouter from "./routes/auth.routes.js";
import OrganRouter from "./routes/organization.routes.js";
import OrganMemberRouter from "./routes/organizationMember.routes.js";
import ProjectRoute from "./routes/project.routes.js";
import ProjectMemberRoutes from "./routes/projectMember.routes.js";
import TaskRouter from "./routes/tasks.routes.js";
dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();

const port = process.env.SERVER_PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Global middleware
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Task Management API is running",
  });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/organizations", OrganMemberRouter);
app.use("/api/organizations", OrganRouter);
app.use("/api", TaskRouter);
app.use("/api", ProjectRoute);
app.use("/api/projects", ProjectMemberRoutes);

// Handle unknown routes
app.use((req, res) => {
  return res.status(404).json({
    message: "API route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  return res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start server only after successful database connection
async function StartServer() {
  try {
    await ConnectDB();

    app.listen(port, () => {
      console.log(`Server is listening on Port: ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

StartServer();
