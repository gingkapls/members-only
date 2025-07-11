const { addMessage, deleteMessageById } = require("../models/queries");

const messagePost = async (req, res, next) => {
  const { text } = req.body;
  const { username } = res.locals.currentUser;
  try {
    await addMessage(username, text);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const messageDeleteGet = async (req, res, next) => {
  const { messageId } = req.params;
  try {
    await deleteMessageById(messageId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  messagePost,
  messageDeleteGet,
};
