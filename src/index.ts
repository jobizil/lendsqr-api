import * as dotenv from "dotenv";
dotenv.config();
export default {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_SECRET,
	db_url: process.env.DB_URL,
};
