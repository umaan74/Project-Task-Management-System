import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import Task from "../models/task.model.js";

export async function CreateTask(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    const Project_Exist = await Project.findOne({
      _id: projectId,
    });

    if (!Project_Exist) {
      return res.status(404).json({
        message: "Project Not found",
      });
    }

    const requested_user_isAdmin = await OrganizationMember.findOne({
      organizationId: Project_Exist.organizationId,
      userId: userId,
      role: "admin",
    });

    if (!requested_user_isAdmin) {
      return res.status(403).json({
        messsage:
          "The requested user is not an admin of the Project/Organization",
      });
    }

    const { title, description, assignedTo, priority, dueDate } = req.body;

    const assigned_User_isProjectMember = await ProjectMember.findOne({
      userId: assignedTo,
      projectId: projectId,
    });

    if (!assigned_User_isProjectMember) {
      return res.status(403).json({
        messsage:
          "The User You are trying to assign is not a member of this project",
      });
    }

    const NewTask = await Task.create({
      title,
      description,
      projectId,
      createdBy: userId,
      assignedTo,
      priority,
      dueDate,
      status: "todo",
    });

    res.status(201).json({
      messsage: "New Task created Successfully",
      NewTask,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
}


export async function GetProjectTasks(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    // Check project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check if requester is organization admin
    const isOrganizationAdmin = await OrganizationMember.findOne({
      organizationId: project.organizationId,
      userId,
      role: "admin",
    });

    // Check if requester is project member
    const isProjectMember = await ProjectMember.findOne({
      projectId,
      userId,
    });

    // Allow admin OR project member
    if (!isOrganizationAdmin && !isProjectMember) {
      return res.status(403).json({
        message: "You are not authorized to view these tasks",
      });
    }

    // Fetch complete task objects
    const All_Tasks = await Task.find({
      projectId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All project tasks fetched successfully",
      All_Tasks,
    });

  } catch (error) {
    console.error("GetProjectTasks Error:", error);

    return res.status(500).json({
      message: "Failed to fetch project tasks",
      error: error.message,
    });
  }
}

export async function GetTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    const isTaskExist = await Task.findOne({
      _id: taskId,
    });

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }

    const projectId = isTaskExist.projectId;

    const isProjectMember = await ProjectMember.findOne({
      userId,
      projectId,
    });

    if (!isProjectMember) {
      return res.status(403).json({
        message: "The user is not a Member of this Project",
      });
    }

    res.json({
      message: "The requested Task fetched Successfully",
      isTaskExist,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function UpdateTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    const isTaskExist = await Task.findOne({
      _id: taskId,
    });

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }

    const projectId = isTaskExist.projectId;

    const isProjectMember = await ProjectMember.findOne({
      userId,
      projectId,
    });

    if (!isProjectMember) {
      return res.status(403).json({
        message: "The user is not a Member of this Project",
      });
    }
    const status = req.body.status;

    await Task.updateOne(
      {
        _id: taskId,
      },
      {
        status: status,
      },
    );
    const UpdatedTask = await Task.findOne({
      _id: taskId,
    });
    res.json({
      message: "Task's Status Updated Successfully",
      UpdatedTask,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

// ASSIGN TASK
export async function AssignTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;
    const targetedUserId = req.body.userId;

    if (!targetedUserId) {
      return res.status(400).json({
        message: "Target userId is required",
      });
    }
    const isTaskExist = await Task.findOne({
      _id: taskId,
    });

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }
    const projectId = isTaskExist.projectId;
    const CurrentProject = await Project.findOne({
      _id: projectId,
    });
    if (!CurrentProject) {
      return res.status(404).json({
        message: "The requested Project is not Exist",
      });
    }
    const organizationId = CurrentProject.organizationId;

    const CheckOrganizationMember = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!CheckOrganizationMember) {
      return res.status(403).json({
        message: "The requester is not an admin",
      });
    }

    const CheckProjectMember = await ProjectMember.findOne({
      userId: targetedUserId,
      projectId,
    });
    if (!CheckProjectMember) {
      return res.status(403).json({
        message: "The targeted User is not a member of this Project",
      });
    }
    await Task.updateOne(
      {
        _id: taskId,
      },
      {
        assignedTo: targetedUserId,
      },
    );

    const UpdatedAssignedTask = await Task.findOne({
      _id: taskId,
    });

    res.json({
      message: "Assigned Task to a Member successfully",
      UpdatedAssignedTask,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

// DeleteTask
export async function DeleteTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    const isTaskExist = await Task.findOne({
      _id: taskId,
    });

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }
    const projectId = isTaskExist.projectId;
    const CurrentProject = await Project.findOne({
      _id: projectId,
    });
    ;
    if (!CurrentProject) {
      return res.status(404).json({
        message: "The requested Project is not Exist",
      });
    }
    const organizationId = CurrentProject.organizationId;

    const CheckOrganizationMember = await OrganizationMember.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!CheckOrganizationMember) {
      return res.status(403).json({
        message: "The requester is not an admin",
      });
    }

    await Task.deleteOne({
      _id: taskId,
    });

    res.json({
      message: "Task Deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
