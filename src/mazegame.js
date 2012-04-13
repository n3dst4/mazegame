(function($, global){
    "use strict";
    var i,j, mapScene, playerCamera, controls,
        WIDTH = 624,
        HEIGHT = 480,
        VIEW_ANGLE = 55,
        ASPECT = WIDTH/(HEIGHT),
        CUBE_SCALE = 144,
        NEAR = 0.1,
        FAR = CUBE_SCALE * 100,
        EYE_LEVEL = CUBE_SCALE/2,
        LIGHT_RANGE = 7 * CUBE_SCALE,
        MOVE_SPEED = 200,
        HEAD_TILT_DOWN = 0,//-Math.PI*(20/360),
        container = $('#container'),
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setSize(WIDTH, HEIGHT);

    function createMap () {
        if (controls) controls.destroy();
        var map = new MAZE.StringMap([
            // dots are ignored, they make map look square in dejavu sans mono
            /* 21 */ "#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#",
            /* 20 */ "#. . . . . .#. . . . . . . . . .#",
            /* 19 */ "#. . . . . . . . . . . .#. . . .#",
            /* 18 */ "#. . . . . .#. . . . . .#. . . .#",
            /* 17 */ "#. . . . . .#.#.#. .#.#.#.#.#.#.#",
            /* 16 */ "#.#.#. .#.#.#. . . . . . . . . .#",
            /* 15 */ "#. . . . . .#. . . . . . . . . .#",
            /* 14 */ "#. . . . . .#. . . . . . . . . .#",
            /* 13 */ "#. . . . . .#. . . . . . . . . .#",
            /* 12 */ "#. . .O. . .#. . . . . . . . . .#",
            /* 11 */ "#.#.#.#.#.#.#.#. .#.#.#.#.#. .#.#",
            /* 10 */ "#. . . . . . . . . . . .#. . . .#",
            /* 09 */ "#. .#.#.#.#. .#.#. .#. .#. . . .#",
            /* 08 */ "#. .#. . . . .#. . .#. . . . . .#",
            /* 07 */ "#. .#. . . . .#. . .#. .#. . . .#",
            /* 06 */ "#. .#. .#.#.#.#. .#.#. .#. . . .#",
            /* 05 */ "#. . . . . . . . . . . .#. .  ..#",
            /* 04 */ "#. .#.#.#.#.#. .#.#.#. .#.#.#.#.#",
            /* 03 */ "#. .#. . . . . . .#. . . . . . .#",
            /* 02 */ "#.A.#. . . . . . .#. . . . . . .#",
            /* 01 */ "#. .#. . . . . . .#. . . . . . .#",
            /* 00 */ "#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#",
            /*        0 1 2 3 4 5 6 7 8 9 1 1 1 1 1 1 1*/
            /*                            0 1 2 3 4 5 6*/
        ]);
        
        map.bind("win", function(){
            alert("Well done!");
            createMap()
        });
        
        var player = new MAZE.Actor(map);
        
        controls = new MAZE.Controls(document);
        controls.bind("moveForward", player.moveForward, player);
        controls.bind("moveBackward", player.moveBackward, player);
        controls.bind("moveLeft", player.moveLeft, player);
        controls.bind("moveRight", player.moveRight, player);
        controls.bind("turnLeft", player.turnLeft, player);
        controls.bind("turnRight", player.turnRight, player);
        
        mapScene = new MAZE.MapScene(map, CUBE_SCALE);
        playerCamera = new MAZE.PlayerCamera({
            mapScene: mapScene,
            angle: VIEW_ANGLE,
            moveSpeed: MOVE_SPEED
        });
        
        player.bind("moveTo", playerCamera.moveTo, playerCamera);
        player.bind("turnTo", playerCamera.turnTo, playerCamera);
        player.bind("lurch", playerCamera.lurch, playerCamera);
    }
        
    // render loop
    function render() {
        requestAnimationFrame(render);
        renderer.render(mapScene.scene, playerCamera.camera);
        TWEEN.update();
    }
    
    // start
    $(function(){
        createMap();
        container.append(renderer.domElement);
        render();
    });
}(jQuery, this));


    














