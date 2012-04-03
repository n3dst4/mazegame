(function(){
    "use strict";
    var i,j,
        WIDTH = 624,
        HEIGHT = 480,
        VIEW_ANGLE = 55,
        ASPECT = WIDTH/(HEIGHT),
        CUBE_SCALE = 144,
        NEAR = 0.1,
        FAR = CUBE_SCALE * 100,
        EYE_LEVEL = CUBE_SCALE/2,
        LIGHT_RANGE = 7 * CUBE_SCALE,
        TURN_SPEED = 200,
        HEAD_TILT_DOWN = 0,//-Math.PI*(20/360),
        container = $('#container'),
        renderer = new THREE.WebGLRenderer({antialias: true}),
        //renderer = new THREE.CanvasRenderer(),
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE, ASPECT, NEAR, FAR),
        scene = new THREE.Scene(),
        pointLight = new THREE.PointLight(0xFFFFFF, 1, LIGHT_RANGE),
        material = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture('proto_blue.png', {}, function() {})
		}),
        //material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false}),
        //material = new THREE.MeshBasicMaterial({color: 0xcccccc}),
        player = new THREE.Object3D();
        
    var controls;
        
    var textMap = [
        // dots are ignored, there to make map look square in dejavu sans mono
        /* 15 */ "#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#",
        /* 14 */ "#. . . . . . . . . . . . . . .#",
        /* 13 */ "#. . . . . . . . . . . .#. . .#",
        /* 12 */ "#. . . . . .#.#.#. .#.#.#.#.#.#",
        /* 11 */ "#.#.#. .#.#.#. . . . . . . . .#",
        /* 10 */ "#. . . . . .#. . . . . . . . .#",
        /* 09 */ "#. . .O. . .#. . . . . . . . .#",
        /* 08 */ "#.#.#.#.#.#.#.#. .#.#.#.#.#.#.#",
        /* 07 */ "#. . . . . . . . . . . .#. . .#",
        /* 06 */ "#. .#.#.#.#. .#. .#.#. .#. . .#",
        /* 05 */ "#. .#. . . . .#. . .#. . . . .#",
        /* 04 */ "#. .#.#.#.#.#.#.#.#.#. .#. . .#",
        /* 03 */ "#. . . . . . . . . . . .#. . .#",
        /* 02 */ "#. .#.#.#.#. .#.#.#.#. .#.#.#.#",
        /* 01 */ "#.A.#. . . . . . .#. . . . . .#",
        /* 00 */ "#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#",
        /*        0 1 2 3 4 5 6 7 8 9 1 1 1 1 1 1*/
        /*                            0 1 2 3 4 5*/
    ];
    textMap.reverse();
    
    var map = {
        rows: [],
        startCell: null,
        exitCell: null,
        addCell: function (x, y, type) {
            rows[y] = rows[y] || [];
            rows[y][x] = new type(x, y);
        },
        addRow: function (row) {
            var startCells = _.filter(row, function(cell) {
                    return cell.isStartPoint;
                }),
                exitCells = _.filter(row, function(cell) {
                    return cell.isExitPoint;
                });
            if (startCells.length > 0) {
                if (startCells.length > 1 || this.startCell) {
                    throw "Can only have one start cell";
                }
                this.startCell = startCells[0];
            }
            if (exitCells.length > 0) {
                if (exitCells.length > 1 || this.exitCell) {
                    throw "Can only have one exit cell";
                }
                this.exitCell = exitCells[0];
            }
            this.rows.push(row);
        },
        loadRows: function (rows) {
            this.startCell = this.exitCell = null;
            this.rows = [];
            for (var i = 0; i < rows.length; i++) {
                this.addRow(rows[i]);
            }
        }
    }
    
    function Cell(x, y) {
        this.position = {x: x, y: y};
    }
    function EmptyCell () {Cell.apply(this, arguments);};
    function WallCell () {
        Cell.apply(this, arguments);
        this.isBlocked = true;
    };
    function StartCell () {
        Cell.apply(this, arguments);
        this.isStartPoint = true;
    };
    function ExitCell () {
        Cell.apply(this, arguments);
        this.isExitPoint = true;
    };
    
    // turn textmap into an array of Cell objects
    map.loadRows(_.map(textMap, function(row, rowIndex){
        row = _.filter(row.split(''), function(cell){ return cell !== "."; });
        return _.map(row, function(cell, cellIndex) {
            var type = (cell == " ")? EmptyCell :
                    (cell == "A")? StartCell :
                    (cell == "O")? ExitCell :
                    WallCell;
            return new type(cellIndex, rowIndex);
        });
    }));
    
    function mapToScene(map, scene, scale) {
        var x, y, cube;
        for (y=0; y < map.rows.length; y++) {
            for (x=0; x < map.rows[y].length; x++) {
                if (!map.rows[y][x].isBlocked) continue;
                cube = new THREE.Mesh(
                    new THREE.CubeGeometry( scale, scale, scale, 2, 2, 2),
                    material);
                cube.position.x = (x * scale) + (scale/2);
                cube.position.y = (y * scale) + (scale/2);
                cube.position.z = (scale/2);
                scene.add(cube);
            }
        }
    }
    
    mapToScene(map, scene, CUBE_SCALE);
    
    player.position.x = map.startCell.position.x*CUBE_SCALE + (CUBE_SCALE/2);
    player.position.y = map.startCell.position.y*CUBE_SCALE + (CUBE_SCALE/2);
    player.position.z = EYE_LEVEL;
    player.up = new THREE.Vector3( 0, 0, 1 );
    player.lookAt({
        x: player.position.x,
        y: player.position.y - CUBE_SCALE,
        z: EYE_LEVEL
    });
    
    camera.position = new THREE.Vector3(0,0,CUBE_SCALE/2);
    //camera.position = new THREE.Vector3(0,0,0);
    camera.rotation = new THREE.Vector3(HEAD_TILT_DOWN,0,0);
    
    player.add(camera);
    
    //camera.setLens(20, 72);
    scene.add(player);
    
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 16), material);
    sphere.translateY(-CUBE_SCALE/2);
    player.add(sphere);
    
    pointLight.position = new THREE.Vector3(0,0,0);
    player.add(pointLight);
    
    renderer.setSize(WIDTH, HEIGHT);


    //TWEEN.start();
    
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        TWEEN.update();
    }
    
    // thx to http://nooshu.com/debug-axes-in-three-js
    var debugaxis = function(axisLength){
        //Shorten the vertex function
        function v(x,y,z){ 
                return new THREE.Vertex(new THREE.Vector3(x,y,z)); 
        }
        
        //Create axis (point1, point2, colour)
        function createAxis(p1, p2, color){
                var line, lineGeometry = new THREE.Geometry(),
                lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 10});
                lineGeometry.vertices.push(p1, p2);
                line = new THREE.Line(lineGeometry, lineMat);
                scene.add(line);
        }
        
        //createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
        //createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
        //createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
        createAxis(v(0, 0, 0), v(axisLength, 0, 0), 0xFF0000);
        createAxis(v(0, 0, 0), v(0, axisLength, 0), 0x00FF00);
        createAxis(v(0, 0, 0), v(0, 0, axisLength), 0x0000FF);
    };
    //To use enter the axis length
    debugaxis(100);
        
    
    $(function(){
        container.append(renderer.domElement);
        new SquareMovementControls(player, renderer.domElement, CUBE_SCALE, TURN_SPEED);
        render();
        
    });
    
}());


