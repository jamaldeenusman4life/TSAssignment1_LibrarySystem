import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryAttendant",
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
