var express = require('express');
var router = express.Router();
var task = require("./task");
var question=require("./question");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/task", task);
router.use("/question",question);

/*router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});*/
module.exports = router;
