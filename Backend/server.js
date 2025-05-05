import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//Initialize express
const app = express()

//Port
const PORT = process.env.PORT || 5000

// Connect to database
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res) => res.send("API Working"))
app.post('/webhooks',clerkWebhooks)

// Start Server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})