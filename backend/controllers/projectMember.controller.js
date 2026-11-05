
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";


export async function AddProjectMember(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;
    const targetedUserId = req.body.userId;

    if (!targetedUserId) {
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
    });

    if (!targetMember) {
      return res.status(403).json({
        message: "Selected user does not belong to this organization",
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

    const requestedProject = await Project.findById(projectId);

    if (!requestedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId: requestedProject.organizationId,
      role: "admin",
    });

    const requesterIsProjectMember = await ProjectMember.findOne({
      userId,
      projectId,
    });

    if (!requesterIsAdmin && !requesterIsProjectMember) {
      return res.status(403).json({
        message: "You don't have permission to view Project Members",
      });
    }

    const Project_Members = await ProjectMember.find({
      projectId,
    })
      .populate("userId", "username email")
      .populate("assignedBy", "username email");

    return res.status(200).json({
      message: "All project members fetched successfully",
      Project_Members,
    });

  } catch (error) {
    console.error("GetProjectMembers:", error);

    return res.status(500).json({
      message: "Unable to fetch project members",
      error: error.message,
    });
  }
}


export async function RemoveProjectMember(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;
    const targetUserId = req.params.userId;

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
