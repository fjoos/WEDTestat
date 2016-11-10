/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");
var reverse = false;
var invisible = false;
var styleChanged = false;
var title = 'Alle Notizen';

module.exports.showIndex = function(req, res){
    service.getAll(function(err, notes) {
        if(notes){
            switch (req.session.order) {
                case 'importance':
                    notes.sort(function (a, b) {
                        return (sorting(b.importance, a.importance))
                    });
                    if(!reverse){
                        req.session.sorting = 'importanceUp';
                    }else{
                        req.session.sorting = 'importanceDown';
                    }
                    break;
                case 'finishedTill':
                    notes.sort(function (a, b) {
                        return (sorting(b.finishedTo, a.finishedTo))
                    });
                    if(!reverse){
                        req.session.sorting = 'finishedUp';
                    }else{
                        req.session.sorting = 'finishedDown';
                    }
                    break;
                case 'created':
                    notes.sort(function (a, b) {
                        return (sorting(a.created, b.created))
                    });
                    if(!reverse){
                        req.session.sorting = 'createdUp';
                    }else{
                        req.session.sorting = 'createdDown';
                    }
                    break;
            }
            switch(invisible){
                case true:
                    if(notes.filter(function(a){return a.finished != 'on'})[0]){
                        title = 'Alle Notizen'
                    }else{
                        title = 'Keine Notizen'
                    }
                    if(styleChanged){
                        res.render('index', {title: title, note : notes.filter(function(a){return a.finished != 'on'}), style : true, sorting: req.session.sorting, invisible: invisible});
                    }else{
                        res.render('index', {title: title, note : notes.filter(function(a){return a.finished != 'on'}), sorting: req.session.sorting, invisible: invisible});
                    }
                    break;
                case false:
                    if(notes[0]){
                        title = 'Alle Notizen'
                    }else{
                        title = 'Keine Notizen'
                    }
                    if(styleChanged){
                        res.render('index', {title: title, note : notes, style : true, sorting: req.session.sorting, invisible: invisible});
                    }else{
                        res.render('index', {title: title, note : notes, sorting: req.session.sorting, invisible: invisible});
                    }
                    break;
            }

        }});
};

module.exports.showNotePad = function(req, res){
    if(styleChanged){
        res.render('new', {style : true});
    }else{
        res.render('new');
    }
};

module.exports.editNote = function(req, res){
   service.getAll(function(err, notes)
    {
        if (styleChanged) {
            res.render('edit', {note : notes.filter(function (a) {return a._id == req.params.id}), style: true});
        } else {
            res.render('edit', {note : notes.filter(function (a) {return a._id == req.params.id})});
        }
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

module.exports.styler = function(req, res){
    styleChanged = !styleChanged;
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


