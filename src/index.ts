import * as dotenv from "dotenv";
dotenv.config();
export default {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_SECRET,
	db_url: process.env.DB_URL,
	db_name: process.env.DB_NAME,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASSWORD,
	db_host: process.env.DB_HOST,
	db_port: process.env.DB_PORT,
};
