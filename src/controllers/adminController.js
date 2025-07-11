const { makeUserAdmin } = require("../models/queries");

const adminGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  res.render("code-form", { title: "Become an admin" });
};

const adminPost = async (req, res, next) => {
  if (!req.user) return res.redirect("/");
  const { code } = req.body;
  const adminCode = process.env.ADMINCODE;
  const { username } = req.user;
    

  if (code === adminCode) {
    await makeUserAdmin(username);
    res.redirect("/");
  } else {
    res.render("code-form", {
      title: "Become an admin",
      error: "Incorrect admin code",
    });
  }
};

module.exports = {
  adminGet,
  adminPost,
};
