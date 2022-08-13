import { Express, Request, Response } from "express";
import { signUp, login, myProfile } from "./module/userModule/user.controller";
import { depositFund } from "./module/walletModule/wallet.controller";
import { authenticate } from "./middleware/auth";

export default function (app: Express) {
	// Api Status
	app.get("/status", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	// Register new user
	app.post("/signup", signUp);
	// Login user
	app.post("/login", login);

	// User profile
	app.get("/me", authenticate, myProfile);

	// Fund wallet
	app.post("/wallet/deposit", authenticate, depositFund);

	// Transfer funds

	// Withdraw funds
}
