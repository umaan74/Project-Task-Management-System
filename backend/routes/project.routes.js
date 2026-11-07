
import express from "express";

import { AuthMiddleware } from "../middleware/auth.middleware.js";

import {
  CreateProject,
  DeleteProject,
  GetProjects,
  GetSingleProject,
  UpdateProject,
} from "../controllers/project.controller.js";

const ProjectRoute = express.Router();

// Create project inside an organization
ProjectRoute.post(
  "/organizations/:organizationId/projects",
  AuthMiddleware,
  CreateProject
);

// Get all projects of an organization
ProjectRoute.get(
  "/organizations/:organizationId/projects",
  AuthMiddleware,
  GetProjects
);

ProjectRoute.get("/projects/:projectId", AuthMiddleware, GetSingleProject);

ProjectRoute.patch("/projects/:projectId", AuthMiddleware, UpdateProject);

ProjectRoute.delete("/projects/:projectId", AuthMiddleware, DeleteProject);
export default ProjectRoute;
