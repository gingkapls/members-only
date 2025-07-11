const { body, validationResult } = require("express-validator");
const { addUser } = require("../models/queries");

const validators = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 24 })
    .withMessage("Username should be between 3 and 24 characters")
    .isAlphanumeric()
    .withMessage("Username should be alphanumeric"),

  body("firstname")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 24 })
    .withMessage("First name should be between 3 and 24 characters")
    .isAlpha()
    .withMessage("First name should only contain alphabets"),

  body("lastname")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 24 })
    .withMessage("Last name should be between 3 and 24 characters")
    .isAlpha()
    .withMessage("Last name should be between 3 and 24 characters"),

  body("password")
    .notEmpty()
    .isLength({ min: 8, max: 24 })
    .withMessage("Password should be between 8 and 24 characters"),
];

const signUpGet = async (req, res, next) => {
  return res.render("sign-up-form");
};

const signUpPost = [
  validators,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("sign-up-form", { errors: result.array() });
    }
    const { username, password, firstname, lastname } = req.body;
    try {
      await addUser({ username, password, firstname, lastname });
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  signUpGet,
  signUpPost,
};
