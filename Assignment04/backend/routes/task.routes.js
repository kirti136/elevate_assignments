const { Router } = require("express");
const {
  createTask,
  getTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const authentication = require("../middleware/auth");

const router = Router();

router.post("/", authentication, createTask);
router.get("/", getTask);
router.get("/:id", authentication, getTaskById);
router.put("/:id", authentication, updateTask);
router.delete("/:id", authentication, deleteTask);

module.exports = router;
