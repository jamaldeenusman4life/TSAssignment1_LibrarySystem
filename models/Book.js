import mongoose from "mongoose";
import Author from "./Author.js";
import Student from "./Student.js";
import LibraryAttendant from "./LibraryAttendant.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author.modelName",
      },
    ],
    status: {
      type: String,
      enum: ["IN" || "OUT"],
      default: "IN",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student.modelName",
      default: null,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryAttendant.modelName",
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
