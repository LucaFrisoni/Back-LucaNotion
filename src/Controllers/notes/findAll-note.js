const { Notes } = require("../../Database/ConecctionDB");

const findAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.findAll();

    if (!allNotes) {
      return res.status(201).send("They arent any notes yet");
    }

    const filterNotes = allNotes.filter(
      (note) => !note.belongsToList && !note.archive
    );

    return res.status(200).json({ message: "All notes", filterNotes });
  } catch (error) {
    console.error("Error creating note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
};

module.exports = findAllNotes;
