(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.MapScene = function (map, scale, material) {
        
        var scene = this.scene = new THREE.Scene(),
            x, y, cube;

        this.map = map;

            
        for (y=0; y < map.rows.length; y++) {
            for (x=0; x < map.rows[y].length; x++) {
                if (!map.rows[y][x].isBlocked) continue;
                cube = new THREE.Mesh(
                    new THREE.CubeGeometry( scale, scale, scale, 2, 2, 2),
                    material);
                cube.position.x = (x * scale) + (scale/2);
                cube.position.y = (y * scale) + (scale/2);
                cube.position.z = (scale/2);
                scene.add(cube);
            }
        }
        
    }
    
    
}(jQuery, this));