import express from "express";
import * as dotenv from "dotenv";
import config from "./index";
import routes from "./routes";
import { deserializeUser } from "./middleware/auth";
dotenv.config();
const { port, env } = config;
function createServer() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(deserializeUser);
	routes(app);
	return app;
}

export default createServer;
