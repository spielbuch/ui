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
Meteor.methods({
    createBackpackEventFunctions: function () {
        var drop = {
            name: 'Drop',
            icon: 'fa-long-arrow-down'
        }, equip = {
            name: 'Equip',
            icon: 'fa-male'
        }, unequip = {
            name: 'Unequip',
            icon: 'fa-long-arrow-down'
        };
        drop.fncId = Spielebuch.StoredFunction.save(`
            Meteor.call('dropToScene', self.get('_id'), scene.get('_id'));
            player.unequip(self);
         `, this.userId);

        equip.fncId = Spielebuch.StoredFunction.save(`
            player.equip(self);
         `, this.userId);

        unequip.fncId = Spielebuch.StoredFunction.save(`
            player.unequip(self);
         `, this.userId);

        return {drop: drop, equip: equip, unequip: unequip};
    }
});