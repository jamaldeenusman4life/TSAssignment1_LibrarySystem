import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB has connected succesfully`);
  } catch (error) {
    console.log(`Connection failed`);
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
