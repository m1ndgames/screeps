var manageTowers = {
    run: function() {
        for(var room_id in Game.rooms) {
            var room = Game.rooms[room_id];
            
            var towers = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER);
                }
            });

            if (towers.length > 0) {
                for (tower in towers) {
                    var closestDamagedStructure = towers[tower].pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < (structure.hitsMax - 200)
                    });
                    var closestHostile = towers[tower].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile) {
                        towers[tower].attack(closestHostile);
                    } else if (closestDamagedStructure) {
                        towers[tower].repair(closestDamagedStructure);
                    }
                }
            }
        }
    }
};

module.exports = manageTowers;