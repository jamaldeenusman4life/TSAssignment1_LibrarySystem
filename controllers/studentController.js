import Student from "../models/Student.js";

//CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const { name, email, studentId } = req.body;
    const newStudent = new Student({ name, email, studentId });
    await newStudent.save();
    res.status(201).json(newStudent);
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
  }
};

//GET STUDENT BY ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

export default { createStudent, getStudents, getStudentById };
