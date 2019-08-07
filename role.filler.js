var roleFiller = {

    run: function (creep) {

        if (creep.memory.filling && creep.carry.energy == 0) {
            creep.memory.filling = false;
        }
        if (!creep.memory.filling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.filling = true;
        }

        if (creep.memory.filling == true) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) < structure.storeCapacity;
                }
            });
            if (targets.length > 0) {
                var closestStructure = creep.pos.findClosestByRange(targets);
                if (creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStructure);
                }
            }
        }
        else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER) && _.sum(structure.store) > 100;
                }
            });

            if (containers.length > 0) {
                var storedenergy = creep.pos.findClosestByPath(containers);
                //console.log(storedenergy);
                if (creep.withdraw(storedenergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(storedenergy);
                }
            }
        }
    }
};

module.exports = roleFiller;