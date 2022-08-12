import { Request, Response } from "express";
import { createUserService } from "./user.service";
import db from "../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
		const retrievedUser = await db("users").where({ email }).first();
		if (!retrievedUser) {
			return res.status(200).json({ message: "Invalid Credentials!" });
		}
		const validPassword = await bcrypt.compare(password, retrievedUser.password);
		if (!validPassword) {
			return res.status(200).json({ message: "Invalid Credentials!" });
		}
		const payload = { id: retrievedUser.id, email: retrievedUser.email };
		const secret = "SECRET";
		const token = await jwt.sign(payload, secret);

		return res.status(200).json({
			status: 200,
			message: "User logged in successfully",
			data: { payload, token },
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.sqlMessage });
	}
};

export { signUp, login };
/* const login = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const id = await loginService(req.body);
		console.log(id);
		// return res.status(200).json({
		// 	status: 200,
		// 	message: "User logged in successfully",
		// 	data: { id, email },
		// });
	} catch (error: any) {
		return res.status(500).json({ error: error.sqlMessage });
	}
}; */
