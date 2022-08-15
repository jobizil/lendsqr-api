import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
import { deserializeUser } from "./middleware/auth";
dotenv.config();

function createServer() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(deserializeUser);
	routes(app);
	return app;
}

export default createServer;
