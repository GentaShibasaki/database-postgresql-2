module.exports = (knex, UserMessage) => {
  return (params) => {
    return knex("user_messages")
      .orderBy("sent_at")
      .where(function() {
        this.where("from_id", params.fromId).andWhere("to_id", params.toId);
      })
      .orWhere(function() {
        this.where("from_id", params.toId).andWhere("to_id", params.fromId);
      })
      .join("users", "user_messages.from_id", "=", "users.id")
      .select(
        "user_messages.id",
        "users.username as from",
        "user_messages.message",
        "user_messages.sent_at"
      )
      .then((user_messages) => {
        return user_messages.map((user_message) => {
          return new UserMessage(user_message);
        });
      });
  };
};
