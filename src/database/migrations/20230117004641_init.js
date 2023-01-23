/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('transaction', table => {
    table.uuid("id", { primaryKey: true });
    table.uuid("inventory_id").notNullable();
    table.integer("quantity").notNullable();
    table.decimal("price").notNullable();
    table.uuid("employee_id").notNullable();
    table.enu("type", ["Entry", "Exit"]).notNullable();
    table.timestamps(true, true, false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("transaction");
};
