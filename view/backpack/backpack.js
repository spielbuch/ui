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


/**
 * Backpack
 * every item in backpack has two events:
 * - use: Element is used
 * - drop: Element is dropped from backpack
 */
Template.registerHelper('getBackpack', function () {
    return Reader.getBackpack();
});

Template.registerHelper('backpackSymbol', function (equipped) {
    if(equipped) {
        return equipped.value;
    }
    return '';
});


/**
 * Open
 *
 */
Template.readerBackpack.events({
    'click .open-backpack': function (event) {
        $('#modal-backpack').modal();
    }
});


Template.backpackModal.events({
    'click .reader-backpack-item': function (event) {
        event.preventDefault();
        var _id = event.currentTarget.dataset._id, equipped = event.currentTarget.dataset.equipped;
        if (Session.get('readerObjectId') !== false) {
            Reader.resetActiveGameObject();
        }
        Reader.setActiveGameObject(_id);

        if(equipped==='false') {
            renderIcons({x: event.clientX, y: event.clientY}, [Reader.backpackEvents.drop, Reader.backpackEvents.equip]);
        }else{
            renderIcons({x: event.clientX, y: event.clientY}, [Reader.backpackEvents.drop, Reader.backpackEvents.unequip]);
        }
    }
});

Reader.getBackpack = function () {
    if (Spielebuch.player.get()) {
        var player = Spielebuch.player.get();
        return player.getBackpackList();
    }
    return [];
};

