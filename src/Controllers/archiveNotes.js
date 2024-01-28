const { Notes } = require("../Database/ConecctionDB");

const archiveNotes = async (req, res) => {
  try {
    const archivedNotes = await Notes.findAll({
      where: {
        archive: true,
      },
    });

    if (!archivedNotes || archivedNotes.length === 0) {
      return res.status(201).send("No archived notes found");
    }

    return res.status(200).json({ message: "Archived notes", archivedNotes });
  } catch (error) {
    console.error("Error retrieving archived notes:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = archiveNotes;
