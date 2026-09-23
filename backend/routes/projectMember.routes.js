import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { AddProjectMember, GetProjectMembers, RemoveProjectMember } from '../controllers/projectMember.controller.js';

const ProjectMemberRoutes=express.Router();

ProjectMemberRoutes.post("/:projectId/members",AuthMiddleware,AddProjectMember);
ProjectMemberRoutes.get("/:projectId/members",AuthMiddleware,GetProjectMembers);
ProjectMemberRoutes.delete("/:projectId/members/:userId",AuthMiddleware,RemoveProjectMember);


export default ProjectMemberRoutes

// POST   /api/projects/:projectId/members
//        → Assign an organization member to a project
//        → Admin only

// GET    /api/projects/:projectId/members
//        → Get all members assigned to a project

// DELETE /api/projects/:projectId/members/:userId
//        → Remove a member from a project
//        → Admin only