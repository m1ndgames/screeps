var roleHarvester = require('role.harvester');
var roleEnergyMiner = require('role.energyminer');
var roleExtMiner = require('role.extminer');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleGuard = require('role.guard');
var roleHealer = require('role.healer');
var roleTowerSupplier = require('role.towersupplier');
var roleFiller = require('role.filler');
var roleScout = require('role.scout');

var manageJobs = {
    run: function() {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'energyminer') {
                roleEnergyMiner.run(creep);
            }
            if (creep.memory.role == 'hauler') {
                roleHauler.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'repair') {
                roleRepair.run(creep);
            }
            if (creep.memory.role == 'guard') {
                roleGuard.run(creep);
            }
            if (creep.memory.role == 'healer') {
                roleHealer.run(creep);
            }
            if (creep.memory.role == 'towersupplier') {
                roleTowerSupplier.run(creep);
            }
            if (creep.memory.role == 'filler') {
                roleFiller.run(creep);
            }
            if (creep.memory.role == 'scout') {
                roleScout.run(creep);
            }
            if (creep.memory.role == 'extminer') {
                roleExtMiner.run(creep);
            }
        }        
    }
}

module.exports = manageJobs;