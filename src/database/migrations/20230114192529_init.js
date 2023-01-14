/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('employee', table => {
    table.uuid("id", { primaryKey: true });
    table.string("internal_code").notNullable();
    table.string("name").notNullable();
    table.string("email");
    table.string("password");
    table.boolean("is_system_user").notNullable();
    table.timestamps(true, true, false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("employee");
};
