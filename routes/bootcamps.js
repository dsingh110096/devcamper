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
router.route('/').get(getBootcamps).post(createBootcamp);

//routes for singleGetBootcamp, updateBootcamp & deleteBootcamp.
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
