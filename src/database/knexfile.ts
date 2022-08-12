import type { Knex } from "knex";
import config from "config";

const database = config.get<any>("development");
console.log(database);
interface IKnexConfig {
	[key: string]: Knex.Config;
}
const knexConfig: IKnexConfig = {
	development: {
		client: "mysql2",
		connection: {
			port: database.db_port,
			host: database.host,
			user: database.user,
			password: database.password,
			database: database.database_name,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default knexConfig;
