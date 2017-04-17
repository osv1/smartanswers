var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var UserModel = require("./tasks");
var questionModel = require("./ques");
var AnswerSchema = new Schema({

    
    answer: String,
    
    nameans: {
        type: ObjectId,
        ref: "tasks"
    }
    
   
});
var Answer = mongoose.model('answers', AnswerSchema)
module.exports = Answer;