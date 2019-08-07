var roleUpgrader = {

    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller);
            }
        }
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) > 100;
                }
            });
            
            // Count Extensions in Room
            var extensioncount = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION);
                }
            });
            
            if (targets.length > 0) {
                var closestEnergy = creep.pos.findClosestByRange(targets);
                if (creep.withdraw(closestEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestEnergy);
                }
            } else if (extensioncount.length < 5) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            }
        }
    }
};

module.exports = roleUpgrader;