const { Router } = require("express");
const { signUpGet, signUpPost } = require("../controllers/signUpController");

const signUpRouter = Router();

signUpRouter.get("/", signUpGet);
signUpRouter.post("/", signUpPost);

module.exports = signUpRouter;
