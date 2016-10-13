/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");

module.exports.showIndex = function(req, res){
    //startseite anzeigen
    service.getAll(function(err, note){
        if(note){
            res.render('index', {title: 'Alle Notizen', note : note});
        }else{
            res.render('index', {title: 'Alle Notizen'});
        }
    });
};

module.exports.showNotePad = function(req, res){
//noteerstellview aufrufen
    res.render("newNote");
};

module.exports.createNote = function(req, res){
//note erstellen und hinzufügen
    service.add(req.body.title, req.body.description, req.body.importance, req.body.finishedTill, function(err, doc){
        res.render("index");
    });
};





