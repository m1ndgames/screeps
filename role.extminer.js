var roleExtMiner = {

    run: function (creep) {
        var source;
        var externalsources = [];
        
        if (creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
        }
        if (!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
        }

        if (creep.memory.hauling == true) {
            var start = creep.memory.startroom;
            
            if (creep.room.name == start) {
            
            var targets = Game.rooms[start].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && _.sum(structure.store) < structure.storeCapacity;
                }
            });
            if (targets.length > 0) {
                var closestStructure = creep.pos.findClosestByRange(targets);
                if (creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStructure);
                }
            }
            } else {
                var storeroom = Game.rooms[start];
                creep.travelTo(storeroom.controller.pos);
            }
            
        } else {
            if (creep.memory.minesource) {
                var source = Game.getObjectById(creep.memory.minesource);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            } else {
                for (checksource in Memory.sources) {
                    var source = Game.getObjectById(checksource);
                    var roomname = Memory.sources[checksource].room;

                    if (source) {
                        if (roomname != creep.room.name) {
                            if (Game.rooms[roomname].memory.hostile == false) {
                                if (source.memory.workers < 3) {
                                    externalsources.push(source);
                                }
                            }
                        }

                        if (externalsources.length > 0) {
                            if (externalsources[0]) {
                                creep.memory.minesource = externalsources[0].id;
                                externalsources[0].memory.workers = externalsources[0].memory.workers + 1;
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleExtMiner;