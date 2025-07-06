const pool = require("./pool");
const bcrypt = require("bcrypt");

async function addUser({
  username,
  password,
  firstname,
  lastname,
  is_member = false,
  is_admin = false,
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users(username, password, first_name, last_name, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
    [username, hashedPassword, firstname, lastname, is_member, is_admin]
  );
  console.log("Added user: ", username);
}

async function getUserByUserName(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = ($1)",
    [username]
  );

  return rows[0];
}

async function authenticateUser(user, password) {
  const isAuthenticated = await bcrypt.compare(password, user.password);

  return isAuthenticated;
}

module.exports = {
  addUser,
  getUserByUserName,
  authenticateUser,
};
