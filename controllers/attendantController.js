import LibraryAttendant from "../models/LibraryAttendant.js";

export const createAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;
    const newAttendant = new LibraryAttendant({ name, staffId });
    await newAttendant.save();
    res.status(201).json(newAttendant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create attendant" });
  }
};

export const getAttendants = async (req, res) => {
  try {
    const attendants = await LibraryAttendant.find();
    res.status(200).json(attendants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendants" });
  }
};

export const getAttendantById = async (req, res) => {
  try {
    const attendant = await LibraryAttendant.findById(req.params.id);
    if (!attendant) {
      return res.status(404).json({ error: "Attendant not found" });
    }
    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendant" });
  }
};

export default { createAttendant, getAttendants, getAttendantById };
