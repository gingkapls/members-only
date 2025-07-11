const { Router } = require('express');
const { memberGet, memberPost } = require('../controllers/memberController');

const memberRouter = Router();

memberRouter.get("/", memberGet);
memberRouter.post("/", memberPost);

module.exports = memberRouter;