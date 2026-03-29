const express = require('express');
const router = express.Router();

const moviesRouter = require('./movies');
const reviewsRouter = require('./reviews');

router.use('/movies', moviesRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
