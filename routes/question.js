var express = require('express');
var router = express.Router();
var path = require('path');
var QuestionCtrl = require("./../app/controller/question");
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');
passport.use(new Strategy(
  function(token, callback) {
	jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
		if(err){
			console.log(err);
			callback('Invalid token');
		}else{
			console.log(decoded)
			callback(false,decoded);
		}
	});
}));

router.post('/addquestion',passport.authenticate('bearer', { session: false }), QuestionCtrl.addquestion);
router.post('/addanswer/:id', passport.authenticate('bearer', { session: false }),  QuestionCtrl.addanswer);
router.get('/populateanswer/:id', QuestionCtrl.populateanswer);
router.get('/populateall', QuestionCtrl.populateall);
router.get('/get',QuestionCtrl.getquestionById);
router.delete('/answer/:id/',QuestionCtrl.deleteanswer);
router.delete('/:id',QuestionCtrl.deletequestion);


module.exports = router;
