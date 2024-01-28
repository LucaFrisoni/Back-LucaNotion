const { Category } = require("../../Database/ConecctionDB");
const { Notes } = require("../../Database/ConecctionDB");

const addNoteCategory = async (req, res) => {
  const { categoryId, title, description } = req.body;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: "Id must be provided" });
    }

    if (!title) {
      return res.status(400).json({ error: "Title must be provided" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newNote = await Notes.create({
      title,
      description,
    });

    newNote.belongsToList = true;
    await newNote.save()
    
    await category.update({
      notesArray: [...(category.notesArray || []), newNote],
    });

    return res.status(200).json({ message: "New Note added" });
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = addNoteCategory;
