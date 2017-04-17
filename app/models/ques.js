var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AnswerModel = require("./answers");
var UserModel = require("./tasks");
var mongoosepages = require('mongoose-pages');
var questionModel=require("./ques");



var quesSchema = new Schema({



    date: {
        type: Date,
        default: Date.now
    },

    questionw: String,
    title:String,
    

    name: { 
        type: ObjectId,
        ref: "tasks"
    },


   answer: [{ 
        type: ObjectId,
        ref: "answers"
    }],

    tags: String




});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
quesSchema.plugin(deepPopulate, {
  whitelist: [
    'name',
    'answer',
    'answer.nameans'
  ]
});



var question = mongoose.model('ques', quesSchema);
module.exports = question;