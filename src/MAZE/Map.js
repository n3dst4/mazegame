(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.Map = function () {
        var i, self = this;
        this.cols = [];
        this.startCell = null;
        this.exitCell = null;
        this.players = [];        
        MAZE.EventBroker.apply(this, arguments);        
    }
    
    MAZE.Map.prototype = _.extend({}, MAZE.EventBroker.prototype, {
        getCellAt: function(x, y) {
            try {
                return this.cols[x][y];
            }
            catch (e){
                return null;
            }
        },
        
        addPlayer: function (player) {
            this.players.push(player);
        }        
    });
    
}(jQuery, this));