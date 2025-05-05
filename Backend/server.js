import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from 'body-parser'

//Initialize express
const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
await connectDB()

//Middlewares
app.use(cors())

// Use raw body for the /webhooks route
app.post('/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    clerkWebhooks
  )

// Json
app.use(express.json())


//Routes
app.get('/',(req,res) => res.send("API Working"))

// Start Server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})