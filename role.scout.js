var roleScout = {

    run: function (creep) {
        var creeproom = creep.room;

        if (!creep.memory.scouting) {
            var scoutinglist = creeproom.memory.scouting;
            for (roomstatus in scoutinglist) {
                var scoutingstatus = scoutinglist[roomstatus];
                if (scoutingstatus == false) {
                    var roomname = roomstatus;
                    console.log(creep.name + ": I will scout " + roomname);

                    creep.memory.scouting = roomname;
                    creeproom.memory.scouting[roomname] = true;
                    return
                }
            }
            
        } else {
            if (creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49) {
                creep.travelTo(new RoomPosition(25,25,creep.memory.scouting));
            }
            
            scoutpos = new RoomPosition(25, 25, creep.memory.scouting);
            
            if (creep.room == Game.rooms[creep.memory.scouting]) {
                var idx = 0;
                _.forEach(creep.room.find(FIND_SOURCES), function(o) {
                    if (!o.memory.room) {
                        o.memory.idx = idx++;
                        o.memory.workers = 0;
                        o.memory.room = creep.room.name;
                    }
                })
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
                
                if (hostiles.length > 0) {
                    creep.room.memory.hostile = true;
                } else {
                    creep.room.memory.hostile = false;
                }
            } else {
                creep.travelTo(scoutpos);
            }
        }
    }

}

module.exports = roleScout;