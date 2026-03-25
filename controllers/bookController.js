import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, isbn, authors, status, borrowedBy, issuedBy, returnDate } =
      req.body;
    const newBook = new Book({
      title,
      isbn,
      authors,
      status,
      borrowedBy,
      issuedBy,
      returnDate,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
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
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, isbn, authors, status, borrowedBy, issuedBy, returnDate } =
      req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, isbn, authors, status, borrowedBy, issuedBy, returnDate },
      { new: true },
    )
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
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

export default { createBook, getBooks, getBookById, updateBook, deleteBook };
