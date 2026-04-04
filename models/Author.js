// Import mongoose - the tool for creating database data structures
import mongoose from "mongoose";

// Create a blueprint (schema) for what an Author should look like
const authorSchema = new mongoose.Schema(
  {
    // The author's name - must always be provided (required: true)
    name: { type: String, required: true },
    // The author's biography - just text, doesn't have to be there
    bio: String,
  },
  // timestamps: true automatically adds createdAt and updatedAt dates
  { timestamps: true },
);

// Create a model called "Author" using the blueprint we just made
const Author = mongoose.model("Author", authorSchema);

// Export the model so other files can use it
export default Author;
