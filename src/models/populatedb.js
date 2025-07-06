const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.PGCONNECTIONSTRING,
});

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR( 24 ) PRIMARY KEY,
    first_name VARCHAR( 50 ) NOT NULL,
    last_name VARCHAR( 50 ) NOT NULL,
    password VARCHAR( 256 ) NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    m_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR( 24 ) REFERENCES users(username),
    text TEXT NOT NULL,
    time_created DATE NOT NULL DEFAULT CURRENT_DATE
);
`;

async function main() {
  try {
    console.log("seeding...");
    await client.connect();
    await client.query(SQL);
  } catch (e) {
    console.error("There was an error", e);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
