var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var energy = Game.spawns.Spawn1.room.energyAvailable;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var updaters = _.filter(Game.creeps, (creep) => creep.memory.role == 'updater');

    if(harvesters.length < 2 && energy > 200) {
        var randomnumber = Math.random() * (99999 - 1000) + min;
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], "harvester-" . randomnumber, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
        energy = energy - 200;
    }

    if(builders.length < 2 && energy > 200) {
        var randomnumber = Math.random() * (99999 - 1000) + min;
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], "builder-" . randomnumber, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
        energy = energy - 200;
    }

    if(updaters.length < 2 && energy > 200) {
        var randomnumber = Math.random() * (99999 - 1000) + min;
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], "updater-" . randomnumber, {role: 'updater'});
        console.log('Spawning new updater: ' + newName);
        energy = energy - 200;
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'updater') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}