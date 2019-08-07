var buildContainer_lvl2 = {
    run: function(room) {

        if (!room.memory.container_lvl2) {
            room.memory.container_lvl2 = {built: false};
        };

        if (room.memory.container_lvl2.built == true) {
            return;
        }

        var sources = room.find(FIND_SOURCES);
        for (source in sources) {
            buildplace = sources[source];
        
            var buildarea = require('util.findbuildarea').searchplace(buildplace, 2);

            if (buildarea) {
                var builtcount = 0;
                for (block in buildarea) {
                    if (builtcount < 2) {
                        var buildpos = new RoomPosition(buildarea[block].x, buildarea[block].y, room.name);
                        room.createConstructionSite(buildpos, STRUCTURE_CONTAINER);
                        console.log("Ive built a container at " + buildpos);
                        builtcount++;
                    } else {
                        room.memory.container_lvl2.built = true;
                    }
                }
            }
        }
    }
};

module.exports = buildContainer_lvl2;