/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");

module.exports.showIndex = function(req, res){
    //startseite anzeigen
    service.getAll(function(err, note){
        if(note){
            res.render("index", {title: 'Alle Notizen', note : note});
        }else{
            res.render("index", {title: 'Alle Notizen'});
        }
    });
};

module.exports.showNotePad = function(req, res){
//noteerstellview aufrufen
    res.render("newNote");
};

module.exports.editNote = function(req, res){
    service.get(req.params.id, function(err, note){
            res.render("editNote", note);
    });
};

module.exports.saveEditedNote = function(req, res){
    service.set(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.finishedTill, req.body.finished, function(err, doc){
        service.getAll(function(err, note){
            if(note){
                res.render('index', {title: 'Alle Notizen', note : note});
            }else{
                res.render('index', {title: 'Alle Notizen'});
            }
        });
    });
};

module.exports.createNote = function(req, res){
    service.add(req.body.title, req.body.description, req.body.importance, req.body.finishedTill, req.body.finished, function(err, doc){
        service.getAll(function(err, note){
            if(note){
                res.render('index', {title: 'Alle Notizen', note : note});
            }else{
                res.render('index', {title: 'Alle Notizen'});
            }
        });
    });
};





