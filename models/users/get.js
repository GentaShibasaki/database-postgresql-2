module.exports = (knex, User) => {
  return (params) => {
    const username = params.username;
    console.log("inside get.js: params is", params);
    return knex("users")
      .where({ username: username.toLowerCase() })
      .select()
      .then((users) => {
        if (users.length) return new User(users.pop());

        throw new Error(`Error finding user ${username}`);
      });
  };
};
