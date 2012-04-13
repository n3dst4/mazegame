(function(){

module("MAZE.cells.Cell", {
    setup: function(){},
    tearDown: function(){}
});

test("if a cell is blocked, it should deny access", function(){
    var cell = new MAZE.cells.Cell();
    cell.isBlocked = true;
    ok(!cell.canAccept({}));
});

test("if a cell is not blocked, it should allow access", function(){
    var cell = new MAZE.cells.Cell();
    cell.isBlocked = false;
    ok(cell.canAccept({}));
});

test("an empty cell should be able to add objects to itself", function(){
    var cell = new MAZE.cells.EmptyCell();
    var foo = {};
    cell.accept(foo);
    equal(cell.getContents()[0], foo);
});

asyncTest("an exit cell should trigger an event when the player enters", function(){
    var cell = new MAZE.cells.ExitCell();
    var foo = {};
    cell.bind("entered", function(thing){
        equal(thing, foo);
        start();
    });
    cell.accept(foo);
});



}());
