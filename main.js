// define source.memory
Memory.sources = Memory.sources || {};

Object.defineProperty(Source.prototype, 'memory', {
    enumerable : true,
    configurable : false,
    get: function () {
        Memory.sources[this.id] = Memory.sources[this.id] || {};
        return Memory.sources[this.id];
    },
    set: function(value) {
        if(_.isUndefined(Memory.sources)) {
            Memory.sources = {};
        }
        if(!_.isObject(Memory.sources)) {
            throw new Error('Could not set source memory');
        }
        Memory.sources[this.id] = value;
    }
});

// Set Sources Memory
var tstRoom = _.first(_.values(Game.rooms));
var idx = 0;
_.forEach(tstRoom.find(FIND_SOURCES), function(o){
    o.memory.idx = idx++;
    o.memory.workers = 0;
    o.memory.room = tstRoom.name;
})

// main loop
module.exports.loop = function () {

    // Clear dead Creeps from Memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var deadcreep = Memory.creeps[name];
            console.log(name + " the " + deadcreep.role + " died...");
            
            if (deadcreep.role == 'energyminer') {
                if (deadcreep.haulerid) {
                    var hauler = Game.getObjectById(deadcreep.haulerid);
                    if (hauler.memory.minerid) {
                    	delete hauler.memory.minerid;
                    	console.log("Deleted Hauler " + hauler.name + "s memory");
                    }
                }
            } else if (deadcreep.role == 'extminer') {
                if (deadcreep.minesource) {
                    Memory.sources[deadcreep.minesource].workers--;
                    console.log("Deleted External Miner from " + deadcreep.minesource);
                }
            } else if (deadcreep.role == 'hauler') {
                if (deadcreep.minerid) {
                    var miner = Game.getObjectById(deadcreep.minerid);
                    if (miner.memory.haulerid) {
                    	delete miner.memory.haulerid;
                    	console.log("Deleted Miner " + miner.name + "s memory");
                    }
                }
            } else if (deadcreep.role == 'scout') {
                if (deadcreep.scouting) {
                    var scoutroom = Game.rooms[deadcreep.scouting];
                    var startroom = Game.rooms[deadcreep.startroom];
                    startroom.memory.scouting[deadcreep.scouting] = false;
                    console.log("Need scout in " + deadcreep.scouting);
                }
            }
            if (Memory.creeps[name]) {
            	delete Memory.creeps[name];
            }
        }
    }

    // Define exits for each of my rooms and save to memory
    require('util.checkrooms').findexits();

    // Load Traveler Pathfinding Module
    var Traveler = require('util.path');
    
	// Manage Expansion to new Rooms
	var gcl = Game.gcl.level;
	var myroomcount = 0;
	for(var room_id in Game.rooms) {
        var room = Game.rooms[room_id];
        if ((room.controller) && (room.controller.my)) {
        	myroomcount = myroomcount + 1
        }
    }
	if (gcl > myroomcount) {
		require('manage.newroom').run();
	}
    
    // Load Tower Manager
    require('manage.towers').run();

    // Load Building Manager
    require('manage.building').run();
    
    // Load Job Manager
    require('manage.jobs').run();

    // Spawn Workers
    require('spawn.workers').run();    
    
}