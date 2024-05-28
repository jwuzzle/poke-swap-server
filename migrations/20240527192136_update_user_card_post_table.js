/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("posts", (table) => {
    table.renameColumn("image_url", "front_image_url");
    table.string("back_image_url").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("posts", (table) => {
        table.renameColumn("front_image_url", "image_url");
        table.dropColumn("back_image_url");
    })
};
