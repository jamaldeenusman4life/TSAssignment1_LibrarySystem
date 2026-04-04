// Import the LibraryAttendant model so we can use it
import LibraryAttendant from "../models/LibraryAttendant.js";

// CREATE: Function to create a new library attendant
export const createAttendant = async (req, res) => {
  // Get the attendant's name from the request
  const { name } = req.body;

  // Check if the name is provided - if not, send error
  if (!name) {
    return res.status(400).json({ message: "Missing feilds" }); // 400 = bad request
  }

  try {
    // Generate a random 6-digit staff ID number
    // Math.floor rounds down, Math.random() gives decimal between 0-1
    // So this gives a number between 100000 and 999999
    const staffIdGenerator = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit ID

    // Create a new attendant in the database with the name and generated staff ID
    const newAttendant = await LibraryAttendant.create({
      staffId: staffIdGenerator,
      name,
    });

    // Send back success message with the new attendant (201 = created successfully)
    res
      .status(201)
      .json({ message: "Attendant created successfully", newAttendant });
  } catch (error) {
    // If something goes wrong, send error message (500 = server error)
    res
      .status(500)
      .json({ error: "Failed to create attendant", error: err.message });
  }
};

// READ: Function to get all attendants
export const getAttendants = async (req, res) => {
  try {
    // Find all attendants in the database
    const attendants = await LibraryAttendant.find();
    // Send back all attendants (200 = success)
    res.status(200).json(attendants);
  } catch (error) {
    // If something goes wrong, send error message (500 = server error)
    res
      .status(500)
      .json({ error: "Failed to fetch attendants", error: err.message });
  }
};

// Export all the functions so other files can use them
export default { createAttendant, getAttendants };
