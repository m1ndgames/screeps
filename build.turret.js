var buildTurret = {
    run: function() {
        for(var room_id in Game.rooms) {
            var room = Game.rooms[room_id]
            var spawns = room.find(FIND_MY_SPAWNS);

            if (!room.memory.turret) {
                room.memory.turret = {built: false};
            };
            
            if (room.memory.turret.built == true) {
                return;
            }
            
            const randompoint = Math.floor(Math.random() * (40 - 9 + 1)) + 9;
            var top_y = randompoint;
            var left_x = randompoint;
            var bottom_y = randompoint + 1;
            var right_x = randompoint + 1;
            var randompos = new RoomPosition(randompoint, randompoint, room.name);

            var checkarea = room.lookForAtArea(LOOK_TERRAIN, top_y, left_x, bottom_y, right_x, true);
            var slots = _.sum(checkarea, (n) => n.terrain == "plain");

            if (slots > 1) {
                spawnpos = spawns[0].pos;
                var distance = spawnpos.findPathTo(randompos).length;
                if ((distance > 2) && (distance < 4)) {
                    console.log("Found " + slots + " good places for turret at " + randompoint + " in " + distance + " blocks");
                    var builtcount = 0;
                    for (block in checkarea) {
                        if (checkarea[block].terrain == 'plain') {
                            if (builtcount < 1) {
                                var buildpos = new RoomPosition(checkarea[block].x, checkarea[block].y, room.name);
                                room.createConstructionSite(buildpos, STRUCTURE_TOWER);
                                console.log("Ive built a turret at " + buildpos);
                                builtcount++;
                            } else {
                            room.memory.turret.built = true;
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = buildTurret;