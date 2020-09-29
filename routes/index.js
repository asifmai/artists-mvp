const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubecontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/scrapeyoutube', youtubeController.scrapeyoutube_post)

module.exports = router;
