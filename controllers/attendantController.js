import LibraryAttendant from "../models/LibraryAttendant.js";

export const createAttendant = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing feilds" });
  }

  try {
    const staffIdGenerator = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit ID
    const newAttendant = await LibraryAttendant.create({
      staffId: staffIdGenerator,
      name,
    });

    res
      .status(201)
      .json({ message: "Attendant created successfully", newAttendant });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create attendant", error: err.message });
  }
};

export const getAttendants = async (req, res) => {
  try {
    const attendants = await LibraryAttendant.find();
    res.status(200).json(attendants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch attendants", error: err.message });
  }
};

export default { createAttendant, getAttendants };