function SquareMovementControls(cam, element, scale, turnSpeed) {
    var self = this,
        lock = false;
    $(document).keydown(function ( event ) {
        if (lock) return;
        lock = true;
		switch( event.keyCode ) {
			case 38: /*up*/
			case 87: /*W*/ moveForward(); break;
			case 37: /*left*/
			case 65: /*A*/ moveLeft(); break;
			case 40: /*down*/
			case 83: /*S*/ moveBackward(); break;
			case 39: /*right*/
			case 68: /*D*/ moveRight(); break;
            // turning
			case 69: /*E*/ turnRight(); break;
			case 81: /*Q*/ turnLeft(); break;
            default: lock = false;
		}
        console.log ("cam x " + cam.position.x +
                     " y " + cam.position.y +
                     " z " + cam.position.z );
        
	});
    
    function unlock () { lock = false; }
    
    function tween (a, b) {
        new TWEEN.Tween(a).to(b, turnSpeed).onComplete(unlock).start();
    }

    function move (x, y, z) {
        var axis = new THREE.Vector3(x, y, z);
        cam.matrix.rotateAxis(axis);
        var target = cam.position.clone().
            addSelf(axis.multiplyScalar(scale));
        target = {x: target.x, y: target.y, z: target.z}
        tween(cam.position, target);
    }

    function turn (delta) { tween(cam.rotation, {y: cam.rotation.y + delta}); }

    function moveForward () { move( 0, 0, -1 ); };
    
    function moveBackward () { move( 0, 0, 1 ); };
    
    function moveLeft () { move( -1, 0, 0 ); };
    
    function moveRight () { move( 1, 0, 0 ); };
    
    function turnLeft () { turn(Math.PI / 2); };

    function turnRight () { turn(-Math.PI / 2); };
    
}















