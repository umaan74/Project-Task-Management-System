import mongoose from "mongoose";
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import Task from "../models/task.model.js";

export async function CreateProject(req, res) {
  try {
    const userId = req.user.userId;
    const { organizationId } = req.params;
    if (!mongoose.isValidObjectId(organizationId)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    const requesterMembership = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!requesterMembership) {
      return res.status(403).json({
        message: "Only organization admins can create projects",
      });
    }

    const { name, description, status, startDate, dueDate } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "Project name is required" });
    }
    if (
      !startDate ||
      !dueDate ||
      Number.isNaN(new Date(startDate).getTime()) ||
      Number.isNaN(new Date(dueDate).getTime()) ||
      new Date(dueDate) < new Date(startDate)
    ) {
      return res.status(400).json({
        message: "Valid start and due dates are required, and due date cannot be before start date",
      });
    }

    const UpdatedProject = await Project.create({
      createdBy: userId,
      organizationId,
      name: name.trim(),
      description,
      status,
      startDate,
      dueDate,
    });

    return res.status(201).json({
      message: "Project Created Successfully",
      UpdatedProject,
    });
  } catch (error) {
    console.error("CreateProject Error:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: error.name === "ValidationError" ? error.message : "Unable to create project",
    });
  }
}

export async function GetProjects(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;
    if (!mongoose.isValidObjectId(organizationId)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    const requesterMembership = await OrganizationMember.findOne({
      userId,
      organizationId,
    });

    if (!requesterMembership) {
      return res.status(403).json({
        message: "You are not a member of this organization",
      });
    }

    if (requesterMembership.role === "admin") {
      const All_Projects = await Project.find({ organizationId }).sort({ createdAt: -1 });
      return res.status(200).json({
        message: "All Projects fetched Successfully",
        All_Projects,
      });
    }

    const projectIds = await ProjectMember.distinct("projectId", { userId });
    const AssignedProjects = await Project.find({
      organizationId,
      _id: { $in: projectIds },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All Assigned Projects fetched Successfully",
      AssignedProjects,
    });
  } catch (error) {
    console.error("GetProjects Error:", error);
    return res.status(500).json({ message: "Unable to fetch projects" });
  }
}

export async function GetSingleProject(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const requestedProject = await Project.findById(projectId);

    if (!requestedProject) {
      return res.status(404).json({
        message: "The requested Project doesn't Exist",
      });
    }

    const RequesterIsOrganizationMem = await OrganizationMember.findOne({
      organizationId: requestedProject.organizationId,
      userId: userId,
    });
    if (!RequesterIsOrganizationMem) {
      return res.status(403).json({
        message: "User is not a member of the organization",
      });
    }

    if (RequesterIsOrganizationMem.role !== "admin") {
      const isProjectMember = await ProjectMember.exists({ projectId, userId });
      if (!isProjectMember) {
        return res.status(403).json({
          message: "User is not a member of the project",
        });
      }
    }

    return res.status(200).json({
      message: "Requested Project accessed Successfully",
      Project: requestedProject,
    });
  } catch (error) {
    console.error("GetSingleProject Error:", error);
    return res.status(500).json({
      message: "Unable to fetch project",
    });
  }
}

// UpdateProject
export async function UpdateProject(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const requestedProject = await Project.findById(projectId);

    if (!requestedProject) {
      return res.status(404).json({
        message: "The requested Project doesn't Exist",
      });
    }

    const RequesterIsOrganizationMem = await OrganizationMember.findOne({
      organizationId: requestedProject.organizationId,
      userId: userId,
    });
    if (!RequesterIsOrganizationMem) {
      return res.status(403).json({
        message: "User is not a member of the organization",
      });
    }

    if (RequesterIsOrganizationMem.role !== "admin") {
      return res.status(403).json({
        message: "Only organization admin can update the project",
      });
    }

    const updates = {};
    for (const field of ["name", "description", "status", "startDate", "dueDate"]) {
      if (Object.hasOwn(req.body, field)) updates[field] = req.body[field];
    }

    if (Object.hasOwn(updates, "name")) {
      updates.name = updates.name?.trim();
      if (!updates.name) {
        return res.status(400).json({ message: "Project name is required" });
      }
    }

    const startDate = updates.startDate ?? requestedProject.startDate;
    const dueDate = updates.dueDate ?? requestedProject.dueDate;
    if (
      !startDate ||
      !dueDate ||
      Number.isNaN(new Date(startDate).getTime()) ||
      Number.isNaN(new Date(dueDate).getTime()) ||
      new Date(dueDate) < new Date(startDate)
    ) {
      return res.status(400).json({
        message: "Project dates must be valid and the due date cannot be before the start date",
      });
    }

    const UpdatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Project Updated Successfully",
      Project: UpdatedProject,
    });
  } catch (error) {
    console.error("UpdateProject Error:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: error.name === "ValidationError" ? error.message : "Unable to update project",
    });
  }
}
// DELETE FUNCTION
export async function DeleteProject(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "The requested project was not found",
      });
    }

    const requester = await OrganizationMember.findOne({
      userId,
      organizationId: project.organizationId,
    });

    if (!requester || requester.role !== "admin") {
      return res.status(403).json({
        message: "Only organization admins can delete projects",
      });
    }

    await Task.deleteMany({ projectId });
    await ProjectMember.deleteMany({ projectId });
    await project.deleteOne();

    return res.status(200).json({
      message: "Project and its tasks and memberships deleted successfully",
    });
  } catch (error) {
    console.error("DeleteProject Error:", error);
    return res.status(500).json({ message: "Unable to delete project" });
  }
}
