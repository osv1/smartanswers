var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
 var mongoosepages=require('mongoose-pages');
 var AnswerModel = require("./answers");
 var questionModel=require("./ques");

 

var TaskSchema = new Schema({


     email: String,

     firstName: String,

     lastName: String,

     password: String,

     confirmPassword: String,

     phone:Number,
     userprofile: String,

     isAdmin:{
     	type:Boolean,default:false
     },
   
    question:{
     type:ObjectId,
     ref:"ques"
    },

    answer: [{ 
        type: ObjectId,
        ref: "answers"
    }]


	
});

mongoosepages.skip(TaskSchema);

var task=mongoose.model('tasks', TaskSchema);
module.exports = task;
