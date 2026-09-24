import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { CreateProject, DeleteProject, GetProjects, GetSingleProject, UpdateProject } from "../controllers/project.controller.js";

const ProjectRoute = express.Router();

ProjectRoute.post("/organizations/:organizationId/projects", AuthMiddleware,CreateProject);
ProjectRoute.get("/organizations/:organizationId/projects", AuthMiddleware,GetProjects);
ProjectRoute.get("/:projectId", AuthMiddleware,GetSingleProject);
ProjectRoute.patch("/:projectId", AuthMiddleware,UpdateProject);
ProjectRoute.delete("/:projectId", AuthMiddleware,DeleteProject);
export default ProjectRoute;
