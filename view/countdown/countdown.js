/**
 * Helper for countdown
 */
Template.registerHelper('spielbuchCountdownTime', function () {
    return Session.get('spielbuchCountdownTime');
});
Template.registerHelper('spielbuchCountdownTimeLeft', function () {
    return Session.get('spielbuchCountdownTimeLeft');
});
Template.registerHelper('spielbuchCountdownPercent', function () {
    return Session.get('spielbuchCountdownPercent');
});
Template.registerHelper('spielbuchCountdownRadialLeft', function () {
    return Session.get('spielbuchCountdownPercent')*1.8;
});
Template.registerHelper('spielbuchCountdownRadialRight', function () {
    return Session.get('spielbuchCountdownPercent')*3.6;
});