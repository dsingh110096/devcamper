const express = require('express');
const router = express.Router();

//Controller files
//bootcamp controller
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

//route for getBootcampsInRadius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//routes for getBootcamps & createBootcamp.
router.route('/').get(getBootcamps).post(createBootcamp);

//routes for singleGetBootcamp, updateBootcamp & deleteBootcamp.
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
