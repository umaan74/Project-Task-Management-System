import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { CreateProject } from "../controllers/project.controller.js";

const ProjectRoute = express.Router();

ProjectRoute.post("/organizations/:organizationId/projects", AuthMiddleware,CreateProject);
ProjectRoute.get("/organizations/:organizationId/projects", AuthMiddleware);
ProjectRoute.get("/projects/:projectId", AuthMiddleware);
ProjectRoute.patch("/projects/:projectId", AuthMiddleware);
ProjectRoute.delete("/projects/:projectId", AuthMiddleware);
export default ProjectRoute;
