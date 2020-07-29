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
  res.status(200).json(res.advancedResults);
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
  //Adding user to req.card
  req.body.user = req.user.id;
  //Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
  //If user is not 'admin' then they can create only one bootcamp
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }
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
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );
  }

  //Make sure user owns the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.roll !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
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

  //Make sure user owns the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.roll !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

  await bootcamp.remove();

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

  //Make sure user owns the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.roll !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
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
