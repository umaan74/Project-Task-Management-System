import Organization from "../models/organization.model.js";
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";

export async function CreateProject(req, res) {
  const userId = req.user.userId;
  const { organizationId } = req.params;

  const requesterMembership = await OrganizationMember.findOne({
    userId,
    organizationId: organizationId,
    role: "admin",
  });

  if (!requesterMembership) {
    res.status(403).json({
      message: "The requested user is not permitted for this feature",
    });
  }

  try {
    const { name, description, status, startDate, dueDate } = req.body;

    const UpdatedProject = await Project.create({
      createdBy: userId,
      organizationId: organizationId,
      name,
      description,
      status,
      startDate,
      dueDate,
    });

    res.status(201).json({
      message: "Project Created Successfully",
      UpdatedProject,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error,
    });
  }
}

export async function GetProjects(req, res) {
  const userId = req.user.userId;
  const organizationId = req.params.organizationId;

  const requesterMembership = await OrganizationMember.findOne({
    userId,
    organizationId,
  });

  if (!requesterMembership) {
    return res.status(403).json({
      message: "The requested user is not available in this organization",
    });
  }

  const requesterRole = requesterMembership.role;

  // ADMIN
  if (requesterRole === "admin") {
    const All_Projects = await Project.find({
      organizationId,
    });

    return res.status(200).json({
      message: "All Projects fetched Successfully",
      All_Projects,
    });
  }

  // MEMBER
  else if (requesterRole === "member") {
    // Member hai ke nhi check karne ke liye
    const AssignedProjects_forMembers = await ProjectMember.find({
      userId,
    });

    // IF member hai us project ka to jitne projects mei exist karta hai uski list
    const projectIds = AssignedProjects_forMembers.map((member) => {
      return member.projectId;
    });

    // projects ke list se Project nikalege
    const AssignedProjects = await Project.find({
      organizationId,
      _id: {
        $in: projectIds,
      },
    });

    return res.status(200).json({
      message: "All Assigned Projects fetched Successfully",
      AssignedProjects,
    });
  }
}

export async function GetSingleProject(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    const requestedProject = await Project.findOne({
      _id: projectId,
    });

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
      return res.json({
        message: "User is not a member of the organization",
      });
    }
    // ADMIN
    if (RequesterIsOrganizationMem.role === "admin") {
      return res.json({
        message: "Requested Project accessed Successfully",
        requestedProject,
      });
    }
    // MEMBER
    else if (RequesterIsOrganizationMem.role === "member") {
      const Check_ProjectMember = await ProjectMember.findOne({
        projectId: projectId,
        userId: userId,
      });
      if (!Check_ProjectMember) {
        return res.status(403).json({
          message: "User is not a member of the Project",
        });
      }
      return res.json({
        message: "Requested Project accessed Successfully",
        requestedProject,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

// UpdateProject
export async function UpdateProject(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    const requestedProject = await Project.findOne({
      _id: projectId,
    });

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
      return res.json({
        message: "User is not a member of the organization",
      });
    }
    // ADMIN
    if (RequesterIsOrganizationMem.role === "admin") {
      const { name, description, status, startDate, dueDate } = req.body;
      // updateOne() ko pehla argument batata hai ki kaunsa document update karna hai, aur doosra argument batata hai kya update karna hai.
      const UpdatedProject = await Project.updateOne(
        { _id: projectId },
        {
          $set: {
            name,
            description,
            status,
            startDate,
            dueDate,
          },
        },
      );

      return res.status(200).json({
        message: "Project Updated Successfully",
        UpdatedProject,
      });
    } else {
      return res.status(403).json({
        message: "Only organization admin can update the project",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
// DELETE FUNCTION
export async function DeleteProject(req, res) {
  const userId = req.user.userId;
  const projectId = req.params.projectId;

  const requested_Project = await Project.findOne({
    _id: projectId,
  });

  if (!requested_Project) {
    return res.status(403).json({
      message: "The requested Project is not Found",
    });
  }

  const organizationId = requested_Project.organizationId;

  const Check_OrganizationMember = await OrganizationMember.findOne({
    userId,
    organizationId,
  });

  if (!Check_OrganizationMember) {
    return res.status(403).json({
      message: "The requested user is not a user of the organization",
    });
  }

  if (Check_OrganizationMember.role === "member") {
    return res.status(403).json({
      message:
        "The requested user is a member of the organization ,Not permitted for this activity",
    });
  }

  if (Check_OrganizationMember.role === "admin") {
    await Project.deleteOne({
      _id: projectId,
    });
  }
  res.json({
    message: "Project Deleted Successfully",
  });
}
