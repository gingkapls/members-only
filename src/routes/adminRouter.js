const { Router } = require('express');
const { adminGet, adminPost } = require('../controllers/adminController');

const adminRouter = Router();

adminRouter.get("/", adminGet);
adminRouter.post("/", adminPost);

module.exports = adminRouter;