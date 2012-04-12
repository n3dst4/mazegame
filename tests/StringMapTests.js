(function(){

var map;

module("MAZE.StringMap", {
    setup: function(){
        map = new MAZE.StringMap([
            "#######",
            "#A   O#",
            "#######"
        ]);
    },
    tearDown: function(){}
});

test("map is correct layout", function(){
    ok(map.getCellAt(0,0).isBlocked, "0,0 is blocked");
    ok(map.startCell !== undefined, "it has a start cell");
    ok(map.exitCell !== undefined, "it has an exit cell");
});

test("map can only have one start and exit", function(){
    raises(function(){ new MAZE.StringMap([" "]); }, "map ' '");
    raises(function(){ new MAZE.StringMap(["A"]); }, "map 'A'");
    raises(function(){ new MAZE.StringMap(["O"]); }, "map 'O'");
    raises(function(){ new MAZE.StringMap(["AAO"]); }, "map 'AAO'");
    raises(function(){ new MAZE.StringMap(["AOO"]); }, "map 'AOO'");
});


}());
