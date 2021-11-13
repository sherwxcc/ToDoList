exports.up = function (knex) {
  return knex.schema.createTable("todolist", (table) => {
    table.increments();
    table.string("task");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todolist");
};
