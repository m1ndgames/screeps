var spawnWorkers = {
    run: function () {
        for (var room_id in Game.rooms) {
            var room = Game.rooms[room_id];
            if ((room.controller) && (room.controller.my)) {
                var level = room.controller.level;
                var _ = require('lodash');
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                var energyminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyminer');
                var extminers = _.filter(Game.creeps, (creep) => creep.memory.role == 'extminer');
                var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
                var repairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
                var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
                var towersuppliers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towersupplier');
                var fillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'filler');
                var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
                var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');


                builderscount = 0
                // Spawn builders if needed
                for (var room_id in Game.rooms) {
                    var room = Game.rooms[room_id];
                    if ((room.controller) && (room.controller.my)) {
                        var contructionsites = room.find(FIND_MY_CONSTRUCTION_SITES);

                        if (contructionsites.length > 0) {
                            builderscount = 3;
                        }
                    }
                }

                // Count External Sources in Memory
                var externalsourcecount = 0;
                for (var scoutroom in room.memory.scouting) {
                    if (Memory.rooms[scoutroom]) {
                        if (!Memory.rooms[scoutroom].hostile) {
                            if (room.memory.scouting.hasOwnProperty(scoutroom)) {
                                for (source in Memory.sources) {
                                    if (Memory.sources[source].room == scoutroom) {
                                        externalsourcecount++;
                                    }
                                }
                            }
                        }
                    }
                }

                var extminerscount = (externalsourcecount * 3);

                var fillerscount = 2;
                var harvesterscount = 3;
                var guardscount = 0;
                var healerscount = (guardscount / 2);
                var upgraderscount = 2;

                var scoutscount = 0;
                for (var scoutroom in room.memory.scouting) {
                    if (room.memory.scouting.hasOwnProperty(scoutroom)) {
                        scoutscount++;
                    }
                }

                // Count Sources in Room
                var sourcecount = room.find(FIND_SOURCES).length;
                var energyminerscount = sourcecount;

                if (energyminers.length < 2) {
                    var energyminerscount = 2;
                    var harvesterscount = 2;
                    var haulerscount = 0;
                    var guardscount = 0;
                    var healerscount = 0;
                    var repaircount = 0;
                    var upgraderscount = 0;
                    var towersuppliercount = 0;
                    var fillerscount = 0;
                    var extminerscount = 0;
                }

                if (harvesters.length < 1) {
                    var energyminerscount = 0;
                    var harvesterscount = 1;
                    var haulerscount = 0;
                    var guardscount = 0;
                    var healerscount = 0;
                    var repaircount = 0;
                    var builderscount = 0;
                    var upgraderscount = 0;
                    var towersuppliercount = 0;
                    var fillerscount = 0;
                    var extminerscount = 0;
                }

                // Count Extensions in Room
                var extensioncount = room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_EXTENSION);
                    }
                }).length;

                // Define Repairmen
                var towers = room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_TOWER);
                    }
                });

                if (towers.length > 0) {
                    var repaircount = 0;
                    var towersuppliercount = 2;
                } else {
                    var repaircount = 1;
                    var towersuppliercount = 0;
                }

                var storages = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE);
                    }
                });

                var haulerscount = energyminerscount;

                if (level < 3) {
                    var harvesterscount = 2;
                    var guardscount = 0;
                    var healerscount = 0;
                    var upgraderscount = 5;
                    var towersuppliercount = 0;
                    var repaircount = 0;
                    var energyminerscount = 0;
                    var haulerscount = 0;
                    var towersuppliercount = 0;
                    var fillerscount = 0;
                    var builderscount = 0;
                }

                if (level < 3) {
                    var scoutscount = 0;
                }

                if (level == 2) {
                    var builderscount = 2;
                }

                var spawns = Game.spawns;

                for (var spawn in spawns) {

                    /*
                    console.log("################################################");
                    console.log("Spawnlist for room " + room.name);
                    console.log("Harvesters = " + harvesters.length + "/" + harvesterscount);
                    console.log("Guards = " + guards.length + "/" + guardscount);
                    console.log("Healers = " + healers.length + "/" + healerscount);
                    console.log("Upgraders = " + upgraders.length + "/" + upgraderscount);
                    console.log("Towersuppliers = " + towersuppliers.length + "/" + towersuppliercount);
                    console.log("Repairmen = " + repairmen.length + "/" + repaircount);
                    console.log("Energyminers = " + energyminers.length + "/" + energyminerscount);
                    console.log("External Energyminers = " + extminers.length + "/" + extminerscount);
                    console.log("Haulers = " + haulers.length + "/" + haulerscount);
                    console.log("Builders = " + builders.length + "/" + builderscount);
                    console.log("Fillers = " + fillers.length + "/" + fillerscount);
                    console.log("Scouts = " + scouts.length + "/" + scoutscount);
                    console.log("################################################");
                    console.log();
                    */


                    if (harvesters.length < harvesterscount && spawns[spawn].room.energyAvailable > 500 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], null, { role: 'harvester', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning harvester")
                        return;
                    } else if (harvesters.length < harvesterscount && spawns[spawn].room.energyAvailable > 200 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, CARRY, MOVE], null, { role: 'harvester', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning harvester")
                        return;
                    }

                    if (extminers.length < extminerscount && spawns[spawn].room.energyAvailable > 1000 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], null, { role: 'extminer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning extminer")
                        return;
                    } else if (extminers.length < extminerscount && spawns[spawn].room.energyAvailable > 500 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY], null, { role: 'extminer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning extminer")
                        return;
                    }

                    if (energyminers.length < energyminerscount && spawns[spawn].room.energyAvailable > 550 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], null, { role: 'energyminer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning energyminer")
                        return;
                    } else if (energyminers.length < energyminerscount && spawns[spawn].room.energyAvailable > 250 && extensioncount < 5 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, MOVE], null, { role: 'energyminer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning energyminer")
                        return;
                    }

                    if (haulers.length < haulerscount && spawns[spawn].room.energyAvailable > 600 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], null, { role: 'hauler', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning hauler")
                        return;
                    } else if (haulers.length < haulerscount && spawns[spawn].room.energyAvailable > 300 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], null, { role: 'hauler', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning hauler")
                        return;
                    }

                    if (builders.length < builderscount && spawns[spawn].room.energyAvailable > 450 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE], null, { role: 'builder', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning builder")
                        return;
                    } else if (builders.length < builderscount && spawns[spawn].room.energyAvailable > 200 && extensioncount < 5 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, CARRY, MOVE], null, { role: 'builder', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning builder")
                        return;
                    }

                    if (fillers.length < fillerscount && spawns[spawn].room.energyAvailable > 400 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], null, { role: 'filler', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning filler")
                        return;
                    }

                    if (upgraders.length < upgraderscount && spawns[spawn].room.energyAvailable > 1000 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], null, { role: 'upgrader', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning upgrader")
                        return;
                    } else if (upgraders.length < upgraderscount && spawns[spawn].room.energyAvailable > 650 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], null, { role: 'upgrader', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning upgrader")
                        return;
                    } else if (upgraders.length < upgraderscount && spawns[spawn].room.energyAvailable > 450 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], null, { role: 'upgrader', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning upgrader")
                        return;
                    } else if (upgraders.length < upgraderscount && spawns[spawn].room.energyAvailable > 200 && extensioncount < 5 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, CARRY, MOVE], null, { role: 'upgrader', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning upgrader")
                        return;
                    }

                    if (guards.length < guardscount && spawns[spawn].room.energyAvailable > 750) {
                        var newName = spawns[spawn].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], null, { role: 'guard', startroom: spawns[spawn].room.name } && !spawns[spawn].spawning);
                        console.log(spawns[spawn].name + " is spawning guard")
                        return;
                    } else if (guards.length < guardscount && spawns[spawn].room.energyAvailable > 270 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([TOUGH, MOVE, ATTACK, MOVE, ATTACK], null, { role: 'guard', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning guard")
                        return;
                    }

                    if (healers.length < healerscount && (spawns[spawn].room.energyAvailable > 600) && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, HEAL, HEAL], null, { role: 'healer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning healer")
                        return;
                    } else if (healers.length < healerscount && (spawns[spawn].room.energyAvailable > 300) && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([HEAL, MOVE], null, { role: 'healer', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning healer")
                        return;
                    }

                    if (repairmen.length < repaircount && spawns[spawn].room.energyAvailable > 350 && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([WORK, WORK, CARRY, CARRY, MOVE], null, { role: 'repair', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning repair")
                        return;
                    }

                    if (towersuppliers.length < towersuppliercount && (spawns[spawn].room.energyAvailable > 200) && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([CARRY, CARRY, CARRY, MOVE], null, { role: 'towersupplier', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning towersupplier")
                        return;
                    }

                    if (scouts.length < scoutscount && (spawns[spawn].room.energyAvailable > 150) && !spawns[spawn].spawning) {
                        var newName = spawns[spawn].createCreep([MOVE, MOVE, MOVE], null, { role: 'scout', startroom: spawns[spawn].room.name });
                        console.log(spawns[spawn].name + " is spawning scout")
                        return;
                    }
                }
            } else {

            }
        }
    }
};

module.exports = spawnWorkers;