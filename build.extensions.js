var buildExtensions = {
    run: function() {
        for(var room_id in Game.rooms) {
            var room = Game.rooms[room_id]
            
            if (!room.memory.extensions) {
                room.memory.extensions = {built: false};
            };
            
            if (room.memory.extensions.built == true) {
                return;
            }
            
            const randompoint = Math.floor(Math.random() * (40 - 9 + 1)) + 9;
            console.log("Running Area scan for extensions at " + randompoint);
            var top_y = randompoint;
            var left_x = randompoint;
            var bottom_y = randompoint + 2;
            var right_x = randompoint + 2;
            var randompos = new RoomPosition(randompoint, randompoint, room.name);

            var checkarea = room.lookForAtArea(LOOK_TERRAIN, top_y, left_x, bottom_y, right_x, true);

            var slots = _.sum(checkarea, (n) => n.terrain == "plain");
            var spawn_name =  room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    return (object.structureType == STRUCTURE_SPAWN);
                }
            });
            
            if (slots > 5) {
                spawnpos = Game.spawns.Spawn1.pos;
                //spawnpos = room.controller.pos;
                var distance = spawnpos.findPathTo(randompos).length;
                if ((distance > 2) && (distance < 10)) {
                    console.log("Found " + slots + " good places for extensions at " + randompoint + " in " + distance + " blocks");
                    var builtcount = 0;
                    for (block in checkarea) {
                        if (builtcount < 5) {
                            if (checkarea[block].terrain == 'plain') {
                                var buildpos = new RoomPosition(checkarea[block].x, checkarea[block].y, room.name);
                                room.createConstructionSite(buildpos, STRUCTURE_EXTENSION);
                                console.log("Ive built an extenstion at " + buildpos);
                                builtcount++;
                            }
                        } else {
                            room.memory.extensions.built = true;
                        }
                    }
                }
            }
        }
    }
};

module.exports = buildExtensions;