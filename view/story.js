Template.story.events({
});

Template.story.helpers({
    text: function(){
        if(Session.get('readerText')===undefined){
            return 'You did not initilize the Reader. '+
                '<br/>You can do this by calling Reader.init().';
        }
        if(Session.get('readerText')===-1) {
            return 'Loading...';
        }
        return Session.get('readerText');
    }
});
