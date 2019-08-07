var roleHarvester = {

    run: function (creep) {

        if (creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
        }

        if (creep.memory.harvesting == true) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                var closestStructure = creep.pos.findClosestByRange(targets);
                if (creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStructure);
                }
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) > 100;
                }
            });
            
            if (targets.length > 0) {
                var closestEnergy = creep.pos.findClosestByRange(targets);
                if (creep.withdraw(closestEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestEnergy);
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            }
        }
    }
};

module.exports = roleHarvester;