(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {},
        cells = MAZE.cells = MAZE.cells || {};
        
    // Cell prototype
    cells.Cell = function (x, y) {
        this.position = {x: x, y: y};
    }
    cells.Cell.prototype = {
        isBlocked: false,
        canAccept: function (actor) {
            return ! this.isBlocked;
        }
    };
    
    
    // Generic empty cell
    cells.EmptyCell = function () {
        cells.Cell.apply(this, arguments);
    };
    cells.EmptyCell.prototype = new cells.Cell();
    
    
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
    cells.StartCell.prototype = new cells.Cell();

    
    // Player exit
    cells.ExitCell = function () {
        cells.Cell.apply(this, arguments);
        this.isExitPoint = true;
    };    
    cells.ExitCell.prototype = new cells.Cell();
    cells.ExitCell.prototype.canAccept = function (actor) {
        alert("Woohoo!");
        return cells.Cell.prototype.canAccept.apply(this, arguments);
    };
    
    
}(jQuery, this));    