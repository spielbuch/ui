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
Template.readerText.events({
    'click .reader-gameobject': function (event) {
        event.preventDefault();
        if (Session.get('readerObjectId') !== false) {
            Reader.resetActiveGameobject();
            if (event.currentTarget.dataset._id === Session.get('readerObjectId')) {
                return;
            }
        }
        var _id = event.currentTarget.dataset._id;
        var gameobject = Reader.setActiveGameobject(_id);
        renderIcons({x: event.clientX, y: event.clientY}, gameobject.getEvents());
    }
});


