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
            var text = Reader.parseGameobjectText(Session.get('spielebuchText'));
            Session.set('readerText', text);
            Reader.resetAvtiveGameobject();
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
        Session.set('readerPlayerProperties', player.getPropertiesArray());
        Session.set('readerPlayerEffectNames', player.getEffectNames());
        Session.set('readerPlayerEffects', player.getEffects());
        Session.set('readerPlayerRules', player.getRules());
        Session.set('readerPlayerName', player.get('name'));
        Session.set('readerPlayerId', player.get('_id'));
    });
};

Reader.parseGameobjectText = function (textarray) {
    var re = /[^[\]]+(?=])/, _id, gameobject, text = '';
    if (Array.isArray(textarray)) {
        _.map(textarray, function (textitem) {
            var foundObject = re.exec(textitem);
            if (foundObject !== null) {
                _id = foundObject[0];
                gameobject = Spielebuch.Gameobjects.findOne(_id);
                if (!gameobject) {
                    Spielebuch.error('404', 'Could not find Gameobject (' + _id + ') in database.');
                } else {
                    textitem = textitem.replace(new RegExp('\\[' + _id + '\\]', 'g'),
                        '<a href=\"#\" class=\"reader-gameobject hover\" ' +
                        'data-_id=\"' + _id + '\">' + gameobject.name +
                        '</a>'
                    );
                }
            }
            text += textitem + ' ';
        });
        return text;
    }
    Spielebuch.error(500, 'Spielebuch.getText() should return an array, but instead returned a ' + typeof textarray + '.');
    return '';
};

Reader.activeGameobject = new ReactiveVar(false);

Reader.setActiveGameobject = function (_id) {
    if (!Meteor.userId()) {
        return;
    }
    var gameobject = new Spielebuch.Gameobject(Meteor.userId());
    gameobject.load(_id);
    Reader.activeGameobject.set(gameobject);
    Session.set('readerObjectProperties', gameobject.getPropertiesArray());
    Session.set('readerObjectEffectNames', gameobject.getEffectNames());
    Session.set('readerObjectEffects', gameobject.getEffects());
    Session.set('readerObjectRules', gameobject.getRules());
    Session.set('readerObjectName', gameobject.get('name'));
    Session.set('readerObjectId', gameobject.get('_id'));
};
Reader.resetActiveGameobject = function () {
    Reader.activeGameobject.set(false);
    Session.set('readerObjectProperties', false);
    Session.set('readerObjectEffectNames', false);
    Session.set('readerObjectEffects', false);
    Session.set('readerObjectRules', false);
    Session.set('readerObjectName', false);
    Session.set('readerObjectId', false);
    Session.set('readerRenderIcons', '');
};
Reader.localStorage = new Mongo.Collection(null);

Reader.getBackpack = function(){
    var player = Spielebuch.player.get();
    return player.getBackpackList();
}


Reader.modal = function(text, title){
    Session.set('modalText',text);
    Session.set('modalTitle',title);
    $('#modal-trailer').modal();
};