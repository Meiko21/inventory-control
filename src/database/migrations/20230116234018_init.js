/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.table('inventory', table => {
    table.decimal('price');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
  return knex.schema.table('inventory', table => {
    table.dropColumn('price');
  })
};