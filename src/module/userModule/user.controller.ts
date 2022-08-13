import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserService } from "./user.service";
import db from "../../database/db";
import { signJwt } from "../../middleware/auth";

const signUp = async (req: Request, res: Response) => {
	try {
		const { username, email } = req.body;
		const id = await createUserService(req.body);
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
		const retrievedUser = await db("users").where({ email }).first();
		if (!retrievedUser) {
			return res.status(200).json({ message: "Invalid Credentials!" });
		}
		const validPassword = await bcrypt.compare(password, retrievedUser.password);
		if (!validPassword) {
			return res.status(200).json({ message: "Invalid Credentials!" });
		}
		const payload = { id: retrievedUser.id, email: retrievedUser.email };

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
		const user = await db("users").where({ id: userId }).first();
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
