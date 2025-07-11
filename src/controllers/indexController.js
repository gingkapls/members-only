const { getAllMessages } = require("../models/queries");

const indexGet = async (req, res, next) => {
  const messages = await getAllMessages();
  res.render("index", { messages });
};


module.exports = {
    indexGet
}
