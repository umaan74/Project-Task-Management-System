import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";

export async function AddProjectMember(req, res) {
  const userId = req.user.userId;
  const projectId = req.params.projectId;

  const targetedUserId = req.body.userId;

  const Is_requester_ADMIN = await Project.findOne({
    _id: projectId,
  });

  if (!Is_requester_ADMIN) {
    return res.status(403).json({
      message: "The requested user is not permitted for this feature",
    });
  }
  const requester_isAdminOf_Organization = await OrganizationMember.findOne({
    userId,
    organizationId: Is_requester_ADMIN.organizationId,
    role: "admin",
  });

  if (!requester_isAdminOf_Organization) {
    return res.status(403).json({
      message: "The requested user is not permitted for this feature",
    });
  }
  const targetUser_inOrganization = await OrganizationMember.findOne({
    userId: targetedUserId,
    organizationId: Is_requester_ADMIN.organizationId,
  });

  if (!targetUser_inOrganization) {
    return res.status(403).json({
      message: "The requested user is not available in this Organization",
    });
  }
  const targetUser_isMember = await ProjectMember.findOne({
    userId: targetedUserId,
    projectId: projectId,
  });

  if (targetUser_isMember) {
    return res.status(403).json({
      message: "The targeted user is already in this Project",
    });
  }

  const NewMember = await ProjectMember.create({
    projectId: projectId,
    userId: targetedUserId,
    assignedBy: userId,
    assignedAt: new Date(),
  });

  res.json({
    message: "New Member added to Project Member successfully",
    NewMember,
  });
}

export async function GetProjectMembers(req, res) {
  const userId = req.user.userId;

  const projectId = req.params.projectId;

  const requestedProject = await Project.findOne({
    _id: projectId,
  });

  if (!requestedProject) {
    return res.status(404).json({
      message: "The Requested Project is not Found",
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

  const ProjectMembers = await ProjectMember.find({
    projectId,
  });

  const Project_Members = ProjectMembers.map((m) => {
    return m.userId;
  });

  res.status(200).json({
    message: "All the Members fetched Successfully",
    Project_Members,
  });
}

export async function RemoveProjectMember(req, res) {
  const userId = req.user.userId;
  const projectId = req.params.projectId;
  const targetUserId = req.params.userId;

  const requestedProject = await Project.findOne({
    _id: projectId,
  });

  if (!requestedProject) {
    return res.status(404).json({
      message: "The Requested Project is not Found",
    });
  }

  const requesterIsAdmin = await OrganizationMember.findOne({
    userId,
    organizationId: requestedProject.organizationId,
    role: "admin",
  });

  if (!requesterIsAdmin) {
    return res.status(403).json({
      message: "You don't have permission to Delete Project Members",
    });
  }
  const Project_s_Member = await ProjectMember.findOne({
    userId:targetUserId,
    projectId,
  });


  if (!Project_s_Member) {
    return res.status(404).json({
        message:"Member is not assigned in this Project to be delete"
    })
  }

await ProjectMember.deleteOne({
    userId:targetUserId,
    projectId:projectId
})

res.json({
    message:"Targeted member Deleted Successfully from this project"
})
}
