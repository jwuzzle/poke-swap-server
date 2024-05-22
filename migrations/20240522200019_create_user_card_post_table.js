/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("posts", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.integer("card_id").unsigned().notNullable();
        table.string("status").notNullable().defaultTo("available");
        table.string("condition").notNullable();
        table.integer("quantity").notNullable();
        table.string("image_url").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
        table.foreign("card_id").references("id").inTable("cards").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("posts");
};
