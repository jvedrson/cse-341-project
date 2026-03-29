const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/github", (req, res) => {
  // #swagger.ignore = true
  passport.authenticate("github")(req, res);
});
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // #swagger.ignore = true
    req.session.user = req.user;
    res.redirect("/");
  },
);
router.get("/logout", (req, res) => {
  // #swagger.ignore = true;
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
    }
    res.redirect("/");
  });
});

module.exports = router;
