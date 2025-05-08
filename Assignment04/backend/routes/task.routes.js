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

router.post("/", createTask);
router.get("/", authentication, getTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
