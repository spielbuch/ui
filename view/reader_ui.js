Template.readerText.events({
    'mousedown .reader-gameobject': function(event) {
        event.preventDefault();
        var _id = event.currentTarget.dataset._id;
        Reader.setActiveGameobject(_id);
        Reader.renderIcons({x: event.clientX, y: event.clientY});
    }
});
Template.readerText.events({
    'mouseup .reader-gameobject, click': function(event) {
        console.log('reset')
        Reader.resetAvtiveGameobject();
    }
});

Template.readerInteraction.events({
    'mouseup .reader-event, click .reader-event': function(event){
        event.preventDefault();
        Reader.resetAvtiveGameobject();
        var objectEvent = event.currentTarget.dataset.event;
        console.log(objectEvent);
    }
});


