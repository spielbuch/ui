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
    summary: '',
    git: 'https://github.com/spielebuch/ui',
    version: '0.0.1'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2');

    api.use([
        'meteor-platform',
        'underscore',
        'spielebuch:core',
        'accounts-base',
        'accounts-ui',
        'juliancwirko:s-alert'
    ]);
    api.use(['templating',
        'session'
    ], 'client');

    api.imply([
        'spielebuch:core',
        'fortawesome:fontawesome'
    ]);

    api.addFiles('reader.js', 'client');

    api.addFiles('view/reader_ui.html', 'client');
    api.addFiles('view/reader_ui.js', 'client');
    api.addFiles('view/reader_ui.css', 'client');
    api.addFiles('view/reader_ui_global_helper.js', 'client');


    if (api.export) {
        api.export('Reader', 'client');
    }
});