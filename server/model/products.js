const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    title:{
        type : String,
        require : true,
    },
    category :{
        type : String,
        require : true
    },
    price:{
        type:Number,
        require :true,
    },
    description:{
        type : String,
        require:true,
    },
    quantity:{
        type : Number,
        default :1
    },
   
 image:{
        name: String,
        data : String ,
        contentType: String
    },
    // date : {
    //     type:Date,
    //     default: Date.now()
    //    },
});
const products = mongoose.model("products",product)
module.exports = products;