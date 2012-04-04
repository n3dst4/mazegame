(function($, global){
    var i, MAZE = global.MAZE = global.MAZE || {};
        
    MAZE.createCallbacks = function (target, topics) {
        for (i = 0; i < topics.length; i++) {
            (function(){
                var topic = topics[i];
                target[topic] = function (callback) {
                    var i;
                    if (callback) {
                        if (!this.callbacks[topic]) this.callbacks[topic] = [];
                        this.callbacks[topic].push(callback);
                    }
                    else {
                        if (this.callbacks[topic]) {
                            for (i = 0; i < this.callbacks[topic].length; i++) {
                                this.callbacks[topic][i]();
                            }
                        }
                    }
                };
            }());
        }
    }
    
    
}(jQuery, this));    