var roleHauler = {

    run: function (creep) {
        var energyminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyminer');

        if (creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
        }
        if (!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
        }

        if (creep.memory.hauling == true) {
            var targets = creep.room.find(FIND_STRUCTURES, {
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
                var distance = creep.pos.findPathTo(closestStructure.pos).length;
                
                if (distance < 5) {
                
                if (creep.transfer(closestStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(closestStructure);
                }
                
                }
            }
        }

        if (creep.memory.minerid) {
            var miner = Game.getObjectById(creep.memory.minerid);

            if (!miner) {
                delete creep.memory.minerid;
                return;
            }

            var minerpos = miner.pos;
            var minername = miner.name;
            var energy = creep.room.lookForAt(LOOK_ENERGY, minerpos);
            if (!energy) {
                creep.travelTo(minerpos);
            }
            //console.log(creep.name + " is hauling from " + minername);
            if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                creep.travelTo(energy[0]);
            }
        } else {
            for (miner in energyminers) {
                var minercreepid = energyminers[miner].id;
                var minerobj = Game.getObjectById(minercreepid);
                if (!minerobj.pos) {
                    return;
                }
                if (!minerobj.memory.haulerid) {
                    console.log(creep.name + ": Miner " + minerobj.name + " has no Hauler, i'll help");
                    minerobj.memory.haulerid = creep.id;
                    creep.memory.minerid = minerobj.id;
                    return;
                }
            }
        }
    }
};

module.exports = roleHauler;