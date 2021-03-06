module.exports = (knex, Channel) => {
  return () => {
    return knex("channels")
      .select()
      .then((channels) => {
        return channels.map((channel) => {
          return new Channel(channel);
        });
      })
      .catch((err) => {
        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
