const { Notes } = require("../../Database/ConecctionDB");

const deleteNote = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(401).send("Id must be provided");
    }

    const noteToDelete = await Notes.findByPk(id);

    if (!noteToDelete) {
      return res.status(404).send("Note not found");
    }

    // Borra la nota
    await noteToDelete.destroy();

    return res.status(200).send("Note deleted");

  } catch (error) {
    console.error("Error deleating note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = deleteNote;
