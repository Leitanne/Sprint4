import { NextFunction, Request, Response } from "express";

const noCache = (req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Cache-Control", "no-cache");
	next();
};

const authCheck = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization === undefined) {
		res.status(404).json("Sin autenticación");
	}

	next();
};
module.exports = { noCache, authCheck };
