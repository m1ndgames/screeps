var buildExtensions_lvl3 = {
    run: function(room) {

        if (!room.memory.extensions_lvl3) {
            room.memory.extensions_lvl3 = {built: false};
        };

        if (room.memory.extensions_lvl3.built == true) {
            return;
        }

        buildplace = Game.spawns.Spawn1;
        
        var buildarea = require('util.findbuildarea').searchplace(buildplace, 4);

        if (buildarea) {
            var builtcount = 0;
            for (block in buildarea) {
                if (builtcount < 10) {
                    var buildpos = new RoomPosition(buildarea[block].x, buildarea[block].y, room.name);
                    room.createConstructionSite(buildpos, STRUCTURE_EXTENSION);
                    console.log("Ive built an extenstion at " + buildpos);
                    builtcount++;
                } else {
                    room.memory.extensions_lvl3.built = true;
                }
            }
        }
    }
};

module.exports = buildExtensions_lvl3;