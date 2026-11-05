
import Organization from "../models/organization.model.js";
import OrganizationMember from "../models/organizationMember.model.js";
import ProjectMember from "../models/projectMember.model.js";

// JOIN ORGANIZATION
export async function JoinOrganization(req, res) {
  try {
    const userId = req.user.userId;
    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status(400).json({
        message: "Invite code is required",
      });
    }

    const findOrganization = await Organization.findOne({
      inviteCode: inviteCode.trim(),
    });

    if (!findOrganization) {
      return res.status(404).json({
        message: "Organization not found. Invalid invite code",
      });
    }

    const alreadyInOrgan = await OrganizationMember.findOne({
      userId,
      organizationId: findOrganization._id,
    });

    if (alreadyInOrgan) {
      return res.status(409).json({
        message: "User is already a member of this organization",
      });
    }

    const NewMember = await OrganizationMember.create({
      organizationId: findOrganization._id,
      userId,
      role: "member",
    });

    return res.status(201).json({
      message: "User joined successfully in the organization",
      NewMember,
      OrganizationName: findOrganization.name,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while joining organization",
      error: error.message,
    });
  }
}


// GET ORGANIZATION MEMBERS


export async function GetOrganizationMembers(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;

    const requester = await OrganizationMember.findOne({
      userId,
      organizationId,
    });

    if (!requester) {
      return res.status(403).json({
        message: "Permission denied. User is not in this Organization",
      });
    }

    const members = await OrganizationMember.find({
      organizationId,
    }).populate("userId", "username email");

    const AllMember_of_Organization = members
      .filter((member) => member.userId)
      .map((member) => ({
        _id: member.userId._id,
        username: member.userId.username,
        email: member.userId.email,
        role: member.role,
      }));

    return res.status(200).json({
      message: "Members fetched successfully",
      AllMember_of_Organization,
    });

  } catch (error) {
    console.error("GetOrganizationMembers:", error);

    return res.status(500).json({
      message: "Unable to fetch organization members",
      error: error.message,
    });
  }
}




// CHANGE MEMBER ROLE
export async function ChangeMemberRole(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;
    const targetedUserId = req.params.userId;
    const { role: NewRole } = req.body;

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!requesterIsAdmin) {
      return res.status(403).json({
        message: "Only organization admins can change member roles",
      });
    }

    if (NewRole !== "admin" && NewRole !== "member") {
      return res.status(400).json({
        message: "Invalid role. Role must be admin or member",
      });
    }

    const targetedUser = await OrganizationMember.findOne({
      userId: targetedUserId,
      organizationId,
    });

    if (!targetedUser) {
      return res.status(404).json({
        message: "Target user not found in this organization",
      });
    }

    if (targetedUser.role === NewRole) {
      return res.status(400).json({
        message: "User already has this role",
      });
    }

    // Prevent removing the last admin
    if (targetedUser.role === "admin" && NewRole === "member") {
      const totalAdmins = await OrganizationMember.countDocuments({
        organizationId,
        role: "admin",
      });

      if (totalAdmins <= 1) {
        return res.status(400).json({
          message: "Cannot remove the last admin of the organization",
        });
      }
    }

    targetedUser.role = NewRole;
    await targetedUser.save();

    return res.status(200).json({
      message: "Role changed successfully",
      isUserExist: targetedUser,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while changing member role",
      error: error.message,
    });
  }
}


// REMOVE ORGANIZATION MEMBER
export async function RemoveOrganizationMember(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;
    const targetedUserId = req.params.userId;

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!requesterIsAdmin) {
      return res.status(403).json({
        message: "Only organization admins can remove members",
      });
    }

    // Prevent admin from accidentally removing themselves
    if (userId.toString() === targetedUserId.toString()) {
      return res.status(400).json({
        message: "You cannot remove yourself from the organization",
      });
    }

    const targetedUser = await OrganizationMember.findOne({
      userId: targetedUserId,
      organizationId,
    });

    if (!targetedUser) {
      return res.status(404).json({
        message: "Target user not found in this organization",
      });
    }

    // Prevent removing the last admin
    if (targetedUser.role === "admin") {
      const totalAdmins = await OrganizationMember.countDocuments({
        organizationId,
        role: "admin",
      });

      if (totalAdmins <= 1) {
        return res.status(400).json({
          message: "Cannot remove the last admin of the organization",
        });
      }
    }

    await targetedUser.deleteOne();

    // Remove the user's project memberships in this organization
    const organizationProjects = await ProjectMember.distinct("projectId", {
      userId: targetedUserId,
    });

    if (organizationProjects.length > 0) {
      const Project = (await import("../models/project.model.js")).default;

      const projectsInOrganization = await Project.find({
        _id: { $in: organizationProjects },
        organizationId,
      }).select("_id");

      const projectIds = projectsInOrganization.map(
        (project) => project._id
      );

      await ProjectMember.deleteMany({
        userId: targetedUserId,
        projectId: { $in: projectIds },
      });
    }

    const remainingMembers = await OrganizationMember.find({
      organizationId,
    }).populate("userId", "name email");

    const AllMember_of_Organization = remainingMembers.map((member) => ({
      userId: member.userId,
      role: member.role,
    }));

    return res.status(200).json({
      message: "Target user removed successfully",
      AllMember_of_Organization,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while removing organization member",
      error: error.message,
    });
  }
}
