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

Template.registerHelper('equals', function (a, b) {
    return a===b;
});

Template.registerHelper('readerObjectProperties', function () {
    return Session.get('readerObjectProperties');
});
Template.registerHelper('readerObjectEffectNames', function () {
    /**
     * We do not want to disply default effects, so we filter the array:
     */
    return _.filter(Session.get('readerObjectEffectNames'), function (name) {
        return name !== 'default';
    });
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

/**
 * Helper for players equipment
 */
Template.registerHelper('readerEquippedRules', function () {
    return Session.get('readerEquippedRules');
});
Template.registerHelper('readerEquippedEffect', function () {
    var player = Spielebuch.player.get();
    if(player) {
        return player.createEquippedEffect();
    }
});
Template.registerHelper('readerEquippedProperties', function () {
    return Session.get('readerEquippedProperties');
});


function getEquippedValueByName(name,player){
    if(!player){
        return 0;
    }
    player.getEquippedValueByName(name);
}
function getValueByName(name,player){
    if(!player){
        return 0;
    }
    player.getValueByName(name);
}
function getEffectiveValueByName(name,player){
    if(!player){
        return 0;
    }
    player.getEffectiveValueByName(name);
}

Template.registerHelper('readerEquippedPropertyByName', function (name) {
    var player = Spielebuch.player.get();
    return getEquippedValueByName(name, player);
});

/**
 * Helper to show damage, defense and hitpoints of the player
 */
Template.registerHelper('readerPlayerDamage', function () {
    var player = Spielebuch.player.get();
    return getEquippedValueByName(Spielebuch.Gameplay.damage, player);
});
Template.registerHelper('readerPlayerDefense', function () {
    var player = Spielebuch.player.get();
    return getEquippedValueByName(Spielebuch.Gameplay.defense, player);
});
Template.registerHelper('readerPlayerHitpoints', function () {
    var player = Spielebuch.player.get();
    return getEquippedValueByName(Spielebuch.Gameplay.hitpoints, player);
});



/**
 * Helper for log.
 */
Template.registerHelper('readerLogs', function () {
    return Session.get('spielebuchLog');
});
Template.registerHelper('readerCopyrightNotice', function () {
    return Spielebuch.copyrightNotice;
});

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

