const { Category } = require("../../Database/ConecctionDB");
const { Notes } = require("../../Database/ConecctionDB");

const addCategory = async (req, res) => {
  const { noteId, categoryId } = req.body;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: " Category id must be provided" });
    }

    if (!noteId) {
      return res.status(400).json({ error: "Note id must be provided" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const note = await Notes.findByPk(noteId);

    const newNote = await Notes.create({
      title: note.title,
      description: note.description,
      belongsToList: true,
      // Puedes copiar más campos según sea necesario
    });

    await newNote.save();

    await category.update({
      notesArray: [...(category.notesArray || []), newNote],
    });

    return res.status(200).json({ message: "New Note added" });
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = addCategory;
