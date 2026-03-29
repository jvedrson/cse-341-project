const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const validate = require('../middleware/validate');

router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getSingle);
router.post('/', validate.saveReview, reviewsController.createReview);
router.put('/:id', validate.saveReview, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
