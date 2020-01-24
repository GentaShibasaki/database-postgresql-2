module.exports = (knex, UserMessage) => {
  return (params) => {
    return knex("user_messages")
      .insert({
        from_id: params.fromId,
        to_id: params.toId,
        message: params.message,
      })
      .then(() => {
        return knex("user_messages")
          .join("users", "user_messages.from_id", "=", "users.id")
          .select(
            "user_messages.id",
            "users.username as from",
            "user_messages.message",
            "user_messages.sent_at"
          );
      })
      .then((user_messages) => {
        return user_messages.map((user_message) => {
          return new UserMessage(user_message);
        });
      });
  };
};
