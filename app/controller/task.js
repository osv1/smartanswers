var UserModel = require("./../models/tasks");
var contact = require("./../models/contactus")
var pages = require("./../models/pages")
var mongoosePages = require('mongoose-pages');
var jsonwebtoken = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');

exports.getAllusers = function(req, res) {
    UserModel.find({}).exec(function(err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "error"
            })
        } else {
            res.json({
                code: 200,
                message: "GET",
                data: result
            })
        }
    });
}




exports.getAllcontact = function(req, res) {
    contact.find({}).exec(function(err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "error"
            })
        } else {
            res.json({
                code: 200,
                message: "GET",
                data: result
            })
        }
    });
}
exports.auth = function(req, res) {
    res.json({
        code: 200,
        message: "ok"
    });
}

exports.authr = function(req, res) {
    res.json({
        code: 200,
        message: "ok"
    });
}




exports.getAques = function(req, res) {
    UserModel.findById({
        _id: req.params.id
    }).exec(function(err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "error"
            });
        } else {
            res.json({
                code: 200,
                message: "find",
                data: result
            });
        }
    })
}

exports.adduser = function(req, res) {
    var blog = new UserModel(req.body);
    blog.save(function(err, blog) {
        if (err) {
            console.log(err);
            res.json({
                code: 404,
                message: "task not inserted"
            })
        } else {
            res.json({
                code: 200,
                data: blog
            })
            console.log("register successfully");
        }
    });

}
exports.addquestion = function(req, res) {
    var question = new UserModel(req.body);
    question.save(function(err, question) {
        if (err) {
            console.log(err);
            res.json({
                code: 404,
                message: "question not insert"
            })
        } else {
            res.json({
                code: 200,
                data: question
            })
            console.log("question insert Success");
        }
    });

}


     exports.addanswer = function(req, res){
        console.log(req.body);
      var answer = new UserModel(req.body);
      // answer.nameans = req.user.id;
      answer.save(function(err,answer){
      UserModel.update({_id: req.params.id}, { $push: {answer: answer}}, function(err, ques){
        console.log(err);
      if(err){ res.json({code: 404, message: "err"});
      }else{
              res.json({code: 200, message:"success", data:ques});
            }
        })
      })
    }

exports.addcontact = function(req, res) {
    var blog = new contact(req.body);
    blog.save(function(err, blog) {
        if (err) {
            console.log(err);
            res.json({
                code: 404,
                message: "task not inserted"
            })
        } else {
            res.json({
                code: 200,
                data: blog
            })
            console.log("contact successfully");
        }
    });

}
exports.getcmsedit = function(req, res){
pages.findById({_id:req.params.id}).exec(function(err,page){
      if(err){
                res.json({code:404,message:"Errors while fetching data"})
            }else{
            res.json({code:200,message:"success",data:page});
         }    
    })
  }



exports.getcms = function(req,res){


    pages.find().exec(function(err,page){  
        if(err){
            res.json({
                code:400,
                message:"error"
            })
        }else{
            res.json({
                code:200,
                message:"cms",
                data:page
            })
        }
    });
}

exports.editcms=function(req,res){
    console.log('edit',req.body);
    pages.update({
        _id:req.params.id
    },{
        $set: req.body
    },function(err,page){
        if(err){
            console.log(err)
            res.json({
                code:404,message:"err"
            })

        }else{
            res.json({
                code:200,message:"success",data:page
            })
        }
    })
}

exports.edittask = function(req, res) {
    UserModel.update({
        '_id': req.user.id
    }, {
        $set: req.body
    }).exec(function(err, UserModel) {
        if (err) {
            res.json({   
                code: 404,
                message: "err"
            })
        } else {
            res.json({
                code: 200,
                message: "task update successfully ",
                data: UserModel
            })
        }
    });
}
exports.getAtask = function(req, res) {
    console.log(req.user);
    var id = req.user.id;
    UserModel.findById({
        "_id": id
    }).exec(function(err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "error"
            })
        } else {
            res.json({
                code: 200,
                message: "save",
                data: result
            })
        }
    });
}


