require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const signUpRouter = require("./routes/signupRouter");
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

// ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// static files
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.get("/logout", (req, res) =>
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  })
);

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
