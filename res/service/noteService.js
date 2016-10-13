/**
 * Created by Enzo on 06.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/note.db', autoload: true });

function Note(title, description, importance, finishedTill){
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.finishedTill = finishedTill;
}

function publicAddNote(title, description, importance, finishedTill, callback){
    var note = new Note(title, description, importance, finishedTill);
    db.insert(note, function(err, doc){
        if(callback){
            callback(err, doc);
        }
    });
}
/*
function publicDelete(id, callback){
    db.remove({_id: id}, {}, function(err, doc){
        //was passiert nach dem löschen
    })
}

function publicEdit(id, title, description, importance, finishedTill, callback){
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "finishedTill": finishedTill}}, {}, function(err, doc){
       //was passiert nach dem editieren
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
    callback( err, doc);
});
}
*/
function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, getAll : publicAll};