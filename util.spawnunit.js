var spawnUnit = {
    run: function (spawn, role) {
        
        const roomenergy = spawn.room.energyAvailable;
        
        const bodyparts = {
            'WORK' = 100;
            'CARRY' = 50;
            'MOVE' = 50;
            'ATTACK' = 80;
            'RANGED_ATTACK' = 150;
            'HEAL' = 250;
            'CLAIM' = 600;
            'TOUGH' = 10;
        };
        
        
        var newName = spawn.createCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'harvester', startroom: spawns[spawn].room.name});
    }
}

module.exports = spawnUnit;