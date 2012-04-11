
(function(){

var broker;

module("MAZE.EventBroker", {setup: function(){ broker = new MAZE.EventBroker; }});

test("MAZE.EventsBroker exists", function () {
    expect(1);
    ok( MAZE.EventBroker, "exists");
});


asyncTest("trigger(eventName)", function () {
    var testName = "test1";
    broker.bind(testName, function (data, number) {
        ok(data === "data" && number === 1, "callback called");
        start();
    })
    broker.trigger(testName, "data", 1);
});




asyncTest("unbind(eventName, callback)", 1, function () {
    var testName = "test2";
    function myCallback1 (data, number) {
        ok(false, "ths should have been unbound");
        start();
    }
    
    function myCallback2 (data, number) {
        ok(true, "callback called");
        start();
    }
    
    broker.bind(testName, myCallback1);
    broker.bind(testName, myCallback2);
    broker.unbind(testName, myCallback1);
    
    broker.trigger(testName, "data", 1);
});




asyncTest("unbind(eventName)", 1, function () {
    var testName = "test3_1",
        testName2 = "test3_2";
        
    function myCallback1 (data, number) {
        ok(false, "ths should have been unbound");
        start();
    }
    
    function myCallback2 (data, number) {
        ok(false, "ths should have been unbound");
        start();
    }

    function myCallback3 (data, number) {
        ok(true, "callback called");
        start();
    }
    
    broker.bind(testName, myCallback1);
    broker.bind(testName, myCallback2);
    broker.bind(testName2, myCallback3);
    broker.unbind(testName);
    
    broker.trigger(testName, "data", 1);
    broker.trigger(testName2, "data", 1);
});



asyncTest("when(eventName, callback)", 2, function () {
    var testName = "test4";
        
    function myCallback (secondTime) {
        ok(true, "callback called");
        if (secondTime)
            start();
        else
            broker.trigger(testName, true);
    }
    broker.trigger(testName, false);
    broker.when(testName, myCallback);
});


asyncTest("triggerSync", 2, function() {

    function callback (data, onComplete) {
        ok(true, "callback got called");
        onComplete();
    }
    
    broker.bind("event", callback);
    
    var event = broker.triggerSync("event", "data");
    event.onComplete(function(){
        ok(true, "onComplete got called");
        start();
    });
    
});




//test("once(eventName, callback)", 1, function () {
//    var testName = "test5",
//        called = false;
//        
//    function myCallback1 () {
//        if (called) {
//            ok(false, "callback1 called twice");
//        }
//        else {
//            called = true;
//            ok(true, "callback1 called once");
//        }
//    }
//    
//    function myCallback2 () {
//        start();
//    }
//
//    broker.once(testName, myCallback1);
//    broker.trigger(testName);
//    //broker.bind(testName, myCallback2);
//    //broker.trigger(testName);
//});



//asyncTest("onceWhen(eventName, callback)", 1, function () {
//    var testName = "test6",
//        called = false;
//        
//    function myCallback1 () {
//        if (called) {
//            ok(false, "callback1 called twice");
//        }
//        else {
//            called = true;
//            ok(true, "callback1 called once");
//        }
//    }
//    
//    function myCallback2 () {
//        start();
//    }
//
//    broker.trigger(testName);
//    broker.onceWhen(testName, myCallback1);
//    broker.trigger(testName);
//    broker.bind(testName, myCallback2);
//    broker.trigger(testName);
//});



/*
test("", function() {

});
*/
}());








































