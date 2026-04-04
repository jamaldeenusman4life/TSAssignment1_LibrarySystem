// Import mongoose - the tool for creating database data structures
import mongoose from "mongoose";

// Create a blueprint (schema) for what a Book should look like
const bookSchema = new mongoose.Schema(
  {
    // The book's title - must always be provided
    title: {
      type: String,
      required: true,
    },
    // The book's ISBN (book identification number) - must be unique and provided
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    // List of authors who wrote this book - references the Author model
    authors: [
      {
        // This is an ID that links to an Author document
        type: mongoose.Schema.Types.ObjectId,
        // We're referencing the "Author" model
        ref: "Author",
        // Must always have an author
        required: true,
      },
    ],
    // The book's status - either "IN" (in library) or "OUT" (borrowed), starts as "IN"
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
    // Which student borrowed this book - references the Student model, starts as null if not borrowed
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    // Which attendant issued the book - references the LibraryAttendant model, starts as null
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryAttendant",
      default: null,
    },
    // The date when the book should be returned - starts as null
    returnDate: {
      type: Date,
      default: null,
    },
  },
  // timestamps: true automatically adds createdAt and updatedAt dates
  { timestamps: true },
);

// Create a model called "Book" using the blueprint we just made
const Book = mongoose.model("Book", bookSchema);

// Export the model so other files can use it
export default Book;
