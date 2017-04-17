var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

  var pagesSchema = new Schema({


     aboutus:String,
    
    
  

     

    
	
});



var pages=mongoose.model('pages', pagesSchema);
module.exports = pages;
