

 require("dotenv").config();
 const mongoose = require("mongoose");
 const {MONGODB_URI} = require("../constant")
 

  const dbconnection = async() =>{

    try {
       
    
          dbconnectionInstans = await mongoose.connect(MONGODB_URI);
  
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

 }

 module.exports = dbconnection;