
import { InviteCodeGenerator } from "../utils/invitecode.utils.js";

import Organization from "../models/organization.model.js";
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import Task from "../models/task.model.js";


// CREATE ORGANIZATION
export async function CreateOrganization(req, res) {
  let NewOrganization;

  try {
    const userId = req.user.userId;
    const organizationName = req.body.organizationName?.trim();

    if (!organizationName) {
      return res.status(400).json({
        message: "Organization name is required",
      });
    }

    const InviteCode = InviteCodeGenerator(organizationName);

    NewOrganization = await Organization.create({
      name: organizationName,
      inviteCode: InviteCode,
      createdBy: userId,
    });

    await OrganizationMember.create({
      organizationId: NewOrganization._id,
      userId,
      role: "admin",
    });

    return res.status(201).json({
      message: "Organization Created Successfully",
      NewOrganization,
    });

  } catch (error) {
    // Rollback organization if membership creation fails
    if (NewOrganization) {
      await Organization.deleteOne({
        _id: NewOrganization._id,
      });
    }

    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while creating organization",
      error: error.message,
    });
  }
}


// GET ALL USER ORGANIZATIONS
export async function GetOrganizations(req, res) {
  try {
    const userId = req.user.userId;

    const Organizations = await OrganizationMember.find({
      userId,
    }).populate("organizationId");

    return res.status(200).json({
      message: "Organizations found successfully",
      No_of_Organizations: Organizations,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while fetching organizations",
      error: error.message,
    });
  }
}


// GET SINGLE ORGANIZATION
export async function GetOrganization(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;

    const isMember = await OrganizationMember.findOne({
      userId,
      organizationId,
    });

    if (!isMember) {
      return res.status(403).json({
        message: "User is not a member of this organization",
      });
    }

    const OrganizationFound = await Organization.findById(
      organizationId
    );

    if (!OrganizationFound) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    return res.status(200).json({
      message: "Organization Found successfully",
      OrganizationFound,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while fetching organization",
      error: error.message,
    });
  }
}


// UPDATE ORGANIZATION
export async function UpdateOrganization(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;
    const newName = req.body.newName?.trim();

    if (!newName) {
      return res.status(400).json({
        message: "New organization name is required",
      });
    }

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!requesterIsAdmin) {
      return res.status(403).json({
        message: "Only organization admins can update organization",
      });
    }

    const OrganizationFound = await Organization.findById(
      organizationId
    );

    if (!OrganizationFound) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    OrganizationFound.name = newName;
    await OrganizationFound.save();

    return res.status(200).json({
      message: "Organization updated successfully",
      OrganizationFound,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while updating organization",
      error: error.message,
    });
  }
}


// DELETE ORGANIZATION
export async function DeleteOrganization(req, res) {
  try {
    const userId = req.user.userId;
    const organizationId = req.params.organizationId;

    const requesterIsAdmin = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!requesterIsAdmin) {
      return res.status(403).json({
        message: "Only organization admins can delete organization",
      });
    }

    const OrganizationFound = await Organization.findById(
      organizationId
    );

    if (!OrganizationFound) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Find all projects belonging to this organization
    const organizationProjects = await Project.find({
      organizationId,
    }).select("_id");

    const projectIds = organizationProjects.map(
      (project) => project._id
    );

    // Delete tasks and project memberships of these projects
    if (projectIds.length > 0) {
      await Task.deleteMany({
        projectId: { $in: projectIds },
      });

      await ProjectMember.deleteMany({
        projectId: { $in: projectIds },
      });
    }

    // Delete all organization projects
    await Project.deleteMany({
      organizationId,
    });

    // Delete all organization memberships
    await OrganizationMember.deleteMany({
      organizationId,
    });

    // Finally delete organization
    await OrganizationFound.deleteOne();

    return res.status(200).json({
      message: "Organization and its related data deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong while deleting organization",
      error: error.message,
    });
  }
}
