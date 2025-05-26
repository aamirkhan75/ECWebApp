const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: {
        type: Number,
        required: true,
    },
    description: String,
    image: String,
    createdAt:{type:Date,default:Date.now }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
