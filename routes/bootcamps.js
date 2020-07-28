const express = require('express');
const router = express.Router();
//Middleware file
const advancedResults = require('../middleware/advancedResults');
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
//Re-route into other resouces router
router.use('/:bootcampId/courses', courseRoute);

//route for getBootcampsInRadius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//route for bootcampPhotoUpload
router.route('/:id/photo').put(bootcampPhotoUpload);

//routes for getBootcamps & createBootcamp.
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

//routes for singleGetBootcamp, updateBootcamp & deleteBootcamp.
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
