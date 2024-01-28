const { Category, Notes } = require("../../Database/ConecctionDB");
const { Op } = require("sequelize");

const deleteNoteCategory = async (req, res) => {
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

    // Busca la nota en otras categorías
    const otherCategories = await Category.findAll({
      where: {
        id: {
          [Op.ne]: categoryId,
        },
      },
    });

    let belongsToList = false;
    console.log("Other cats ----------", otherCategories);
    // Verifica si la nota está presente en otras categorías
    for (const otherCategory of otherCategories) {
      const otherNotesArray = otherCategory?.dataValues?.notesArray || [];

      if (otherNotesArray.some((note) => note.id === noteToRemove.id)) {
        belongsToList = true;
        break;
      }
    }

    // Elimina la nota de la categoría
    await category.update({
      notesArray: category.notesArray.filter(
        (note) => note.id !== noteToRemove.id
      ),
    });

    // Actualiza el campo belongsToList de la nota y guarda
    noteToRemove.belongsToList = belongsToList;
    await noteToRemove.save();

    return res.status(200).json({ message: "Note removed from category" });
  } catch (error) {
    console.error("Error deleting note from category:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = deleteNoteCategory;
