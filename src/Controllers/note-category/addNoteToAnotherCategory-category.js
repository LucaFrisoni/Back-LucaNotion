const { Category, Notes } = require("../../Database/ConecctionDB");

const addNoteToAnotherCategory = async (req, res) => {
  const { categoryId, noteId } = req.body;

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

    const existingNote = await Notes.findByPk(noteId);

    if (!existingNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Crear una nueva instancia de la nota con el mismo contenido
    const newNote = await Notes.create({
      title: existingNote.title,
      description: existingNote.description,
      belongsToList: true,
      // Puedes copiar más campos según sea necesario
    });

    // Actualizar la categoría con la nueva nota
    await category.update({
      notesArray: [...(category.notesArray || []), newNote],
    });

    return res.status(200).json({ message: "Note added to Category" });
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = addNoteToAnotherCategory;