exports.updatetask = function(req, res) {
    var id = req.user.id;
    UserModel.findById({
        '_id': id
    }).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404,
                message: err
            })
        } else {
            res.json({
                code: 200,
                data: UserModel
            })
        }
    });
}


exports.deletetask = function(req, res) {
    console.log("deletetask", req.params.id, req.body);
    UserModel.remove({
        _id: req.params.id
    }).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404,
                message: "err"
            })
        } else {
            res.json({
                code: 200,
                message: "task remove successfully ",
                data: UserModel
            })
        }
    });
}
exports.deletecontact = function(req, res) {
    console.log("deletetask", req.params.id, req.body);
    contact.remove({
        _id: req.params.id
    }).exec(function(err, contact) {
        if (err) {
            res.json({
                code: 404,
                message: "err"
            })
        } else {
            res.json({
                code: 200,
                message: "contact remove successfully ",
                data: contact
            })
        }
    });
}


exports.greater = function(req, res) {

    UserModel.find({
        age: {
            $gte: req.params.age
        }
    }, function(err, age) {
        if (err) {
            res.json({
                code: 404,
                message: "no data found"
            })
        } else {
            res.json({
                "Total count": age
            });
        }
    });
}

exports.less = function(req, res) {

    UserModel.find({
        age: {
            $lte: req.params.age
        }
    }, function(err, age) {
        if (err) {
            res.json({
                code: 404,
                message: "no data found"
            })
        } else {
            res.json({
                "Total count": age
            });
        }
    });
}
exports.getMin = function(req, res) {
    UserModel.aggregate([{
        $group: {
            id: "age",
            lowestRating: {
                $min: "$age"
            }
        }
    }]).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404
            })
        } else {
            res.json({
                code: 200
            })
        }
    });
}

exports.getAvg = function(req, res) {
    UserModel.aggregate([{
        $group: {
            id: "age",
            avg: {
                $avg: "$age"
            }
        }
    }]).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404
            })
        } else {
            res.json({
                code: 200
            })
        }
    });
}

exports.getPushData = function(req, res) {
    UserModel.aggregate([{
        $group: {
            id: "age",
            push: {
                $push: "$age"
            }
        }
    }]).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404
            })
        } else {
            res.json({
                code: 200
            })
        }
    });
}
exports.getMax = function(req, res) {
    UserModel.aggregate([{
        $group: {
            id: "age",
            age: {
                $max: "$age"
            }
        }
    }]).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404
            })
        } else {
            res.json({
                code: 200
            })
        }
    });
}

exports.getSum = function(req, res) {
    UserModel.aggregate([{
        $group: {
            id: "age",
            age: {
                $sum: "$age"
            }
        }
    }]).exec(function(err, UserModel) {
        if (err) {
            res.json({
                code: 404
            })
        } else {
            res.json({
                code: 200
            })
        }
    });
}
exports.login = function(req, res) {
    UserModel.findOne({
        "email": req.body.email,
        "password": req.body.password
    }).exec(function(err, employee) {
        if (err) {
            res.json({
                code: 400,
                message: "data not found"
            });
        }
        if (employee) {
            var payload = {
                id: employee._id
            };
            console.log("payload", payload);

            var token = jsonwebtoken.sign(payload, 'shhhhh');

            console.log("token", token);

            res.json({
                code: 200,
                message: "login successfully",
                data: {
                    token: token,
                    role: employee.isAdmin
                }
            })
            console.log("login successfully");
        } else {
            res.json({
                code: 404,
                message: "password incorrect"
            })
            console.log("password incorrect");
        }
    });

}
exports.uploadImage= function(req,res,next){
      console.log(1);
      var file = 'client/image/' + req.file.filename;
      fs.rename(req.file.path, file, function(err) {
        console.log(2);
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(file,"file")
           UserModel.update({'_id':req.user.id}, { $set: {userprofile:req.file.filename} }, function(err, resp){
            console.log(file);
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.json({
                message: 'File uploaded successfully',
                filename: req.file.filename
              });
            }
          })
        }
      });
   }
