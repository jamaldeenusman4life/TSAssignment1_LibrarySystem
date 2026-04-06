import Book from "../models/Book.js";

export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res
        .status(400)
        .json({ message: "Book is not currently borrowed" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.status(200).json({
      message: "Book returned successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default returnBook;
