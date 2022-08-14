import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("transactions", (table) => {
		table.increments("id").primary();
		table.integer("wallet_id").unsigned();
		table.foreign("wallet_id").references("id").inTable("wallets").onDelete("CASCADE");
		table.string("trans_type").notNullable().defaultTo("initial");
		table.string("trx_id").notNullable();
		table.decimal("balance_before").notNullable().defaultTo(0.0);
		table.decimal("current_balance").notNullable().defaultTo(0.0);
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("transactions");
}
