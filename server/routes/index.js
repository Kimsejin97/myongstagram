var express = require('express');
var router = express.Router();
const posts = require('./posts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/posts',posts);

module.exports = router;
