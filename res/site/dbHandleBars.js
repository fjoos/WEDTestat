/**
 * Created by Enzo on 11.10.2016.
 */

$(function(){
    var templateScript = $("#dbHandleBars").html();
    var theTemplate = Handlebars.compile(templateScript);
    var context = {
        notes: [
            { title: 'test', importance: 'high', finishedTill: 'yet' },
            { title: 'test2', importance: 'low', finishedTill: 'never' }
        ]
    };
    var theCompiledHtml = theTemplate(context);

    $(document.body).append(theCompiledHtml);

});
