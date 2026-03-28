import Book from "../models/Book.js";

export const borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    const populatedBook = await Book.findById(book._id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(200).json({
      message: "Book borrowed successfully",
      book: populatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default borrowBook;
