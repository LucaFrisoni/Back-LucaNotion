const { Category } = require("../../Database/ConecctionDB");

const findAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    if (!allCategories) {
      return res.status(200).send("They arent any categories yet");
    }

    return res.status(200).json({ message: "All categories", allCategories });
  } catch (error) {
    console.error("Error finding categories:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = findAllCategories;
