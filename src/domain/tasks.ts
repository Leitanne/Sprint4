import { readFileSync, writeFileSync } from "fs";

const JsonPath = "./src/persistance/tasks.json"

let jsonData: any;

type JsonItem = {
	id: number;
	nombre: string;
	completada: boolean;
};

try {
	const jsonContent = readFileSync(JsonPath, "utf-8");
	jsonData = JSON.parse(jsonContent);
} catch (e) {
	console.error(e);
}

function addTask(taskName: string): boolean {
	let maxId = 0;

	jsonData.tasks.forEach((task: any) => (task.id > maxId ? (maxId = task.id) : 0));

	const newJsonObject = {
		id: maxId + 1,
		nombre: taskName,
		completada: false,
	};

	jsonData.tasks.push(newJsonObject);

	return writeData(jsonData);
}

function writeData(jsonData: any): boolean {
	let check = true;
	const jsonString: string = JSON.stringify(jsonData, null, 4);

	try {
		writeFileSync(JsonPath, jsonString);
	} catch (e) {
		check = false;
		console.error(e);
	}

	return check;
}

function findTask(id: number): JsonItem {
	const taskFound: JsonItem = jsonData.tasks.find((task: JsonItem) => task.id == id);

	return taskFound;
}

function deleteTask(id: number): boolean {
	const index: number = getTaskIndex(id);

	if (index != -1) {
		jsonData.tasks.splice(index, 1);

		return writeData(jsonData);
	}

	return false;
}

function getTaskIndex(id: number) {
	const taskExists: JsonItem = findTask(id);

	if (taskExists != undefined) {
		return jsonData.tasks.indexOf(taskExists);
	}

	return -1;
}
function markAsComplete(id: number): boolean {
	const index: number = getTaskIndex(id);

	if (index != -1) {
		jsonData.tasks[index].completada = true;

		return writeData(jsonData);
	}

	return false;
}

function getTaskList(): any {
	return jsonData;
}

export { addTask, deleteTask, findTask, getTaskList, JsonItem, markAsComplete };
