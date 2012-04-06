(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.Controls = function (domElement) {
        var i, self = this;
        MAZE.EventBroker.call(this);
        $(domElement).keydown(function ( event ) {
            switch( event.keyCode ) {
                case 38: /*up*/
                case 87: /*W*/ self.trigger("moveForward"); break;
                case 37: /*left*/
                case 65: /*A*/ self.trigger("moveLeft"); break;
                case 40: /*down*/
                case 83: /*S*/ self.trigger("moveBackward"); break;
                case 39: /*right*/
                case 68: /*D*/ self.trigger("moveRight"); break;
                // turning
                case 69: /*E*/ self.trigger("turnRight"); break;
                case 81: /*Q*/ self.trigger("turnLeft"); break;
                default: /*self.locked = false;*/
            }
        });        
    }
    
    MAZE.Controls.prototype = {

    };
    
    _.extend(MAZE.Controls.prototype, MAZE.EventBroker.prototype);
    
   
}(jQuery, this));