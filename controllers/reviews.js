//utility file
const ErrorResponse = require('../utils/errorResponse');
//middleware file
const asyncHandler = require('../middleware/async');

//Model files
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

//@desc     Get all reviews
//route     GET /api/v1/reviews
//route     GET /api/v1/bootcamps/:boocampId/reviews
//access    public

exports.getReviews = asyncHandler(async (req, res, next) => {
  //Get review with specific bootcampId
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    //if no bootcampId then show all reviews
    res.status(200).json(res.advancedResults);
  }
});
