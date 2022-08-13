import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("transactions", (table) => {
		table.increments("id").primary();
		table.integer("wallet_id").unsigned();
		table.foreign("wallet_id").references("id").inTable("wallets").onDelete("CASCADE");
		table.string("amount").notNullable();
		table.enum("trans_type", ["credit", "debit"]).notNullable();
		table.float("balance_before").notNullable();
		table.float("balance_after").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("transactions");
}
