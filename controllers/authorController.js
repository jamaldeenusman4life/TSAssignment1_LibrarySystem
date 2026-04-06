import Author from "../models/Author.js";

export const createAuthor = async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Author name and bio are required!" });
  }

  try {
    const newAuthor = await Author.create({ name, bio });

    return res
      .status(201)
      .json({ message: "Author created successfully", author: newAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create author", err: error.message });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    if (!authors) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

export const getAuthorById = async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch author", error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const changes = {};
    if (name && name !== author.name) {
      changes.name = name;
      author.name = name;
    }
    if (bio && bio !== author.bio) {
      changes.bio = bio;
      author.bio = bio;
    }

    await author.save();

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

export const deleteAuthor = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    res
      .status(200)
      .json({ message: "Author deleted successfully", author: deletedAuthor });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete author", error: error.message });
  }
};

export default {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
