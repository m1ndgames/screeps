var roleBuilder = {

    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building == true) {
            
            var constructionsites = []
            for (var room_id in Game.rooms) {
                var room = Game.rooms[room_id];
                if ((room.controller) && (room.controller.my)) {
                    targets = room.find(FIND_MY_CONSTRUCTION_SITES, {
                        filter: (structure) => {
                            return (
                                structure.structureType != STRUCTURE_ROAD);
                        }
                    });
                    for (var site in targets) {
                        constructionsites.push(targets[site]);
                    }
                }
            }

            var streets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_ROAD);
                }
            });

            
            if (constructionsites.length > 0) {
                var closestStructure = creep.pos.findClosestByRange(constructionsites);
                if (!closestStructure) {
                    closestStructure = constructionsites[0];
                }
                console.log(closestStructure);
                if(creep.build(closestStructure) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStructure);
                }
            } else if (streets.length > 0) {
                var closestStreet = creep.pos.findClosestByRange(streets);
                if(creep.build(closestStreet) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStreet);
                }
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
            
            if (targets.length > 0) {
                var closestEnergy = creep.pos.findClosestByPath(targets);
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

module.exports = roleBuilder;