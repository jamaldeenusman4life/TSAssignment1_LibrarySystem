import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    if (!title || !isbn || !authors || authors.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "ISBN already exists" });
    }

    const book = await Book.create({
      title,
      isbn,
      authors,
      status: "IN",
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createBook, getBooks, getBookById, updateBook, deleteBook };
