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

var renderIcons = function (position) {
    Tracker.autorun(function(){
        var gameobject = Reader.activeGameobject.get(), html = '', degree = 0, events = [], offset;
        if (gameobject) {
            html += '<div style="top: ' + position.y + 'px;left:' + position.x + 'px\" class=\"icons-container\">';
            events = gameobject.getEvents();
            offset = 360 / (events.length + 1); //+1 because we add a close icon.
            _.each(events, function (eventObject) {
                html += renderIcon(eventObject, degree + offset / 2);
                degree += offset;
            });
            html += renderCloseIcon(degree + offset / 2);
            html += '</div>';
        }
        Session.set('readerRenderIcons', html);
    });
};

var renderIcon = function (eventObject, degree) {
    return '<a href=\"#\" style=\"transform: rotate(' + degree + 'deg) translate(35px) rotate(-' + degree + 'deg);\"' +
        ' class=\"reader-event\" data-fncid=\"' + eventObject.fncId + '\" data-eventname=\"' + eventObject.name + '\" title=\"' + eventObject.name + '\">' +
        '<span class=\"fa-stack fa-lg\">' +
        '<i class=\"fa fa-circle fa-stack-2x\"></i>' +
        '<i class=\"fa ' + eventObject.icon + ' fa-stack-1x fa-inverse\"></i>' +
        '</span>' +
        '</a>';
};

var renderCloseIcon = function (degree) {
    return '<a href=\"#\" style=\"transform: rotate(' + degree + 'deg) translate(35px) rotate(-' + degree + 'deg);\"' +
        ' class=\"reader-close\" title=\"Close\">' +
        '<span class=\"fa-stack fa-lg\">' +
        '<i class=\"fa fa-circle fa-stack-2x text-danger\"></i>' +
        '<i class=\"fa fa-close fa-stack-1x fa-inverse\"></i>' +
        '</span>' +
        '</a>';
};

Template.readerText.events({
    'click .reader-gameobject': function(event) {
        event.preventDefault();
        if(Session.get('readerObjectId')!==false){
            Reader.resetAvtiveGameobject();
            return;
        }
        var _id = event.currentTarget.dataset._id;
        Reader.setActiveGameobject(_id);
        renderIcons({x: event.clientX, y: event.clientY});
    }
});
Template.readerInteraction.events({
    'click .reader-event': function(event){
        event.preventDefault();
        var fncId = event.currentTarget.dataset.fncid, eventName = event.currentTarget.dataset.eventname;
        if(fncId) {
            Spielebuch.print('event',Session.get('readerPlayerName'),eventName,Session.get('readerObjectName'));
            Spielebuch.StoredFunction.execute(fncId, Session.get('readerObjectId'));
        }
    },
    'click .reader-close': function(){
        Reader.resetAvtiveGameobject();
    }
});


Template.trailerModal.helpers({
    text: function(){
        return Session.get('modalText');
    } ,
    title: function(){
        return Session.get('modalTitle');
    }
});

/**
 * Backpack
 * every item in backpack has two events:
 * - use: Element is used
 * - drop: Element is dropped from backpack
 */
Template.readerBackpack.helper({
    getBackpack: function(){
        return Reader.getBackpack();
    }
})
