import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js'
import User from '../models/userModel.js'
import userData from '../userData.js'


const seedRouter = express.Router()

seedRouter.get('/',async(req,res)=>{
    await Product.remove({})
    const product = await Product.insertMany(data)
    await User.remove({})
    const user = await User.insertMany(userData)
    res.send(user)
})


export default seedRouter