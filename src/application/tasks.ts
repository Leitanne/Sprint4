import { Request, Response } from "express";

import * as Tasks from "../domain/tasks";

const showTasks = (req: Request, res: Response) => {
	const taskList: any = Tasks.getTaskList();
	res.json(taskList);
};

const findTask = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const task = Tasks.findTask(id);
	res.json(task);
};

const addTask = (req: Request, res: Response) => {
	Tasks.addTask(req.body.nombre);
	res.status(201).json("Tarea añadida");
};

const deleteTask = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	Tasks.deleteTask(id);
	res.status(204).json("Tarea borrada");
};

const markAsComplete = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	Tasks.markAsComplete(id);
	res.status(200).json("Marcada como completada");
};

module.exports = {
	addTask,
	findTask,
	deleteTask,
	markAsComplete,
	showTasks,
};
