//utility file
const ErrorResponse = require('../utils/errorResponse');
//middleware file
const asyncHandler = require('../middleware/async');

//Course Model file
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

//@desc     Get all Courses
//route     GET /api/v1/course
//route     GET /api/v1/bootcamps/:boocampId/course
//access    public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  //Get course with specific bootcampId
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId }).populate({
      path: 'bootcamp',
      select: 'name description',
    });
  } else {
    //if no bootcampId then show all courses
    //populate method will show bootcamp details as we want like name and description,
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

//@desc     Get a single couse
//route     GET /api/v1/course/:id
//access    public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with this id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc     Add Course for a bootcamp
//route     GET /api/v1/bootcamps/:bootcampId/courses
//access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with this id ${req.params.id}`, 404)
    );
  }

  // const duplicateCourse = await Course.find({ title: req.body.title });
  // if (duplicateCourse) {
  //   return next(
  //     new ErrorResponse(`Course with name ${req.body.title} already exists`),
  //     400
  //   );
  // }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});
