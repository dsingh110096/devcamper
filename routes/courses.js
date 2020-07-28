const express = require('express');
const router = express.Router({ mergeParams: true });
//Middleware file
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
//Model file
const Course = require('../models/Course');

//Controller files
//course controller
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
