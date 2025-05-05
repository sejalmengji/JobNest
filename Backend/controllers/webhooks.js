import {Webhook} from 'svix'
import User from '../models/User.js'

// API function to manage clerk user with database - verifies webhook req from clerk using svix
export const clerkWebhooks = async (req,res) => {
    try {
        
        // create svix instances with clerk webhook seceret
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        // Verifying Header
        await whook.verify(req.body,{
            'svix-id': req.headers['svix-id'],
            'svix-timestamp' : req.headers['svix-timestamp'],
            'svix-signature' : req.headers['svix-signature']   
        })

        // Getting Data from request body
        const payloadString = req.body.toString('utf8')
        const { data, type } = JSON.parse(payloadString)

       



        // Switch Cases for different events - based on events it adds user to mongoDB, update user n delete user
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    resume: ''
                }
                console.log('📥 Creating user:', userData)
                await User.create(userData)
                res.json({})
                console.log('✅ Success response sent for:', type)
                break
            }
        
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                } 
                console.log('✏️ Updating user:', userData)
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                console.log('✅ Success response sent for:', type)
                break
            }
        
            case 'user.deleted': {
                console.log('🗑️ Deleting user:', data.id)
                await User.findByIdAndDelete(data.id)
                res.json({})
                break
            }
        
            default:
                console.log('⚠️ Unhandled event type:', type)
                break
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:'Webhooks Error'})
    }
}