/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventory', table => {
    table.uuid("id", { primaryKey: true });
    table.string("name").notNullable();
    table.integer("quantity").notNullable();
    table.timestamps(true, true, false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("inventory");
};
