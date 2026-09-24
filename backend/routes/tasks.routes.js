import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { AssignTask, CreateTask, DeleteTask, GetProjectTasks, GetTask, UpdateTask } from '../controllers/tasks.controller.js';

const TaskRouter=express.Router();

TaskRouter.post("/projects/:projectId/tasks",AuthMiddleware,CreateTask)

TaskRouter.get("/projects/:projectId/tasks",AuthMiddleware,GetProjectTasks)

TaskRouter.get("/tasks/:taskId",AuthMiddleware,GetTask);

TaskRouter.patch("/tasks/:taskId",AuthMiddleware,UpdateTask)

TaskRouter.patch("/tasks/:taskId/assign",AuthMiddleware,AssignTask)

TaskRouter.delete("/tasks/:taskId",AuthMiddleware,DeleteTask)
export default TaskRouter;
