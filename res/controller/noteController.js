/**
 * Created by Enzo on 06.10.2016.
 */
var service = require("../service/noteService.js");
var reverse = false;
var invisible = false;
var styleChanged = false;

module.exports.showIndex = function(req, res){
    service.getAll(function(err, notes) {
        if(notes){
            switch (req.session.order) {
                case 'importance':
                    notes.sort(function (a, b) {
                        return (sorting(b.importance, a.importance))
                    });
                    break;
                case 'finishedTill':
                    notes.sort(function (a, b) {
                        return (sorting(b.finishedTill, a.finishedTill))
                    });
                    break;
                case 'created':
                    notes.sort(function (a, b) {
                        return (sorting(a.created, b.created))
                    });
                    break;
            }
            if(invisible && !styleChanged){
                res.render('index', {title: 'Alle Notizen', note : notes.filter(function(a){return a.finished != 'on'})});
            }else if(invisible && styleChanged){
                res.render('index', {title: 'Alle Notizen', note : notes.filter(function(a){return a.finished != 'on'}), style : true});
            }else if(!invisible && styleChanged){
                res.render('index', {title: 'Alle Notizen', note : notes, style : true});
            }else{
                res.render('index', {title: 'Alle Notizen', note : notes})
            }
        }else{
            res.render('index', {title: 'Keine Notizen'});
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
            res.render('edit', {
                note: notes.filter(function (a) {
                    return a._id == req.params.id
                }), style: true
            });
        } else {
            res.render('edit', {
                note: notes.filter(function (a) {
                    return a._id == req.params.id
                })
            });
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


