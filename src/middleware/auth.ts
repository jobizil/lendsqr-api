import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../index";

const jwtSecret = <string>process.env.JWT_SECRET;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, jwtSecret, { ...(options && options), algorithm: "HS256" });
}
function verifyJwt(token: string, options?: jwt.VerifyOptions | undefined) {
	try {
		const decoded = jwt.verify(token, jwtSecret);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error: any) {
		return { valid: false, error: error.message === "jwt expired" ? "Token expired" : "Invalid token", decoded: null };
	}
}

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
	const accessToken: any = req.headers["x-access-token"];

	if (!accessToken) {
		return next();
	}
	const { decoded, expired } = verifyJwt(accessToken);

	if (expired) {
		return res.status(401).json({ message: "Token expired" });
	}
	if (decoded) {
		res.locals.user = decoded;
		return next();
	}
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	const user = res.locals.user;

	if (!user) {
		return res.sendStatus(403);
	}

	return next();
}
