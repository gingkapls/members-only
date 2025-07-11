const { makeUserMember } = require("../models/queries");

const memberGet = (req, res) => {
    if (!req.user) {
        res.redirect("/");
        return;
    }
    res.render("code-form", { title: "Become a member"});
}

const memberPost = async (req, res, next) => {
  const { code } = req.body;
  const memberCode = process.env.MEMBERCODE;
  const { username } = req.user;

  if (code === memberCode) {
    await makeUserMember(username);
    res.redirect("/");
  } else {
    res.render("code-form", { title: "Become a member", error: "Incorrect membership code" });

  }
};


module.exports = {
  memberGet,
  memberPost,
};
