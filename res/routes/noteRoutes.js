/**
 * Created by Enzo on 06.10.2016.
 */
var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');


router.get("/", notes.showIndex);
router.get("/notes", notes.showNotePad);
router.post("/", notes.createNote);

module.exports = router;