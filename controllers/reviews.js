const mongodb = require("../db/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  // #swagger.tags = ["Reviews"]
  mongodb
    .getDatabase()
    .collection("reviews")
    .find()
    .toArray()
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Error retrieving reviews.",
      });
    });
};

const getSingle = (req, res) => {
  // #swagger.tags = ["Reviews"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid review ID.",
    });
  }
  const reviewId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .collection("reviews")
    .findOne({ _id: reviewId })
    .then((review) => {
      res.setHeader("Content-Type", "application/json");
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: "Review not found." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Error retrieving the review.",
      });
    });
};

const createReview = async (req, res) => {
  // #swagger.tags = ["Reviews"]
  try {
    const review = {
      movieId: req.body.movieId,
      reviewerName: req.body.reviewerName,
      score: req.body.score,
      comment: req.body.comment,
      reviewDate: req.body.reviewDate,
    };
    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .insertOne(review);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Review created successfully.",
        id: response.insertedId,
      });
    } else {
      res.status(500).json({
        message: response.error || "Error creating the review.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error creating the review.",
    });
  }
};

const updateReview = async (req, res) => {
  // #swagger.tags = ["Reviews"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid review ID.",
      });
    }
    const reviewId = new ObjectId(req.params.id);
    const review = {
      movieId: req.body.movieId,
      reviewerName: req.body.reviewerName,
      score: req.body.score,
      comment: req.body.comment,
      reviewDate: req.body.reviewDate,
    };
    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .replaceOne({ _id: reviewId }, review);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Review updated successfully." });
    } else {
      res.status(500).json({
        message: response.error || "Error updating the review.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error updating the review.",
    });
  }
};

const deleteReview = async (req, res) => {
  // #swagger.tags = ["Reviews"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid review ID.",
      });
    }
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .deleteOne({ _id: reviewId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Review deleted successfully." });
    } else {
      res.status(500).json({
        message: response.error || "Error deleting the review.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error deleting the review.",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createReview,
  updateReview,
  deleteReview,
};
