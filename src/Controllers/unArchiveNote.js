const { Category } = require("../Database/ConecctionDB");
const { Notes } = require("../Database/ConecctionDB");

const unArchiveNote = async (req, res) => {
  const { categoryId, noteId, selectNote } = req.body;

  try {
    if (!categoryId && !selectNote) {
      return res.status(400).json({ error: "Id must be provided" });
    }

    if (!noteId) {
      return res.status(400).json({ error: "NoteId must be provided" });
    }

    const note = await Notes.findByPk(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (!selectNote) {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      note.belongsToList = true;
      note.archive = false;
      await note.save();

      await category.update({
        notesArray: [...(category.notesArray || []), note],
      });
      return res.status(200).json({ message: "Note added to Category" });
    } else {
      note.belongsToList = false;
      note.archive = false;
      await note.save();
      return res.status(200).json({ message: "Note create" });
    }
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = unArchiveNote;
