// Import the Author model so we can use it
import Author from "../models/Author.js";

// Function to CREATE a new author
// "export const" means other files can use this function
// "async" means this function takes time and we need to wait for it
export const createAuthor = async (req, res) => {
  // Get the name and bio from the request data
  const { name, bio } = req.body;

  // Check if name or bio is missing - if so, send an error message
  if (!name || !bio) {
    return res
      .status(400) // 400 means "bad request" - the user sent incorrect data
      .json({ message: "Author name and bio are required!" });
  }

  // Try to create the author
  try {
    // Create a new author in the database with the data provided
    const newAuthor = await Author.create({ name, bio });

    // If successful, send back a success message and the new author
    return res
      .status(201) // 201 means "created successfully"
      .json({ message: "Author created successfully", author: newAuthor });
  } catch (error) {
    // If something goes wrong, send back an error message
    return res
      .status(500) // 500 means "server error" - something went wrong on our end
      .json({ message: "Failed to create author", err: error.message });
  }
};

// Function to READ and get all authors
export const getAuthors = async (req, res) => {
  try {
    // Find all authors in the database
    const authors = await Author.find();

    // If no authors found, send error message
    if (!authors) {
      return res.status(404).json({ message: "Author not found" }); // 404 means "not found"
    }

    // Send back all the authors we found
    res.status(200).json(authors); // 200 means "success"
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

// Function to READ and get a specific author by ID
export const getAuthorById = async (req, res) => {
  // Get the ID from the URL parameter
  const id = req.params.id;

  try {
    // Find an author with this specific ID
    const author = await Author.findById(id);
    // If no author found with this ID, send error
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Send back the author we found
    res.status(200).json(author);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch author", error: error.message });
  }
};

// Function to UPDATE an author's information
export const updateAuthor = async (req, res) => {
  // Get the ID from the URL parameter
  const id = req.params.id;
  // Get the new name and bio from the request data
  const { name, bio } = req.body;

  try {
    // Find the author we want to update
    const author = await Author.findById(id);
    // If no author found with this ID, send error
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Create an empty object to track what changed
    const changes = {};
    // If a new name was provided and it's different from the old one, update it
    if (name && name !== author.name) {
      changes.name = name;
      author.name = name;
    }
    // If a new bio was provided and it's different from the old one, update it
    if (bio && bio !== author.bio) {
      changes.bio = bio;
      author.bio = bio;
    }

    // Save the updated author to the database
    await author.save();

    // Send back success message with what changed
    res.status(200).json({
      message: "Author updated successfully",
      changes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update author", error: error.message });
  }
};

// Function to DELETE an author
export const deleteAuthor = async (req, res) => {
  // Get the ID from the URL parameter
  const id = req.params.id;

  try {
    // Find and delete the author with this ID
    const deletedAuthor = await Author.findByIdAndDelete(id);
    // If no author found with this ID, send error
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Send back success message with the deleted author
    res
      .status(200)
      .json({ message: "Author deleted successfully", author: deletedAuthor });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete author", error: error.message });
  }
};

// Export all the functions as an object so other files can import them
export default {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
