var roleRepair = {

    run: function (creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing == true) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.hits < (structure.hitsMax - 200));
                }
            });
            
            var closestBuilding = creep.pos.findClosestByPath(targets);

            if(creep.repair(closestBuilding) == ERR_NOT_IN_RANGE) {
                creep.travelTo(closestBuilding);
            }
        }
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER) && _.sum(structure.store) > 100;
                }
            });
            
            if (targets.length > 0) {
                var closestEnergy = creep.pos.findClosestByRange(targets);
                if (creep.withdraw(closestEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestEnergy);
                }
            }

            if (!targets) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            }


        }
    }
};

module.exports = roleRepair;