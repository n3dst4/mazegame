(function(){

var map;

module("MAZE.StringMap", {
    setup: function(){
        this.map = new MAZE.StringMap([
            "#######",
            "#A   O#",
            "#######"
        ]);
    },
    tearDown: function(){}
});

test("is correct layout", function(){
    ok(this.map.getCellAt(0,0).isBlocked, "0,0 is blocked");
    ok(this.map.startCell !== undefined, "it has a start cell");
    ok(this.map.exitCell !== undefined, "it has an exit cell");
});

test("can only have one start and exit", function(){
    raises(function(){ new MAZE.StringMap([" "]); }, "map ' '");
    raises(function(){ new MAZE.StringMap(["A"]); }, "map 'A'");
    raises(function(){ new MAZE.StringMap(["O"]); }, "map 'O'");
    raises(function(){ new MAZE.StringMap(["AAO"]); }, "map 'AAO'");
    raises(function(){ new MAZE.StringMap(["AOO"]); }, "map 'AOO'");
});

asyncTest("can add a player, and that player will trigger a win", function() {
    var player = {};
    this.map.addPlayer(player);
    this.map.bind("win", function(){
        ok(true, "Map was won");
        start();
    });
    this.map.exitCell.accept(player);
});

asyncTest("non-player objects will not trigger a win", function() {
    var monster = {};
    this.map.bind("win", function(){
        ok(false, "Map should not have been won")
    });
    this.map.exitCell.accept(monster);
    setTimeout(function(){
        setTimeout(function(){
            ok(true,"starting")
            start();
        }, 0);
    }, 0);
});


}());












