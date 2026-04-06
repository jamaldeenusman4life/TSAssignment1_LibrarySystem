import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendantRoutes from "./routes/attendantRoutes.js";

const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/attendants", attendantRoutes);

const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!", error);
  }
};

startServer();
