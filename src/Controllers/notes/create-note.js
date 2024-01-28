const { Notes } = require("../../Database/ConecctionDB");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title must be provided" });
    }

    // Crea la nota en la base de datos
    const newNote = await Notes.create({
      title,
      description,
    });

    return res.status(201).json({ message: "New Note created", newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = createNote;
