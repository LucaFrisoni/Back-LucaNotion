const { Notes } = require("../../Database/ConecctionDB");

const archiveNotePost = async (req, res) => {
  const { noteId } = req.body;

  try {
    if (!noteId) {
      return res.status(400).json({ error: "NoteId must be provided" });
    }

    const note = await Notes.findByPk(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Actualizar el estado de 'archive' en la instancia de Note
    await note.update({ archive: true });


    return res.status(200).json({ message: "Note archived" });
  } catch (error) {
    console.error("Error archiving note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = archiveNotePost;
