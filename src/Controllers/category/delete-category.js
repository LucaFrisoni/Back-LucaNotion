const { Category } = require("../../Database/ConecctionDB");

const deleteCategory = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(401).send("Id must be provided");
    }

    const categoryToDelete = await Category.findByPk(id);

    if (!categoryToDelete) {
      return res.status(404).send("Category not found");
    }

    // Borra la nota
    await categoryToDelete.destroy();

    return res.status(200).send("Category deleted");
  } catch (error) {
    console.error("Error deleating category:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = deleteCategory;
