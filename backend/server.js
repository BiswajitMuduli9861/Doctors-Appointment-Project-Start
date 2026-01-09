import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/database.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()

//app config
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use('/uploads', express.static('uploads'));


//middlewares
app.use(express.json())
app.use(cors())


//api endpoints

app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get("/",(req,res)=>{
    res.send("A backend working")
})

app.listen(port,()=>{
    console.log(`Server running ${port}`)
})