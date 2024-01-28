const { DataTypes } = require("sequelize");

const SelectedColorEnum = DataTypes.ENUM(
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500"
);

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      notesArray: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      selectedColor: {
        type: SelectedColorEnum,
        allowNull: false,
      },
    },
    { timestamps: true, updatedAt: "updatedAt" }
  );
};
