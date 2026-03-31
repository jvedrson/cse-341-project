const validator = require("../helpers/validate");

const saveMovie = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    director: "required|string",
    releaseYear: "required|numeric",
    genre: "required|string",
    rating: "required|string",
    durationMinutes: "required|numeric",
    description: "required|string",
    cast: "required|array",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveReview = (req, res, next) => {
  const validationRule = {
    movieId: "required|string",
    reviewerName: "required|string",
    score: "required|numeric|between:1,10",
    comment: "required|string",
    reviewDate: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovie,
  saveReview,
};
