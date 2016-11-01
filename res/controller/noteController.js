/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");
var reverse = false;

module.exports.showIndex = function(req, res){
    //startseite anzeigen
    service.getAll(function(err, note) {
        if(note){
            switch (req.session.order) {
                case 'importance':
                    note.sort(function (a, b) {
                        return (sorting(a.importance, b.importance))
                    });
                    break;
                case 'finishedTill':
                    note.sort(function (a, b) {
                        return (sorting(a.finishedTill, b.finishedTill))
                    });
                    break;
                case 'created':
                    note.sort(function (a, b) {
                        return (sorting(a.created, b.created))
                    });
                    break;

            }
            res.render("index", {title: 'Alle Notizen', note : note});
        }else{
            res.render("index", {title: 'Alle Notizen'});
        }});
};

module.exports.showNotePad = function(req, res){
    res.render("newNote");
};

module.exports.editNote = function(req, res){
    service.get(req.params.id, function(err, note){
            res.render("editNote", note);
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
        if(req.session.order == req.params.order){
            reverse = !reverse;
        }else{
            reverse = false;
            req.session.order = req.params.order;
        }

    res.redirect('/');
};


function sorting(a, b){
    if(reverse){
        return a > b ? -1 : 1;
    }else{
        return a > b ? 1 : -1;
    }
}


