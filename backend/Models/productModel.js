import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    img:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    instock:{
        type: Number,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    carddiscription:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    numberofrating:{
        type: Number,
        required: true,
    }
},
{
    timeStamps : true
})

const Product = mongoose.model('product',productSchema)

export default Product