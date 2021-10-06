import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    let connection =
      process.env.NODE_ENV === 'testing'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI

    const conn = await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const dropDB = async () => {
  try {
    await mongoose.connection.collection('users').deleteMany()

    console.log(`MongoDB dropped`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export { connectDB, dropDB }
