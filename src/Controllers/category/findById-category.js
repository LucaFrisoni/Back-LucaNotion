const { Category } = require("../../Database/ConecctionDB");

const findCategoryById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).send("Category ID must be provided");
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("Error finding category by ID:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = findCategoryById;
