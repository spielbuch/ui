/**
 * Created by Daniel Budick on 01 Okt 2015.
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
renderIcons = function (position, events) {
    var html = '', degree = 270, offset = 0;
    if (Array.isArray(events)) {
        html += '<div style="top: ' + position.y + 'px;left:' + position.x + 'px\" class=\"icons-container\">';
        offset = 360 / (events.length + 2); //+2 because we add a close icon and an info icon.

        html += renderCloseIcon(degree);
        degree += offset;
        html += renderInfoIcon(degree);

        _.forEach(events, (eventObject)=>{
            degree += offset;
            html += renderIcon(eventObject, degree);
        });
        html += '</div>';
    }
    Session.set('readerRenderIcons', html);
};

renderIcon = function (eventObject, degree) {
    var fncId = eventObject.fncId, eventName =  eventObject.name, objectName = eventObject.name, icon = eventObject.icon;
    return `<a href="#" style="transform: rotate(${degree}deg) translate(35px) rotate(-${degree}deg);" class="reader-event" data-fncid="${fncId}" data-eventname="${eventName}" title="${objectName}">
            <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa ${icon} fa-stack-1x fa-inverse"></i>
            </span>
        </a>`;
};

renderCloseIcon = function (degree) {
    return `<a href="#" style="transform: rotate(${degree}deg) translate(35px) rotate(-${degree}deg);" class="reader-close" title="Close">
            <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x text-danger"></i>
                <i class="fa fa-close fa-stack-1x fa-inverse"></i>
            </span>
        </a>`;
};
renderInfoIcon = function (degree) {
    return `<a href="#" style="transform: rotate(${degree}deg) translate(35px) rotate(-${degree}deg);" class="reader-info" title="Information">
            <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-info fa-stack-1x fa-inverse"></i>
            </span>
        </a>`;
};

Template.readerInteraction.events({
    'click .reader-event': function (event) {
        event.preventDefault();
        var data = event.currentTarget.dataset;
        var fncId = data.fncid, eventName = data.eventname;
        if (fncId) {
            Spielebuch.print('event', Session.get('readerPlayerName'), eventName, Session.get('readerObjectName'));
            Spielebuch.StoredFunction.execute(fncId, Session.get('readerObjectId'));
        }
        Reader.resetIcons();
    },
    'click .reader-close': function () {
        Reader.resetIcons();
    },
    'click .reader-info': function(){
        $('#modal-information').modal('show');
        Reader.resetIcons();
    }
});