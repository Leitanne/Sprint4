const supertest = require("supertest");
const Tasks = require("../src/domain/tasks");
const App  = require("../src/infrastructure/server/App");

const api = supertest(App.app);
let initialLength: number;
const user = 'user1234';
const password = '1234';

test("tasks are returned as json", async () => {
	const response = await api
		.get("/api/tasks")
		.auth(user, password)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	initialLength = response.body.tasks.length;
});

test("task is returned by id", async () => {
	const response = await api
		.get("/api/tasks/1")
		.auth(user, password)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(response.body.id).toBe(1);
});

test("task can be added", async() => {
	const requestBody = {
		nombre: 'Tarea de prueba',
	};

	await api
		.post("/api/tasks")
		.auth(user, password)
		.send(requestBody)
		.expect(201);

	const response = await api.get('/api/tasks').auth(user, password);
	expect(response.body.tasks.length).toBe(initialLength + 1);
	initialLength = response.body.tasks.length;
});

test("task can be deleted", async() => {
	await api
		.delete("/api/tasks/"+initialLength)	
		.auth(user, password)
		.expect(204)
	
	const response = await api.get('/api/tasks').auth(user, password);
	expect(response.body.tasks.length).toBe(initialLength - 1);
	initialLength = response.body.tasks.length;
});

test("task can be marked as completed", async() => {
	await api
		.put("/api/tasks/"+initialLength)
		.auth(user, password)
		.expect(200)
	
	const response = await api.get("/api/tasks/"+initialLength).auth(user, password);
	
	expect(response.body.markAsComplete).toBeTruthy;
});

afterAll(() => {
	App.server.close();
});