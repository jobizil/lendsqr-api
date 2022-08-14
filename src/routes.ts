import { Express, Request, Response } from "express";
import { signUp, login, myProfile } from "./module/userModule/user.controller";
import { depositFund, withdrawFund, transferFund } from "./module/walletModule/wallet.controller";
import { authenticate } from "./middleware/auth";

export default function (app: Express) {
	// Api Status

	app.get("/status", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	// Register new user
	app.post("/api/v1/auth/signup", signUp);
	// Login user
	app.post("/api/v1/auth/login", login);

	// User profile
	app.get("/api/v1/auth/me", authenticate, myProfile);

	// Fund wallet
	app.post("/api/v1/wallet/deposit", authenticate, depositFund);

	// Transfer funds
	app.post("/api/v1/wallet/transfer", authenticate, transferFund);

	// Withdraw funds
	app.post("/api/v1/wallet/withdraw", authenticate, withdrawFund);
}
