var manageNewroom = {
    run: function() {
        for (var room_id in Game.rooms) {
            var room = Game.rooms[room_id];
            if ((room.controller) && (!room.controller.my)) {
            	
            	var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
            	if (claimers.length == 0) {
            		var myroom = Game.rooms[room_id];
            		for (var myroom_id in Game.rooms) {
            			var myroom = Game.rooms[myroom_id];
            			if ((myroom.controller) && (myroom.controller.my)) {
            				var spawns = myroom.find(FIND_MY_SPAWNS);
            				for (var spawn in spawns) {
            					if (spawns[spawn].room.energyAvailable > 650) {
            						console.log("Found a possible expansion in " + room + " on " + room.controller);
            						console.log("Spawning claimer in " + spawns[spawn].room.name);
            						var newName = spawns[spawn].createCreep([CLAIM,MOVE], null, {role: 'claimer', startroom: spawns[spawn].room.name});
            						return;
            					}
            				}
            			}
            		}
            	} else {
                    if (claimers[0].claimController(room.controller) == ERR_NOT_IN_RANGE) {
                     	claimers[0].travelTo(room.controller);
                    }
            	}
            }
        }
    }
};

module.exports = manageNewroom;