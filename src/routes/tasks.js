const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.js");

//@route    PUT /tasks
//@desc     Create task
//@access   PRIVATE
router.post("/tasks/", auth, createTask.controller);

//@route    GET /tasks
//@desc     Get tasks
//@access   PRIVATE
router.get("/tasks", auth, getTasks.controller);

//@route    GET /tasks/:id
//@desc     Get tasks
//@access   PRIVATE
router.get("/tasks/:id", auth, getSingleTask.controller);

//@route    PUT /tasks/:id
//@desc     Put tasks
//@access   PRIVATE
router.put("/tasks/:id", auth, updateTask.controller);

//@route    DELETE /tasks/:id
//@desc     Delete tasks
//@access   PRIVATE
router.delete("/tasks/:id", auth, deleteTask.controller);

module.exports = router;
