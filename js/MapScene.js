(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.MapScene = function (map, scale, material) {
        
        var scene = this.scene = new THREE.Scene(),
            wallMaterial = new THREE.MeshPhongMaterial({
                reflectivity: 0.1,
                refractionRatio: 0.5,
                color: 0xffffff,
                vertexColors: true,
                map: THREE.ImageUtils.loadTexture('proto_blue.png', {}, function() {})
            }),
            floorMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture('proto_floor.png', {}, function() {})
            }),
            ceilingMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture('proto_white.png', {}, function() {})
            }),
            
            x, y, cube;

        this.map = map;

            
        for (y=0; y < map.rows.length; y++) {
            for (x=0; x < map.rows[y].length; x++) {
                if (! map.rows[y][x].isBlocked) {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 2, 2, 2),
                        ceilingMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = scale + (scale/2);
                    scene.add(cube);                    
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 2, 2, 2),
                        floorMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (-scale/2);
                    scene.add(cube);                    
                    
                }
                else {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 2, 2, 2),
                        wallMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (scale/2);
                    scene.add(cube);                    
                }
            }
        }
        
        
        
    }
    
    
}(jQuery, this));