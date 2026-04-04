// Import the Book model so we can use it
import Book from "../models/Book.js";

// CREATE: Function to create a new book
export const createBook = async (req, res) => {
  try {
    // Get the book details (title, ISBN, and list of authors) from the request
    const { title, isbn, authors } = req.body;

    // Check if any required field is missing
    if (!title || !isbn || !authors || authors.length === 0) {
      return res.status(400).json({ message: "All fields are required" }); // 400 = bad request
    }

    // Check if a book with this ISBN already exists (ISBNs should be unique)
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "ISBN already exists" });
    }

    // Create a new book with the provided information
    // Status is automatically set to "IN" (book is in the library)
    const book = await Book.create({
      title,
      isbn,
      authors,
      status: "IN",
    });

    // Send back the newly created book (201 = created successfully)
    res.status(201).json(book);
  } catch (error) {
    // If something goes wrong, send error message (500 = server error)
    res.status(500).json({ error: error.message });
  }
};

// READ: Function to get all books with their related information
export const getBooks = async (req, res) => {
  try {
    // Find all books in the database
    const books = await Book.find()
      // populate() gets the full author details (not just the ID)
      .populate("authors")
      // Get the full student details for who borrowed the book
      .populate("borrowedBy")
      // Get the full attendant details for who issued the book
      .populate("issuedBy");

    // Send back all books with complete information (200 = success)
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ: Function to get a specific book by ID
export const getBookById = async (req, res) => {
  try {
    // Find the book with the ID from the URL parameter
    const book = await Book.findById(req.params.id)
      // Get the full author details
      .populate("authors")
      // Get the full student details
      .populate("borrowedBy")
      // Get the full attendant details
      .populate("issuedBy");

    // If book not found, send error
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // 404 = not found
    }

    // Send back the book with complete information
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Function to update a book's information
export const updateBook = async (req, res) => {
  try {
    // Find the book by ID and update it with new data from the request
    // { new: true } means we get back the updated book, not the old one
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      // Get the full author details
      .populate("authors")
      // Get the full student details
      .populate("borrowedBy")
      // Get the full attendant details
      .populate("issuedBy");

    // If book not found, send error
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send back the updated book (200 = success)
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Function to delete a book
export const deleteBook = async (req, res) => {
  try {
    // Find and delete the book with the ID from the URL parameter
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // If book not found, send error
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send back success message (200 = success)
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all the functions so other files can use them
export default { createBook, getBooks, getBookById, updateBook, deleteBook };
