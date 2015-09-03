

Template.story.events({
});

Template.story.helpers({
    story: function(){
        if(Session.get('playingScene')===-1) {
            return ['Loading...'];
        }
        if(Session.get('playingScene')===undefined){
            return ['Please install package spielebuch:core.',
                '<br/>To do this type: \'meteor add spielebuch:core\' into your console.'];
        }
        Reader.update();
        return Session.get('text');
    }
});
