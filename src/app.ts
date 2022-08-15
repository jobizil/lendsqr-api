import config from "./index";
import createServer from "./server";

const { port, env } = config;
const app = createServer();

app.listen(port, () => {
	console.log(`Listening in ${env} mode`);
});
