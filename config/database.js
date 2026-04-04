// Import mongoose - a tool that helps us talk to MongoDB database
import mongoose from "mongoose";

// Create a function to connect to the database
// "async" means this function takes time and we need to wait for it
const connectDB = async () => {
  // try block - we try to do these actions and if something goes wrong, we catch the error
  try {
    // Wait for mongoose to connect to MongoDB using the connection address stored in MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    // If connection is successful, print this message
    console.log(`MongoDB has connected succesfully`);
  } catch (error) {
    // If something goes wrong, this catches the error and prints why it failed
    console.error("MongoDB connection error:", error.message);
    // Stop the whole program if database connection fails
    process.exit(1);
  }
};

// Export the function so other files can use it
export default connectDB;
