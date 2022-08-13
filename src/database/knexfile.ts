import { Knex } from "knex";
interface IKnexConfig {
	[key: string]: Knex.Config;
}
const knexConfig: IKnexConfig = {
	development: {
		client: "mysql2",
		connection: {
			port: 3306,
			host: "127.0.0.1",
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default knexConfig;
