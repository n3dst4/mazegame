(function(){
var SCALE = 100;

TWEEN.start();
    
module("MAZE.Camera", {
    setup: function(){
        this.map = new MAZE.StringMap([
            "#.#.#.#.#",
            "#. .O. .#",
            "#. . . .#",
            "#. .A. .#",
            "#.#.#.#.#",
        ]);
        
        this.scene = new MAZE.MapScene(this.map, SCALE);
        
        this.playerCamera = new MAZE.Camera({
            mapScene: this.scene,
            angle: 55,
            moveSpeed: 200
        });
    },
    tearDown: function(){}
});


test("should start at right location", 2, function(){
    equal(this.playerCamera.dolly.position.x, SCALE * 2.5);
    equal(this.playerCamera.dolly.position.y, SCALE * 1.5);
});

asyncTest("should move forward by 100 units when moved forward", 2, function(){
    var x = this.playerCamera.dolly.position.x;
    var y = this.playerCamera.dolly.position.y;
    var self = this;
    this.playerCamera.moveTo(2, 2, function () {
        equal(self.playerCamera.dolly.position.x, x, "x position");
        equal(self.playerCamera.dolly.position.y, y + SCALE, "y position");
        start();
    });
});

asyncTest("should turn by 90 degrees when turned", 3, function(){
    var x = this.playerCamera.dolly.rotation.x;
    var y = this.playerCamera.dolly.rotation.y;
    var z = this.playerCamera.dolly.rotation.z;
    var self = this;
    this.playerCamera.turnTo({x: 1, y: 0}, function () {
        equal(self.playerCamera.dolly.rotation.x, x, "x rotation");
        equal(self.playerCamera.dolly.rotation.y, y - Math.PI/2, "y rotation");
        equal(self.playerCamera.dolly.rotation.z, z, "z rotation");
        start();
    });
});


}());





















