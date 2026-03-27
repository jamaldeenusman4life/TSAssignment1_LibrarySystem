import Student from "../models/Student.js";

//CREATE STUDENT
export const createStudent = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const studentIdGenerator = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit ID
    const newStudent = await Student.create({
      studentId: studentIdGenerator,
      name,
      email,
    });

    res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
};
//GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
    console.error(error.message);
  }
};

//GET STUDENT BY ID
export const getStudentById = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
    console.error(error.message);
  }
};

export default { createStudent, getStudents, getStudentById };
