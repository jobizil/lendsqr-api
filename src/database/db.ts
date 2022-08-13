import knex from "knex";
// import config from "config";
import config from "../index";
import knexConfig from "./knexfile";

// const env = config.get<string>("env");
const { env } = config;
const enviormentConfig = knexConfig[env];

const db = knex(enviormentConfig);

export default db;
