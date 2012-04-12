(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.Map = function () {
        var i, self = this;
        this.rows = [];
        this.startCell = null;
        this.exitCell = null;
        MAZE.EventBroker.apply(this, arguments);        
    }
    
    MAZE.Map.prototype = _.extend({}, MAZE.EventBroker.prototype, {
        getCellAt: function(x, y) {
            try {
                return this.rows[y][x]; //  grrr, row *then* column
            }
            catch (e){
                return null;
            }
        }
    });    
    
}(jQuery, this));