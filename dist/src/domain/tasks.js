"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsComplete = exports.getTaskList = exports.findTask = exports.deleteTask = exports.addTask = void 0;
const fs_1 = require("fs");
const JsonPath = "./src/persistance/tasks.json";
let jsonData;
try {
    const jsonContent = (0, fs_1.readFileSync)(JsonPath, "utf-8");
    jsonData = JSON.parse(jsonContent);
}
catch (e) {
    console.error(e);
}
function addTask(taskName) {
    let maxId = 0;
    jsonData.tasks.forEach((task) => (task.id > maxId ? (maxId = task.id) : 0));
    const newJsonObject = {
        id: maxId + 1,
        nombre: taskName,
        completada: false,
    };
    jsonData.tasks.push(newJsonObject);
    return writeData(jsonData);
}
exports.addTask = addTask;
function writeData(jsonData) {
    let check = true;
    const jsonString = JSON.stringify(jsonData, null, 4);
    try {
        (0, fs_1.writeFileSync)(JsonPath, jsonString);
    }
    catch (e) {
        check = false;
        console.error(e);
    }
    return check;
}
function findTask(id) {
    const taskFound = jsonData.tasks.find((task) => task.id == id);
    return taskFound;
}
exports.findTask = findTask;
function deleteTask(id) {
    const index = getTaskIndex(id);
    if (index != -1) {
        jsonData.tasks.splice(index, 1);
        return writeData(jsonData);
    }
    return false;
}
exports.deleteTask = deleteTask;
function getTaskIndex(id) {
    const taskExists = findTask(id);
    if (taskExists != undefined) {
        return jsonData.tasks.indexOf(taskExists);
    }
    return -1;
}
function markAsComplete(id) {
    const index = getTaskIndex(id);
    if (index != -1) {
        jsonData.tasks[index].completada = true;
        return writeData(jsonData);
    }
    return false;
}
exports.markAsComplete = markAsComplete;
function getTaskList() {
    return jsonData;
}
exports.getTaskList = getTaskList;
