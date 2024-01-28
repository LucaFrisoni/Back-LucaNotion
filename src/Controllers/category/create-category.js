const { Category } = require("../../Database/ConecctionDB");

const createCategory = async (req, res) => {
  const { title, selectedColor } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title must be provided" });
    }
    if (!selectedColor) {
      return res.status(400).json({ error: "Color must be provided" });
    }

    // Crea la nota en la base de datos
    const newCategory = await Category.create({
      title,
      selectedColor,
    });

    return res
      .status(201)
      .json({ message: "New Category created", newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = createCategory;
