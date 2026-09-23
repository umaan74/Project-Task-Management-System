import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";

export async function CreateProject(req, res) {
  const userId = req.user.userId;
  const {organizationId} = req.params;

  const requesterMembership = await OrganizationMember.findOne({
    userId,
    organizationId:organizationId,
    role: "admin",
  });

  if (!requesterMembership) {
    res.status(403).json({
      message: "The requested user is not permitted for this feature",
    });
  }

  try {
    const { name, description, status, startDate, dueDate } = req.body;

    const NewProject = await Project.create({
      createdBy: userId,
      organizationId:organizationId,
      name,
      description,
      status,
      startDate,
      dueDate,
    });

    res.status(201).json({
        message:"Project Created Successfully",
        NewProject
    })
  } catch (error) {
    console.log(error)
    res.json({
        message:"Something went wrong"
    })
  }
}

export async function GetProjects(req,res)   {
    
    const userId=req.user.userIdl;
    const {organizationId}=req.params;

  
  const requesterMembership = await OrganizationMember.findOne({
    userId,
    organizationId:organizationId,
  });

  if (!requesterMembership) {
    res.status(403).json({
      message: "The requested user is not available in this organization",
    });
  }

  const requesterRole=requesterMembership.role

  if (requesterRole==="admin") {
    const All_Projects=await Project.find({
        organizationId:organizationId
    })
    const All_Project=All_Projects.map((m)=>{
        m.project
    })
    res.json({
        message:"The Requested admin got all the Projects fetched Successfully",
        All_Project
    })
  }
  else if(requesterRole==="member"){
    const AssignedProjects=await Project.find({
        userId:userId
    })

    res.json({
        message:"The Requested Member got all the Assigned Projects fetched Successfully",
        AssignedProjects
    })
  }
}