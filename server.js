// Load environment variables (like secret keys) from .env file
import "dotenv/config";
// Import express - a tool that helps us build a web server
import express from "express";
// Import the database connection function
import connectDB from "./config/database.js";
// Import all the route files that handle different parts of our app
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendantRoutes from "./routes/attendantRoutes.js";

// Create a new Express application
const app = express();

// Tell Express to understand JSON data from requests
app.use(express.json());

// Set up the routes - when someone visits "/authors", use the author routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/attendants", attendantRoutes);

// Get the port number from .env file, or use 5500 if not found
const PORT = process.env.PORT || 5500;

// Create the main function that starts our server
const startServer = async () => {
  try {
    // Connect to the database first
    await connectDB();

    // If there's an error while running the app, catch it and show it
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    // Start listening for requests on the PORT we chose
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    // If database connection fails, show this message
    console.log("MongoDB connection failed!", error);
  }
};

// Call the function to start the server
startServer();
