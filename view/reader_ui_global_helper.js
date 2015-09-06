Template.registerHelper('readerText', function () {
    if (Session.get('readerText') === undefined) {
        return 'You did not initilize the Reader. ' +
            '<br/>You can do this by calling Reader.init().';
    }
    if (Session.get('readerText') === -1) {
        return 'Loading...';
    }
    return Session.get('readerText');
});

Template.registerHelper('readerObjectProperties', function () {
    return Session.get('readerObjectProperties');
});
Template.registerHelper('readerObjectEffectNames', function () {
    return Session.get('readerObjectEffectNames');
});
Template.registerHelper('readerObjectEffects', function () {
    return Session.get('readerObjectEffects');
});
Template.registerHelper('readerObjectRules', function () {
    return Session.get('readerObjectRules');
});
Template.registerHelper('readerObjectName', function () {
    return Session.get('readerObjectName');
});
Template.registerHelper('readerObjectId', function () {
    return Session.get('readerObjectId');
});
Template.registerHelper('readerRenderIcons', function () {
    return Session.get('readerRenderIcons');
});