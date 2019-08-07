var buildArea = {
    searchplace: function (obj, areasize) {
        var room = obj.room;
        var buildarea = [];
        console.log("Searching in " + room + " for " + areasize + "x" + areasize + " area at " + obj.pos);
        
        var top_y = obj.pos.y - areasize;
        var left_x = obj.pos.x - areasize;
        var bottom_y = obj.pos.y + areasize;
        var right_x = obj.pos.x + areasize;
        
        if (top_y < 0) {
            top_y = 0;
        }
        if (left_x < 0) {
            left_x = 0;
        }
        if (bottom_y > 49) {
            bottom_y = 49;
        }
        if (right_x > 49) {
            right_x = 49;
        }

        console.log("Top Left: x" + left_x + " y" + top_y);
        console.log("Bottom Right: x" + right_x + " y" + bottom_y);

        const checkterrainarea = room.lookForAtArea(LOOK_TERRAIN, top_y, left_x, bottom_y, right_x, true);
        const checkconstructionsitesarea = room.lookForAtArea(LOOK_CONSTRUCTION_SITES, top_y, left_x, bottom_y, right_x, true);
        const checkbuildingsarea = room.lookForAtArea(LOOK_STRUCTURES, top_y, left_x, bottom_y, right_x, true);
        var plains = _.filter(checkterrainarea, (n) => n.terrain == "plain");
        var constructionsites = _.filter(checkconstructionsitesarea, (o) => o.type == "constructionSite");
        var buildings = _.filter(checkbuildingsarea, (p) => p.type == "structure");
        console.log("Plain tiles found: " + plains.length);
        console.log("Construction Sites found: " + constructionsites.length);
        console.log("Buildings found: " + buildings.length);
        
        if (constructionsites.length > 0) {
            for (site in constructionsites) {
                for (plain in plains) {
                     if ((plains[plain].x == constructionsites[site].x) && (plains[plain].y == constructionsites[site].y)) {
                        console.log("Found construction Site, removing " + plains[plain]);
                        delete plains[plain];
                    }
                }
            }
        }
        if (buildings.length > 0) {
            for (building in buildings) {
                for (plain in plains) {
                    if ((plains[plain].x == buildings[building].x) && (plains[plain].y == buildings[building].y)) {
                        console.log("Found Building, removing " + plains[plain]);
                        delete plains[plain];
                    }
                }
            }
        }

        for (tile in plains) {
            var tilepos = new RoomPosition(plains[tile].x, plains[tile].y, room.name);
            console.log("Pushing Tile " + plains[tile].terrain + " into Build Area")
            buildarea.push(tilepos);
        }

        console.log("Free tiles found: " + buildarea.length);
        if (buildarea.length > areasize) {
            return buildarea;
        }
    }
}

module.exports = buildArea;