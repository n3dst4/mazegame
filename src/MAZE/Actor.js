(function($, global){
    var i,
        MAX_QUEUE_LEN = 1,
        MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.Actor = function (map) {
        var i, self = this;
        MAZE.EventBroker.call(this);
        this.map = map;
        this.position = new THREE.Vector2().copy(map.startCell.position);
        this.facing = new THREE.Vector2(0, 1); // north
        this.lockCount = 0;
        this.queue = [];
    }
    
    
    MAZE.Actor.prototype = {
        _lookLeft: function () {
            // rotate right: new x = -old y, new y = old x
            return new THREE.Vector2(-this.facing.y, this.facing.x);
        },
        
        _lookRight: function () {
            // rotate left: new x = old y, new y = -old x
            return new THREE.Vector2(this.facing.y, -this.facing.x);
        },
        
        _lookBack: function () {
            // rotate 180: new x = -old x, new y = -old y
            return new THREE.Vector2(-this.facing.x, -this.facing.y);
        },

        _moveToward: function(facing) {
            var self = this;
            if (this.lockCount > 0) {
                if (this.queue.length < MAX_QUEUE_LEN) {
                    this.queue.push(_.bind(this._moveToward, this, facing));
                }
                return;            
            }
            var target = this.position.clone().addSelf(facing),
                targetCell = this.map.getCellAt(target.x, target.y);
                
            var canMove = targetCell.canAccept(this);
                
            if (canMove) {
                this.position = target;
                this.lock();
                this.triggerSync("moveTo", this.position.x, target.y).
                    onComplete(function(){
                        targetCell.accept(self);
                        self.unlock();
                    }
                );
            }
            else {
                console && console.log("failed to move to " + target.x + " " + target.y);
                this.trigger("lurch", facing);
            }
        },
        
        _turnTo: function(facing) {
            var self = this;
            if (this.lockCount > 0) {
                if (this.queue.length < MAX_QUEUE_LEN) {
                    this.queue.push(_.bind(this._turnTo, this, facing));
                }
                return;            
            }
            if (this.locked) return;
            this.facing.copy(facing);
            console && console.log("facing is now " + this.facing.x + " " + this.facing.y);
            self.lock();
            this.triggerSync("turnTo", this.facing).onComplete(function(){
                self.unlock();
            });
        },
    
        moveForward: function() {
            this._moveToward(this.facing);
        },    
        
        moveBackward: function() {
            this._moveToward(this._lookBack());            
        },    
        
        moveLeft: function() {
            this._moveToward(this._lookLeft());            
        },    
        
        moveRight: function() {
            this._moveToward(this._lookRight());                        
        },    
        
        turnLeft: function(callback) {
            this._turnTo(this._lookLeft());
        },    
        
        turnRight: function(callback) {
            this._turnTo(this._lookRight());
        },
        
        lock: function () {
            this.lockCount++;
        },
        
        unlock: function () {
            this.lockCount = Math.max(this.lockCount - 1, 0);
            while (this.queue.length && this.lockCount === 0) {
                this.queue.shift()();
            }
        }
        
        
    };
    
    _.extend(MAZE.Actor.prototype, MAZE.EventBroker.prototype);
    
}(jQuery, this));















