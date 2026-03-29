const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const validate = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", moviesController.getAll);
router.get("/:id", moviesController.getSingle);
router.post(
  "/",
  isAuthenticated,
  validate.saveMovie,
  moviesController.createMovie,
);
router.put(
  "/:id",
  isAuthenticated,
  validate.saveMovie,
  moviesController.updateMovie,
);
router.delete("/:id", isAuthenticated, moviesController.deleteMovie);

module.exports = router;
