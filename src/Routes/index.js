const express = require("express");
const createNote = require("../Controllers/notes/create-note");
const findAllNotes = require("../Controllers/notes/findAll-note");
const deleteNote = require("../Controllers/notes/delete-note");
const editNote = require("../Controllers/notes/edit-note");
const findAllCategories = require("../Controllers/category/findAll-category");
const findAllCategoriesNames = require("../Controllers/category/findAllNames-category");
const findCategoryById = require("../Controllers/category/findById-category");
const createCategory = require("../Controllers/category/create-category");
const deleteCategory = require("../Controllers/category/delete-category");
const addNoteCategory = require("../Controllers/note-category/addNote-category");
const editCategory = require("../Controllers/category/edit-category");
const deleteNoteCategory = require("../Controllers/note-category/deleteNote-category");
const addNoteToAnotherCategory = require("../Controllers/note-category/addNoteToAnotherCategory-category");
const editNoteCategory = require("../Controllers/note-category/editNote-category");
const archiveNoteCategory = require("../Controllers/note-category/archiveNoteCategory-category");
const archiveNotes = require("../Controllers/archiveNotes");
const unArchiveNote = require("../Controllers/unArchiveNote");
const archiveNotePost = require("../Controllers/notes/archiveNotePost");
const addCategory = require("../Controllers/notes/addCategory-note");
const deletePermantelyNoteCategory = require("../Controllers/note-category/deletePermantelyNote-category");

const router = express.Router();

//-----------------------------------------------Notes-----------------------------------------------------------------------------------------------------//
//get
router.get("/findAllNotes", findAllNotes);
router.get("/archiveNotes", archiveNotes);

//post
router.post("/createNote", createNote);
router.post("/unArchiveNote", unArchiveNote);
router.post("/archiveNotePost", archiveNotePost);
router.post("/addCategory", addCategory);

//put
router.put("/editNote", editNote);

//delete
router.delete("/deleteNote", deleteNote);

//-----------------------------------------------Category-----------------------------------------------------------------------------------------------------//
//get
router.get("/findAllCategories", findAllCategories);
router.get("/findAllCategoriesNames", findAllCategoriesNames);
router.get("/findCategoriesByID", findCategoryById);

//post
router.post("/createCategory", createCategory);

//put
router.put("/editCategory", editCategory);

//delete
router.delete("/deleteCategory", deleteCategory);

//-----------------------------------------------Note-Category-----------------------------------------------------------------------------------------------------//
//get

//post
router.post("/addNoteCategory", addNoteCategory);
router.post("/addNoteToAnotherCategory", addNoteToAnotherCategory);

//put
router.put("/editNoteCategory", editNoteCategory);
router.put("/archiveNoteCategory", archiveNoteCategory);

//delete
router.delete("/deleteNoteCategory", deleteNoteCategory);
router.delete("/deletePermantelyNoteCategory", deletePermantelyNoteCategory);



module.exports = router;
