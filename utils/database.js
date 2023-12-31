import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME,
        })
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export { connectDB }