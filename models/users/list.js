module.exports = (knex, User) => {
  return () => {
    console.log("User.id: ", User("codechrysalis"));
    const test = knex.select("username").from("users");
    console.log("test!!!!!!", test);
    return Promise.resolve(["rp-3", "muddybarefeet"]); // fix me!
  };
};
