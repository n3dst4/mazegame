(function($, global){
    "use strict";
    
    var i, MAZE = global.MAZE = global.MAZE || {},
        cells = MAZE.cells = MAZE.cells || {};
        
    // Cell prototype
    // TODO: this makes all cells be able to fire events. Maybe make only the
    // relevant ones mixin EventBroker?
    cells.Cell = function (x, y) {
        MAZE.EventBroker.apply(this, arguments);
        this.position = {x: x, y: y};
    }
    cells.Cell.prototype = _.extend({}, MAZE.EventBroker.prototype, {
        isBlocked: false,
        canAccept: function (actor) {
            return ! this.isBlocked;
        }
    });
    
    
    // Generic empty cell
    cells.EmptyCell = function () {
        cells.Cell.apply(this, arguments);
        this.contents = [];
    };
    cells.EmptyCell.prototype = new cells.Cell();
    _.extend(cells.EmptyCell.prototype, {
        accept: function (actor) {
            this.contents.push(actor);
        },
        getContents: function () {
            return this.contents;
        }
        
    });
    
    
    // Walls
    cells.WallCell = function () {
        cells.Cell.apply(this, arguments);
        this.isBlocked = true;
    };
    cells.WallCell.prototype = new cells.Cell();
    
    
    // Player start
    cells.StartCell = function () {
        cells.Cell.apply(this, arguments);
        this.isStartPoint = true;
    };
    cells.StartCell.prototype = new cells.EmptyCell();

    
    // Player exit
    cells.ExitCell = function () {
        cells.Cell.apply(this, arguments);
        this.isExitPoint = true;
    };
    cells.ExitCell.prototype = new cells.EmptyCell();
    cells.ExitCell.prototype.accept = function (thing) {
        this.trigger("entered", thing);
    };
    
    
}(jQuery, this));



















