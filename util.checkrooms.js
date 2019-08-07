var checkRooms = {
    findexits: function() {
        myrooms = Game.rooms;
        for (roomname in myrooms) {
            var roomobj = Game.rooms[roomname];
            
            if (!roomobj.memory.scouting) {
                roomobj.memory.scouting = {};
                console.log(Game.rooms[roomname]);
                var exitdescription = Game.map.describeExits(roomname);
                for (nextroom in exitdescription) {
                    var roomname = exitdescription[nextroom];
                    roomobj.memory.scouting[roomname] = false;
                }
            }
        }
    }
}

module.exports = checkRooms;