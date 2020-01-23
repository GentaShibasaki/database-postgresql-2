exports.up = function(knex) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channels", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("name", 50) // maximum length of 50 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("channels");
};
