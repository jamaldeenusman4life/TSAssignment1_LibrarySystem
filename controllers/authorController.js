import Author from "../models/Author.js";

export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = new Author({ name, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create author" });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const attendant = await Author.findById(req.params.id);
    if (!attendant) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(Author);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true },
    );
    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update author" });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete author" });
  }
};

export default {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
