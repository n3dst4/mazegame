(function(){

var actor;

module("MAZE.Actor", {
    setup: function(){
        actor = new MAZE.Actor(new MAZE.StringMap([
            "#.#.#.#.#",
            "#. .O. .#",
            "#. . . .#",
            "#. .A. .#",
            "#.#.#.#.#",
        ]));
    },
    tearDown: function(){}
});

test("orthogonal movement", 4, function(){
    var expectedCoords;
    actor.bind("moveTo", function(x, y, onComplete) {
        ok(expectedCoords.x === x && expectedCoords.y === y, "right coordinates");
        onComplete();
    });
    expectedCoords = {x: 2, y: 2};
    actor.moveForward();
    expectedCoords = {x: 3, y: 2};
    actor.moveRight();
    expectedCoords = {x: 3, y: 1};
    actor.moveBackward();
    expectedCoords = {x: 2, y: 1};
    actor.moveLeft();
});

test("turning", 8, function(){
    var expectedFacing;
    actor.bind("turnTo", function(facing, onComplete) {
        ok(expectedFacing.x ===  facing.x && expectedFacing.y === facing.y,
           "right facing");
        onComplete();
    });
    expectedFacing = {x:1, y:0};
    actor.turnRight();
    expectedFacing = {x:0, y:-1};
    actor.turnRight();
    expectedFacing = {x:-1, y:0};
    actor.turnRight();
    expectedFacing = {x:0, y:1};
    actor.turnRight();

    expectedFacing = {x:-1, y:0};
    actor.turnLeft();
    expectedFacing = {x:0, y:-1};
    actor.turnLeft();
    expectedFacing = {x:1, y:0};
    actor.turnLeft();
    expectedFacing = {x:0, y:1};
    actor.turnLeft();
});

}());


















