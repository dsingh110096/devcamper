const express = require('express');
const router = express.Router({ mergeParams: true });

//Controller files
//course controller
const { getCourses } = require('../controllers/courses');

router.route('/').get(getCourses);

module.exports = router;
