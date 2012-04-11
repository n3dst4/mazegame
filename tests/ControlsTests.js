(function(){

var el, controls,
    // borrowed from https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js
    keyCode = {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38,
        A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74,
        K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
        U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90
	};

module("MAZE.Controls", {
    setup: function(){
        el = $("<div></div>").appendTo("body");
        controls = new MAZE.Controls(el);
    },
    tearDown: function(){
        el.remove();
    }
});

test("events fire appropriately", 16, function(){
    var event,
        expectations = {
            "moveForward": 2,
            "moveBackward": 2,
            "moveLeft": 2,
            "moveRight": 2,
            "turnLeft": 1,
            "turnRight": 1,
        };
    
    for (event in expectations) {
        (function(event){
            controls.bind(event, function(){
                expectations[event]--;
                ok(expectations[event] >= 0, event + " triggered");
            });
        }(event));
    }
    
    el.simulate( "keydown", { keyCode: keyCode.UP  } );
    el.simulate( "keydown", { keyCode: keyCode.DOWN  } );
    el.simulate( "keydown", { keyCode: keyCode.LEFT  } );
    el.simulate( "keydown", { keyCode: keyCode.RIGHT  } );
    el.simulate( "keydown", { keyCode: keyCode.W  } );
    el.simulate( "keydown", { keyCode: keyCode.A } );
    el.simulate( "keydown", { keyCode: keyCode.S } );
    el.simulate( "keydown", { keyCode: keyCode.D } );
    el.simulate( "keydown", { keyCode: keyCode.E  } );
    el.simulate( "keydown", { keyCode: keyCode.Q  } );
    
    for (event in expectations) {
        equal(expectations[event], 0,
            event + " has been trigged the right number of times");
    }    
});


}());




















