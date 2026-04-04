// Import mongoose - the tool for creating database data structures
import mongoose from "mongoose";

// Create a blueprint (schema) for what a Library Attendant should look like
const libraryAttendantSchema = new mongoose.Schema(
  {
    // The attendant's name - must always be provided
    name: {
      type: String,
      required: true,
    },
    // The attendant's staff ID - should be unique
    staffId: {
      type: String,
      unique: true,
    },
  },
  // timestamps: true automatically adds createdAt and updatedAt dates
  { timestamps: true },
);

// Create a model called "LibraryAttendant" using the blueprint we just made
const LibraryAttendant = mongoose.model(
  "LibraryAttendant",
  libraryAttendantSchema,
);

// Export the model so other files can use it
export default LibraryAttendant;
