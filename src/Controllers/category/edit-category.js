const {Category} = require("../../Database/ConecctionDB");

const editCategory = async (req, res) => {
  const { id, title } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID must be provided" });
    }
    if (!title) {
      return res.status(400).json({ error: "Title must be provided" });
    }

    // Buscar la nota por ID
    const category = await Category.findByPk(id);

    // Verificar si la nota existe
    if (!category) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (title) {
      category.title = title;
    }

    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated", updatedCategory: category });
  } catch (error) {
    console.error("Error editing category:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = editCategory;
