export default {
	port: process.env.PORT || 3002,
	env: process.env.NODE_ENV || "development",
	jwtSecret: process.env.JWT_SECRET,
	host: process.env.DB_HOST,
	development: {
		db_port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database_name: process.env.DB_NAME,
	},
};