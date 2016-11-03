/**
 * Created by Enzo on 06.10.2016.
 */
var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');



router.get("/", notes.showIndex);
router.get("/notes/", notes.showNotePad);
router.get("/sort/:order/", notes.order);
router.get("/invisible/", notes.invisible);
router.post("/del/:id/", notes.deleteNote);
router.get("/edit/:id/", notes.editNote);
router.post("/edit/:id/", notes.saveEditedNote);

router.post("/", notes.createNote);

module.exports = router;