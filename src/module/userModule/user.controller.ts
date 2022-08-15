import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserService, loginUserService, getUserService } from "./user.service";
import db from "../../database/db";
import { signJwt } from "../../middleware/auth";

const signUp = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

		if (!email || !username || !password) {
			return res.status(400).json({ message: "All fields are required." });
		}
		const id = await createUserService({ username, email, password });
		return res.status(201).json({
			status: 200,
			message: "User created successfully",
			data: { id, username, email },
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.sqlMessage });
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Both email and password are required." });
		}
		const user = await loginUserService(req.body);

		const payload = { id: user.id, email: user.email };

		const accessToken = signJwt(payload, { expiresIn: "1h" });

		return res.status(200).json({
			status: 200,
			message: "User logged in successfully",
			data: { payload, accessToken },
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.sqlMessage });
	}
};

const myProfile = async (req: Request, res: Response) => {
	const userId = res.locals.user.id;
	try {
		const user = await getUserService(userId);

		user.password = undefined;
		return res.status(200).json({
			status: 200,
			message: "User profile retrieved successfully",
			data: { user },
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.sqlMessage });
	}
};
export { signUp, login, myProfile };
