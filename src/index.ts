import dotenv from "dotenv";

export default {
	port: process.env.PORT || 3002,
	env: process.env.NODE_ENV || "development",
	jwtSecret: process.env.JWT_SECRET,
	db_url: process.env.DB_URL,
};
