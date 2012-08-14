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
    var rows = [
        [new MockCell("a"), new MockCell("b")],
        [new MockCell("c"), new MockCell("d")]
    ];
    this.cols = _.map(_.range(rows[0].length), function(i){
        return _.map(rows, function(row){ return row[i]; });
    });        
}
MockMap.prototype = _.extend({}, MAZE.Map.prototype);


//TESTS
test("getCellAt", function(){
    equal(map.getCellAt(0, 0).name, "a", "right cell returned");
    equal(map.getCellAt(1, 0).name, "b", "right cell returned");
    equal(map.getCellAt(0, 1).name, "c", "right cell returned");
    equal(map.getCellAt(1, 1).name, "d", "right cell returned");
});


}());
