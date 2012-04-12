(function(){
var actor, scene, map, playerCamera;

module("MAZE.PlayerCamera", {
    setup: function(){
        map = new MAZE.StringMap([
            "#.#.#.#.#",
            "#. .O. .#",
            "#. . . .#",
            "#. .A. .#",
            "#.#.#.#.#",
        ]);
        
        scene = new MAZE.MapScene(map);
        
        playerCamera = new MAZE.PlayerCamera({
            mapScene: mapScene,
            angle: 55,
            moveSpeed: 200
        });
    },
    tearDown: function(){}
});

test("untested", function(){
    
});


}());
