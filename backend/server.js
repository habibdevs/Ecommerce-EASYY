import express from 'express'
import bannerData from './bannerData.js'
import logoData from './logoData.js'
import cors from 'cors'
import MiniBannerData from './miniBannerData.js'
import data from './data.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRoutes from './routes/orderRoutes.js'


const app = express()
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("MONGODB CONNECTED")
}).catch((err)=>{
  console.log(err)
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/seed',seedRouter)
app.use('/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRoutes)

// app.get('/products', function (req, res) {
//   res.send(data)
// })
// app.get('/products/:slug', function (req, res) {
//   // res.send(data)
//   let product = data.find((item)=>{
//     if(req.params.slug == item.slug){
//       return item
//     }
//   })
//   res.send(product)
// })
app.get("/cartproduct/:id",function(req,res){
  let product= data.find((item)=>{
      if(req.params.id == item._id){
         return item
      }
    })
    res.send(product)
  //   console.log(product)
})

app.get("/logo",function(req,res){
  res.send(logoData)
})
app.get("/minibanner",function(req,res){
  res.send(MiniBannerData)
})
app.get('/banner', function (req, res) {
  res.send(bannerData)
})
let port = process.env.PORT || 8000
app.listen(8000,()=>{
    console.log("port 8000")
})