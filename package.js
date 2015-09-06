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
        'spielebuch:core',
        'accounts-base',
        'accounts-ui'
    ]);
    api.use(['templating',
        'session'
    ], 'client');

    api.imply([
        'meteor-platform',
        'spielebuch:core',
        'fortawesome:fontawesome'
    ]);

    api.addFiles('reader.js', 'client');
    api.addFiles('startup.js', ['server', 'client']);

    api.addFiles('view/reader_ui.html', 'client');
    api.addFiles('view/reader_ui.js', 'client');
    api.addFiles('view/reader_ui.css', 'client');
    api.addFiles('view/reader_ui_global_helper.js', 'client');

    api.addFiles('utilities.js', 'client');

    if (api.export) {
        api.export('Reader', 'client');
    }
});