var buildSpawn = {
    run: function (room) {
        var spawnsinprogress = room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_SPAWN);
            }
        });

        if (spawnsinprogress) {
            return;
        }

        var buildplace = room.controller;
        var buildarea = require('util.findbuildarea').searchplace(buildplace, 10);

        if (buildarea) {
            for (block in buildarea) {
                var buildpos = new RoomPosition(buildarea[block].x, buildarea[block].y, room.name);
                room.createConstructionSite(buildpos, STRUCTURE_SPAWN);
                console.log("Ive built a spawn at " + buildpos);
                return;
            }
        }
    }
};

module.exports = buildSpawn;