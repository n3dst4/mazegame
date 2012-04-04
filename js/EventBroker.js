(function($, global){

    var undef = "undefined";
    var i, MAZE = global.MAZE = global.MAZE || {};
    
    
    var EventBroker = MAZE.EventBroker = function () {
        this._registry = {};
        this._latches = {};
        this._latchArgs = {};
    };
    
    
    EventBroker.prototype = {
    
        
        /**
         * Bind callback to eventName. Whenever eventName is triggered, callback
         * will be called.
         */
        bind: function (eventName, callback, context) {
            if (typeof(this._registry[eventName]) === undef) {
                this._registry[eventName] = [];
            }
            // arguments 1+ can be sent straight to _.bind
            var bindArgs = Array.prototype.slice.call(arguments, 1);
            callback = _.bind.apply(_, bindArgs);
            this._registry[eventName].push(callback);
            return this;
        },
        
        
        
        /**
         * Bind callback to eventName, and also execute it if eventName has already
         * been triggered. Whenever eventName is triggered, callback will be called.
         */
        when: function (eventName, callback) {
            var self = this,
                ret = this.bind.apply(this, arguments);
                
            if (this._latches[eventName]) {
                setTimeout(function(){
                    callback.apply(global, self._latchArgs[eventName]);
                }, 0);
            }
            return ret;
        },
        
        
        
        /**
         * Bind callback to eventName. The next time eventName is triggered,
         * callback will be called. It will then be unbound.
         */
        once: function (eventName, callback) {
            return this.bind(eventName, this._makeWrapper(eventName, callback));
        },
    
        
        
        /**
         * Bind callback to eventName. The next time eventName is triggered,
         * callback will be called. It will then be unbound.
         */
        onceWhen: function (eventName, callback) {
            return this.when(eventName, this._makeWrapper(eventName, callback));
        },
        
        
        
        /**
         * Detach a callback from an event name. Alternatively, specifying just
         * an event name will remove all callbacks from that event, or specifying
         * just a callback will remove that callback from any events to which it is
         * attached.
         */
        unbind: function (eventName, callback) {
            var i, e, callbacks = this._registry[eventName];
            if (arguments.length === 1) {
                if (typeof(eventName) === "string") {
                    this._registry[eventName] = [];
                }
                else if (typeof(eventName) === "Function") {
                    for (e in this._registry) {
                        this.unbind(e, callback);
                    }
                }
            }
            else if (arguments.length === 2) {
                if (typeof(callbacks) === undef) return;
                for (i = callbacks.length - 1; i >= 0; i--) {
                    if (callbacks[i]  ===  callback || (callbacks[i].wrappee === callback)) {
                        callbacks.splice(i, 1);
                    }
                }
            }
            else {
                throw {
                    name: "Invalid arguments", 
                    description: "Invalid arguments passed to Fsi.EventRegistry unbind",
                    argumentsSupplied: arguments
                };
            }
            return this;
        },
        
        
        
        /**
         * Fire an event. Any arguments after the first (the event name) will be
         * passed on to callbacks verbatim.
         */
        trigger: function (eventName) {
            var i, 
                callbacks = this._registry[eventName],
                args = Array.prototype.slice.call(arguments, 1);
            
            if ( ! this._latches[eventName]) {
                this._latches[eventName] = true;
                this._latchArgs[eventName] = args;
            }
            
            if (typeof(callbacks) === undef) return this;
            
            setTimeout(function(){
                for (i = 0; i < callbacks.length; i++) {
                    callbacks[i].apply(global, args);
                }
            }, 0);
            return this;
        },
        
        
        
        /*
         * Create a wrapper around a callback
         */
        _makeWrapper: function (eventName, callback) {
            var self = this,
                wrapper = function(){
                    self.unbind(eventName, wrapper);
                    return callback.apply(this, arguments);
                };
            wrapper.wrappee = callback;
            return wrapper;    
        }
    };
}(jQuery, this));




















