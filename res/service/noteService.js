/**
 * Created by Enzo on 06.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: "../data/note.db", autoload: true });

function Note(title, description, importance, finishedTill, finished)
{
    this.created = Date.now();
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.finishedTill = finishedTill;
    this.finishedTo = new Date(finishedTill);
    this.finished = finished;

}

function publicAddNote(title, description, importance, finishedTill, finished, callback)
{
    var note = new Note(title, description, importance, finishedTill, finished);
    db.insert(note, function(err, doc){
        if(callback){
            callback(err, doc);
        }
    });
}

function publicDelete(id, callback)
{
    db.remove({_id: id}, {}, function(err, doc){
        callback(err, doc);
    });
}

function publicEdit(id, title, description, importance, finishedTill, finished, callback){
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "finishedTill": finishedTill, "finished": finished}}, function(err, doc){
        callback(err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, note) {
        callback(err, note);
    });
}

module.exports = {add : publicAddNote, getAll : publicAll, set : publicEdit, delete : publicDelete};