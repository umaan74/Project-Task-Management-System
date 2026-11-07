import mongoose from "mongoose";
import OrganizationMember from "../models/organizationMember.model.js";
import Project from "../models/project.model.js";
import ProjectMember from "../models/projectMember.model.js";
import Task from "../models/task.model.js";

export async function CreateTask(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const Project_Exist = await Project.findById(projectId);

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
        message:
          "The requested user is not an admin of the Project/Organization",
      });
    }

    const { title, description, assignedTo, priority, dueDate } = req.body;
    if (!title?.trim() || !mongoose.isValidObjectId(assignedTo)) {
      return res.status(400).json({
        message: "A task title and valid project member are required",
      });
    }

    const assigned_User_isProjectMember = await ProjectMember.findOne({
      userId: assignedTo,
      projectId: projectId,
    }).populate("userId", "_id");

    if (!assigned_User_isProjectMember?.userId) {
      return res.status(403).json({
        message:
          "The User You are trying to assign is not a member of this project",
      });
    }

    if (!["low", "medium", "high", "urgent"].includes(priority)) {
      return res.status(400).json({ message: "A valid task priority is required" });
    }

    if (!dueDate || Number.isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: "A valid task due date is required" });
    }

    const NewTask = await Task.create({
      title: title.trim(),
      description,
      projectId,
      createdBy: userId,
      assignedTo,
      priority,
      dueDate,
      status: "todo",
    });

    return res.status(201).json({
      message: "New Task created Successfully",
      NewTask,
    });
  } catch (error) {
    console.error("CreateTask Error:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: error.name === "ValidationError" ? error.message : "Unable to create task",
    });
  }
}


export async function GetProjectTasks(req, res) {
  try {
    const userId = req.user.userId;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

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
      .populate("assignedTo", "username email")
      .populate("createdBy", "username email")
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

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }

    const project = await Project.findById(isTaskExist.projectId);
    if (!project) {
      return res.status(404).json({ message: "Task project not found" });
    }

    const isAdmin = await OrganizationMember.exists({
      userId,
      organizationId: project.organizationId,
      role: "admin",
    });
    const isProjectMember = await ProjectMember.exists({
      userId,
      projectId: isTaskExist.projectId,
    });

    if (!isAdmin && !isProjectMember) {
      return res.status(403).json({
        message: "You are not authorized to view this task",
      });
    }

    const task = await Task.findById(taskId)
      .populate("assignedTo", "username email")
      .populate("createdBy", "username email");

    return res.status(200).json({
      message: "The requested Task fetched Successfully",
      isTaskExist: task,
    });
  } catch (error) {
    console.error("GetTask Error:", error);
    return res.status(500).json({ message: "Unable to fetch task" });
  }
}

export async function UpdateTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(404).json({
        message: "The requested Task is not Exist",
      });
    }

    const project = await Project.findById(isTaskExist.projectId);
    if (!project) {
      return res.status(404).json({ message: "Task project not found" });
    }

    const isAdmin = await OrganizationMember.exists({
      userId,
      organizationId: project.organizationId,
      role: "admin",
    });
    const isProjectMember = await ProjectMember.exists({
      userId,
      projectId: isTaskExist.projectId,
    });

    if (!isAdmin && !isProjectMember) {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }
    const status = req.body.status;
    if (!["todo", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const UpdatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true, runValidators: true }
    )
      .populate("assignedTo", "username email")
      .populate("createdBy", "username email");
    return res.status(200).json({
      message: "Task's Status Updated Successfully",
      UpdatedTask,
    });
  } catch (error) {
    console.error("UpdateTask Error:", error);
    return res.status(500).json({ message: "Unable to update task" });
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
    if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(targetedUserId)) {
      return res.status(400).json({ message: "Invalid task or user ID" });
    }
    const isTaskExist = await Task.findById(taskId);

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
    }).populate("userId", "_id");
    if (!CheckProjectMember?.userId) {
      return res.status(403).json({
        message: "The targeted User is not a member of this Project",
      });
    }
    const UpdatedAssignedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { assignedTo: targetedUserId } },
      { new: true, runValidators: true }
    )
      .populate("assignedTo", "username email")
      .populate("createdBy", "username email");

    return res.status(200).json({
      message: "Assigned Task to a Member successfully",
      UpdatedAssignedTask,
    });
  } catch (error) {
    console.error("AssignTask Error:", error);
    return res.status(500).json({ message: "Unable to assign task" });
  }
}

// DeleteTask
export async function DeleteTask(req, res) {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const isTaskExist = await Task.findById(taskId);

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

    await Task.deleteOne({
      _id: taskId,
    });

    return res.status(200).json({
      message: "Task Deleted successfully",
    });
  } catch (error) {
    console.error("DeleteTask Error:", error);
    return res.status(500).json({ message: "Unable to delete task" });
  }
}
