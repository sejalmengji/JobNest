import { Webhook } from 'svix'
import User from '../models/User.js'

// API function to handle Clerk webhooks
export const clerkWebhooks = async (req, res) => {
  try {
    // Initialize Svix webhook with secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // Extract and verify webhook headers
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    }

    // Determine the raw payload (important for svix verification)
    const payloadString = Buffer.isBuffer(req.body)
      ? req.body.toString('utf8')
      : JSON.stringify(req.body)

    // Verify the webhook
    await whook.verify(payloadString, headers)

    // Parse the payload data
    const { data, type } = JSON.parse(payloadString)
    console.log('📦 Clerk Webhook Triggered:', type)

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          resume: '',
        }

        console.log('📝 Creating user in DB:', userData)

        try {
          await User.create(userData)
        } catch (dbErr) {
          console.error('❌ Failed to create user in DB:', dbErr)
        }

        res.json({})
        break
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
        }

        console.log('🔄 Updating user in DB:', userData)

        try {
          await User.findByIdAndUpdate(data.id, userData)
        } catch (dbErr) {
          console.error('❌ Failed to update user in DB:', dbErr)
        }

        res.json({})
        break
      }

      case 'user.deleted': {
        console.log('🗑️ Deleting user from DB with ID:', data.id)

        try {
          await User.findByIdAndDelete(data.id)
        } catch (dbErr) {
          console.error('❌ Failed to delete user in DB:', dbErr)
        }

        res.json({})
        break
      }

      default:
        console.log('⚠️ Unhandled event type:', type)
        res.json({})
        break
    }
  } catch (error) {
    console.error('❌ Webhook Error:', error.message)
    res.status(400).json({ success: false, message: 'Webhook Error' })
  }
}
