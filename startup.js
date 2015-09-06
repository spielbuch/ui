if (Meteor.isClient) {
    Reader.initActiveGameobject();
    Session.setDefault('readerText', -1);
    Accounts.onLogin(Reader.init);
    Meteor.startup(Reader.init);
}