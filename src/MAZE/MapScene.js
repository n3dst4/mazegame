(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.MapScene = function (map, scale, material) {
        
        var mesh, cube;
        
        this.scale = scale;
        
        var scene = this.scene = new THREE.Scene(),
            wallMaterial = new THREE.MeshPhongMaterial({
                reflectivity: 0.1,
                refractionRatio: 0.5,
                color: 0xffffff,
                vertexColors: true,
                map: THREE.ImageUtils.loadTexture('images/proto_blue.png', {}, function() {})
            }),
            floorMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture('images/proto_floor.png', {}, function() {})
            }),
            ceilingMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture('images/proto_white.png', {}, function() {})
            }),
            
            x, y, cube;

        this.map = map;
        var floorMaterials = [ floorMaterial, floorMaterial, floorMaterial,
                             floorMaterial, floorMaterial, floorMaterial ];
        var wallMaterials = [ wallMaterial, wallMaterial, wallMaterial,
                             wallMaterial, wallMaterial, wallMaterial];
        var ceilingMaterials = [ ceilingMaterial, ceilingMaterial, ceilingMaterial,
                               ceilingMaterial, ceilingMaterial, ceilingMaterial];
        var mergedGeometry = new THREE.Geometry();

            
        for (y=0; y < map.rows.length; y++) {
            for (x=0; x < map.rows[y].length; x++) {
                if (! map.rows[y][x].isBlocked) {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, ceilingMaterials),
                        ceilingMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = scale + (scale/2);
                    //scene.add(cube);
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, floorMaterials),
                        floorMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (-scale/2);
                    //scene.add(cube);
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    
                }
                else {
                    cube = new THREE.Mesh(
                        new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, wallMaterials),
                        wallMaterial);
                    cube.position.x = (x * scale) + (scale/2);
                    cube.position.y = (y * scale) + (scale/2);
                    cube.position.z = (scale/2);
                    // RHS
                    cube.geometry.faceVertexUvs[0][0] = [
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                    ];
                    // LHS
                    cube.geometry.faceVertexUvs[0][1] = [
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                    ];
                    // Back face
                    cube.geometry.faceVertexUvs[0][2] = [
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                    ];
                    // Front
                    cube.geometry.faceVertexUvs[0][3] = [
                        new THREE.UV(0, 0),
                        new THREE.UV(0, 1),
                        new THREE.UV(1, 1),
                        new THREE.UV(1, 0),
                    ];
                    THREE.GeometryUtils.merge(mergedGeometry, cube);
                    //scene.add(cube);                    
                }
            }
        }
        mesh = new THREE.Mesh(
            mergedGeometry,
            new THREE.MeshFaceMaterial()
            //new THREE.MeshNormalMaterial()
        );
        //mesh.position.x = 0;
        //mesh.position.y = 0;
        //mesh.position.z = 0;
        mesh.frustumCulled = false;
        //mesh.matrixAutoUpdate = false;
        //mesh.geometry.computeFaceNormals();
        //mesh.geometry.computeVertexNormals();
        //mesh.updateMatrix();
        scene.add(mesh);
        
        
        
    }
    
    
}(jQuery, this));