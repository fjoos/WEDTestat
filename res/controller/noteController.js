/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");

module.exports.showIndex = function(req, res){
    //startseite anzeigen
    res.render("index");
};

module.exports.showNotePad = function(req, res){
//note erstellen und hinzufügen
    res.render("newNote");
};

module.exports.createNote = function(req, res){
//note erstellen und hinzufügen
    service.add(req.body.title, req.body.description, req.body.importance, req.body.finishedTill, function(err, doc){
        res.render("index");
    });
};





