import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
/*import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendantRoutes from "./routes/attendantRoutes.js";


app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendants", attendantRoutes);*/

const app = express();

const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!", error);
  }
};

startServer();
