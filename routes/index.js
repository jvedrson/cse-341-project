const express = require("express");
const router = express.Router();

const moviesRouter = require("./movies");
const reviewsRouter = require("./reviews");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  // #swagger.ignore = true;
  const user = req.session.user;
  if (user) {
    console.log("Authenticated user:", user);
    const userInfo = `Authenticated user: ${user.username} (ID: ${user.id})`;
    const welcomeMessage = `<h2>${userInfo}</h2><p>Go to <a href='/api-docs'>API documentation</a></p><p><a href='/auth/logout'>Logout</a></p>`;
    res.send(welcomeMessage);
  } else {
    console.log("No authenticated user");
    res.send(
      "<h2>Welcome to the Movie API</h2><p>Log in with <a href='/auth/github'>Github</a>.</p>",
    );
  }
});
router.use("/auth", authRouter);
router.use("/movies", moviesRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
