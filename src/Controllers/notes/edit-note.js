const { Notes } = require("../../Database/ConecctionDB");

const editNote = async (req, res) => {
  const { id, title, description } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID must be provided" });
    }

    // Buscar la nota por ID
    const note = await Notes.findByPk(id);

    // Verificar si la nota existe
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Actualizar la nota con los nuevos valores
    if (title) {
      note.title = title;
    }

    if (description) {
      note.description = description;
    }

    // Guardar los cambios
    await note.save();

    // Devolver la nota actualizada
    return res.status(200).json({ message: "Note updated", updatedNote: note });
  } catch (error) {
    console.error("Error editing note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = editNote;
