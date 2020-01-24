module.exports = (knex, ChannelMessage) => {
  return (params) => {
    // console.log(params);
    const channelId = params.channelId;

    return knex("channel_messages")
      .join("users", "channel_messages.from_id", "=", "users.id")
      .join("channels", "channel_messages.channel_id", "=", "channels.id")
      .where({ channel_id: channelId })
      .select(
        "channel_messages.id",
        "users.username as from",
        "channels.name as to",
        "channel_messages.message",
        "channel_messages.sent_at"
      )
      .then((channel_messages) => {
        let result = channel_messages.map((channel_message) => {
          return new ChannelMessage(channel_message);
        });
        return result;
      }) // create a channel_messages model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          // throw unknown errors
          return Promise.reject(err);
      });
    // Promise.resolve([]);
  };
};
