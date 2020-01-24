module.exports = (knex, User) => {
  return () => {
    return knex("users")
      .select()
      .then((users) => {
        return users.map((user) => {
          return new User(user);
        });
      })
      .catch((err) => {
        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
