/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");
var title = 'Alle Notizen';
var session = require('express-session');

session.inverse = false;
session.styleChanged = false;
session.invisible = false;

function upOrDown(input, notes){
    notes.sort(function (a, b) {
        return (sorting(a.input, b.input))
    });
    session.sorting = session.reverse ? input + 'Down' : input + 'Up';
}

function isVisible(isInvisible, style, notes, res){
    title = isInvisible ? (notes.filter(function(a){return a.finished != 'on'})[0] ? 'Alle Notizen' : 'Keine Notizen') :(notes[0] ? 'Alle Notizen' : 'Keine Notizen');
    var note = isInvisible ? notes.filter(function(a){return a.finished != 'on'}) : notes;
    style ? res.render('index', {title: title, note : note, style : true, sorting: session.sorting, invisible: session.invisible}) : res.render('index', {title: title, note : note, sorting: session.sorting, invisible: session.invisible});
}

module.exports.showIndex = function(req, res){
    service.getAll(function(err, notes) {
        if(notes){
            upOrDown(session.order, notes);
            isVisible(session.invisible, session.styleChanged, notes, res);
        }});
};

module.exports.showNotePad = function(req, res){
    res.render('new', session.styleChanged ? {style : true}:{});
};

module.exports.editNote = function(req, res){
   service.getAll(function(err, notes)
    {
        var myNotes = notes.filter(function (a) {return a._id == req.params.id});
        res.render('edit', session.styleChanged ? {note : myNotes, style : true}:{note : myNotes});
    });
};

module.exports.saveEditedNote = function(req, res){
    service.set(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.finishedTill, req.body.finished, function(err, doc){
        res.redirect('/');
    });
};

module.exports.createNote = function(req, res){
    service.add(req.body.title, req.body.description, req.body.importance, req.body.finishedTill, req.body.finished, function(err, doc){
        res.redirect('/');
    });
};

module.exports.deleteNote = function(req, res){
    service.delete(req.params.id, function (err, doc) {
            res.redirect('/');
        });
};
module.exports.order = function(req, res){
    session.order == req.params.order ? session.reverse = !session.reverse:session.reverse = false;session.order = req.params.order;
    res.redirect('/');
};

module.exports.invisible = function(req, res){
    session.invisible = !session.invisible;
    res.redirect('/');
};

module.exports.styler = function(req, res){
    session.styleChanged = !session.styleChanged;
    res.redirect('/');
};


function sorting(a, b){
    var sorting = a>b ? 1 : -1;
    return session.reverse ? -1*sorting : sorting;
};