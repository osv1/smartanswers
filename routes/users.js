var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.get('/', function(req, res){
  res.render('about', {
    title: 'About'
  });
});*/
module.exports = router;


/*
(/users?pageno=1&pagesize=10)
*/