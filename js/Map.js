(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    
    MAZE.Map = function (strings) {
        var i, self = this;
        this.rows = [];
        this.startCell = null;
        this.exitCell = null;

    }
    
    MAZE.Map.prototype = {
        getCellAt: function(x, y) {
            try {
                return this.rows[y][x]; //  grrr, row *then* column
            }
            catch (e){
                return null;
            }
        }
        
        
    };
    
    
}(jQuery, this));