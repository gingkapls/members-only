const { Router } = require("express");
const auth = require("../controllers/auth.js");

const loginRouter = Router();
loginRouter.post(
  "/",
  auth.authenticate("local", { failureRedirect: "/", successRedirect: "/" })
);


module.exports = loginRouter;