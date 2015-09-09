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

Template.registerHelper('readerPlayerProperties', function () {
    return Session.get('readerPlayerProperties');
});
Template.registerHelper('readerPlayerEffectNames', function () {
    return Session.get('readerPlayerEffectNames');
});
Template.registerHelper('readerPlayerEffects', function () {
    return Session.get('readerPlayerEffects');
});
Template.registerHelper('readerPlayerRules', function () {
    return Session.get('readerPlayerRules');
});
Template.registerHelper('readerPlayerName', function () {
    return Session.get('readerPlayerName');
});
Template.registerHelper('readerPlayerId', function () {
    return Session.get('readerPlayerId');
});