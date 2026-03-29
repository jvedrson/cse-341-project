const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const validate = require('../middleware/validate');

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', validate.saveMovie, moviesController.createMovie);
router.put('/:id', validate.saveMovie, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
