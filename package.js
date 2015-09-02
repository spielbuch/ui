Package.describe({
    name: 'spielebuch:ui',
    summary: '',
    git: 'https://github.com/spielebuch/ui',
    version: '0.0.1'
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');

    api.use([
        'meteor-platform',
        'underscore',
        'session',
        'spielebuch:core',
        'accounts-base',
        'accounts-ui'
    ]);

    api.imply([
        'meteor-platform',
        'spielebuch:core',
        'twbs:bootstrap',
        'fortawesome:fontawesome'
    ]);

    api.addFiles('reader.js', 'client');
    api.addFiles('view/story.html', 'client');
    api.addFiles('view/story.js', 'client');
    api.addFiles('utilities.js', 'client');

    if (api.export) {
        api.export('Reader', 'client');
    }
});