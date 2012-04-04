(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {},
        cells = MAZE.cells = MAZE.cells || {};
        
    cells.Cell = function (x, y) {
        this.position = {x: x, y: y};
    }
    
    cells.EmptyCell = function () {
        cells.Cell.apply(this, arguments);
    };
    
    cells.WallCell = function () {
        cells.Cell.apply(this, arguments);
        this.isBlocked = true;
    };
    
    cells.StartCell = function () {
        cells.Cell.apply(this, arguments);
        this.isStartPoint = true;
    };
    
    cells.ExitCell = function () {
        cells.Cell.apply(this, arguments);
        this.isExitPoint = true;
    };    
    
    
}(jQuery, this));    