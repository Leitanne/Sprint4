import * as express from "express";

const router = express.Router();

const {
	addTask,
	findTask,
	deleteTask,
	markAsComplete,
	showTasks,
} = require("../../application/tasks");

router.get("/", showTasks);

router.get("/:id", findTask);

router.post("/", addTask);

router.put("/:id", markAsComplete);

router.delete("/:id", deleteTask);

module.exports = router;
