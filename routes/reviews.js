const express = require('express');
const router = express.Router({ mergeParams: true });
//Middleware file
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
//Model file
const Review = require('../models/Review');

//Controller files
//reviews controller
const { getReviews, getReview } = require('../controllers/reviews');
router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
);

router.route('/:id').get(getReview);

module.exports = router;
