import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const secret = config.get<string>("jwtSecret");
async function authenticate(req: Request, res: Response) {
	try {
		const authHeader = req.headers.authorization || req.header("Authorization");
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "No token, authorization denied" });
		}
		const decoded = await jwt.verify(token, secret);
		return decoded;
	} catch (error: any) {
		return res.status(401).json({ message: "Token is not valid" });
	}
}

export default authenticate;
