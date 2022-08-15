module.exports = {
	apps: [
		{
			name: "lendsqr-api",
			script: "./dist/server.js",
			watch: true,
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
