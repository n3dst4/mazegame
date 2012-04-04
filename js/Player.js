(function($, global){
    var i,
        MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.Player = function (map) {
        var i, self = this;
        MAZE.EventBroker.call(this);
        this.map = map;
        this.position = new THREE.Vector2().copy(map.startCell.position);
        this.facing = new THREE.Vector2(0, 1); // north
    }
    
    
    MAZE.Player.prototype = {
        _lookLeft: function () {
            // rotate right: new x = old y, new y = -old x
            return new THREE.Vector2(-this.facing.y, this.facing.x);
        },
        
        _lookRight: function () {
            // rotate left: new x = -old y, new y = old x
            return new THREE.Vector2(this.facing.y, -this.facing.x);
        },
        
        _lookBack: function () {
            // rotate 180: new x = -old x, new y = -old y
            return new THREE.Vector2(-this.facing.x, -this.facing.y);
        },

        _moveToward: function(facing) {
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
            
            this.facing.copy(this._lookLeft());
            console && console.log("facing is now " + this.facing.x + " " + this.facing.y);
            this.trigger("turnLeft");
        },    
        
        turnRight: function(callback) {
            
            this.facing.copy(this._lookRight());
            console && console.log("facing is now " + this.facing.x + " " + this.facing.y);
            this.trigger("turnRight");
        }
        
        
    };
    
    _.extend(MAZE.Player.prototype, MAZE.EventBroker.prototype);
    
}(jQuery, this));















