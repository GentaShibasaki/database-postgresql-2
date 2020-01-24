exports.up = function(knex, Promise) {
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("channel_id")
      .index() // unsigned() is not executed when your environment is postgres!!
      //but if your environment is MySql, "unsigned()" would be working
      .notNullable()
      .references("id")
      .inTable("channels");

    t.integer("from_id")
      .index()
      .notNullable()
      .references("id")
      .inTable("users");
    //select users.id from users

    t.string("message", 100).notNullable(); // add a not-null constraint to this column

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
