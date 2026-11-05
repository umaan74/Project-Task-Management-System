import express from "express";

import { AuthMiddleware } from "../middleware/auth.middleware.js";

import {
  AssignTask,
  CreateTask,
  DeleteTask,
  GetProjectTasks,
  GetTask,
  UpdateTask,
} from "../controllers/tasks.controller.js";

const TaskRouter = express.Router();

// Create task
TaskRouter.post("/projects/:projectId/tasks", AuthMiddleware, CreateTask);

// Get all tasks of a project
TaskRouter.get("/projects/:projectId/tasks", AuthMiddleware, GetProjectTasks);

// Get single task
TaskRouter.get("/tasks/:taskId", AuthMiddleware, GetTask);

// Update task status
TaskRouter.patch("/tasks/:taskId", AuthMiddleware, UpdateTask);

// Assign task to another project member
TaskRouter.patch("/tasks/:taskId/assign", AuthMiddleware, AssignTask);

// Delete task
TaskRouter.delete("/tasks/:taskId", AuthMiddleware, DeleteTask);

export default TaskRouter;
