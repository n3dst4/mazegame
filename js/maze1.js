(function(){
    
    var i,j,
        WIDTH = 640,
        HEIGHT = 480,
        VIEW_ANGLE = 90,
        ASPECT = WIDTH/HEIGHT,
        NEAR = 0.1,
        FAR = 10000,
        CUBE_SCALE = 72;
        container = $('#container'),
        renderer = new THREE.WebGLRenderer({antialias: true}),
        //renderer = new THREE.CanvasRenderer(),
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE, ASPECT, NEAR, FAR),
        scene = new THREE.Scene(),
        pointLight = new THREE.PointLight(0xFFFFFF),
        material = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
        
    var controls;
        
        
    var textMap = [
        "################",
        "#     #        #",
        "#     #   #    #",
        "#         ######",
        "### ####       #",
        "#      #    #  #",
        "#  O   #    #  #",
        "########   ##  #",
        "#        #  #  #",
        "# #### # ## #  #",
        "# #    #  # #  #",
        "# ######### #  #",
        "#           #  #",
        "# #### #### ####",
        "#A#      #     #",
        "################",
    ];
    
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
        return _.map(row.split(""), function(cell, cellIndex) {
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
                    new THREE.CubeGeometry( scale, scale, scale, 1, 1, 1),
                    material);
                cube.position.x = (x * scale) - (scale/2);
                cube.position.y = (y * scale) - (scale/2);
                cube.position.z = (scale/2);
                scene.add(cube);
            }
        }
    }
    
    mapToScene(map, scene, CUBE_SCALE);
    
    camera.position.x = map.startCell.position.x*CUBE_SCALE + (CUBE_SCALE/2);
    camera.position.y = map.startCell.position.y*CUBE_SCALE + (CUBE_SCALE/2);
    camera.position.z = (CUBE_SCALE/2);
    
    //camera.rotation = new THREE.Vector3(1, 1, 1);
    camera.up = new THREE.Vector3( 0, 0, 1 );
    
    
    camera.lookAt({
        x: camera.position.x,
        y: camera.position.y - CUBE_SCALE,
        z: camera.position.z
    });
    
        
        
    //camera.position.z = 300;
    scene.add(camera);
    
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    scene.add(pointLight);
    
    //scene.add(sphere);

    renderer.setSize(WIDTH, HEIGHT);



    
    function render() {
        requestAnimationFrame(render);
        //camera.position.x++;
        renderer.render(scene, camera);
        //controls.update(0.2);
    }
    
    
    $(function(){
        container.append(renderer.domElement);
        //controls = new THREE.FirstPersonControls(camera, renderer.domElement);
        new SquareMovementControls(camera, renderer.domElement, CUBE_SCALE);
        //controls.movementSpeed = 72;
        //controls.lookSpeed = 0.01;
        //controls.noFly = true;
        //controls.lookVertical = true;        
        render();
    });
    
}());


function SquareMovementControls(cam, element, scale) {
    var self = this;
    $(document).keydown(function ( event ) {
		switch( event.keyCode ) {
			case 38: /*up*/
			case 87: /*W*/ self.moveForward(); break;
			case 37: /*left*/
			case 65: /*A*/ self.moveLeft(); break;
			case 40: /*down*/
			case 83: /*S*/ self.moveBackward(); break;
			case 39: /*right*/
			case 68: /*D*/ self.moveRight(); break;
            // turning
			case 69: /*E*/ self.turnRight(); break;
			case 81: /*Q*/ self.turnLeft(); break;
		}
        console.log ("cam x " + cam.position.x +
                     " y " + cam.position.y +
                     " z " + cam.position.z );
        
	});
    
    this.moveForward = function() {
        cam.translateZ(-scale);
    };
    
    this.moveBackward = function() {
        cam.translateZ(scale);        
    };
    
    this.moveLeft = function() {
        cam.translateX(-scale);        
    };
    
    this.moveRight = function() {
        cam.translateX(scale);        
    };
    
    this.turnLeft = function() {
        cam.rotation.y -= Math.PI / 2;
    };

    this.turnRight = function() {
        cam.rotation.y += Math.PI / 2;        
    };
    
}















