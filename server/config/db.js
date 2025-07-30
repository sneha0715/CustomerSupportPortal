import mongoose from 'mongoose'
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI || process.env.LOCAL_MONGO_URI)
      console.log('Connected to database')

   } catch (error) {
      console.error('MongoDB connection failed,', error.message)
      process.exit(1);
   }
}
export default connectDB

