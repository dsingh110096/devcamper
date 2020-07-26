//utility file
const ErrorResponse = require('../utils/errorResponse');
//middleware file
const asyncHandler = require('../middleware/async');

//Bootcamp Model file
const Course = require('../models/Course');

//@desc     Get all Courses
//route     GET /api/v1/course
//route     GET /api/v1/bootcamps/:boocampId/course
//access    public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  //Get course with specific bootcampId
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    //if no bootcampId then show all courses
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
