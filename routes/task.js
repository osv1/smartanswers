var express = require('express');
var router = express.Router();

var UserCtrl = require("./../app/controller/task");
var path = require('path');
var fs = require('fs');
var multer  = require('multer')
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

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


router.get('/getcms',UserCtrl.getcms);

router.post('/uploadImage',passport.authenticate('bearer', { session: false }),upload.single('file'),UserCtrl.uploadImage);

router.get('/auth', passport.authenticate('bearer', { session: false }),UserCtrl.auth);

router.get('/authr', passport.authenticate('bearer', { session: false }),UserCtrl.authr);

router.get('/myaccount', passport.authenticate('bearer', { session: false }), UserCtrl.getAtask)

router.post('/editUser',passport.authenticate('bearer', { session: false }),UserCtrl.edittask)

router.get('/ques/:id',UserCtrl.getAques);

router.get('/getcmsedit/:id', UserCtrl.getcmsedit);

router.get('/', UserCtrl.getAllusers);

router.get('/contact', UserCtrl.getAllcontact);

router.get('/:id',UserCtrl.updatetask)

router.delete('/:id',UserCtrl.deletetask);

router.post('/addtask',UserCtrl.adduser);

router.post('/addquestion',UserCtrl.addquestion);

router.post('/addanswer/:id',UserCtrl.addanswer);

router.post('/addcontact',UserCtrl.addcontact);

router.post('/editcms/:id',UserCtrl.editcms);

router.delete('/contact/:id',UserCtrl.deletecontact);

router.post('/login',UserCtrl.login);

router.get('/gt/',UserCtrl.greater);

router.get('/lt/',UserCtrl.getMin);

router.get('/max/',UserCtrl.getMax);

router.get('/avg/',UserCtrl.getAvg);

router.get('/push/',UserCtrl.getPushData);

router.get('/sum/',UserCtrl.getSum);

module.exports = router;
