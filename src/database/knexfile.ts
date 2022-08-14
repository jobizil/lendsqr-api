import { Knex } from "knex";
import config from "../index";
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
};

export default knexConfig;
