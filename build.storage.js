var buildStorages = {
    run: function(room) {

        if (!room.memory.storages) {
            room.memory.storages = {built: false};
        };

        if (room.memory.storages.built == true) {
            return;
        }

        buildplace = room.controller;
        
        var buildarea = require('util.findbuildarea').searchplace(buildplace, 2);

        if (buildarea) {
            var builtcount = 0;
            for (block in buildarea) {
                if (builtcount < 1) {
                    var buildpos = new RoomPosition(buildarea[block].x, buildarea[block].y, room.name);
                    room.createConstructionSite(buildpos, STRUCTURE_STORAGE);
                    console.log("Ive built a Storage at " + buildpos);
                    builtcount++;
                } else {
                    room.memory.storages.built = true;
                }
            }
        }
    }
};

module.exports = buildStorages;