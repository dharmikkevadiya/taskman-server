const User = require("../models/user"); //Database Model
const Task = require("../models/task");
let { MSG, TaskStatus } = require("../helper/constant");
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const TaskLog = require("../models/taskLog");

class TaskService {
  async createTask(loginUserId, body) {
    const { title, userId, note } = body;
    const obj = {
      title,
      note,
      createdBy: loginUserId,
      user: userId,
    };
    const newTask = await new Task(obj).save();

    // entry in task log
    await TaskLog({
      status: TaskStatus.CREATED,
      task: newTask._id,
      admin: loginUserId,
      user: userId,
    }).save();

    return newTask;
  }

  async getTasks(params) {
    let tasks;
    let query = {};

    if (params.forUser) query.user = params.forUser;

    tasks = await Task.find(query);
    return tasks;
  }

  async getSingleTask(id) {
    const taskData = await Task.findById(id);
    if (!taskData) throw CustomErrorHandler.notFound("Task not found!");
    return taskData;
  }

  async updateTask(id, body) {
    const { title, note, status } = body;

    const taskData = await Task.findByIdAndUpdate(
      id,
      {
        title,
        note,
        status,
      },
      { new: true }
    );

    if (!taskData) throw CustomErrorHandler.notFound("Task not found!");

    return taskData;
  }

  async deleteTask(id) {
    const res = await Task.deleteOne({ _id: id });

    if (res.deletedCount === 0)
      throw CustomErrorHandler.notFound("Task not found!");

    return res;
  }
}

module.exports = TaskService;
