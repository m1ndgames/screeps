var manageBuilding = {
    run: function () {
        for (var room_id in Game.rooms) {
            var room = Game.rooms[room_id];
            if ((room.controller) && (room.controller.my)) {
                var level = room.controller.level;

                if (level == 1) {
                    for (var spawn in Game.spawns) {
                        if (room.name != Game.spawns[spawn].room.name) {
                            require('build.spawn').run(room);
                        }
                    }
                }

                if (level == 2) {
                    require('build.extensions_lvl2').run(room);
                    require('build.container_lvl2').run(room);
                }
            
                if (level == 3) {
                    require('build.extensions_lvl3').run(room);
                    require('build.tower_lvl3').run(room);
                    //require('build.streets').run(room);
                }
            
                if (level == 4) {
                    require('build.extensions_lvl4').run(room);
                    require('build.storage').run(room);
                }
            
                if (level == 5) {
                    require('build.extensions_lvl5').run(room);
                    require('build.tower_lvl5').run(room);
                }
            
                if (level == 6) {
                    require('build.extensions_lvl6').run(room);
                }
            
                if (level == 7) {
                }
            
                if (level == 8) {
                
                }

            }
        }
    }
};

module.exports = manageBuilding;