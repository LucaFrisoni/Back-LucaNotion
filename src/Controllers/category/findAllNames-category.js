const { Category } = require("../../Database/ConecctionDB");

const findAllCategoriesNames = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    if (!allCategories || allCategories.length === 0) {
      return res.status(200).send("There are no categories yet");
    }

    const categoriesArray = allCategories.map((category) => ({
      categoryId: category.id,
      title: category.title,
    }));

    return res.status(200).json({
      message: "All categories",
      allCategoriesNames: categoriesArray,
    });
  } catch (error) {
    console.error("Error finding categories:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = findAllCategoriesNames;