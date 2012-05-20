
(function(){

module("MAZE.MersenneTwister", {
    setup: function(){
        this.mersenne = new MAZE.MersenneTwister(1);
    },
    tearDown: function(){}
});


//TESTS
test("random()", function(){
    equal(this.mersenne.random(), 0.4170219984371215, "0.4170219984371215");
    equal(this.mersenne.random(), 0.99718480813317, "0.99718480813317");
    equal(this.mersenne.random(), 0.720324489288032, "0.720324489288032");
    equal(this.mersenne.random(), 0.9325573612004519, "0.9325573612004519");
});

test("randomInt()", function(){
    equal(this.mersenne.randomInt(11, 20), 16, "16");
    equal(this.mersenne.randomInt(11, 20), 20, "20");
    equal(this.mersenne.randomInt(11, 20), 15, "15");
    equal(this.mersenne.randomInt(11, 20), 19, "19");
});

test("genrand_int32()", function(){
    equal(this.mersenne.genrand_int32(), 1791095845, "1791095845");
    equal(this.mersenne.genrand_int32(), 4282876139, "4282876139");
    equal(this.mersenne.genrand_int32(), 3093770124, "3093770124");
    equal(this.mersenne.genrand_int32(), 4005303368, "4005303368");
});

}());