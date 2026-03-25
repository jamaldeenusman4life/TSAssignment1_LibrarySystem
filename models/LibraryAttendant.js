import mongoose from "mongoose";

const libraryAttendantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    staffId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const LibraryAttendant = mongoose.model(
  "LibraryAttendant",
  libraryAttendantSchema,
);

export default LibraryAttendant;
