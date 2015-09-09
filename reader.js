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
    if (!Spielebuch) {
        Spielebuch.error(500, 'Please install package spielebuch:core by typing \'meteor add spielebuch:core\' into your console.');
        Session.set('readerText', '');
        return false;
    }
    Reader.autoupdate();
    return true;
};

Reader.autoupdate = function () {
    Tracker.autorun(function () {
        if (Session.equals('spielebuchReady', true)) {
            var text = Reader.parseGameobjectText(Session.get('spielebuchText'));
            Session.set('readerText', text);
            Reader.resetAvtiveGameobject();
        }else{
            Session.set('readerText', -1);
        }
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

Reader.setActiveGameobject = function (_id) {
    var gameobject = new Spielebuch.Gameobject();
    gameobject.load(_id);
    Session.set('readerObjectProperties', gameobject.getPropertiesArray());
    Session.set('readerObjectEffectNames', gameobject.getEffectNames());
    Session.set('readerObjectEffects', gameobject.getEffects());
    Session.set('readerObjectRules', gameobject.getRules());
    Session.set('readerObjectName', gameobject.get('name'));
    Session.set('readerObjectId', gameobject.get('_id'));
};
Reader.initActiveGameobject = function () {
    Session.setDefault('readerObjectProperties', false);
    Session.setDefault('readerObjectEffectNames', false);
    Session.setDefault('readerObjectEffects', false);
    Session.setDefault('readerObjectRules', false);
    Session.setDefault('readerObjectName', false);
    Session.setDefault('readerObjectId', false);
    Session.setDefault('readerRenderIcons', '');
}
Reader.resetAvtiveGameobject = function () {
    Session.set('readerObjectProperties', false);
    Session.set('readerObjectEffectNames', false);
    Session.set('readerObjectEffects', false);
    Session.set('readerObjectRules', false);
    Session.set('readerObjectName', false);
    Session.set('readerObjectId', false);
    Session.set('readerRenderIcons', '');
};
Reader.getActiveGameobject = function () {
    if (Session.get('readerObjectId')) {
        var gameobject = new Spielebuch.Gameobject();
        gameobject.load(Session.get('readerObjectId'));
        return gameobject;
    }
    return false;
}

Reader.localStorage = new Mongo.Collection(null);

Reader.renderIcons = function (position) {
    var gameobject = Reader.getActiveGameobject(), html = '', degree = 0, events = [], offset;
    if (gameobject) {
        html += '<div style="top: ' + position.y + 'px;left:' + position.x + 'px\" class=\"icons-container\">';
        events = gameobject.getEvents();
        offset = 360 / (events.length + 1); //+1 because we add a close icon.
        _.each(events, function (eventObject) {
            html += Reader.renderIcon(eventObject, degree + offset / 2);
            degree += offset;
        });
        html += Reader.renderCloseIcon(degree + offset / 2);
        html += '</div>';
        html;
    }
    Session.set('readerRenderIcons', html);
}

Reader.renderIcon = function (eventObject, degree) {
    return '<a href=\"#\" style=\"transform: rotate(' + degree + 'deg) translate(35px) rotate(-' + degree + 'deg);\"' +
        ' class=\"reader-event\" data-fncid=\"' + eventObject.fncId + '\" title=\"' + eventObject.name + '\">' +
        '<span class=\"fa-stack fa-lg\">' +
        '<i class=\"fa fa-circle fa-stack-2x\"></i>' +
        '<i class=\"fa ' + eventObject.icon + ' fa-stack-1x fa-inverse\"></i>' +
        '</span>' +
        '</a>';
};

Reader.renderCloseIcon = function(degree){
    return '<a href=\"#\" style=\"transform: rotate(' + degree + 'deg) translate(35px) rotate(-' + degree + 'deg);\"' +
        ' class=\"reader-close\" title=\"Close\">' +
        '<span class=\"fa-stack fa-lg\">' +
        '<i class=\"fa fa-circle fa-stack-2x text-danger\"></i>' +
        '<i class=\"fa fa-close fa-stack-1x fa-inverse\"></i>' +
        '</span>' +
        '</a>';
};

Reader.modal = function(msg){
    console.log(msg);
}