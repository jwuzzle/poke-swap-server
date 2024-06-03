/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("trades", (table) => {
        table.increments("id").primary();
        table.integer("offering_user_id").unsigned().notNullable();
        table.integer("receiving_user_id").unsigned().notNullable();
        table.string("status").notNullable().defaultTo("pending");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        table.foreign("offering_user_id").references("id").inTable("users").onDelete("CASCADE");
        table.foreign("receiving_user_id").references("id").inTable("users").onDelete("CASCADE");
    })
    .createTable("trade_items", (table) => {
        table.increments("id").primary();
        table.integer("trade_id").unsigned().notNullable();
        table.integer("user_card_id").unsigned().notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        table.foreign("trade_id").references("id").inTable("trades").onDelete("CASCADE");
        table.foreign("user_card_id").references("id").inTable("posts").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("trade_items").dropTable("trades");
};
