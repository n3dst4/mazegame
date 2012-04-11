(function(){

var map;

module("MAZE.Map", {
    setup: function(){
        map = new MockMap();
    },
    tearDown: function(){}
});

// MOCKS
function MockCell (name) {
    var i,
        self = this,
        methods = ["canAccept", "accept"];
    this.calls = {};
    this.name = name;
    for (i=0; i<methods.length; i++) {
        (function(method){
            self.calls[method] = 0;
            self[method] = function () {
                self.calls[method]++;
            }
        }(methods[i]));
    }
}

function MockMap() {
    MAZE.Map.apply(this);
    this.rows = [
        [new MockCell("a"), new MockCell("b")],
        [new MockCell("c"), new MockCell("d")]
    ];
}
MockMap.prototype = _.extend({}, MAZE.Map.prototype);


//TESTS
test("getCellAt", function(){
    equal(map.getCellAt(0, 0).name, "a", "right cell returned");
});


}());
