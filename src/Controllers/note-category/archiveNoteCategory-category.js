const { Category } = require("../../Database/ConecctionDB");
const { Notes } = require("../../Database/ConecctionDB");

const archiveNoteCategory = async (req, res) => {
  const { categoryId, noteId } = req.query;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: "Id must be provided" });
    }

    if (!noteId) {
      return res.status(400).json({ error: "NoteId must be provided" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const note = await Notes.findByPk(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Actualizar el estado de 'archive' en la instancia de Note
    await note.update({ archive: true });

    // Actualizar el estado de 'archive' en la instancia de Category
    const noteInCategory = category.notesArray.find((e) => e.id === noteId);

    if (!noteInCategory) {
      return res.status(404).json({ error: "Note in category not found" });
    }

    await category.update({
      notesArray: category.notesArray.filter((e) => e.id !== noteId),
    });

    return res.status(200).json({ message: "Note-category archived" });
  } catch (error) {
    console.error("Error archiving note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = archiveNoteCategory;
