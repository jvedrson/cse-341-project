const mongodb = require("../db/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ["Movies"]
  try {
    const lists = await mongodb
      .getDatabase()
      .collection("movies")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error retrieving movies.",
    });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ["Movies"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }
    const movieId = new ObjectId(req.params.id);

    const movie = await mongodb
      .getDatabase()
      .collection("movies")
      .findOne({ _id: movieId });
    
    res.setHeader("Content-Type", "application/json");
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error retrieving the movie.",
    });
  }
};

const createMovie = async (req, res) => {
  // #swagger.tags = ["Movies"]
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rating: req.body.rating,
      durationMinutes: req.body.durationMinutes,
      description: req.body.description,
      cast: req.body.cast,
    };
    const response = await mongodb
      .getDatabase()
      .collection("movies")
      .insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Movie created successfully.",
        id: response.insertedId,
      });
    } else {
      res
        .status(500)
        .json({ message: response.error || "Error creating the movie." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error creating the movie.",
    });
  }
};

const updateMovie = async (req, res) => {
  // #swagger.tags = ["Movies"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rating: req.body.rating,
      durationMinutes: req.body.durationMinutes,
      description: req.body.description,
      cast: req.body.cast,
    };
    const response = await mongodb
      .getDatabase()
      .collection("movies")
      .replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Movie updated successfully." });
    } else {
      res
        .status(500)
        .json({ message: response.error || "Error updating the movie." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error updating the movie.",
    });
  }
};

const deleteMovie = async (req, res) => {
  // #swagger.tags = ["Movies"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("movies")
      .deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Movie deleted successfully." });
    } else {
      res
        .status(500)
        .json({ message: response.error || "Error deleting the movie." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error deleting the movie.",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
