import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderItems:[
        {
            slug:{
                type : String,
                required: true,
            },
            title:{
                type : String,
                required : true
            },
            quantity:{
                type: Number,
                required : true,
            },
            img:{
                type: String,
                required : true,
            },
            price:{
                type: Number,
                required : true,
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true,
            },
        }
    ],
    shippingaddress:{

        fullname :{
            type : String,
        },
        address:{
            type : String,
        },
        city:{
            type : String,
        },
        postcode:{
            type : String,
        },
        country:{
            type : String,
        }
    },
    paymentMethod:{type:String,required:true},
    paymentResult:{
        id:String,
        status: String,
        update_time: String,
        email_address: String
    },
    productPrice: {type:Number,required:true},
    shippingPrice: {type:Number,required:true},
    taxPrice: {type:Number,required:true},
    totalPrice: {type:Number,required:true},
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        // required: true
    },
    isPaid : {type: Boolean, default : false},
    deliveredAt : {type: Date}
},
{
    timeStamps : true
})

const Order = mongoose.model("Order",orderSchema)

export default Order

