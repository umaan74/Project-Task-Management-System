
import mongoose from "mongoose";
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import Task from "../models/task.model.js";


export async function AddProjectMember(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;
    const targetedUserId = req.body.userId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    if (!mongoose.isValidObjectId(targetedUserId)) {
      return res.status(400).json({
        message: "Please select a member",
      });
    }

    // Check project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check organization admin
    const isAdmin = await OrganizationMember.findOne({
      userId,
      organizationId: project.organizationId,
      role: "admin",
    });

    if (!isAdmin) {
      return res.status(403).json({
        message: "Only organization admins can add project members",
      });
    }

    // Check target user belongs to same organization
    const targetMember = await OrganizationMember.findOne({
      userId: targetedUserId,
      organizationId: project.organizationId,
    }).populate("userId", "_id");

    if (!targetMember?.userId) {
      return res.status(403).json({
        message: "Selected user is not a valid member of this organization",
      });
    }

    // Prevent duplicate assignment to same project
    const alreadyAssigned = await ProjectMember.findOne({
      userId: targetedUserId,
      projectId,
    });

    if (alreadyAssigned) {
      return res.status(409).json({
        message: "This member is already assigned to this project",
      });
    }

    // Create project member
    const NewMember = await ProjectMember.create({
      projectId,
      userId: targetedUserId,
      assignedBy: userId,
      assignedAt: new Date(),
    });

    return res.status(201).json({
      message: "Member successfully added to project",
      NewMember,
    });

  } catch (error) {
    console.error("ADD PROJECT MEMBER ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This member is already assigned to this project",
      });
    }

    return res.status(500).json({
      message: "Failed to add project member",
      error: error.message,
    });
  }
}
    

export async function GetProjectMembers(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isAdmin = await OrganizationMember.findOne({
      userId,
      organizationId: project.organizationId,
      role: "admin",
    });

    const isProjectMember = await ProjectMember.findOne({
      userId,
      projectId,
    });

    if (!isAdmin && !isProjectMember) {
      return res.status(403).json({
        message: "You don't have permission to view Project Members",
      });
    }

    const organizationUserIds = new Set(
      (await OrganizationMember.distinct("userId", {
        organizationId: project.organizationId,
      })).map(String)
    );

    const Project_Members = (await ProjectMember.find({ projectId })
      .populate("userId", "username email")
      .populate("assignedBy", "username email"))
      .filter(
        (member) =>
          member.userId &&
          organizationUserIds.has(String(member.userId._id))
      );

    return res.status(200).json({
      message: "Project members fetched successfully",
      Project_Members,
    });
  } catch (error) {
    console.error("GetProjectMembers Error:", error);

    return res.status(500).json({
      message: "Failed to fetch project members",
    });
  }
}

export async function RemoveProjectMember(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;
    const targetUserId = req.params.userId;

    if (
      !mongoose.isValidObjectId(projectId) ||
      !mongoose.isValidObjectId(targetUserId)
    ) {
      return res.status(400).json({
        message: "Invalid project or user ID",
      });
    }

    const requestedProject = await Project.findById(projectId);

    if (!requestedProject) {
      return res.status(404).json({
        message: "The requested Project was not found",
      });
    }

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId: requestedProject.organizationId,
      role: "admin",
    });

    if (!requesterIsAdmin) {
      return res.status(403).json({
        message: "Only organization admins can remove project members",
      });
    }

    const projectMember = await ProjectMember.findOne({
      userId: targetUserId,
      projectId,
    });

    if (!projectMember) {
      return res.status(404).json({
        message: "Member is not assigned to this project",
      });
    }

    await Task.updateMany(
      { projectId, assignedTo: targetUserId },
      { $set: { assignedTo: null } }
    );

    await ProjectMember.deleteOne({
      userId: targetUserId,
      projectId,
    });

    return res.status(200).json({
      message: "Member removed successfully from this project",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while removing project member",
      error: error.message,
    });
  }
}
