// Import the Book model so we can work with books
import Book from "../models/Book.js";

// Function to handle returning a borrowed book
// This updates the book to show it's been returned to the library
export const returnBook = async (req, res) => {
  try {
    // Find the book using the ID from the URL parameter
    const book = await Book.findById(req.params.id);

    // If the book doesn't exist, send error message
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // 404 = not found
    }

    // Check if the book is even borrowed (status = "IN" means it's in the library)
    // If it's already in the library, it can't be "returned"
    if (book.status === "IN") {
      return res
        .status(400) // 400 = bad request
        .json({ message: "Book is not currently borrowed" });
    }

    // Update the book's information to mark it as returned
    book.status = "IN"; // Change status to "IN" (book is back in the library)
    book.borrowedBy = null; // Clear who borrowed it
    book.issuedBy = null; // Clear who issued it
    book.returnDate = null; // Clear the return date

    // Save all these changes to the database
    await book.save();

    // Send back success message with the updated book (200 = success)
    res.status(200).json({
      message: "Book returned successfully",
      book,
    });
  } catch (error) {
    // If something goes wrong, send error message (500 = server error)
    res.status(500).json({ error: error.message });
  }
};

// Export the function so other files can use it
export default returnBook;
