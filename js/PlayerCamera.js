(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.PlayerCamera = function (params) {
        var player = params.player,
            scale = this.scale = params.scale,
            moveSpeed = this.moveSpeed = params.moveSpeed || 200,
            mapScene = params.mapScene,
            angle = params.angle || 55,
            aspect = params.aspect || 4/3,
            near = params.near || 0.1,
            far = params.far || scale * 100,
            headTilt = params.headTilt || 0,
            eyeLevel = this.eyeLevel = params.eyeLevel || scale/2,
            lightRange = params.lightRange || scale * 10,
            pointLight = new THREE.PointLight(0xFFFFFF, 1, lightRange);
        
        this.dolly = new THREE.Object3D();
        this.dolly.position.z = eyeLevel;
        this.dolly.up = new THREE.Vector3( 0, 0, 1 );
        this.dolly.lookAt({
            x: this.dolly.position.x,
            y: this.dolly.position.y - scale,
            z: eyeLevel
        });

        this.camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
        //this.camera.position = new THREE.Vector3(0,0,0);
        this.camera.position = new THREE.Vector3(0,0,scale/2);
        this.camera.rotation = new THREE.Vector3(headTilt,0,0);

        this.dolly.add(this.camera);
        
        pointLight.position = new THREE.Vector3(0,0,0);
        this.dolly.add(pointLight);
        
        if (mapScene) this.enter(mapScene);

    }
    
    
    MAZE.PlayerCamera.prototype = {
        enter: function (mapScene) {
            this.dolly.position.x = mapScene.map.startCell.position.x*this.scale + (this.scale/2);
            this.dolly.position.y = mapScene.map.startCell.position.y*this.scale + (this.scale/2);
            mapScene.scene.add(this.dolly);
            //this.moveTo(mapScene.map.startCell.position.x, mapScene.map.startCell.position.y);
        },
        
        _tween: function (a, b, callback) {
            var tween = new TWEEN.Tween(a).to(b, this.moveSpeed).start();
            if (callback) tween.onComplete(callback);
        },
        
        //_move: function  (x, y, z, callback) {
        //    var axis = new THREE.Vector3(x, y, z);
        //    this.dolly.matrix.rotateAxis(axis);
        //    var target = this.dolly.position.clone().
        //        addSelf(axis.multiplyScalar(this.scale));
        //    target = {x: target.x, y: target.y, z: target.z};
        //    this._tween(this.dolly.position, target, callback);
        //},

        _turn: function (delta, callback) {
            this._tween(
                this.dolly.rotation,
                {y: this.dolly.rotation.y + delta},
                callback
            );
        },
        
        moveTo: function (x, y) {
            var target = {x: (x+0.5)*this.scale, y: (y+0.5)*this.scale, z: this.eyeLevel};
            this._tween(this.dolly.position, target);            
        },
    
        //moveForward: function (callback) { this._move( 0, 0, -1, callback ); },
        //
        //moveBackward: function (callback) { this._move( 0, 0, 1, callback ); },
        //
        //moveLeft: function (callback) { this._move( -1, 0, 0, callback ); },
        //
        //moveRight: function (callback) { this._move( 1, 0, 0, callback ); },
        
        turnLeft: function (callback) {
            this._turn(Math.PI / 2, callback);
        },
    
        turnRight: function (callback) {
            this._turn(-Math.PI / 2, callback);
        },
    };
    
    

    
    
}(jQuery, this));



















