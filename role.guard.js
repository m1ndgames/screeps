var roleGuard = {
    run: function (creep) {
    	var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    	if (hostiles.length) {
    	    hostile = creep.pos.findClosestByPath(hostiles);
    	    if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostile);
            }
    	} else {
    	    creep.moveTo(creep.room.controller.pos);
    	}
    }
};

module.exports = roleGuard;