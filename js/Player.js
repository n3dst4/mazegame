(function($, global){
    var i,
        MAX_QUEUE_LEN = 1,
        MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.Player = function (map) {
        var i, self = this;
        MAZE.EventBroker.call(this);
        this.map = map;
        this.position = new THREE.Vector2().copy(map.startCell.position);
        this.facing = new THREE.Vector2(0, 1); // north
        this.locked = false;
        this.queue = [];
    }
    
    
    MAZE.Player.prototype = {
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
            if (this.locked) {
                if (this.queue.length < MAX_QUEUE_LEN) {
                    this.queue.push(_.bind(this._moveToward, this, facing));
                }
                return;            
            }
            var target = this.position.clone().addSelf(facing),
                targetCell = this.map.getCellAt(target.x, target.y);
            if (targetCell && !targetCell.isBlocked) {
                this.position = target;
                console && console.log("position is now " + this.position.x + " " + this.position.y);
                this.trigger("moveTo", target.x, target.y);
            }
            else {
                console && console.log("failed to move to " + target.x + " " + target.y);
                console && console.log(targetCell);
                this.trigger("lurch");
            }
        },
        
        _turnTo: function(facing) {
            if (this.locked) {
                if (this.queue.length < MAX_QUEUE_LEN) {
                    this.queue.push(_.bind(this._turnTo, this, facing));
                }
                return;            
            }
            if (this.locked) return;
            this.facing.copy(facing);
            console && console.log("facing is now " + this.facing.x + " " + this.facing.y);
            this.trigger("turnTo", this.facing);            
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
            this.locked = true;
        },
        
        unlock: function () {
            this.locked = false;
            while (this.queue.length && !this.locked) {
                this.queue.shift()();
            }
        }
        
        
    };
    
    _.extend(MAZE.Player.prototype, MAZE.EventBroker.prototype);
    
}(jQuery, this));















