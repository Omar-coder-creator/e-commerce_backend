import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cartRouter from './routes/cartRouter.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Connected Succefully'))
    .catch((err)=> console.log('Could not connect ' ,err))

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/auth',authRouter)

app.all('*',(req,res)=>{
    res.status(404).json({message:'could not found this page'})
})

app.listen(process.env.PORT,()=>{
    console.log('listenting on port' , process.env.PORT)
})