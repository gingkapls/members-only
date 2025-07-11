const { Router } = require('express');
const { messagePost, messageDeleteGet } = require('../controllers/messageController');

const messageRouter = Router();

messageRouter.post("/", messagePost);
messageRouter.get("/:messageId/delete", messageDeleteGet);

module.exports = messageRouter;