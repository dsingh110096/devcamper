//utility file
const ErrorResponse = require('../utils/errorResponse');
//middleware file
const asyncHandler = require('../middleware/async');

//Bootcamp Model file
const Bootcamp = require('../models/Bootcamps');
const geocoder = require('../utils/geocoder');

//@desc     Get all bootcamps
//route     GET /api/v1/bootcamps
//access    public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //Adanced Filtering
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;
  res.status(200).json({
    success: true,
    count: bootcamps.length,
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
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, msg: 'Bootcamp Deleted Successfully' });
});

//@desc     Get bootcamp with a radius
//route     DELETE /api/v1/bootcamps/radius/:zipcode/:distance
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
