import { Express, Request, Response } from "express";
import { signUp, login } from "./module/userModule/user.controller";
import authenticate from "./utils/auth";

export default function (app: Express) {
	// Api Status
	app.get("/status", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	// Register new user
	app.post("/signup", signUp);
	// Login user
	app.post("/login", login);

	// Fund wallet

	// Transfer funds

	// Withdraw funds
}
