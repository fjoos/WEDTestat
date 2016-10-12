/**
 * Created by Enzo on 06.10.2016.
 */
const fs = require('fs');
var service = require("../service/noteService.js");

module.exports.showIndex = function(req, res){
    //startseite anzeigen
    fs.readFile('./site/mainPage.html', function (err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    });
};

module.exports.showNotePad = function(req, res){
//note erstellen und hinzufügen
    fs.readFile('./site/newNote.html', function (err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end();
    });
};

module.exports.createNote = function(req, res){
//note erstellen und hinzufügen
    service.add(req.body.title, req.body.description, req.body.importance, req.body.finishedTill, function(err, doc){
        fs.readFile('./site/mainPage.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.write(data);
            res.end();
        });
    });
};





