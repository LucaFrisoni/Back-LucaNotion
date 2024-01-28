const { Notes, Category } = require("../../Database/ConecctionDB");

const editNoteCategory = async (req, res) => {
  const { noteId, categoryId, title, description } = req.body;

  try {
    if (!noteId) {
      return res.status(400).json({ error: "NoteId must be provided" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "CategoryId must be provided" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const note = await Notes.findByPk(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log();
    await category.update({
      notesArray: category.notesArray.map((e) =>
        e.id === noteId ? { ...e, title, description } : e
      ),
    });
    await category.save();
    // Devolver la nota actualizada
    return res
      .status(200)
      .json({ message: "Note updated in Category", updatedNote: note });
  } catch (error) {
    console.error("Error editing note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = editNoteCategory;
