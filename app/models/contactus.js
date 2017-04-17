 var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
 var mongoosepages=require('mongoose-pages');

 

var ContactSchema = new Schema({


     email: String,

    name: String,
    
    message:String
    

  

     

    
	
});

mongoosepages.skip(ContactSchema);

var contact=mongoose.model('contactus', ContactSchema);
module.exports = contact;
