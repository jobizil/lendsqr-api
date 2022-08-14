import knex from "knex";
// import config from "config";
import config from "../index";
import knexConfig from "./knexfile";

// const { env } = config;
const env = <string>config.env;
const enviormentConfig = knexConfig[env];

const db = knex(enviormentConfig);

export default db;
