import { Knex } from "knex";
import config from "../index";
const { db_host, db_name, db_password, db_port, db_user } = config;
interface IKnexConfig {
	[key: string]: Knex.Config;
}
const knexConfig: IKnexConfig = {
	development: {
		client: "mysql2",
		connection: config.db_url,
		migrations: {
			tableName: "knex_migrations",
		},
	},
	test: {
		client: "mysql2",
		connection: {
			port: Number(db_port),
			host: db_host,
			user: db_user,
			password: db_password,
			database: db_name,
		},
		// connection: { port: 3306, host: "127.0.0.1", user: "root", password: "helloWorld", database: "lendsqr_test" },
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default knexConfig;
