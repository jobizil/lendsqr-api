import express from "express";
import "dotenv/config";
import config from "./index";
import routes from "./routes";
import { deserializeUser } from "./middleware/auth";

const { port, env } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

app.listen(port, () => {
	console.log(`Listening on ${env} mode`);
	routes(app);
});
