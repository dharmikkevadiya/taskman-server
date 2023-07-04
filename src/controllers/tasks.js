const TaskService = require("../services/tasks");
const service = new TaskService();
let { MSG } = require("../helper/constant");
let { Response } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.createTask = {
  controller: async function createTask(req, res, next) {
    try {
      const userId = req.user._id;

      let result = await service.createTask(userId, req.body);
      return res.json(Response(MSG.CREATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getTasks = {
  controller: async function getTasks(req, res, next) {
    try {
      let result = await service.getTasks(req.query);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getSingleTask = {
  controller: async function getSingleTask(req, res, next) {
    try {
      const { id } = req.params;

      let result = await service.getSingleTask(id);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.updateTask = {
  controller: async function updateTask(req, res, next) {
    try {
      const { id } = req.params;

      let result = await service.updateTask(id, req.body);
      return res.json(Response(MSG.UPDATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.deleteTask = {
  controller: async function deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      let result = await service.deleteTask(id, req.body);
      return res.json(Response(MSG.DELETE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
