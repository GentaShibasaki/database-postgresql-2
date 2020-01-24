const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    const channelName = params.name;

    if (!validateChannelName(channelName)) {
      return Promise.reject(
        new Error(
          "Channelname must be provided, and be at least three characters"
        )
      );
    }

    return knex("channels")
      .insert({ name: channelName.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ name: channelName.toLowerCase() })
          .select();
      })
      .then((channels) => new Channel(channels.pop())) // create a channel model
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That channel already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
