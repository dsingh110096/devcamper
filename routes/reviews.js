const express = require('express');
const router = express.Router({ mergeParams: true });
//Middleware file
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
//Model file
const Review = require('../models/Review');

//Controller files
//reviews controller
const { getReviews, getReview, addReview } = require('../controllers/reviews');
router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview);

module.exports = router;
