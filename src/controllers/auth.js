const auth = require("passport");
const { getUserByUserName, authenticateUser } = require("../models/queries");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await getUserByUserName(username);
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    if (!authenticateUser(user, password)) {
      return done(null, false, { message: "Incorrect password" });
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});


auth.use(strategy);

auth.serializeUser((user, done) => {
    done(null, user.username);
})

auth.deserializeUser(async (username, done) => {
    try {
        const user = await getUserByUserName(username);
      console.log('deserialized');
        done(null, user);
    } catch (err) {
        done(null, user);
    }
})

module.exports = auth;