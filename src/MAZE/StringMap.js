(function($, global){
    "use strict";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    MAZE.StringMap = function (strings) {
        var i, self = this;
        
        MAZE.Map.call(this);
        
        strings = $.merge([], strings);
        strings.reverse();
        
        this.players = [];
        
        // turn array of strings into array of arrays of Cell objects
        var rows = _.map(strings, function(row, rowIndex){
            row = _.filter(row.split(''), function(cell){ return cell !== "."; });
            return _.map(row, function(cell, cellIndex) {
                var type = (cell == " ")? "EmptyCell" :
                        (cell == "A")? "StartCell" :
                        (cell == "O")? "ExitCell" :
                        "WallCell";
                return new MAZE.cells[type](cellIndex, rowIndex);
            });
        })        
        
        // hunt out all the start and exit cells (should be 1 of each)
        var allCells = _.flatten(rows);
        var startCells = _.filter(allCells, function(cell){
            return cell.isStartPoint;
        });
        var exitCells = _.filter(allCells, function(cell){
            return cell.isExitPoint;
        });
        
        // check quantities of start and exit cells
        if (startCells.length === 0) {
            throw "Must have a start cell";
        }
        else {
            if (startCells.length > 1) {
                throw "Can only have one start cell";
            }
            this.startCell = startCells[0];
        }
        if (exitCells.length === 0) {
            throw "Must have an exit cell";
        }
        else {
            if (exitCells.length > 1 || self.exitCell) {
                throw "Can only have one exit cell";
            }
            this.exitCell = exitCells[0];
        }
        
        exitCells[0].bind("entered", function(thing) {
            var isPlayer = _.any(self.players, function(player){
                return player === thing;
            });
            if (isPlayer) {
                self.trigger("win");
            }
        });
        
        // we're good to go
        this.rows = rows;
    }
    
    MAZE.StringMap.prototype = new MAZE.Map();

    MAZE.StringMap.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    
}(jQuery, this));




















