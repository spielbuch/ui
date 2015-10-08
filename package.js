/**
 * Created by Daniel Budick on 08 Sep 2015.
 * Copyright 2015 Daniel Budick All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 *
 * This file is part of spielebuch:ui
 * spielebuch:ui is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * spielebuch:ui is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with spielebuch:ui. If not, see <http://www.gnu.org/licenses/>.
 */

Package.describe({
    name: 'spielebuch:ui',
    summary: 'This is a ui package for spielebuch:core a framework to create interactive stories.',
    git: 'https://github.com/spielebuch/ui',
    documentation: 'readme.md',
    version: '0.0.5',

});

Package.onUse(function (api) {
    api.versionsFrom('1.2');

    api.use([
        'meteor-platform',
        'underscore',
        'spielebuch:core@0.0.2',
        'accounts-base',
        'accounts-ui',
        'ecmascript'
    ]);
    api.use(['templating',
        'session',
        'reactive-var',
    ], 'client');

    api.imply([
        'spielebuch:core@0.0.2',
        'fortawesome:fontawesome@4.4.0'
    ]);

    api.addFiles('reader.js', 'client');

    api.addFiles('view/reader_ui.html', 'client');
    api.addFiles('view/reader_ui.js', 'client');
    api.addFiles('view/reader_ui.css', 'client');
    api.addFiles('view/reader_ui_global_helper.js', 'client');

    /**
     * Backpack
     */
    api.addFiles('view/backpack/backpack.html', 'client');
    api.addFiles('view/backpack/backpack.js', 'client');

    /**
     * Modals
     */
    api.addFiles('view/modal/modal.html', 'client');
    api.addFiles('view/modal/modal.js', 'client');

    /**
     * Countdown
     */
    api.addFiles('view/countdown/countdown.html', 'client');
    api.addFiles('view/countdown/countdown.js', 'client');
    api.addFiles('view/countdown/countdown.css', 'client');

    /**
     * Interaction
     */
    api.addFiles('view/interaction.js', 'client');
    api.addFiles('server/methods.js', 'server');


    if (api.export) {
        api.export('Reader', 'client');
    }
});