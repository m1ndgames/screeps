var roleHealer = {
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });

        if (target) {
            if (target.hits < target.hitsMax - 100) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(target);
                }
            }
        }

        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
        if (guards) {
    	    creep.travelTo(guards[0]);
        } else {
    	    creep.travelTo(Game.spawns.Spawn1);
        }
    }
};

module.exports = roleHealer;