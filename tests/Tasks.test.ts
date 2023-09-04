import * as Tasks from "../src/domain/tasks";

describe("Tasks", () => {
	test("Dada una nueva tarea, debe añadirse correctamente", () => {
		expect(Tasks.addTask("Tarea de prueba")).toBeTruthy;
	});

	test("Dada una id, debe devolverse la tarea", () => {
		expect(Tasks.findTask(1)).toBeDefined;
		expect(Tasks.findTask(-1)).toBeUndefined;
		const taskFound: Tasks.JsonItem = Tasks.findTask(1);

		expect(taskFound.id).toBe(1);
		expect(taskFound.nombre).toBe("Fregar los platos");
		expect(taskFound.completada).toBeTruthy;
	});

	test("Dada una id, debo borrar la tarea", () => {
		expect(Tasks.deleteTask(3)).toBeTruthy;
		expect(Tasks.findTask(3)).toBe(undefined);
	});

	test("Dada una id, quiero marcar como completada una tarea", () => {
		expect(Tasks.markAsComplete(1)).toBeTruthy;
		const taskFound: Tasks.JsonItem = Tasks.findTask(1);

		expect(taskFound.completada).toBeTruthy;
	});
});
