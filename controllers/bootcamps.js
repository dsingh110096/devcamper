//@desc     Get all bootcamps
//route     GET /api/v1/bootcamps
//access    public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

//@desc     Get single bootcamp
//route     GET /api/v1/bootcamps/:id
//access    public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Showing a bootcamp with id ${req.params.id}`,
  });
};

//@desc     Create bootcamp
//route     POST /api/v1/bootcamps/:id
//access    Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create a bootcamp' });
};

//@desc     Update bootcamp
//route     PUT /api/v1/bootcamps/:id
//access    Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp with id ${req.params.id}` });
};

//@desc     Delete bootcamp
//route     DELETE /api/v1/bootcamps/:id
//access    Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp with id ${req.params.id}` });
};
