//Utility file
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
//Middleware file
const asyncHandler = require('../middleware/async');

//Bootcamp Model file
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//route     GET /api/v1/bootcamps
//access    public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //Adanced Filtering
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Creating query string
  let queryStr = JSON.stringify(reqQuery);

  //Creating operators ($gt,$gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //Executing query
  const bootcamps = await query;

  //Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

//@desc     Get single bootcamp
//route     GET /api/v1/bootcamps/:id
//access    public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Create bootcamp
//route     POST /api/v1/bootcamps/:id
//access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     Update bootcamp
//route     PUT /api/v1/bootcamps/:id
//access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc     Delete bootcamp
//route     DELETE /api/v1/bootcamps/:id
//access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }
  bootcamp.remove();
  res.status(200).json({
    success: true,
    data: {},
    msg: `Bootcamp with id ${req.params.id} Deleted Successfully`,
  });
});

//@desc     Get bootcamp with a radius
//route     GET /api/v1/bootcamps/radius/:zipcode/:distance
//access    Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lag from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lag = loc[0].longitude;

  //Calc radius using radians
  //Divide distance by earth radius
  //Earth radius = 3963 mi / 6378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lag, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//@desc     Upload Photo For Bootcamp
//route     PUT /api/v1/bootcamps/:id/photo
//access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }
  //If no file is uploaded
  if (!req.files) {
    return next(new ErrorResponse(`Please Upload a file`, 400));
  }

  //Make sure the uploaded file is image
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload a image file`, 400));
  }

  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload a image less than 1MB`, 400));
  }

  //Creating custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  //updating photo field in DB and saving image in public folder
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
