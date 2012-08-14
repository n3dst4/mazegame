(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.MapScene = function (map, scale, material) {
        
        var mesh, cube;
        
        this.scale = scale;
        
        var scene = this.scene = new THREE.Scene(), x, y, cube;

        this.map = map;
        var mergedGeometry = this.mergedGeometry = new THREE.Geometry();

        this.blocks = [];
        
        // create all the blocks
        for (x=0; x < map.cols.length; x++) {
            this.blocks[x] = [];
            for (y=0; y < map.cols[x].length; y++) {
                this.blocks[x][y] = new MAZE.Block(map.cols[x][y], scale);
            }
        }
        
        // keep iterating over the blocks until they stop updating
        var changed = true;
        while (changed) {
            changed = false;
            for (x=0; x < map.cols.length; x++) {
                for (y=0; y < map.cols[x].length; y++) {
                    changed = changed || this.blocks[x][y].improve();
                }
            }
        }
        
        // ask all the blocks to add themselves to "this" (they will call
        // addStaticMesh or addDynamicMesh)
        for (y=0; y < map.cols.length; y++) {
            for (x=0; x < map.cols[y].length; x++) {
                this.blocks[y][x].addTo(this);
            }
        }            
        for (x=0; x < map.cols.length; x++) {
            for (y=0; y < map.cols[x].length; y++) {
                this.blocks[x][y].addTo(this);
            }
        }
        
        // sort out the merged geometry
        mesh = new THREE.Mesh(
            mergedGeometry,
            new THREE.MeshFaceMaterial()
        );
        mesh.frustumCulled = false;
        scene.add(mesh);
    }
    
    
    MAZE.MapScene.prototype = {
        
        // add a static item to the merged geometry
        addStatic: function (mesh) {
            THREE.GeometryUtils.merge(this.mergedGeometry, mesh);
        },
        
        // add a mesh which may change, animate, etc.
        addDynamic: function (mesh) {
            this.scene.add(mesh);
        }
    };
    
}(jQuery, this));

















