var buildStreets = {
    run: function() {
        for(var room_id in Game.rooms) {
            var room = Game.rooms[room_id]
            var spawns = room.find(FIND_MY_SPAWNS);
            var roomcontroller = room.controller;
            
            if (!room.memory.streets) {
                room.memory.streets = {built: false};
            };
            
            if (room.memory.streets.built == true) {
                return;
            }
            
            // Build street from Controller to Sources
            var sources = _.map(room.find(FIND_SOURCES), function(source) {
                return { pos: source.pos, range: 1 };
            });
            for(var source in sources) {
                //console.log("Creating Street from " + roomcontroller.pos + " to " + sources[source].pos);

                var roadmap_sources = PathFinder.search(roomcontroller.pos, sources[source].pos, {maxOps: 2000, maxRooms: 1 });
                    for(var roadtile in roadmap_sources.path) {
                        room.createConstructionSite(roadmap_sources.path[roadtile], STRUCTURE_ROAD);
                }
            }
            
            for (var spawn in spawns) {
                // Build street from Spawn to Sources
                var sources = _.map(room.find(FIND_SOURCES), function(source) {
                    return { pos: source.pos, range: 1 };
                });
                for(var source in sources) {
                    //console.log("Creating Street from " + spawns[spawn].pos + " to " + sources[source].pos);

                    var roadmap_sources = PathFinder.search(spawns[spawn].pos, sources[source].pos, {maxOps: 2000, maxRooms: 1 });
                        for(var roadtile in roadmap_sources.path) {
                            room.createConstructionSite(roadmap_sources.path[roadtile], STRUCTURE_ROAD);
                    }
                }

                // Build street from Spawn to Controller
                //console.log("Creating Street from " + spawns[spawn].pos + " to " + room.controller.pos );
                var roadmap_controller = PathFinder.search(spawns[spawn].pos, room.controller.pos, {maxOps: 2000, maxRooms: 1});
                for(var roadtile in roadmap_controller.path) {
                    room.createConstructionSite(roadmap_controller.path[roadtile], STRUCTURE_ROAD);
                }

                // Build street to Minerals
                var minerals = _.map(room.find(FIND_MINERALS), function(mineral) {
                    return { pos: mineral.pos, range: 1 };
                });
                for(var mineral in minerals) {
                    //console.log("Creating Street from " + spawns[spawn].pos + " to " + minerals[mineral].pos);
                    var roadmap_minerals = PathFinder.search(spawns[spawn].pos, minerals[mineral].pos, {maxOps: 2000, maxRooms: 1});
                        for(var roadtile in roadmap_minerals.path) {
                            room.createConstructionSite(roadmap_minerals.path[roadtile], STRUCTURE_ROAD);
                    }
                }
            }
            room.memory.streets.built = true;
        }
    }
};

module.exports = buildStreets;