// Import the Student model so we can use it
import Student from "../models/Student.js";

// CREATE: Function to create and add a new student
// @param req - contains the request data from the user
// @param res - used to send back responses to the user
export const createStudent = async (req, res) => {
  // Get the name and email from the request data
  const { name, email } = req.body;

  // Check if name or email is missing - if so, send an error
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" }); // 400 = bad request
  }

  try {
    // Generate a random 6-digit student ID number
    // Math.floor rounds down, Math.random() gives decimal between 0-1
    // So this gives a number between 100000 and 999999
    const studentIdGenerator = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit ID

    // Create a new student in the database with the name, email, and generated ID
    const newStudent = await Student.create({
      studentId: studentIdGenerator,
      name,
      email,
    });

    // Send back success message with the new student data
    res
      .status(201) // 201 = created successfully
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    // If something goes wrong, send back an error message
    res.status(500).json({ error: "Failed to create student" }); // 500 = server error
  }
};

// READ: Function to get all students
export const getStudents = async (req, res) => {
  try {
    // Find all students in the database
    const students = await Student.find();
    // Send back all students
    res.status(200).json(students); // 200 = success
  } catch (error) {
    // If something goes wrong, send error message
    res.status(500).json({ error: "Failed to fetch students" });
    // Also print the error in the console for debugging
    console.error(error.message);
  }
};

// READ: Function to get a single student by ID
export const getStudentById = async (req, res) => {
  // Get the student ID from the URL parameter
  const id = req.params.id;

  try {
    // Find a student with this specific ID
    const student = await Student.findById(id);
    // If no student found with this ID, send error message
    if (!student) {
      return res.status(404).json({ error: "Student not found" }); // 404 = not found
    }
    // Send back the student we found
    res.status(200).json(student);
  } catch (error) {
    // If something goes wrong, send error message
    res.status(500).json({ error: "Failed to fetch student" });
    // Also print the error in the console for debugging
    console.error(error.message);
  }
};

// Export all the functions so other files can use them
export default { createStudent, getStudents, getStudentById };
