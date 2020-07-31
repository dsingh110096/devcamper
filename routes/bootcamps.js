const express = require('express');
const router = express.Router();
//Middleware file
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
//Model file
const Bootcamp = require('../models/Bootcamp');

//Controller files
//bootcamp controller
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

//Include other resource routers
const courseRoute = require('./courses');
const reviewRoute = require('./reviews');
//Re-route into other resouces router
router.use('/:bootcampId/courses', courseRoute);
router.use('/:bootcampId/reviews', reviewRoute);

//route for getBootcampsInRadius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//route for bootcampPhotoUpload
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

//routes for getBootcamps & createBootcamp.
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

//routes for singleGetBootcamp, updateBootcamp & deleteBootcamp.
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
