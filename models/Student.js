// Import mongoose - the tool for creating database data structures
import mongoose from "mongoose";

// Create a blueprint (schema) for what a Student should look like
const studentSchema = new mongoose.Schema(
  {
    // The student's name - must always be provided
    name: {
      type: String,
      required: true,
    },
    // The student's email - should be unique (no two students with same email)
    email: {
      type: String,
      unique: true,
    },
    // The student's ID number - should be unique
    studentId: {
      type: String,
      unique: true,
    },
  },
  // timestamps: true automatically adds createdAt and updatedAt dates
  { timestamps: true },
);

// Create a model called "Student" using the blueprint we just made
const Student = mongoose.model("Student", studentSchema);

// Export the model so other files can use it
export default Student;
