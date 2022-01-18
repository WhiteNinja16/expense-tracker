import mongoose from 'mongoose'

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`[MongoDB] Connected to: ${mongoose.connection.host}`.cyan.bold)
  } catch (e) {
    console.log(`[MongoDB] Error Connected:`.red)
    console.error(e.message)
    process.exit(1)
  }
}
