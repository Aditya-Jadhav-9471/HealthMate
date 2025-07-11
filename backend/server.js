import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js' 
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//   app congfig

const app= express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors()) 

// app.use(cors({
//   origin: ["https://healthmate-frontend-ksyq.onrender.com", "https://healthmate-admin-usjs.onrender.com"],
//   credentials: true
// }));

//API endpoints

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
res.send('API IS WORKING')
})

app.listen(port,()=>{
    console.log('server is running on port',port)
})