var roleEnergyMiner = {

    run: function (creep) {
        var source;
        var roomsources = [];
        if (creep.memory.minesource) {
            var source = Game.getObjectById(creep.memory.minesource);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source);
            }
        
            if (creep.carry.energy) {
                creep.drop(RESOURCE_ENERGY,creep.carry.energy);
            }
        } else {
            for (checksource in Memory.sources) {
                if (Memory.sources[checksource].room == creep.room.name) {
                    roomsources.push(Game.getObjectById(checksource));
                }
            
                if (roomsources) {
                    var energyminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyminer');
                    source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                        filter: (s) => s.pos.findInRange(energyminers, 1).length == 0
                    });
                    creep.memory.minesource = source.id;
                    return;
                }
            }
        }
    }
};

module.exports = roleEnergyMiner;