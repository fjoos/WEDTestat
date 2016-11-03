/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");
var reverse = false;
var invisible = false;
module.exports.showIndex = function(req, res){
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
            if(invisible){
                res.render('index', {title: 'Alle Notizen', note : note.filter(function(a){return a.finished != '1'})});
            }else{
                res.render('index', {title: 'Alle Notizen', note : note});
            }
        }else{
            res.render('index', {title: 'Alle Notizen'});
        }});
};

module.exports.showNotePad = function(req, res){
    res.render('new');
};

module.exports.editNote = function(req, res){
    service.get(req.params.id, function(err, note){
            res.render('edit', note);
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

module.exports.invisible = function(req, res){
    invisible = !invisible;
    res.redirect('/');
};


function sorting(a, b){
    if(reverse){
        if(a>b){
            return -1;
        }else if(a<b){
            return 1;
        }else{
            return 0;
        }
    }else{
        if(a>b){
            return 1;
        }else if(a<b){
            return -1;
        }else{
            return 0;
        }
    }
}


