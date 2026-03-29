const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const validate = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", reviewsController.getAll);
router.get("/:id", reviewsController.getSingle);
router.post(
  "/",
  isAuthenticated,
  validate.saveReview,
  reviewsController.createReview,
);
router.put(
  "/:id",
  isAuthenticated,
  validate.saveReview,
  reviewsController.updateReview,
);
router.delete("/:id", isAuthenticated, reviewsController.deleteReview);

module.exports = router;
