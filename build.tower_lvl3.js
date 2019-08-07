var buildTower_lvl3 = {
    run: function(room) {

        if (!room.memory.tower_lvl3) {
            room.memory.tower_lvl3 = {built: false};
        };

        if (room.memory.tower_lvl3.built == true) {
            return;
        }

        buildplace = room.controller;
        
        var buildarea = require('util.findbuildarea').searchplace(buildplace, 5);

        if (buildarea) {
            var builtcount = 0;
            for (block in buildarea) {
                if (builtcount < 1) {
                    var buildpos = new RoomPosition(buildarea[block].x, buildarea[block].y, room.name);
                    room.createConstructionSite(buildpos, STRUCTURE_TOWER);
                    console.log("Ive built a Tower at " + buildpos);
                    builtcount++;
                } else {
                    room.memory.tower_lvl3.built = true;
                }
            }
        }
    }
};

module.exports = buildTower_lvl3;