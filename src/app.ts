import express from "express";
import "dotenv/config";
import config from "config";
import routes from "./routes";

const port = config.get<number>("port");
const env = config.get<string>("jwtSecret");
console.log(env);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
	console.log(`Listening on port 127.0.0.1:${port}`);
	routes(app);
});
