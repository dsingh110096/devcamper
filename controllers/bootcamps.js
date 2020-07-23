//Bootcamp Model file
const Bootcamp = require('../models/Bootcamps');

//@desc     Get all bootcamps
//route     GET /api/v1/bootcamps
//access    public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc     Get single bootcamp
//route     GET /api/v1/bootcamps/:id
//access    public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: `Bootcamp not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

//@desc     Create bootcamp
//route     POST /api/v1/bootcamps/:id
//access    Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update bootcamp
//route     PUT /api/v1/bootcamps/:id
//access    Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: `Bootcamp not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

//@desc     Delete bootcamp
//route     DELETE /api/v1/bootcamps/:id
//access    Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: `Bootcamp not found with id ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ success: true, msg: 'Bootcamp Deleted Successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
