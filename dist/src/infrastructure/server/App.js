"use strict";
var _a;
const express = require("express");
const cors = require("cors");
const tasksRoutes = require("../routes/tasks");
const { noCache, authCheck } = require("../middlewares/tasksMiddleware");
const app = express();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
const server = app.listen(PORT, () => {
    console.log("Server is listening on port 3001");
});
app.use(express.json());
app.use(cors());
app.use(noCache);
app.use(authCheck);
app.use("/api/tasks", tasksRoutes);
module.exports = {
    app,
    server
};
