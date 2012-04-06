(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.PlayerCamera = function (params) {
        var player = this.player = params.player,
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
        },
        
        _tween: function (a, b,callback) {
            var self = this;
            //this.player.lock();
            var tween = new TWEEN.Tween(a).to(b, this.moveSpeed).start();
            if (callback) tween.onComplete(callback);
        },

        
        moveTo: function (x, y, callback) {
            var target = {
                x: (x+0.5)*this.scale,
                y: (y+0.5)*this.scale,
                z: this.eyeLevel
            };
            this._tween(this.dolly.position, target, callback); 
        },
        
        turnTo: function(facing, callback) {
            var currentAngle = this.dolly.rotation.y % (2*Math.PI);
            var targetAngle = (facing.y) === 1 ? 0 :
                    (facing.x) === 1 ? Math.PI * 1.5 :
                    (facing.y) === -1 ? Math.PI :
                    (facing.x) === -1 ? Math.PI * 0.5 : 0;
            var delta = targetAngle - currentAngle;
            if (delta > Math.PI) delta -= 2* Math.PI;
            if (delta < -Math.PI) delta += 2* Math.PI;
            var target = {
                y: this.dolly.rotation.y + delta
            };
            this._tween(this.dolly.rotation, target, callback);
        },
    
        lurch: function (facing) {
            var self = this,
                lurch = facing.clone().multiplyScalar(this.scale * 0.05),
                target1 = new THREE.Vector2().copy(this.dolly.position).addSelf(lurch),
                target2 = new THREE.Vector2().copy(this.dolly.position);
            this.player.lock();                
            var tween = new TWEEN.Tween(this.dolly.position).to(target1, this.moveSpeed/2).start();
            var tween2 = new TWEEN.Tween(this.dolly.position).to(target2, this.moveSpeed/2); 
            tween.chain(tween2);
            tween2.onComplete(function(){ self.player.unlock(); });
        }

    };
    
    

    
    
}(jQuery, this));


















