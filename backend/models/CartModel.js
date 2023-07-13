const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product : {},
    id : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    purchasedAs : {            /// cart or  product 2 options
        type : String,
        required : true
    },
    purchasedBy : {
        type : String,
        required : true
    }
},{timeseries : true})

module.exports = mongoose.model("Cart",cartSchema);