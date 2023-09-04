"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache");
    next();
};
const authCheck = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        res.status(404).json("Sin autenticación");
    }
    next();
};
module.exports = { noCache, authCheck };
