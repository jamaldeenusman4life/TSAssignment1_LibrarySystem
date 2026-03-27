import { mongo } from "mongoose";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Student from "../models/Student.js";
import Attendant from "../models/LibraryAttendant.js";
import ISBN from "isbn3";

function generateISBN() {
  let base = "978"; // ISBN-13 prefix
  for (let i = 0; i < 9; i++) {
    base += Math.floor(Math.random() * 10);
  }
  const isbnObj = ISBN.parse(base);
  return isbnObj.isbn13;
}

// CREATE BOOK
export const createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    // Validate required fields
    if (!title || !authors || !Array.isArray(authors) || authors.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and at least one author are required" });
    }

    // Validate authors exist
    const existingAuthors = await Author.find({ _id: { $in: authors } });
    if (existingAuthors.length !== authors.length) {
      return res
        .status(400)
        .json({ message: "One or more authors do not exist" });
    }

    // Generate ISBN if not provided
    const validISBN = isbn && ISBN.parse(isbn).valid ? isbn : generateISBN();

    // Create book
    const newBook = new Book({
      title,
      isbn: validISBN,
      authors,
      status: "IN",
      borrowedBy: null,
      issuedBy: null,
      returnDate: null,
    });

    await newBook.save();
    await newBook.populate("authors");

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create book", error: err.message });
  }
};

// GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authors");
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: err.message });
  }
};

// GET BOOK BY ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("authors");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch book", error: err.message });
  }
};

// UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    // Validate authors if provided
    if (authors && (!Array.isArray(authors) || authors.length === 0)) {
      return res
        .status(400)
        .json({ message: "Authors must be a non-empty array" });
    }
    if (authors) {
      const existingAuthors = await Author.find({ _id: { $in: authors } });
      if (existingAuthors.length !== authors.length) {
        return res
          .status(400)
          .json({ message: "One or more authors do not exist" });
      }
    }

    const validISBN = isbn && ISBN.parse(isbn).valid ? isbn : undefined;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, isbn: validISBN, authors },
      { new: true },
    ).populate("authors");

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update book", error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete book", error: err.message });
  }
};

export const borrowBook = async (req, res) => {
  try {
    const { studentId, libraryAttendantId, returnDate } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({ error: "Book is already borrowed" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = libraryAttendantId;
    book.returnDate = returnDate;

    await book.save();

    return res
      .status(200)
      .json({ message: "book borrowed succesfully", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to borrow book" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({ error: "Book is not currently borrowed" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();
    return res
      .status(200)
      .json({ message: "Book returned successfully", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to return book" });
  }
};

export default {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
