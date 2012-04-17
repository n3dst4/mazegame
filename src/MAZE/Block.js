(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    var wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: THREE.ImageUtils.loadTexture('images/metal_wall_10_r.jpg', {}, function() {})
        }),
        floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: THREE.ImageUtils.loadTexture('images/metal_floor_01_r.jpg', {}, function() {})
        }),
        ceilingMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: THREE.ImageUtils.loadTexture('images/metal_base_03_r.jpg', {}, function() {})
        }),    
        floorMaterials = [ floorMaterial, floorMaterial, floorMaterial,
                             floorMaterial, floorMaterial, floorMaterial ],
        wallMaterials = [ wallMaterial, wallMaterial, wallMaterial,
                             wallMaterial, wallMaterial, wallMaterial],
        ceilingMaterials = [ ceilingMaterial, ceilingMaterial, ceilingMaterial,
                               ceilingMaterial, ceilingMaterial, ceilingMaterial];

    
    MAZE.Block = function (cell, scale) {
        this.cell = cell;
        this.scale = scale;
    };
    
    
    MAZE.Block.prototype = {
        improve: function () {
            
            var cube,
                x = this.cell.position.x,
                y = this.cell.position.y,
                scale = this.scale;
            
            if (! this.cell.isBlocked) {
                cube = new THREE.Mesh(
                    new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, ceilingMaterials),
                    ceilingMaterial);
                cube.position.x = (x * scale) + (scale/2);
                cube.position.y = (y * scale) + (scale/2);
                cube.position.z = scale + (scale/2);
                this.top = cube;
                cube = new THREE.Mesh(
                    new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1, floorMaterials),
                    floorMaterial);
                cube.position.x = (x * scale) + (scale/2);
                cube.position.y = (y * scale) + (scale/2);
                cube.position.z = (-scale/2);
                this.bottom = cube;
                
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
                this.cube = cube;
            }        
            return false;
            
        },
        
        addTo: function (mapScene) {
            if (this.top) mapScene.addStatic(this.top);
            if (this.bottom) mapScene.addStatic(this.bottom);
            if (this.cube) mapScene.addStatic(this.cube);
        }
    };
    
    
    
}(jQuery, this));
    