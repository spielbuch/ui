var parseKeywordText = function(text){
    var re = /[^[\]]+(?=])/, _ids = re.exec(text);

    _.forEach(_ids, function(_id){
        var gameobject = Gameobjects.findOne(_id);
        text.replace(new RegExp('\\[' + _id + '\\]', 'g'),
            '<a href=\"#\" class=\"keyword hover\" ' +
            'data-_id=\"' + _id + '\">' + gameobject.name +
            '</a>'
        );
    });

    return text;
};

Template.story.events({
});

Template.story.helpers({
    story: function(){
        return parseKeywordText(Session.get('storytext'));
    },
    loggedIn: function() {
        return !!Meteor.userId();
    }
});
