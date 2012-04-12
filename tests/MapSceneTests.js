(function(){

var map, scene;

module("MAZE.MapScene", {
    setup: function(){
        map = new MAZE.StringMap([
            "#.#.#.#.#",
            "#. .O. .#",
            "#. . . .#",
            "#. .A. .#",
            "#.#.#.#.#",
        ]);
        //scene = new MAZE.MapScene(map);
    },
    tearDown: function(){
    }
});

test("right number of cubes", function(){
    sinon.spy(THREE, "CubeGeometry");
    var scene = new MAZE.MapScene(map);
    equal(THREE.CubeGeometry.callCount, 34);
    THREE.CubeGeometry.restore();
});


}());
