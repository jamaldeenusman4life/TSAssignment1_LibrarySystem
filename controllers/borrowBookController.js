// Import the Book model so we can work with books
import Book from "../models/Book.js";

// Function to handle borrowing/checking out a book
// This updates the book to show it's been borrowed and tracks who borrowed it
export const borrowBook = async (req, res) => {
  try {
    // Get the student ID, attendant ID, and return date from the request
    const { studentId, attendantId, returnDate } = req.body;

    // Find the book using the ID from the URL parameter
    const book = await Book.findById(req.params.id);

    // If the book doesn't exist, send error message
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // 404 = not found
    }

    // Check if the book is already borrowed (status = "OUT")
    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book is already borrowed" }); // 400 = bad request
    }

    // Update the book's information to mark it as borrowed
    book.status = "OUT"; // Change status to "OUT" (book is out of the library)
    book.borrowedBy = studentId; // Record which student borrowed it
    book.issuedBy = attendantId; // Record which attendant issued it
    book.returnDate = returnDate; // Record when the book should be returned

    // Save all these changes to the database
    await book.save();

    // Get the complete book information with all linked data
    const populatedBook = await Book.findById(book._id)
      .populate("authors") // Get the full author details
      .populate("borrowedBy") // Get the full student details
      .populate("issuedBy"); // Get the full attendant details

    // Send back success message with the updated book information (200 = success)
    res.status(200).json({
      message: "Book borrowed successfully",
      book: populatedBook,
    });
  } catch (error) {
    // If something goes wrong, send error message (500 = server error)
    res.status(500).json({ error: error.message });
  }
};

// Export the function so other files can use it
export default borrowBook;
