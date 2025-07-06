const { addUser } = require("../models/queries");

const signUpGet = async (req, res, next) => {
  return res.render("sign-up-form");
};

const signUpPost = async (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;
  try {
    await addUser({username, password, firstname, lastname});
    res.send(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpGet,
  signUpPost,
};
