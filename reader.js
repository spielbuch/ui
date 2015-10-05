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

Reader = {};
Reader.init = function () {

    Reader.backpackEvents = [];
    Meteor.call('createBackpackEventFunctions', function (err, events) {
        if(err ){
            Spielebuch.error(500,err);
        }
        Reader.backpackEvents = events;
    });

    Session.setDefault('readerText', '');

    Session.setDefault('readerObjectProperties', false);
    Session.setDefault('readerObjectEffectNames', false);
    Session.setDefault('readerObjectEffects', false);
    Session.setDefault('readerObjectRules', false);
    Session.setDefault('readerObjectName', false);
    Session.setDefault('readerObjectId', false);

    Session.setDefault('readerRenderIcons', '');

    Session.setDefault('readerPlayerProperties', false);
    Session.setDefault('readerPlayerEffectNames', false);
    Session.setDefault('readerPlayerEffects', false);
    Session.setDefault('readerPlayerRules', false);
    Session.setDefault('readerPlayerName', 'Noname');
    Session.setDefault('readerPlayerId', false);


    if (!Spielebuch) {
        throw new Meteor.Error(500, 'Please add package spielebuch:core to your application.');
        return;
    }
    Reader.autoupdate();
    return true;
};

Reader.autoupdate = function () {
    Reader.refreshPlayerData();
    Tracker.autorun(function () {
        if (Session.equals('spielebuchReady', true)) {
            var text = Reader.parseGameObjectText(Session.get('spielebuchText'));
            Session.set('readerText', text);
            Reader.resetActiveGameObject();
        } else {
            Session.set('readerText', '');
        }
    });
};

Reader.refreshPlayerData = function () {
    Tracker.autorun(function () {
        if (!Meteor.userId()) {
            return;
        }
        var player = Spielebuch.player.get();
        Session.set('readerPlayerProperties', player.getPropertiesArray());
        Session.set('readerPlayerEffectNames', player.getEffectNames());
        Session.set('readerPlayerEffects', player.getEffects());
        Session.set('readerPlayerRules', player.getRules());
        Session.set('readerPlayerName', player.get('name'));
        Session.set('readerPlayerId', player.get('_id'));
    });
};

Reader.parseGameObjectText = function (textarray) {
    var re = /[^[\]]+(?=])/, _id, gameobject, text = '';
    var gameobject = new Spielebuch.GameObject(Meteor.userId());
    if (Array.isArray(textarray)) {
        _.map(textarray, (textarrayItem) => {
            var textItem = textarrayItem[0];
            var foundObject = re.exec(textItem);
            if (foundObject !== null) {
                _id = foundObject[0];
                gameobject.load(_id);
                textItem = textItem.replace(new RegExp('\\[' + _id + '\\]'),
                    '<a href=\"#\" class=\"reader-gameobject hover\" ' +
                    'data-_id=\"' + _id + '\">' + gameobject.get('name') +
                    '</a>'
                );
            }
            text += textItem + ' ';
        });
    }
    return text;
};

Reader.activeGameObject = new ReactiveVar(false);

Reader.setActiveGameObject = function (_id) {
    if (!Meteor.userId()) {
        return;
    }
    var gameobject = new Spielebuch.GameObject(Meteor.userId());
    gameobject.load(_id);
    Reader.activeGameObject.set(gameobject);
    Session.set('readerObjectProperties', gameobject.getPropertiesArray());
    Session.set('readerObjectEffectNames', gameobject.getEffectNames());
    Session.set('readerObjectEffects', gameobject.getEffects());
    Session.set('readerObjectRules', gameobject.getRules());
    Session.set('readerObjectName', gameobject.get('name'));
    Session.set('readerObjectId', gameobject.get('_id'));

    return gameobject;
};
Reader.resetActiveGameObject = function () {
    Reader.activeGameObject.set(false);
    Session.set('readerObjectProperties', false);
    Session.set('readerObjectEffectNames', false);
    Session.set('readerObjectEffects', false);
    Session.set('readerObjectRules', false);
    Session.set('readerObjectName', false);
    Session.set('readerObjectId', false);
    Session.set('readerRenderIcons', '');
};
Reader.resetIcons = function () {
    Session.set('readerRenderIcons', '');
};
Reader.localStorage = new Mongo.Collection(null);




