import knex from "knex";
import config from "config";
import knexConfig from "./knexfile";

const env = config.get<string>("env");

const enviormentConfig = knexConfig[env];

const db = knex(enviormentConfig);

export default db;
