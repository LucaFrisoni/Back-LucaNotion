const { Category, Notes } = require("../../Database/ConecctionDB");
const { Op } = require("sequelize");

const deletePermantelyNoteCategory = async (req, res) => {
  const { categoryId, noteId } = req.query;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: "CategoryId must be provided" });
    }

    if (!noteId) {
      return res.status(400).json({ error: "NoteId must be provided" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const noteToRemove = await Notes.findByPk(noteId);

    if (!noteToRemove) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Elimina la nota de la categoría
    await category.update({
      notesArray: category.notesArray.filter(
        (note) => note.id !== noteToRemove.id
      ),
    });

    await noteToRemove.destroy();

    return res.status(200).json({ message: "Deleted Note permantely" });
  } catch (error) {
    console.error("Error deleting note from category:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = deletePermantelyNoteCategory;
