/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      , msie: t
      , version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else result = {}

    // set webkit or gecko flag for browsers based on these engines
    if (/(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (android || result.silk) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')


  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   3.0.18
 */

(function() {
    "use strict";
    function lib$rsvp$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$rsvp$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$rsvp$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$rsvp$utils$$_isArray;
    if (!Array.isArray) {
      lib$rsvp$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$rsvp$utils$$_isArray = Array.isArray;
    }

    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray;

    var lib$rsvp$utils$$now = Date.now || function() { return new Date().getTime(); };

    function lib$rsvp$utils$$F() { }

    var lib$rsvp$utils$$o_create = (Object.create || function (o) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (typeof o !== 'object') {
        throw new TypeError('Argument must be an object');
      }
      lib$rsvp$utils$$F.prototype = o;
      return new lib$rsvp$utils$$F();
    });
    function lib$rsvp$events$$indexOf(callbacks, callback) {
      for (var i=0, l=callbacks.length; i<l; i++) {
        if (callbacks[i] === callback) { return i; }
      }

      return -1;
    }

    function lib$rsvp$events$$callbacksFor(object) {
      var callbacks = object._promiseCallbacks;

      if (!callbacks) {
        callbacks = object._promiseCallbacks = {};
      }

      return callbacks;
    }

    var lib$rsvp$events$$default = {

      /**
        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
        Example:

        ```javascript
        var object = {};

        RSVP.EventTarget.mixin(object);

        object.on('finished', function(event) {
          // handle event
        });

        object.trigger('finished', { detail: value });
        ```

        `EventTarget.mixin` also works with prototypes:

        ```javascript
        var Person = function() {};
        RSVP.EventTarget.mixin(Person.prototype);

        var yehuda = new Person();
        var tom = new Person();

        yehuda.on('poke', function(event) {
          console.log('Yehuda says OW');
        });

        tom.on('poke', function(event) {
          console.log('Tom says OW');
        });

        yehuda.trigger('poke');
        tom.trigger('poke');
        ```

        @method mixin
        @for RSVP.EventTarget
        @private
        @param {Object} object object to extend with EventTarget methods
      */
      'mixin': function(object) {
        object['on']      = this['on'];
        object['off']     = this['off'];
        object['trigger'] = this['trigger'];
        object._promiseCallbacks = undefined;
        return object;
      },

      /**
        Registers a callback to be executed when `eventName` is triggered

        ```javascript
        object.on('event', function(eventInfo){
          // handle the event
        });

        object.trigger('event');
        ```

        @method on
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to listen for
        @param {Function} callback function to be called when the event is triggered.
      */
      'on': function(eventName, callback) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks;

        callbacks = allCallbacks[eventName];

        if (!callbacks) {
          callbacks = allCallbacks[eventName] = [];
        }

        if (lib$rsvp$events$$indexOf(callbacks, callback) === -1) {
          callbacks.push(callback);
        }
      },

      /**
        You can use `off` to stop firing a particular callback for an event:

        ```javascript
        function doStuff() { // do stuff! }
        object.on('stuff', doStuff);

        object.trigger('stuff'); // doStuff will be called

        // Unregister ONLY the doStuff callback
        object.off('stuff', doStuff);
        object.trigger('stuff'); // doStuff will NOT be called
        ```

        If you don't pass a `callback` argument to `off`, ALL callbacks for the
        event will not be executed when the event fires. For example:

        ```javascript
        var callback1 = function(){};
        var callback2 = function(){};

        object.on('stuff', callback1);
        object.on('stuff', callback2);

        object.trigger('stuff'); // callback1 and callback2 will be executed.

        object.off('stuff');
        object.trigger('stuff'); // callback1 and callback2 will not be executed!
        ```

        @method off
        @for RSVP.EventTarget
        @private
        @param {String} eventName event to stop listening to
        @param {Function} callback optional argument. If given, only the function
        given will be removed from the event's callback queue. If no `callback`
        argument is given, all callbacks will be removed from the event's callback
        queue.
      */
      'off': function(eventName, callback) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, index;

        if (!callback) {
          allCallbacks[eventName] = [];
          return;
        }

        callbacks = allCallbacks[eventName];

        index = lib$rsvp$events$$indexOf(callbacks, callback);

        if (index !== -1) { callbacks.splice(index, 1); }
      },

      /**
        Use `trigger` to fire custom events. For example:

        ```javascript
        object.on('foo', function(){
          console.log('foo event happened!');
        });
        object.trigger('foo');
        // 'foo event happened!' logged to the console
        ```

        You can also pass a value as a second argument to `trigger` that will be
        passed as an argument to all event listeners for the event:

        ```javascript
        object.on('foo', function(value){
          console.log(value.name);
        });

        object.trigger('foo', { name: 'bar' });
        // 'bar' logged to the console
        ```

        @method trigger
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to be triggered
        @param {Any} options optional value to be passed to any event handlers for
        the given `eventName`
      */
      'trigger': function(eventName, options) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, callback;

        if (callbacks = allCallbacks[eventName]) {
          // Don't cache the callbacks.length since it may grow
          for (var i=0; i<callbacks.length; i++) {
            callback = callbacks[i];

            callback(options);
          }
        }
      }
    };

    var lib$rsvp$config$$config = {
      instrument: false
    };

    lib$rsvp$events$$default['mixin'](lib$rsvp$config$$config);

    function lib$rsvp$config$$configure(name, value) {
      if (name === 'onerror') {
        // handle for legacy users that expect the actual
        // error to be passed to their function added via
        // `RSVP.configure('onerror', someFunctionHere);`
        lib$rsvp$config$$config['on']('error', value);
        return;
      }

      if (arguments.length === 2) {
        lib$rsvp$config$$config[name] = value;
      } else {
        return lib$rsvp$config$$config[name];
      }
    }

    var lib$rsvp$instrument$$queue = [];

    function lib$rsvp$instrument$$scheduleFlush() {
      setTimeout(function() {
        var entry;
        for (var i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
          entry = lib$rsvp$instrument$$queue[i];

          var payload = entry.payload;

          payload.guid = payload.key + payload.id;
          payload.childGuid = payload.key + payload.childId;
          if (payload.error) {
            payload.stack = payload.error.stack;
          }

          lib$rsvp$config$$config['trigger'](entry.name, entry.payload);
        }
        lib$rsvp$instrument$$queue.length = 0;
      }, 50);
    }

    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
      if (1 === lib$rsvp$instrument$$queue.push({
          name: eventName,
          payload: {
            key: promise._guidKey,
            id:  promise._id,
            eventName: eventName,
            detail: promise._result,
            childId: child && child._id,
            label: promise._label,
            timeStamp: lib$rsvp$utils$$now(),
            error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
          }})) {
            lib$rsvp$instrument$$scheduleFlush();
          }
      }
    var lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument;

    function  lib$rsvp$$internal$$withOwnPromise() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$rsvp$$internal$$noop() {}

    var lib$rsvp$$internal$$PENDING   = void 0;
    var lib$rsvp$$internal$$FULFILLED = 1;
    var lib$rsvp$$internal$$REJECTED  = 2;

    var lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$rsvp$$internal$$GET_THEN_ERROR.error = error;
        return lib$rsvp$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
      lib$rsvp$config$$config.async(function(promise) {
        var sealed = false;
        var error = lib$rsvp$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$rsvp$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$rsvp$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$rsvp$$internal$$REJECTED) {
        thenable._onError = null;
        lib$rsvp$$internal$$reject(promise, thenable._result);
      } else {
        lib$rsvp$$internal$$subscribe(thenable, undefined, function(value) {
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          lib$rsvp$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = lib$rsvp$$internal$$getThen(maybeThenable);

        if (then === lib$rsvp$$internal$$GET_THEN_ERROR) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$rsvp$utils$$isFunction(then)) {
          lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$rsvp$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (lib$rsvp$utils$$objectOrFunction(value)) {
        lib$rsvp$$internal$$handleMaybeThenable(promise, value);
      } else {
        lib$rsvp$$internal$$fulfill(promise, value);
      }
    }

    function lib$rsvp$$internal$$publishRejection(promise) {
      if (promise._onError) {
        promise._onError(promise._result);
      }

      lib$rsvp$$internal$$publish(promise);
    }

    function lib$rsvp$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$rsvp$$internal$$FULFILLED;

      if (promise._subscribers.length === 0) {
        if (lib$rsvp$config$$config.instrument) {
          lib$rsvp$instrument$$default('fulfilled', promise);
        }
      } else {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise);
      }
    }

    function lib$rsvp$$internal$$reject(promise, reason) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
      promise._state = lib$rsvp$$internal$$REJECTED;
      promise._result = reason;
      lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise);
    }

    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onError = null;

      subscribers[length] = child;
      subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$rsvp$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent);
      }
    }

    function lib$rsvp$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (lib$rsvp$config$$config.instrument) {
        lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
      }

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$rsvp$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$rsvp$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$rsvp$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$rsvp$$internal$$tryCatch(callback, detail);

        if (value === lib$rsvp$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$rsvp$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$rsvp$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$rsvp$$internal$$reject(promise, error);
      } else if (settled === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (settled === lib$rsvp$$internal$$REJECTED) {
        lib$rsvp$$internal$$reject(promise, value);
      }
    }

    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
      var resolved = false;
      try {
        resolver(function resolvePromise(value){
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$rsvp$$internal$$reject(promise, e);
      }
    }

    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
      if (state === lib$rsvp$$internal$$FULFILLED) {
        return {
          state: 'fulfilled',
          value: value
        };
      } else {
        return {
          state: 'rejected',
          reason: value
        };
      }
    }

    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(lib$rsvp$$internal$$noop, label);
      this._abortOnReject = abortOnReject;

      if (this._validateInput(input)) {
        this._input     = input;
        this.length     = input.length;
        this._remaining = input.length;

        this._init();

        if (this.length === 0) {
          lib$rsvp$$internal$$fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            lib$rsvp$$internal$$fulfill(this.promise, this._result);
          }
        }
      } else {
        lib$rsvp$$internal$$reject(this.promise, this._validationError());
      }
    }

    var lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;

    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$rsvp$utils$$isArray(input);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$rsvp$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function() {
      var length  = this.length;
      var promise = this.promise;
      var input   = this._input;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var c = this._instanceConstructor;
      if (lib$rsvp$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== lib$rsvp$$internal$$PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result);
        } else {
          this._willSettleAt(c.resolve(entry), i);
        }
      } else {
        this._remaining--;
        this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var promise = this.promise;

      if (promise._state === lib$rsvp$$internal$$PENDING) {
        this._remaining--;

        if (this._abortOnReject && state === lib$rsvp$$internal$$REJECTED) {
          lib$rsvp$$internal$$reject(promise, value);
        } else {
          this._result[i] = this._makeResult(state, i, value);
        }
      }

      if (this._remaining === 0) {
        lib$rsvp$$internal$$fulfill(promise, this._result);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
      return value;
    };

    lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$rsvp$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason);
      });
    };
    function lib$rsvp$promise$all$$all(entries, label) {
      return new lib$rsvp$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
    }
    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all;
    function lib$rsvp$promise$race$$race(entries, label) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);

      if (!lib$rsvp$utils$$isArray(entries)) {
        lib$rsvp$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$rsvp$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$rsvp$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race;
    function lib$rsvp$promise$resolve$$resolve(object, label) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve;
    function lib$rsvp$promise$reject$$reject(reason, label) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject;

    var lib$rsvp$promise$$guidKey = 'rsvp_' + lib$rsvp$utils$$now() + '-';
    var lib$rsvp$promise$$counter = 0;

    function lib$rsvp$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$rsvp$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise’s eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class RSVP.Promise
      @param {function} resolver
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @constructor
    */
    function lib$rsvp$promise$$Promise(resolver, label) {
      this._id = lib$rsvp$promise$$counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if (lib$rsvp$config$$config.instrument) {
        lib$rsvp$instrument$$default('created', this);
      }

      if (lib$rsvp$$internal$$noop !== resolver) {
        if (!lib$rsvp$utils$$isFunction(resolver)) {
          lib$rsvp$promise$$needsResolver();
        }

        if (!(this instanceof lib$rsvp$promise$$Promise)) {
          lib$rsvp$promise$$needsNew();
        }

        lib$rsvp$$internal$$initializePromise(this, resolver);
      }
    }

    var lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;

    // deprecated
    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default;
    lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default;
    lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default;

    lib$rsvp$promise$$Promise.prototype = {
      constructor: lib$rsvp$promise$$Promise,

      _guidKey: lib$rsvp$promise$$guidKey,

      _onError: function (reason) {
        lib$rsvp$config$$config.async(function(promise) {
          setTimeout(function() {
            if (promise._onError) {
              lib$rsvp$config$$config['trigger']('error', reason);
            }
          }, 0);
        }, this);
      },

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection, label) {
        var parent = this;
        var state = parent._state;

        if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection) {
          if (lib$rsvp$config$$config.instrument) {
            lib$rsvp$instrument$$default('chained', this, this);
          }
          return this;
        }

        parent._onError = null;

        var child = new this.constructor(lib$rsvp$$internal$$noop, label);
        var result = parent._result;

        if (lib$rsvp$config$$config.instrument) {
          lib$rsvp$instrument$$default('chained', parent, child);
        }

        if (state) {
          var callback = arguments[state - 1];
          lib$rsvp$config$$config.async(function(){
            lib$rsvp$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection, label) {
        return this.then(null, onRejection, label);
      },

    /**
      `finally` will be invoked regardless of the promise's fate just as native
      try/catch/finally behaves

      Synchronous example:

      ```js
      findAuthor() {
        if (Math.random() > 0.5) {
          throw new Error();
        }
        return new Author();
      }

      try {
        return findAuthor(); // succeed or fail
      } catch(error) {
        return findOtherAuther();
      } finally {
        // always runs
        // doesn't affect the return value
      }
      ```

      Asynchronous example:

      ```js
      findAuthor().catch(function(reason){
        return findOtherAuther();
      }).finally(function(){
        // author was either found, or not
      });
      ```

      @method finally
      @param {Function} callback
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'finally': function(callback, label) {
        var constructor = this.constructor;

        return this.then(function(value) {
          return constructor.resolve(callback()).then(function(){
            return value;
          });
        }, function(reason) {
          return constructor.resolve(callback()).then(function(){
            throw reason;
          });
        }, label);
      }
    };

    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
    }

    lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
    lib$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
      return new Error('allSettled must be called with an array');
    };

    function lib$rsvp$all$settled$$allSettled(entries, label) {
      return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise;
    }
    var lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled;
    function lib$rsvp$all$$all(array, label) {
      return lib$rsvp$promise$$default.all(array, label);
    }
    var lib$rsvp$all$$default = lib$rsvp$all$$all;
    var lib$rsvp$asap$$len = 0;
    var lib$rsvp$asap$$toString = {}.toString;
    var lib$rsvp$asap$$vertxNext;
    function lib$rsvp$asap$$asap(callback, arg) {
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback;
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg;
      lib$rsvp$asap$$len += 2;
      if (lib$rsvp$asap$$len === 2) {
        // If len is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        lib$rsvp$asap$$scheduleFlush();
      }
    }

    var lib$rsvp$asap$$default = lib$rsvp$asap$$asap;

    var lib$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {};
    var lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver;
    var lib$rsvp$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$rsvp$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick(lib$rsvp$asap$$flush);
      };
    }

    // vertx
    function lib$rsvp$asap$$useVertxTimer() {
      return function() {
        lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush);
      };
    }

    function lib$rsvp$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$rsvp$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$rsvp$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$rsvp$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$rsvp$asap$$flush, 1);
      };
    }

    var lib$rsvp$asap$$queue = new Array(1000);
    function lib$rsvp$asap$$flush() {
      for (var i = 0; i < lib$rsvp$asap$$len; i+=2) {
        var callback = lib$rsvp$asap$$queue[i];
        var arg = lib$rsvp$asap$$queue[i+1];

        callback(arg);

        lib$rsvp$asap$$queue[i] = undefined;
        lib$rsvp$asap$$queue[i+1] = undefined;
      }

      lib$rsvp$asap$$len = 0;
    }

    function lib$rsvp$asap$$attemptVertex() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$rsvp$asap$$useVertxTimer();
      } catch(e) {
        return lib$rsvp$asap$$useSetTimeout();
      }
    }

    var lib$rsvp$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$rsvp$asap$$isNode) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useNextTick();
    } else if (lib$rsvp$asap$$BrowserMutationObserver) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMutationObserver();
    } else if (lib$rsvp$asap$$isWorker) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMessageChannel();
    } else if (lib$rsvp$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$attemptVertex();
    } else {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useSetTimeout();
    }
    function lib$rsvp$defer$$defer(label) {
      var deferred = { };

      deferred['promise'] = new lib$rsvp$promise$$default(function(resolve, reject) {
        deferred['resolve'] = resolve;
        deferred['reject'] = reject;
      }, label);

      return deferred;
    }
    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer;
    function lib$rsvp$filter$$filter(promises, filterFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(filterFn)) {
          throw new TypeError("You must pass a function as filter's second argument.");
        }

        var length = values.length;
        var filtered = new Array(length);

        for (var i = 0; i < length; i++) {
          filtered[i] = filterFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
          var results = new Array(length);
          var newLength = 0;

          for (var i = 0; i < length; i++) {
            if (filtered[i]) {
              results[newLength] = values[i];
              newLength++;
            }
          }

          results.length = newLength;

          return results;
        });
      });
    }
    var lib$rsvp$filter$$default = lib$rsvp$filter$$filter;

    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
      this._superConstructor(Constructor, object, true, label);
    }

    var lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;

    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$promise$hash$$PromiseHash.prototype._init = function() {
      this._result = {};
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
      return input && typeof input === 'object';
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function() {
      return new Error('Promise.hash must be called with an object');
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function() {
      var promise = this.promise;
      var input   = this._input;
      var results = [];

      for (var key in input) {
        if (promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
          results.push({
            position: key,
            entry: input[key]
          });
        }
      }

      var length = results.length;
      this._remaining = length;
      var result;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        result = results[i];
        this._eachEntry(result.entry, result.position);
      }
    };

    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
      this._superConstructor(Constructor, object, false, label);
    }

    lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype);
    lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;

    lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
      return new Error('hashSettled must be called with an object');
    };

    function lib$rsvp$hash$settled$$hashSettled(object, label) {
      return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled;
    function lib$rsvp$hash$$hash(object, label) {
      return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$$default = lib$rsvp$hash$$hash;
    function lib$rsvp$map$$map(promises, mapFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(mapFn)) {
          throw new TypeError("You must pass a function as map's second argument.");
        }

        var length = values.length;
        var results = new Array(length);

        for (var i = 0; i < length; i++) {
          results[i] = mapFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(results, label);
      });
    }
    var lib$rsvp$map$$default = lib$rsvp$map$$map;

    function lib$rsvp$node$$Result() {
      this.value = undefined;
    }

    var lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result();
    var lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result();

    function lib$rsvp$node$$getThen(obj) {
      try {
       return obj.then;
      } catch(error) {
        lib$rsvp$node$$ERROR.value= error;
        return lib$rsvp$node$$ERROR;
      }
    }


    function lib$rsvp$node$$tryApply(f, s, a) {
      try {
        f.apply(s, a);
      } catch(error) {
        lib$rsvp$node$$ERROR.value = error;
        return lib$rsvp$node$$ERROR;
      }
    }

    function lib$rsvp$node$$makeObject(_, argumentNames) {
      var obj = {};
      var name;
      var i;
      var length = _.length;
      var args = new Array(length);

      for (var x = 0; x < length; x++) {
        args[x] = _[x];
      }

      for (i = 0; i < argumentNames.length; i++) {
        name = argumentNames[i];
        obj[name] = args[i + 1];
      }

      return obj;
    }

    function lib$rsvp$node$$arrayResult(_) {
      var length = _.length;
      var args = new Array(length - 1);

      for (var i = 1; i < length; i++) {
        args[i - 1] = _[i];
      }

      return args;
    }

    function lib$rsvp$node$$wrapThenable(then, promise) {
      return {
        then: function(onFulFillment, onRejection) {
          return then.call(promise, onFulFillment, onRejection);
        }
      };
    }

    function lib$rsvp$node$$denodeify(nodeFunc, options) {
      var fn = function() {
        var self = this;
        var l = arguments.length;
        var args = new Array(l + 1);
        var arg;
        var promiseInput = false;

        for (var i = 0; i < l; ++i) {
          arg = arguments[i];

          if (!promiseInput) {
            // TODO: clean this up
            promiseInput = lib$rsvp$node$$needsPromiseInput(arg);
            if (promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
              var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
              lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value);
              return p;
            } else if (promiseInput && promiseInput !== true) {
              arg = lib$rsvp$node$$wrapThenable(promiseInput, arg);
            }
          }
          args[i] = arg;
        }

        var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);

        args[l] = function(err, val) {
          if (err)
            lib$rsvp$$internal$$reject(promise, err);
          else if (options === undefined)
            lib$rsvp$$internal$$resolve(promise, val);
          else if (options === true)
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments));
          else if (lib$rsvp$utils$$isArray(options))
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options));
          else
            lib$rsvp$$internal$$resolve(promise, val);
        };

        if (promiseInput) {
          return lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
        } else {
          return lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
        }
      };

      fn.__proto__ = nodeFunc;

      return fn;
    }

    var lib$rsvp$node$$default = lib$rsvp$node$$denodeify;

    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
      var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
      if (result === lib$rsvp$node$$ERROR) {
        lib$rsvp$$internal$$reject(promise, result.value);
      }
      return promise;
    }

    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
      return lib$rsvp$promise$$default.all(args).then(function(args){
        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
        if (result === lib$rsvp$node$$ERROR) {
          lib$rsvp$$internal$$reject(promise, result.value);
        }
        return promise;
      });
    }

    function lib$rsvp$node$$needsPromiseInput(arg) {
      if (arg && typeof arg === 'object') {
        if (arg.constructor === lib$rsvp$promise$$default) {
          return true;
        } else {
          return lib$rsvp$node$$getThen(arg);
        }
      } else {
        return false;
      }
    }
    function lib$rsvp$race$$race(array, label) {
      return lib$rsvp$promise$$default.race(array, label);
    }
    var lib$rsvp$race$$default = lib$rsvp$race$$race;
    function lib$rsvp$reject$$reject(reason, label) {
      return lib$rsvp$promise$$default.reject(reason, label);
    }
    var lib$rsvp$reject$$default = lib$rsvp$reject$$reject;
    function lib$rsvp$resolve$$resolve(value, label) {
      return lib$rsvp$promise$$default.resolve(value, label);
    }
    var lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve;
    function lib$rsvp$rethrow$$rethrow(reason) {
      setTimeout(function() {
        throw reason;
      });
      throw reason;
    }
    var lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;

    // default async is asap;
    lib$rsvp$config$$config.async = lib$rsvp$asap$$default;
    var lib$rsvp$$cast = lib$rsvp$resolve$$default;
    function lib$rsvp$$async(callback, arg) {
      lib$rsvp$config$$config.async(callback, arg);
    }

    function lib$rsvp$$on() {
      lib$rsvp$config$$config['on'].apply(lib$rsvp$config$$config, arguments);
    }

    function lib$rsvp$$off() {
      lib$rsvp$config$$config['off'].apply(lib$rsvp$config$$config, arguments);
    }

    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
      var lib$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
      lib$rsvp$config$$configure('instrument', true);
      for (var lib$rsvp$$eventName in lib$rsvp$$callbacks) {
        if (lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName)) {
          lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName]);
        }
      }
    }

    var lib$rsvp$umd$$RSVP = {
      'race': lib$rsvp$race$$default,
      'Promise': lib$rsvp$promise$$default,
      'allSettled': lib$rsvp$all$settled$$default,
      'hash': lib$rsvp$hash$$default,
      'hashSettled': lib$rsvp$hash$settled$$default,
      'denodeify': lib$rsvp$node$$default,
      'on': lib$rsvp$$on,
      'off': lib$rsvp$$off,
      'map': lib$rsvp$map$$default,
      'filter': lib$rsvp$filter$$default,
      'resolve': lib$rsvp$resolve$$default,
      'reject': lib$rsvp$reject$$default,
      'all': lib$rsvp$all$$default,
      'rethrow': lib$rsvp$rethrow$$default,
      'defer': lib$rsvp$defer$$default,
      'EventTarget': lib$rsvp$events$$default,
      'configure': lib$rsvp$config$$configure,
      'async': lib$rsvp$$async
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$rsvp$umd$$RSVP; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$rsvp$umd$$RSVP;
    } else if (typeof this !== 'undefined') {
      this['RSVP'] = lib$rsvp$umd$$RSVP;
    }
}).call(this);


var wdCb;
(function (wdCb) {
    var JudgeUtils = (function () {
        function JudgeUtils() {
        }
        JudgeUtils.isArray = function (val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        };
        JudgeUtils.isFunction = function (func) {
            return Object.prototype.toString.call(func) === "[object Function]";
        };
        JudgeUtils.isNumber = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        };
        JudgeUtils.isString = function (str) {
            return Object.prototype.toString.call(str) === "[object String]";
        };
        JudgeUtils.isBoolean = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        };
        JudgeUtils.isDom = function (obj) {
            return obj instanceof HTMLElement;
        };
        /**
         * 判断是否为对象字面量（{}）
         */
        JudgeUtils.isDirectObject = function (obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }
            return false;
        };
        /**
         * 检查宿主对象是否可调用
         *
         * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
         环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

         该方法用于特性检测，判断对象是否可用。用法如下：

         MyEngine addEvent():
         if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
            dom.addEventListener(sEventType, fnHandler, false);
            }
         */
        JudgeUtils.isHostMethod = function (object, property) {
            var type = typeof object[property];
            return type === "function" ||
                (type === "object" && !!object[property]) ||
                type === "unknown";
        };
        JudgeUtils.isNodeJs = function () {
            return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
        };
        return JudgeUtils;
    })();
    wdCb.JudgeUtils = JudgeUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    Object.defineProperty(wdCb, "root", {
        get: function () {
            if (wdCb.JudgeUtils.isNodeJs()) {
                return global;
            }
            return window;
        }
    });
})(wdCb || (wdCb = {}));

var wdCb;
(function (wdCb) {
    // performance.now polyfill
    if ('performance' in wdCb.root === false) {
        wdCb.root.performance = {};
    }
    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });
    if ('now' in wdCb.root.performance === false) {
        var offset = wdCb.root.performance.timing && wdCb.root.performance.timing.navigationStart ? performance.timing.navigationStart
            : Date.now();
        wdCb.root.performance.now = function () {
            return Date.now() - offset;
        };
    }
})(wdCb || (wdCb = {}));

var wdCb;
(function (wdCb) {
    wdCb.$BREAK = {
        break: true
    };
    wdCb.$REMOVE = void 0;
})(wdCb || (wdCb = {}));

var wdCb;
(function (wdCb) {
    var Log = (function () {
        function Log() {
        }
        /**
         * Output Debug message.
         * @function
         * @param {String} message
         */
        Log.log = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i - 0] = arguments[_i];
            }
            if (!this._exec("trace", Array.prototype.slice.call(arguments, 0))) {
                if (!this._exec("log", arguments)) {
                    wdCb.root.alert(Array.prototype.slice.call(arguments, 0).join(","));
                }
            }
        };
        /**
         * 断言失败时，会提示错误信息，但程序会继续执行下去
         * 使用断言捕捉不应该发生的非法情况。不要混淆非法情况与错误情况之间的区别，后者是必然存在的并且是一定要作出处理的。
         *
         * 1）对非预期错误使用断言
         断言中的布尔表达式的反面一定要描述一个非预期错误，下面所述的在一定情况下为非预期错误的一些例子：
         （1）空指针。
         （2）输入或者输出参数的值不在预期范围内。
         （3）数组的越界。
         非预期错误对应的就是预期错误，我们通常使用错误处理代码来处理预期错误，而使用断言处理非预期错误。在代码执行过程中，有些错误永远不应该发生，这样的错误是非预期错误。断言可以被看成是一种可执行的注释，你不能依赖它来让代码正常工作（《Code Complete 2》）。例如：
         int nRes = f(); // nRes 由 f 函数控制， f 函数保证返回值一定在 -100 ~ 100
         Assert(-100 <= nRes && nRes <= 100); // 断言，一个可执行的注释
         由于 f 函数保证了返回值处于 -100 ~ 100，那么如果出现了 nRes 不在这个范围的值时，就表明一个非预期错误的出现。后面会讲到“隔栏”，那时会对断言有更加深刻的理解。
         2）不要把需要执行的代码放入断言中
         断言用于软件的开发和维护，而通常不在发行版本中包含断言。
         需要执行的代码放入断言中是不正确的，因为在发行版本中，这些代码通常不会被执行，例如：
         Assert(f()); // f 函数通常在发行版本中不会被执行
         而使用如下方法则比较安全：
         res = f();
         Assert(res); // 安全
         3）对来源于内部系统的可靠的数据使用断言，而不要对外部不可靠的数据使用断言，对于外部不可靠数据，应该使用错误处理代码。
         再次强调，把断言看成可执行的注释。
         * @param cond 如果cond返回false，则断言失败，显示message
         * @param message
         */
        Log.assert = function (cond) {
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            if (cond) {
                if (!this._exec("assert", arguments, 1)) {
                    this.log.apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
        Log.error = function (cond) {
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            if (cond) {
                /*!
                console.error will not interrupt, it will throw error and continue exec the left statements

                but here need interrupt! so not use it here.
                 */
                //if (!this._exec("error", arguments, 1)) {
                throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
            }
        };
        Log.warn = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i - 0] = arguments[_i];
            }
            var result = this._exec("warn", arguments);
            if (!result) {
                this.log.apply(this, arguments);
            }
            else {
                this._exec("trace", ["warn trace"]);
            }
        };
        Log._exec = function (consoleMethod, args, sliceBegin) {
            if (sliceBegin === void 0) { sliceBegin = 0; }
            if (wdCb.root.console && wdCb.root.console[consoleMethod]) {
                wdCb.root.console[consoleMethod].apply(wdCb.root.console, Array.prototype.slice.call(args, sliceBegin));
                return true;
            }
            return false;
        };
        Log.info = {
            INVALID_PARAM: "invalid parameter",
            ABSTRACT_ATTRIBUTE: "abstract attribute need override",
            ABSTRACT_METHOD: "abstract method need override",
            helperFunc: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var result = "";
                Array.prototype.slice.call(arguments, 0).forEach(function (val) {
                    result += String(val) + " ";
                });
                return result.slice(0, -1);
            },
            assertion: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (arguments.length === 2) {
                    return this.helperFunc(arguments[0], arguments[1]);
                }
                else if (arguments.length === 3) {
                    return this.helperFunc(arguments[1], arguments[0], arguments[2]);
                }
                else {
                    throw new Error("arguments.length must <= 3");
                }
            },
            FUNC_INVALID: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("invalid");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_BE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must be");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_NOT_BE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must not be");
                return this.assertion.apply(this, arr);
            },
            FUNC_SHOULD: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("should");
                return this.assertion.apply(this, arr);
            },
            FUNC_SHOULD_NOT: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("should not");
                return this.assertion.apply(this, arr);
            },
            FUNC_SUPPORT: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("support");
                return this.assertion.apply(this, arr);
            },
            FUNC_NOT_SUPPORT: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("not support");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_DEFINE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must define");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_NOT_DEFINE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must not define");
                return this.assertion.apply(this, arr);
            },
            FUNC_UNKNOW: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("unknow");
                return this.assertion.apply(this, arr);
            },
            FUNC_EXPECT: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("expect");
                return this.assertion.apply(this, arr);
            },
            FUNC_UNEXPECT: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("unexpect");
                return this.assertion.apply(this, arr);
            },
            FUNC_NOT_EXIST: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("not exist");
                return this.assertion.apply(this, arr);
            }
        };
        return Log;
    })();
    wdCb.Log = Log;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var List = (function () {
        function List() {
            this.children = null;
        }
        List.prototype.getCount = function () {
            return this.children.length;
        };
        List.prototype.hasChild = function (arg) {
            if (wdCb.JudgeUtils.isFunction(arguments[0])) {
                var func = arguments[0];
                return this._contain(this.children, function (c, i) {
                    return func(c, i);
                });
            }
            var child = arguments[0];
            return this._contain(this.children, function (c, i) {
                if (c === child
                    || (c.uid && child.uid && c.uid === child.uid)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        List.prototype.getChildren = function () {
            return this.children;
        };
        List.prototype.getChild = function (index) {
            return this.children[index];
        };
        List.prototype.addChild = function (child) {
            this.children.push(child);
            return this;
        };
        List.prototype.addChildren = function (arg) {
            if (wdCb.JudgeUtils.isArray(arg)) {
                var children = arg;
                this.children = this.children.concat(children);
            }
            else if (arg instanceof List) {
                var children = arg;
                this.children = this.children.concat(children.getChildren());
            }
            else {
                var child = arg;
                this.addChild(child);
            }
            return this;
        };
        List.prototype.unShiftChild = function (child) {
            this.children.unshift(child);
        };
        List.prototype.removeAllChildren = function () {
            this.children = [];
            return this;
        };
        List.prototype.forEach = function (func, context) {
            this._forEach(this.children, func, context);
            return this;
        };
        //public removeChildAt (index) {
        //    Log.error(index < 0, "序号必须大于等于0");
        //
        //    this.children.splice(index, 1);
        //}
        //
        List.prototype.toArray = function () {
            return this.children;
        };
        List.prototype.copyChildren = function () {
            return this.children.slice(0);
        };
        List.prototype.removeChildHelper = function (arg) {
            var result = null;
            if (wdCb.JudgeUtils.isFunction(arg)) {
                var func = arg;
                result = this._removeChild(this.children, func);
            }
            else if (arg.uid) {
                result = this._removeChild(this.children, function (e) {
                    if (!e.uid) {
                        return false;
                    }
                    return e.uid === arg.uid;
                });
            }
            else {
                result = this._removeChild(this.children, function (e) {
                    return e === arg;
                });
            }
            return result;
        };
        List.prototype._indexOf = function (arr, arg) {
            var result = -1;
            if (wdCb.JudgeUtils.isFunction(arg)) {
                var func = arg;
                this._forEach(arr, function (value, index) {
                    if (!!func.call(null, value, index)) {
                        result = index;
                        return wdCb.$BREAK; //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                var val = arg;
                this._forEach(arr, function (value, index) {
                    if (val === value
                        || (value.contain && value.contain(val))
                        || (value.indexOf && value.indexOf(val) > -1)) {
                        result = index;
                        return wdCb.$BREAK; //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            return result;
        };
        List.prototype._contain = function (arr, arg) {
            return this._indexOf(arr, arg) > -1;
        };
        List.prototype._forEach = function (arr, func, context) {
            var scope = context || wdCb.root, i = 0, len = arr.length;
            for (i = 0; i < len; i++) {
                if (func.call(scope, arr[i], i) === wdCb.$BREAK) {
                    break;
                }
            }
        };
        List.prototype._removeChild = function (arr, func) {
            var self = this, index = null, removedElementArr = [], remainElementArr = [];
            this._forEach(arr, function (e, index) {
                if (!!func.call(self, e)) {
                    removedElementArr.push(e);
                }
                else {
                    remainElementArr.push(e);
                }
            });
            this.children = remainElementArr;
            return removedElementArr;
        };
        return List;
    })();
    wdCb.List = List;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var Hash = (function () {
        function Hash(children) {
            if (children === void 0) { children = {}; }
            this._children = null;
            this._children = children;
        }
        Hash.create = function (children) {
            if (children === void 0) { children = {}; }
            var obj = new this(children);
            return obj;
        };
        Hash.prototype.getChildren = function () {
            return this._children;
        };
        Hash.prototype.getCount = function () {
            var result = 0, children = this._children, key = null;
            for (key in children) {
                if (children.hasOwnProperty(key)) {
                    result++;
                }
            }
            return result;
        };
        Hash.prototype.getKeys = function () {
            var result = wdCb.Collection.create(), children = this._children, key = null;
            for (key in children) {
                if (children.hasOwnProperty(key)) {
                    result.addChild(key);
                }
            }
            return result;
        };
        Hash.prototype.getValues = function () {
            var result = wdCb.Collection.create(), children = this._children, key = null;
            for (key in children) {
                if (children.hasOwnProperty(key)) {
                    result.addChild(children[key]);
                }
            }
            return result;
        };
        Hash.prototype.getChild = function (key) {
            return this._children[key];
        };
        Hash.prototype.setValue = function (key, value) {
            this._children[key] = value;
            return this;
        };
        Hash.prototype.addChild = function (key, value) {
            this._children[key] = value;
            return this;
        };
        Hash.prototype.addChildren = function (arg) {
            var i = null, children = null;
            if (arg instanceof Hash) {
                children = arg.getChildren();
            }
            else {
                children = arg;
            }
            for (i in children) {
                if (children.hasOwnProperty(i)) {
                    this.addChild(i, children[i]);
                }
            }
        };
        Hash.prototype.appendChild = function (key, value) {
            if (this._children[key] instanceof wdCb.Collection) {
                var c = (this._children[key]);
                c.addChild(value);
            }
            else {
                this._children[key] = (wdCb.Collection.create().addChild(value));
            }
            return this;
        };
        Hash.prototype.removeChild = function (arg) {
            var result = [];
            if (wdCb.JudgeUtils.isString(arg)) {
                var key = arg;
                result.push(this._children[key]);
                this._children[key] = undefined;
                delete this._children[key];
            }
            else if (wdCb.JudgeUtils.isFunction(arg)) {
                var func = arg, self_1 = this;
                this.forEach(function (val, key) {
                    if (func(val, key)) {
                        result.push(self_1._children[key]);
                        self_1._children[key] = undefined;
                        delete self_1._children[key];
                    }
                });
            }
            return wdCb.Collection.create(result);
        };
        Hash.prototype.removeAllChildren = function () {
            this._children = {};
        };
        Hash.prototype.hasChild = function (arg) {
            if (wdCb.JudgeUtils.isFunction(arguments[0])) {
                var func = arguments[0], result = false;
                this.forEach(function (val, key) {
                    if (func(val, key)) {
                        result = true;
                        return wdCb.$BREAK;
                    }
                });
                return result;
            }
            var key = arguments[0];
            return !!this._children[key];
        };
        Hash.prototype.forEach = function (func, context) {
            var i = null, children = this._children;
            for (i in children) {
                if (children.hasOwnProperty(i)) {
                    if (func.call(context, children[i], i) === wdCb.$BREAK) {
                        break;
                    }
                }
            }
            return this;
        };
        Hash.prototype.filter = function (func) {
            var result = {}, scope = this._children;
            this.forEach(function (val, key) {
                if (!func.call(scope, val, key)) {
                    return;
                }
                result[key] = val;
            });
            return Hash.create(result);
        };
        Hash.prototype.findOne = function (func) {
            var result = [], self = this, scope = this._children;
            this.forEach(function (val, key) {
                if (!func.call(scope, val, key)) {
                    return;
                }
                result = [key, self.getChild(key)];
                return wdCb.$BREAK;
            });
            return result;
        };
        Hash.prototype.map = function (func) {
            var resultMap = {};
            this.forEach(function (val, key) {
                var result = func(val, key);
                if (result !== wdCb.$REMOVE) {
                    wdCb.Log.error(!wdCb.JudgeUtils.isArray(result) || result.length !== 2, wdCb.Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
                    resultMap[result[0]] = result[1];
                }
            });
            return Hash.create(resultMap);
        };
        Hash.prototype.toCollection = function () {
            var result = wdCb.Collection.create();
            this.forEach(function (val, key) {
                if (val instanceof wdCb.Collection) {
                    result.addChildren(val);
                }
                else if (val instanceof Hash) {
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_NOT_SUPPORT("toCollection", "value is Hash"));
                }
                else {
                    result.addChild(val);
                }
            });
            return result;
        };
        return Hash;
    })();
    wdCb.Hash = Hash;
})(wdCb || (wdCb = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdCb;
(function (wdCb) {
    var Queue = (function (_super) {
        __extends(Queue, _super);
        function Queue(children) {
            if (children === void 0) { children = []; }
            _super.call(this);
            this.children = children;
        }
        Queue.create = function (children) {
            if (children === void 0) { children = []; }
            var obj = new this(children);
            return obj;
        };
        Queue.prototype.push = function (element) {
            this.children.unshift(element);
        };
        Queue.prototype.pop = function () {
            return this.children.pop();
        };
        Queue.prototype.clear = function () {
            this.removeAllChildren();
        };
        return Queue;
    })(wdCb.List);
    wdCb.Queue = Queue;
})(wdCb || (wdCb = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdCb;
(function (wdCb) {
    var Stack = (function (_super) {
        __extends(Stack, _super);
        function Stack(children) {
            if (children === void 0) { children = []; }
            _super.call(this);
            this.children = children;
        }
        Stack.create = function (children) {
            if (children === void 0) { children = []; }
            var obj = new this(children);
            return obj;
        };
        Stack.prototype.push = function (element) {
            this.children.push(element);
        };
        Stack.prototype.pop = function () {
            return this.children.pop();
        };
        Stack.prototype.clear = function () {
            this.removeAllChildren();
        };
        return Stack;
    })(wdCb.List);
    wdCb.Stack = Stack;
})(wdCb || (wdCb = {}));

var wdCb;
(function (wdCb) {
    var AjaxUtils = (function () {
        function AjaxUtils() {
        }
        /*!
         实现ajax

         ajax({
         type:"post",//post或者get，非必须
         url:"test.jsp",//必须的
         data:"name=dipoo&info=good",//非必须
         dataType:"json",//text/xml/json，非必须
         success:function(data){//回调函数，非必须
         alert(data.name);
         }
         });*/
        AjaxUtils.ajax = function (conf) {
            var type = conf.type; //type参数,可选
            var url = conf.url; //url参数，必填
            var data = conf.data; //data参数可选，只有在post请求时需要
            var dataType = conf.dataType; //datatype参数可选
            var success = conf.success; //回调函数可选
            var error = conf.error;
            var xhr = null;
            var self = this;
            if (type === null) {
                type = "get";
            }
            if (dataType === null) {
                dataType = "text";
            }
            xhr = this._createAjax(error);
            if (!xhr) {
                return;
            }
            try {
                xhr.open(type, url, true);
                if (this._isSoundFile(dataType)) {
                    xhr.responseType = "arraybuffer";
                }
                if (type === "GET" || type === "get") {
                    xhr.send(null);
                }
                else if (type === "POST" || type === "post") {
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(data);
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4
                        && (xhr.status === 200 || self._isLocalFile(xhr.status))) {
                        if (dataType === "text" || dataType === "TEXT") {
                            if (success !== null) {
                                success(xhr.responseText);
                            }
                        }
                        else if (dataType === "xml" || dataType === "XML") {
                            if (success !== null) {
                                success(xhr.responseXML);
                            }
                        }
                        else if (dataType === "json" || dataType === "JSON") {
                            if (success !== null) {
                                success(eval("(" + xhr.responseText + ")"));
                            }
                        }
                        else if (self._isSoundFile(dataType)) {
                            if (success !== null) {
                                success(xhr.response);
                            }
                        }
                    }
                };
            }
            catch (e) {
                error(xhr, e);
            }
        };
        AjaxUtils._createAjax = function (error) {
            var xhr = null;
            try {
                xhr = new ActiveXObject("microsoft.xmlhttp");
            }
            catch (e1) {
                try {
                    xhr = new XMLHttpRequest();
                }
                catch (e2) {
                    error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                    return null;
                }
            }
            return xhr;
        };
        AjaxUtils._isLocalFile = function (status) {
            return document.URL.contain("file://") && status === 0;
        };
        AjaxUtils._isSoundFile = function (dataType) {
            return dataType === "arraybuffer";
        };
        return AjaxUtils;
    })();
    wdCb.AjaxUtils = AjaxUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var ArrayUtils = (function () {
        function ArrayUtils() {
        }
        ArrayUtils.removeRepeatItems = function (arr, isEqual) {
            if (isEqual === void 0) { isEqual = function (a, b) {
                return a === b;
            }; }
            var resultArr = [], self = this;
            arr.forEach(function (ele) {
                if (self.contain(resultArr, function (val) {
                    return isEqual(val, ele);
                })) {
                    return;
                }
                resultArr.push(ele);
            });
            return resultArr;
        };
        ArrayUtils.contain = function (arr, ele) {
            if (wdCb.JudgeUtils.isFunction(ele)) {
                var func = ele;
                for (var i = 0, len = arr.length; i < len; i++) {
                    var value = arr[i];
                    if (!!func.call(null, value, i)) {
                        return true;
                    }
                }
            }
            else {
                for (var i = 0, len = arr.length; i < len; i++) {
                    var value = arr[i];
                    if (ele === value || (value.contain && value.contain(ele))) {
                        return true;
                    }
                }
            }
            return false;
        };
        ;
        return ArrayUtils;
    })();
    wdCb.ArrayUtils = ArrayUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var ConvertUtils = (function () {
        function ConvertUtils() {
        }
        ConvertUtils.toString = function (obj) {
            if (wdCb.JudgeUtils.isNumber(obj)) {
                return String(obj);
            }
            //if (JudgeUtils.isjQuery(obj)) {
            //    return _jqToString(obj);
            //}
            if (wdCb.JudgeUtils.isFunction(obj)) {
                return this._convertCodeToString(obj);
            }
            if (wdCb.JudgeUtils.isDirectObject(obj) || wdCb.JudgeUtils.isArray(obj)) {
                return JSON.stringify(obj);
            }
            return String(obj);
        };
        ConvertUtils._convertCodeToString = function (fn) {
            return fn.toString().split('\n').slice(1, -1).join('\n') + '\n';
        };
        return ConvertUtils;
    })();
    wdCb.ConvertUtils = ConvertUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var EventUtils = (function () {
        function EventUtils() {
        }
        EventUtils.bindEvent = function (context, func) {
            //var args = Array.prototype.slice.call(arguments, 2),
            //    self = this;
            return function (event) {
                //return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
                return func.call(context, event);
            };
        };
        EventUtils.addEvent = function (dom, eventName, handler) {
            if (wdCb.JudgeUtils.isHostMethod(dom, "addEventListener")) {
                dom.addEventListener(eventName, handler, false);
            }
            else if (wdCb.JudgeUtils.isHostMethod(dom, "attachEvent")) {
                dom.attachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = handler;
            }
        };
        EventUtils.removeEvent = function (dom, eventName, handler) {
            if (wdCb.JudgeUtils.isHostMethod(dom, "removeEventListener")) {
                dom.removeEventListener(eventName, handler, false);
            }
            else if (wdCb.JudgeUtils.isHostMethod(dom, "detachEvent")) {
                dom.detachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = null;
            }
        };
        return EventUtils;
    })();
    wdCb.EventUtils = EventUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var ExtendUtils = (function () {
        function ExtendUtils() {
        }
        /**
         * 深拷贝
         *
         * 示例：
         * 如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）
         * expect(extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]])).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
         *
         * 如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）
         * var result = null;
         function A() {
                };
         A.prototype.a = 1;

         function B() {
                };
         B.prototype = new A();
         B.prototype.b = { x: 1, y: 1 };
         B.prototype.c = [{ x: 1 }, [2]];

         var t = new B();

         result = extend.extendDeep(t);

         expect(result).toEqual(
         {
             a: 1,
             b: { x: 1, y: 1 },
             c: [{ x: 1 }, [2]]
         });
         * @param parent
         * @param child
         * @returns
         */
        ExtendUtils.extendDeep = function (parent, child, filter) {
            if (filter === void 0) { filter = function (val, i) { return true; }; }
            var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
            //数组的话，不获得Array原型上的成员。
            if (toStr.call(parent) === sArr) {
                _child = child || [];
                for (i = 0, len = parent.length; i < len; i++) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    }
                    else {
                        _child[i] = parent[i];
                    }
                }
            }
            else if (toStr.call(parent) === sOb) {
                _child = child || {};
                for (i in parent) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    }
                    else {
                        _child[i] = parent[i];
                    }
                }
            }
            else {
                _child = parent;
            }
            return _child;
        };
        /**
         * 浅拷贝
         */
        ExtendUtils.extend = function (destination, source) {
            var property = "";
            for (property in source) {
                destination[property] = source[property];
            }
            return destination;
        };
        ExtendUtils.copyPublicAttri = function (source) {
            var property = null, destination = {};
            this.extendDeep(source, destination, function (item, property) {
                return property.slice(0, 1) !== "_"
                    && !wdCb.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        return ExtendUtils;
    })();
    wdCb.ExtendUtils = ExtendUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var SPLITPATH_REGEX = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    //reference from
    //https://github.com/cookfront/learn-note/blob/master/blog-backup/2014/nodejs-path.md
    var PathUtils = (function () {
        function PathUtils() {
        }
        PathUtils.basename = function (path, ext) {
            var f = this._splitPath(path)[2];
            // TODO: make this comparison case-insensitive on windows?
            if (ext && f.substr(-1 * ext.length) === ext) {
                f = f.substr(0, f.length - ext.length);
            }
            return f;
        };
        PathUtils.extname = function (path) {
            return this._splitPath(path)[3];
        };
        PathUtils.dirname = function (path) {
            var result = this._splitPath(path), root = result[0], dir = result[1];
            if (!root && !dir) {
                //no dirname whatsoever
                return '.';
            }
            if (dir) {
                //it has a dirname, strip trailing slash
                dir = dir.substr(0, dir.length - 1);
            }
            return root + dir;
        };
        PathUtils._splitPath = function (fileName) {
            return SPLITPATH_REGEX.exec(fileName).slice(1);
        };
        return PathUtils;
    })();
    wdCb.PathUtils = PathUtils;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var DomQuery = (function () {
        function DomQuery() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._doms = null;
            if (wdCb.JudgeUtils.isDom(args[0])) {
                this._doms = [args[0]];
            }
            else if (this._isDomEleStr(args[0])) {
                this._doms = [this._buildDom(args[0])];
            }
            else {
                this._doms = document.querySelectorAll(args[0]);
            }
            return this;
        }
        DomQuery.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var obj = new this(args[0]);
            return obj;
        };
        DomQuery.prototype.get = function (index) {
            return this._doms[index];
        };
        DomQuery.prototype.prepend = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var targetDom = null;
            targetDom = this._buildDom(args[0]);
            for (var _a = 0, _b = this._doms; _a < _b.length; _a++) {
                var dom = _b[_a];
                if (dom.nodeType === 1) {
                    dom.insertBefore(targetDom, dom.firstChild);
                }
            }
            return this;
        };
        DomQuery.prototype.prependTo = function (eleStr) {
            var targetDom = null;
            targetDom = DomQuery.create(eleStr);
            for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
                var dom = _a[_i];
                if (dom.nodeType === 1) {
                    targetDom.prepend(dom);
                }
            }
            return this;
        };
        DomQuery.prototype.remove = function () {
            for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
                var dom = _a[_i];
                if (dom && dom.parentNode && dom.tagName != 'BODY') {
                    dom.parentNode.removeChild(dom);
                }
            }
            return this;
        };
        DomQuery.prototype.css = function (property, value) {
            for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
                var dom = _a[_i];
                dom.style[property] = value;
            }
        };
        DomQuery.prototype._isDomEleStr = function (eleStr) {
            return eleStr.match(/<(\w+)><\/\1>/) !== null;
        };
        DomQuery.prototype._buildDom = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (wdCb.JudgeUtils.isString(args[0])) {
                var div = this._createElement("div"), eleStr = args[0];
                div.innerHTML = eleStr;
                return div.firstChild;
            }
            return args[0];
        };
        DomQuery.prototype._createElement = function (eleStr) {
            return document.createElement(eleStr);
        };
        return DomQuery;
    })();
    wdCb.DomQuery = DomQuery;
})(wdCb || (wdCb = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdCb;
(function (wdCb) {
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(children) {
            if (children === void 0) { children = []; }
            _super.call(this);
            this.children = children;
        }
        Collection.create = function (children) {
            if (children === void 0) { children = []; }
            var obj = new this(children);
            return obj;
        };
        Collection.prototype.copy = function (isDeep) {
            if (isDeep === void 0) { isDeep = false; }
            return isDeep ? Collection.create(wdCb.ExtendUtils.extendDeep(this.children))
                : Collection.create(wdCb.ExtendUtils.extend([], this.children));
        };
        Collection.prototype.filter = function (func) {
            var scope = this.children, result = [];
            this.forEach(function (value, index) {
                if (!func.call(scope, value, index)) {
                    return;
                }
                result.push(value);
            });
            return Collection.create(result);
        };
        Collection.prototype.findOne = function (func) {
            var scope = this.children, result = null;
            this.forEach(function (value, index) {
                if (!func.call(scope, value, index)) {
                    return;
                }
                result = value;
                return wdCb.$BREAK;
            });
            return result;
        };
        Collection.prototype.reverse = function () {
            return Collection.create(this.copyChildren().reverse());
        };
        Collection.prototype.removeChild = function (arg) {
            return Collection.create(this.removeChildHelper(arg));
        };
        Collection.prototype.sort = function (func) {
            return Collection.create(this.copyChildren().sort(func));
        };
        Collection.prototype.map = function (func) {
            var resultArr = [];
            this.forEach(function (e, index) {
                var result = func(e, index);
                if (result !== wdCb.$REMOVE) {
                    resultArr.push(result);
                }
                //e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
            });
            return Collection.create(resultArr);
        };
        Collection.prototype.removeRepeatItems = function () {
            var resultList = Collection.create();
            this.forEach(function (item) {
                if (resultList.hasChild(item)) {
                    return;
                }
                resultList.addChild(item);
            });
            return resultList;
        };
        return Collection;
    })(wdCb.List);
    wdCb.Collection = Collection;
})(wdCb || (wdCb = {}));


var wdCb;
(function (wdCb) {
    var FunctionUtils = (function () {
        function FunctionUtils() {
        }
        FunctionUtils.bind = function (object, func) {
            return function () {
                return func.apply(object, arguments);
            };
        };
        return FunctionUtils;
    })();
    wdCb.FunctionUtils = FunctionUtils;
})(wdCb || (wdCb = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isPromise = function (obj) {
            return !!obj
                && !_super.isFunction.call(this, obj.subscribe)
                && _super.isFunction.call(this, obj.then);
        };
        JudgeUtils.isEqual = function (ob1, ob2) {
            return ob1.uid === ob2.uid;
        };
        return JudgeUtils;
    })(wdCb.JudgeUtils);
    wdFrp.JudgeUtils = JudgeUtils;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var Entity = (function () {
        function Entity(uidPre) {
            this._uid = null;
            this._uid = uidPre + String(Entity.UID++);
        }
        Object.defineProperty(Entity.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            set: function (uid) {
                this._uid = uid;
            },
            enumerable: true,
            configurable: true
        });
        Entity.UID = 1;
        return Entity;
    })();
    wdFrp.Entity = Entity;
})(wdFrp || (wdFrp = {}));




var wdFrp;
(function (wdFrp) {
    var SingleDisposable = (function () {
        function SingleDisposable(disposeHandler) {
            this._disposeHandler = null;
            this._disposeHandler = disposeHandler;
        }
        SingleDisposable.create = function (disposeHandler) {
            if (disposeHandler === void 0) { disposeHandler = function () { }; }
            var obj = new this(disposeHandler);
            return obj;
        };
        SingleDisposable.prototype.setDisposeHandler = function (handler) {
            this._disposeHandler = handler;
        };
        SingleDisposable.prototype.dispose = function () {
            this._disposeHandler();
        };
        return SingleDisposable;
    })();
    wdFrp.SingleDisposable = SingleDisposable;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var GroupDisposable = (function () {
        function GroupDisposable(disposable) {
            this._group = wdCb.Collection.create();
            if (disposable) {
                this._group.addChild(disposable);
            }
        }
        GroupDisposable.create = function (disposable) {
            var obj = new this(disposable);
            return obj;
        };
        GroupDisposable.prototype.add = function (disposable) {
            this._group.addChild(disposable);
            return this;
        };
        GroupDisposable.prototype.dispose = function () {
            this._group.forEach(function (disposable) {
                disposable.dispose();
            });
        };
        return GroupDisposable;
    })();
    wdFrp.GroupDisposable = GroupDisposable;
})(wdFrp || (wdFrp = {}));




var wdFrp;
(function (wdFrp) {
    var InnerSubscription = (function () {
        function InnerSubscription(subject, observer) {
            this._subject = null;
            this._observer = null;
            this._subject = subject;
            this._observer = observer;
        }
        InnerSubscription.create = function (subject, observer) {
            var obj = new this(subject, observer);
            return obj;
        };
        InnerSubscription.prototype.dispose = function () {
            this._subject.remove(this._observer);
            this._observer.dispose();
        };
        return InnerSubscription;
    })();
    wdFrp.InnerSubscription = InnerSubscription;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var InnerSubscriptionGroup = (function () {
        function InnerSubscriptionGroup() {
            this._container = wdCb.Collection.create();
        }
        InnerSubscriptionGroup.create = function () {
            var obj = new this();
            return obj;
        };
        InnerSubscriptionGroup.prototype.addChild = function (child) {
            this._container.addChild(child);
        };
        InnerSubscriptionGroup.prototype.dispose = function () {
            this._container.forEach(function (child) {
                child.dispose();
            });
        };
        return InnerSubscriptionGroup;
    })();
    wdFrp.InnerSubscriptionGroup = InnerSubscriptionGroup;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    Object.defineProperty(wdFrp, "root", {
        get: function () {
            if (wdFrp.JudgeUtils.isNodeJs()) {
                return global;
            }
            return window;
        }
    });
})(wdFrp || (wdFrp = {}));

var wdFrp;
(function (wdFrp) {
    wdFrp.ABSTRACT_ATTRIBUTE = null;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    if (wdFrp.root.RSVP) {
        wdFrp.root.RSVP.onerror = function (e) {
            throw e;
        };
        wdFrp.root.RSVP.on('error', wdFrp.root.RSVP.onerror);
    }
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var Stream = (function (_super) {
        __extends(Stream, _super);
        function Stream(subscribeFunc) {
            _super.call(this, "Stream");
            this.scheduler = wdFrp.ABSTRACT_ATTRIBUTE;
            this.subscribeFunc = null;
            this.subscribeFunc = subscribeFunc || function () { };
        }
        Stream.prototype.buildStream = function (observer) {
            return wdFrp.SingleDisposable.create((this.subscribeFunc(observer) || function () { }));
        };
        Stream.prototype.do = function (onNext, onError, onCompleted) {
            return wdFrp.DoStream.create(this, onNext, onError, onCompleted);
        };
        Stream.prototype.map = function (selector) {
            return wdFrp.MapStream.create(this, selector);
        };
        Stream.prototype.flatMap = function (selector) {
            return this.map(selector).mergeAll();
        };
        Stream.prototype.mergeAll = function () {
            return wdFrp.MergeAllStream.create(this);
        };
        Stream.prototype.takeUntil = function (otherStream) {
            return wdFrp.TakeUntilStream.create(this, otherStream);
        };
        Stream.prototype.concat = function () {
            var args = null;
            if (wdFrp.JudgeUtils.isArray(arguments[0])) {
                args = arguments[0];
            }
            else {
                args = Array.prototype.slice.call(arguments, 0);
            }
            args.unshift(this);
            return wdFrp.ConcatStream.create(args);
        };
        Stream.prototype.merge = function () {
            var args = null, stream = null;
            if (wdFrp.JudgeUtils.isArray(arguments[0])) {
                args = arguments[0];
            }
            else {
                args = Array.prototype.slice.call(arguments, 0);
            }
            args.unshift(this);
            stream = wdFrp.fromArray(args).mergeAll();
            return stream;
        };
        Stream.prototype.repeat = function (count) {
            if (count === void 0) { count = -1; }
            return wdFrp.RepeatStream.create(this, count);
        };
        Stream.prototype.ignoreElements = function () {
            return wdFrp.IgnoreElementsStream.create(this);
        };
        Stream.prototype.handleSubject = function (arg) {
            if (this._isSubject(arg)) {
                this._setSubject(arg);
                return true;
            }
            return false;
        };
        Stream.prototype._isSubject = function (subject) {
            return subject instanceof wdFrp.Subject;
        };
        Stream.prototype._setSubject = function (subject) {
            subject.source = this;
        };
        return Stream;
    })(wdFrp.Entity);
    wdFrp.Stream = Stream;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    wdFrp.root.requestNextAnimationFrame = (function () {
        var originalRequestAnimationFrame = undefined, wrapper = undefined, callback = undefined, geckoVersion = null, userAgent = wdFrp.root.navigator && wdFrp.root.navigator.userAgent, index = 0, self = this;
        wrapper = function (time) {
            time = wdFrp.root.performance.now();
            self.callback(time);
        };
        /*!
         bug!
         below code:
         when invoke b after 1s, will only invoke b, not invoke a!

         function a(time){
         console.log("a", time);
         webkitRequestAnimationFrame(a);
         }

         function b(time){
         console.log("b", time);
         webkitRequestAnimationFrame(b);
         }

         a();

         setTimeout(b, 1000);



         so use requestAnimationFrame priority!
         */
        if (wdFrp.root.requestAnimationFrame) {
            return requestAnimationFrame;
        }
        if (wdFrp.root.webkitRequestAnimationFrame) {
            originalRequestAnimationFrame = wdFrp.root.webkitRequestAnimationFrame;
            wdFrp.root.webkitRequestAnimationFrame = function (callback, element) {
                self.callback = callback;
                return originalRequestAnimationFrame(wrapper, element);
            };
        }
        if (wdFrp.root.msRequestAnimationFrame) {
            originalRequestAnimationFrame = wdFrp.root.msRequestAnimationFrame;
            wdFrp.root.msRequestAnimationFrame = function (callback) {
                self.callback = callback;
                return originalRequestAnimationFrame(wrapper);
            };
        }
        if (wdFrp.root.mozRequestAnimationFrame) {
            index = userAgent.indexOf('rv:');
            if (userAgent.indexOf('Gecko') != -1) {
                geckoVersion = userAgent.substr(index + 3, 3);
                if (geckoVersion === '2.0') {
                    wdFrp.root.mozRequestAnimationFrame = undefined;
                }
            }
        }
        return wdFrp.root.webkitRequestAnimationFrame ||
            wdFrp.root.mozRequestAnimationFrame ||
            wdFrp.root.oRequestAnimationFrame ||
            wdFrp.root.msRequestAnimationFrame ||
            function (callback, element) {
                var start, finish;
                wdFrp.root.setTimeout(function () {
                    start = wdFrp.root.performance.now();
                    callback(start);
                    finish = wdFrp.root.performance.now();
                    self.timeout = 1000 / 60 - (finish - start);
                }, self.timeout);
            };
    }());
    wdFrp.root.cancelNextRequestAnimationFrame = wdFrp.root.cancelRequestAnimationFrame
        || wdFrp.root.webkitCancelAnimationFrame
        || wdFrp.root.webkitCancelRequestAnimationFrame
        || wdFrp.root.mozCancelRequestAnimationFrame
        || wdFrp.root.oCancelRequestAnimationFrame
        || wdFrp.root.msCancelRequestAnimationFrame
        || clearTimeout;
    var Scheduler = (function () {
        function Scheduler() {
            this._requestLoopId = null;
        }
        Scheduler.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Scheduler.prototype, "requestLoopId", {
            get: function () {
                return this._requestLoopId;
            },
            set: function (requestLoopId) {
                this._requestLoopId = requestLoopId;
            },
            enumerable: true,
            configurable: true
        });
        Scheduler.prototype.publishRecursive = function (observer, initial, action) {
            action(initial);
        };
        Scheduler.prototype.publishInterval = function (observer, initial, interval, action) {
            return wdFrp.root.setInterval(function () {
                initial = action(initial);
            }, interval);
        };
        Scheduler.prototype.publishIntervalRequest = function (observer, action) {
            var self = this, loop = function (time) {
                var isEnd = action(time);
                if (isEnd) {
                    return;
                }
                self._requestLoopId = wdFrp.root.requestNextAnimationFrame(loop);
            };
            this._requestLoopId = wdFrp.root.requestNextAnimationFrame(loop);
        };
        return Scheduler;
    })();
    wdFrp.Scheduler = Scheduler;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var Observer = (function (_super) {
        __extends(Observer, _super);
        function Observer() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this, "Observer");
            this._isDisposed = null;
            this.onUserNext = null;
            this.onUserError = null;
            this.onUserCompleted = null;
            this._isStop = false;
            this._disposable = null;
            if (args.length === 1) {
                var observer = args[0];
                this.onUserNext = function (v) {
                    observer.next(v);
                };
                this.onUserError = function (e) {
                    observer.error(e);
                };
                this.onUserCompleted = function () {
                    observer.completed();
                };
            }
            else {
                var onNext = args[0], onError = args[1], onCompleted = args[2];
                this.onUserNext = onNext || function (v) { };
                this.onUserError = onError || function (e) {
                    throw e;
                };
                this.onUserCompleted = onCompleted || function () { };
            }
        }
        Object.defineProperty(Observer.prototype, "isDisposed", {
            get: function () {
                return this._isDisposed;
            },
            set: function (isDisposed) {
                this._isDisposed = isDisposed;
            },
            enumerable: true,
            configurable: true
        });
        Observer.prototype.next = function (value) {
            if (!this._isStop) {
                return this.onNext(value);
            }
        };
        Observer.prototype.error = function (error) {
            if (!this._isStop) {
                this._isStop = true;
                this.onError(error);
            }
        };
        Observer.prototype.completed = function () {
            if (!this._isStop) {
                this._isStop = true;
                this.onCompleted();
            }
        };
        Observer.prototype.dispose = function () {
            this._isStop = true;
            this._isDisposed = true;
            if (this._disposable) {
                this._disposable.dispose();
            }
        };
        Observer.prototype.setDisposable = function (disposable) {
            this._disposable = disposable;
        };
        return Observer;
    })(wdFrp.Entity);
    wdFrp.Observer = Observer;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var Subject = (function () {
        function Subject() {
            this._source = null;
            this._observer = new wdFrp.SubjectObserver();
        }
        Subject.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Subject.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (source) {
                this._source = source;
            },
            enumerable: true,
            configurable: true
        });
        Subject.prototype.subscribe = function (arg1, onError, onCompleted) {
            var observer = arg1 instanceof wdFrp.Observer
                ? arg1
                : wdFrp.AutoDetachObserver.create(arg1, onError, onCompleted);
            this._observer.addChild(observer);
            return wdFrp.InnerSubscription.create(this, observer);
        };
        Subject.prototype.next = function (value) {
            this._observer.next(value);
        };
        Subject.prototype.error = function (error) {
            this._observer.error(error);
        };
        Subject.prototype.completed = function () {
            this._observer.completed();
        };
        Subject.prototype.start = function () {
            if (!this._source) {
                return;
            }
            this._observer.setDisposable(this._source.buildStream(this));
        };
        Subject.prototype.remove = function (observer) {
            this._observer.removeChild(observer);
        };
        Subject.prototype.dispose = function () {
            this._observer.dispose();
        };
        return Subject;
    })();
    wdFrp.Subject = Subject;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var GeneratorSubject = (function (_super) {
        __extends(GeneratorSubject, _super);
        function GeneratorSubject() {
            _super.call(this, "GeneratorSubject");
            this._isStart = false;
            this.observer = new wdFrp.SubjectObserver();
        }
        GeneratorSubject.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(GeneratorSubject.prototype, "isStart", {
            get: function () {
                return this._isStart;
            },
            set: function (isStart) {
                this._isStart = isStart;
            },
            enumerable: true,
            configurable: true
        });
        /*!
        outer hook method
         */
        GeneratorSubject.prototype.onBeforeNext = function (value) {
        };
        GeneratorSubject.prototype.onAfterNext = function (value) {
        };
        GeneratorSubject.prototype.onIsCompleted = function (value) {
            return false;
        };
        GeneratorSubject.prototype.onBeforeError = function (error) {
        };
        GeneratorSubject.prototype.onAfterError = function (error) {
        };
        GeneratorSubject.prototype.onBeforeCompleted = function () {
        };
        GeneratorSubject.prototype.onAfterCompleted = function () {
        };
        GeneratorSubject.prototype.subscribe = function (arg1, onError, onCompleted) {
            var observer = arg1 instanceof wdFrp.Observer
                ? arg1
                : wdFrp.AutoDetachObserver.create(arg1, onError, onCompleted);
            this.observer.addChild(observer);
            return wdFrp.InnerSubscription.create(this, observer);
        };
        GeneratorSubject.prototype.next = function (value) {
            if (!this._isStart || this.observer.isEmpty()) {
                return;
            }
            try {
                this.onBeforeNext(value);
                this.observer.next(value);
                this.onAfterNext(value);
                if (this.onIsCompleted(value)) {
                    this.completed();
                }
            }
            catch (e) {
                this.error(e);
            }
        };
        GeneratorSubject.prototype.error = function (error) {
            if (!this._isStart || this.observer.isEmpty()) {
                return;
            }
            this.onBeforeError(error);
            this.observer.error(error);
            this.onAfterError(error);
        };
        GeneratorSubject.prototype.completed = function () {
            if (!this._isStart || this.observer.isEmpty()) {
                return;
            }
            this.onBeforeCompleted();
            this.observer.completed();
            this.onAfterCompleted();
        };
        GeneratorSubject.prototype.toStream = function () {
            var self = this, stream = null;
            stream = wdFrp.AnonymousStream.create(function (observer) {
                self.subscribe(observer);
            });
            return stream;
        };
        GeneratorSubject.prototype.start = function () {
            var self = this;
            this._isStart = true;
            this.observer.setDisposable(wdFrp.SingleDisposable.create(function () {
                self.dispose();
            }));
        };
        GeneratorSubject.prototype.stop = function () {
            this._isStart = false;
        };
        GeneratorSubject.prototype.remove = function (observer) {
            this.observer.removeChild(observer);
        };
        GeneratorSubject.prototype.dispose = function () {
            this.observer.dispose();
        };
        return GeneratorSubject;
    })(wdFrp.Entity);
    wdFrp.GeneratorSubject = GeneratorSubject;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var AnonymousObserver = (function (_super) {
        __extends(AnonymousObserver, _super);
        function AnonymousObserver() {
            _super.apply(this, arguments);
        }
        AnonymousObserver.create = function (onNext, onError, onCompleted) {
            return new this(onNext, onError, onCompleted);
        };
        AnonymousObserver.prototype.onNext = function (value) {
            this.onUserNext(value);
        };
        AnonymousObserver.prototype.onError = function (error) {
            this.onUserError(error);
        };
        AnonymousObserver.prototype.onCompleted = function () {
            this.onUserCompleted();
        };
        return AnonymousObserver;
    })(wdFrp.Observer);
    wdFrp.AnonymousObserver = AnonymousObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var AutoDetachObserver = (function (_super) {
        __extends(AutoDetachObserver, _super);
        function AutoDetachObserver() {
            _super.apply(this, arguments);
        }
        AutoDetachObserver.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                return new this(args[0]);
            }
            else {
                return new this(args[0], args[1], args[2]);
            }
        };
        AutoDetachObserver.prototype.dispose = function () {
            if (this.isDisposed) {
                wdCb.Log.log("only can dispose once");
                return;
            }
            _super.prototype.dispose.call(this);
        };
        AutoDetachObserver.prototype.onNext = function (value) {
            try {
                this.onUserNext(value);
            }
            catch (e) {
                this.onError(e);
            }
        };
        AutoDetachObserver.prototype.onError = function (err) {
            try {
                this.onUserError(err);
            }
            catch (e) {
                throw e;
            }
            finally {
                this.dispose();
            }
        };
        AutoDetachObserver.prototype.onCompleted = function () {
            try {
                this.onUserCompleted();
                this.dispose();
            }
            catch (e) {
                throw e;
            }
        };
        return AutoDetachObserver;
    })(wdFrp.Observer);
    wdFrp.AutoDetachObserver = AutoDetachObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var MapObserver = (function (_super) {
        __extends(MapObserver, _super);
        function MapObserver(currentObserver, selector) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._selector = null;
            this._currentObserver = currentObserver;
            this._selector = selector;
        }
        MapObserver.create = function (currentObserver, selector) {
            return new this(currentObserver, selector);
        };
        MapObserver.prototype.onNext = function (value) {
            var result = null;
            try {
                result = this._selector(value);
            }
            catch (e) {
                this._currentObserver.error(e);
            }
            finally {
                this._currentObserver.next(result);
            }
        };
        MapObserver.prototype.onError = function (error) {
            this._currentObserver.error(error);
        };
        MapObserver.prototype.onCompleted = function () {
            this._currentObserver.completed();
        };
        return MapObserver;
    })(wdFrp.Observer);
    wdFrp.MapObserver = MapObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var DoObserver = (function (_super) {
        __extends(DoObserver, _super);
        function DoObserver(currentObserver, prevObserver) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._prevObserver = null;
            this._currentObserver = currentObserver;
            this._prevObserver = prevObserver;
        }
        DoObserver.create = function (currentObserver, prevObserver) {
            return new this(currentObserver, prevObserver);
        };
        DoObserver.prototype.onNext = function (value) {
            try {
                this._prevObserver.next(value);
            }
            catch (e) {
                this._prevObserver.error(e);
                this._currentObserver.error(e);
            }
            finally {
                this._currentObserver.next(value);
            }
        };
        DoObserver.prototype.onError = function (error) {
            try {
                this._prevObserver.error(error);
            }
            catch (e) {
            }
            finally {
                this._currentObserver.error(error);
            }
        };
        DoObserver.prototype.onCompleted = function () {
            try {
                this._prevObserver.completed();
            }
            catch (e) {
                this._prevObserver.error(e);
                this._currentObserver.error(e);
            }
            finally {
                this._currentObserver.completed();
            }
        };
        return DoObserver;
    })(wdFrp.Observer);
    wdFrp.DoObserver = DoObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var MergeAllObserver = (function (_super) {
        __extends(MergeAllObserver, _super);
        function MergeAllObserver(currentObserver, streamGroup, groupDisposable) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._done = false;
            this._streamGroup = null;
            this._groupDisposable = null;
            this._currentObserver = currentObserver;
            this._streamGroup = streamGroup;
            this._groupDisposable = groupDisposable;
        }
        MergeAllObserver.create = function (currentObserver, streamGroup, groupDisposable) {
            return new this(currentObserver, streamGroup, groupDisposable);
        };
        Object.defineProperty(MergeAllObserver.prototype, "currentObserver", {
            get: function () {
                return this._currentObserver;
            },
            set: function (currentObserver) {
                this._currentObserver = currentObserver;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MergeAllObserver.prototype, "done", {
            get: function () {
                return this._done;
            },
            set: function (done) {
                this._done = done;
            },
            enumerable: true,
            configurable: true
        });
        MergeAllObserver.prototype.onNext = function (innerSource) {
            wdCb.Log.error(!(innerSource instanceof wdFrp.Stream || wdFrp.JudgeUtils.isPromise(innerSource)), wdCb.Log.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
            if (wdFrp.JudgeUtils.isPromise(innerSource)) {
                innerSource = wdFrp.fromPromise(innerSource);
            }
            this._streamGroup.addChild(innerSource);
            this._groupDisposable.add(innerSource.buildStream(InnerObserver.create(this, this._streamGroup, innerSource)));
        };
        MergeAllObserver.prototype.onError = function (error) {
            this._currentObserver.error(error);
        };
        MergeAllObserver.prototype.onCompleted = function () {
            this.done = true;
            if (this._streamGroup.getCount() === 0) {
                this._currentObserver.completed();
            }
        };
        return MergeAllObserver;
    })(wdFrp.Observer);
    wdFrp.MergeAllObserver = MergeAllObserver;
    var InnerObserver = (function (_super) {
        __extends(InnerObserver, _super);
        function InnerObserver(parent, streamGroup, currentStream) {
            _super.call(this, null, null, null);
            this._parent = null;
            this._streamGroup = null;
            this._currentStream = null;
            this._parent = parent;
            this._streamGroup = streamGroup;
            this._currentStream = currentStream;
        }
        InnerObserver.create = function (parent, streamGroup, currentStream) {
            var obj = new this(parent, streamGroup, currentStream);
            return obj;
        };
        InnerObserver.prototype.onNext = function (value) {
            this._parent.currentObserver.next(value);
        };
        InnerObserver.prototype.onError = function (error) {
            this._parent.currentObserver.error(error);
        };
        InnerObserver.prototype.onCompleted = function () {
            var currentStream = this._currentStream, parent = this._parent;
            this._streamGroup.removeChild(function (stream) {
                return wdFrp.JudgeUtils.isEqual(stream, currentStream);
            });
            /*!
            if this innerSource is async stream(as promise stream),
            it will first exec all parent.next and one parent.completed,
            then exec all this.next and all this.completed
            so in this case, it should invoke parent.currentObserver.completed after the last invokcation of this.completed(have invoked all the innerSource)
            */
            if (this._isAsync() && this._streamGroup.getCount() === 0) {
                parent.currentObserver.completed();
            }
        };
        InnerObserver.prototype._isAsync = function () {
            return this._parent.done;
        };
        return InnerObserver;
    })(wdFrp.Observer);
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var TakeUntilObserver = (function (_super) {
        __extends(TakeUntilObserver, _super);
        function TakeUntilObserver(prevObserver) {
            _super.call(this, null, null, null);
            this._prevObserver = null;
            this._prevObserver = prevObserver;
        }
        TakeUntilObserver.create = function (prevObserver) {
            return new this(prevObserver);
        };
        TakeUntilObserver.prototype.onNext = function (value) {
            this._prevObserver.completed();
        };
        TakeUntilObserver.prototype.onError = function (error) {
            this._prevObserver.error(error);
        };
        TakeUntilObserver.prototype.onCompleted = function () {
        };
        return TakeUntilObserver;
    })(wdFrp.Observer);
    wdFrp.TakeUntilObserver = TakeUntilObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var ConcatObserver = (function (_super) {
        __extends(ConcatObserver, _super);
        function ConcatObserver(currentObserver, startNextStream) {
            _super.call(this, null, null, null);
            this.currentObserver = null;
            this._startNextStream = null;
            this.currentObserver = currentObserver;
            this._startNextStream = startNextStream;
        }
        ConcatObserver.create = function (currentObserver, startNextStream) {
            return new this(currentObserver, startNextStream);
        };
        ConcatObserver.prototype.onNext = function (value) {
            /*!
            if "this.currentObserver.next" error, it will pase to this.currentObserver->onError.
            so it shouldn't invoke this.currentObserver.error here again!
             */
            this.currentObserver.next(value);
        };
        ConcatObserver.prototype.onError = function (error) {
            this.currentObserver.error(error);
        };
        ConcatObserver.prototype.onCompleted = function () {
            this._startNextStream();
        };
        return ConcatObserver;
    })(wdFrp.Observer);
    wdFrp.ConcatObserver = ConcatObserver;
})(wdFrp || (wdFrp = {}));




var wdFrp;
(function (wdFrp) {
    var SubjectObserver = (function () {
        function SubjectObserver() {
            this.observers = wdCb.Collection.create();
            this._disposable = null;
        }
        SubjectObserver.prototype.isEmpty = function () {
            return this.observers.getCount() === 0;
        };
        SubjectObserver.prototype.next = function (value) {
            this.observers.forEach(function (ob) {
                ob.next(value);
            });
        };
        SubjectObserver.prototype.error = function (error) {
            this.observers.forEach(function (ob) {
                ob.error(error);
            });
        };
        SubjectObserver.prototype.completed = function () {
            this.observers.forEach(function (ob) {
                ob.completed();
            });
        };
        SubjectObserver.prototype.addChild = function (observer) {
            this.observers.addChild(observer);
            observer.setDisposable(this._disposable);
        };
        SubjectObserver.prototype.removeChild = function (observer) {
            this.observers.removeChild(function (ob) {
                return wdFrp.JudgeUtils.isEqual(ob, observer);
            });
        };
        SubjectObserver.prototype.dispose = function () {
            this.observers.forEach(function (ob) {
                ob.dispose();
            });
            this.observers.removeAllChildren();
        };
        SubjectObserver.prototype.setDisposable = function (disposable) {
            this.observers.forEach(function (observer) {
                observer.setDisposable(disposable);
            });
            this._disposable = disposable;
        };
        return SubjectObserver;
    })();
    wdFrp.SubjectObserver = SubjectObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var IgnoreElementsObserver = (function (_super) {
        __extends(IgnoreElementsObserver, _super);
        function IgnoreElementsObserver(currentObserver) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._currentObserver = currentObserver;
        }
        IgnoreElementsObserver.create = function (currentObserver) {
            return new this(currentObserver);
        };
        IgnoreElementsObserver.prototype.onNext = function (value) {
        };
        IgnoreElementsObserver.prototype.onError = function (error) {
            this._currentObserver.error(error);
        };
        IgnoreElementsObserver.prototype.onCompleted = function () {
            this._currentObserver.completed();
        };
        return IgnoreElementsObserver;
    })(wdFrp.Observer);
    wdFrp.IgnoreElementsObserver = IgnoreElementsObserver;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var BaseStream = (function (_super) {
        __extends(BaseStream, _super);
        function BaseStream() {
            _super.apply(this, arguments);
        }
        BaseStream.prototype.subscribe = function (arg1, onError, onCompleted) {
            var observer = null;
            if (this.handleSubject(arg1)) {
                return;
            }
            observer = arg1 instanceof wdFrp.Observer
                ? wdFrp.AutoDetachObserver.create(arg1)
                : wdFrp.AutoDetachObserver.create(arg1, onError, onCompleted);
            observer.setDisposable(this.buildStream(observer));
            return observer;
        };
        BaseStream.prototype.buildStream = function (observer) {
            _super.prototype.buildStream.call(this, observer);
            return this.subscribeCore(observer);
        };
        return BaseStream;
    })(wdFrp.Stream);
    wdFrp.BaseStream = BaseStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var DoStream = (function (_super) {
        __extends(DoStream, _super);
        function DoStream(source, onNext, onError, onCompleted) {
            _super.call(this, null);
            this._source = null;
            this._observer = null;
            this._source = source;
            this._observer = wdFrp.AnonymousObserver.create(onNext, onError, onCompleted);
            this.scheduler = this._source.scheduler;
        }
        DoStream.create = function (source, onNext, onError, onCompleted) {
            var obj = new this(source, onNext, onError, onCompleted);
            return obj;
        };
        DoStream.prototype.subscribeCore = function (observer) {
            return this._source.buildStream(wdFrp.DoObserver.create(observer, this._observer));
        };
        return DoStream;
    })(wdFrp.BaseStream);
    wdFrp.DoStream = DoStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var MapStream = (function (_super) {
        __extends(MapStream, _super);
        function MapStream(source, selector) {
            _super.call(this, null);
            this._source = null;
            this._selector = null;
            this._source = source;
            this.scheduler = this._source.scheduler;
            this._selector = selector;
        }
        MapStream.create = function (source, selector) {
            var obj = new this(source, selector);
            return obj;
        };
        MapStream.prototype.subscribeCore = function (observer) {
            return this._source.buildStream(wdFrp.MapObserver.create(observer, this._selector));
        };
        return MapStream;
    })(wdFrp.BaseStream);
    wdFrp.MapStream = MapStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var FromArrayStream = (function (_super) {
        __extends(FromArrayStream, _super);
        function FromArrayStream(array, scheduler) {
            _super.call(this, null);
            this._array = null;
            this._array = array;
            this.scheduler = scheduler;
        }
        FromArrayStream.create = function (array, scheduler) {
            var obj = new this(array, scheduler);
            return obj;
        };
        FromArrayStream.prototype.subscribeCore = function (observer) {
            var array = this._array, len = array.length;
            function loopRecursive(i) {
                if (i < len) {
                    observer.next(array[i]);
                    arguments.callee(i + 1);
                }
                else {
                    observer.completed();
                }
            }
            this.scheduler.publishRecursive(observer, 0, loopRecursive);
            return wdFrp.SingleDisposable.create();
        };
        return FromArrayStream;
    })(wdFrp.BaseStream);
    wdFrp.FromArrayStream = FromArrayStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var FromPromiseStream = (function (_super) {
        __extends(FromPromiseStream, _super);
        function FromPromiseStream(promise, scheduler) {
            _super.call(this, null);
            this._promise = null;
            this._promise = promise;
            this.scheduler = scheduler;
        }
        FromPromiseStream.create = function (promise, scheduler) {
            var obj = new this(promise, scheduler);
            return obj;
        };
        FromPromiseStream.prototype.subscribeCore = function (observer) {
            this._promise.then(function (data) {
                observer.next(data);
                observer.completed();
            }, function (err) {
                observer.error(err);
            }, observer);
            return wdFrp.SingleDisposable.create();
        };
        return FromPromiseStream;
    })(wdFrp.BaseStream);
    wdFrp.FromPromiseStream = FromPromiseStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var FromEventPatternStream = (function (_super) {
        __extends(FromEventPatternStream, _super);
        function FromEventPatternStream(addHandler, removeHandler) {
            _super.call(this, null);
            this._addHandler = null;
            this._removeHandler = null;
            this._addHandler = addHandler;
            this._removeHandler = removeHandler;
        }
        FromEventPatternStream.create = function (addHandler, removeHandler) {
            var obj = new this(addHandler, removeHandler);
            return obj;
        };
        FromEventPatternStream.prototype.subscribeCore = function (observer) {
            var self = this;
            function innerHandler(event) {
                observer.next(event);
            }
            this._addHandler(innerHandler);
            return wdFrp.SingleDisposable.create(function () {
                self._removeHandler(innerHandler);
            });
        };
        return FromEventPatternStream;
    })(wdFrp.BaseStream);
    wdFrp.FromEventPatternStream = FromEventPatternStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var AnonymousStream = (function (_super) {
        __extends(AnonymousStream, _super);
        function AnonymousStream(subscribeFunc) {
            _super.call(this, subscribeFunc);
            this.scheduler = wdFrp.Scheduler.create();
        }
        AnonymousStream.create = function (subscribeFunc) {
            var obj = new this(subscribeFunc);
            return obj;
        };
        AnonymousStream.prototype.subscribe = function (onNext, onError, onCompleted) {
            var observer = null;
            if (this.handleSubject(arguments[0])) {
                return;
            }
            observer = wdFrp.AutoDetachObserver.create(onNext, onError, onCompleted);
            observer.setDisposable(this.buildStream(observer));
            return observer;
        };
        return AnonymousStream;
    })(wdFrp.Stream);
    wdFrp.AnonymousStream = AnonymousStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var IntervalStream = (function (_super) {
        __extends(IntervalStream, _super);
        function IntervalStream(interval, scheduler) {
            _super.call(this, null);
            this._interval = null;
            this._interval = interval;
            this.scheduler = scheduler;
        }
        IntervalStream.create = function (interval, scheduler) {
            var obj = new this(interval, scheduler);
            obj.initWhenCreate();
            return obj;
        };
        IntervalStream.prototype.initWhenCreate = function () {
            this._interval = this._interval <= 0 ? 1 : this._interval;
        };
        IntervalStream.prototype.subscribeCore = function (observer) {
            var self = this, id = null;
            id = this.scheduler.publishInterval(observer, 0, this._interval, function (count) {
                observer.next(count);
                return count + 1;
            });
            return wdFrp.SingleDisposable.create(function () {
                wdFrp.root.clearInterval(id);
            });
        };
        return IntervalStream;
    })(wdFrp.BaseStream);
    wdFrp.IntervalStream = IntervalStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var IntervalRequestStream = (function (_super) {
        __extends(IntervalRequestStream, _super);
        function IntervalRequestStream(scheduler) {
            _super.call(this, null);
            this._isEnd = false;
            this.scheduler = scheduler;
        }
        IntervalRequestStream.create = function (scheduler) {
            var obj = new this(scheduler);
            return obj;
        };
        IntervalRequestStream.prototype.subscribeCore = function (observer) {
            var self = this;
            this.scheduler.publishIntervalRequest(observer, function (time) {
                observer.next(time);
                return self._isEnd;
            });
            return wdFrp.SingleDisposable.create(function () {
                wdFrp.root.cancelNextRequestAnimationFrame(self.scheduler.requestLoopId);
                self._isEnd = true;
            });
        };
        return IntervalRequestStream;
    })(wdFrp.BaseStream);
    wdFrp.IntervalRequestStream = IntervalRequestStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var MergeAllStream = (function (_super) {
        __extends(MergeAllStream, _super);
        function MergeAllStream(source) {
            _super.call(this, null);
            this._source = null;
            this._observer = null;
            this._source = source;
            this.scheduler = this._source.scheduler;
        }
        MergeAllStream.create = function (source) {
            var obj = new this(source);
            return obj;
        };
        MergeAllStream.prototype.subscribeCore = function (observer) {
            var streamGroup = wdCb.Collection.create(), groupDisposable = wdFrp.GroupDisposable.create();
            this._source.buildStream(wdFrp.MergeAllObserver.create(observer, streamGroup, groupDisposable));
            return groupDisposable;
        };
        return MergeAllStream;
    })(wdFrp.BaseStream);
    wdFrp.MergeAllStream = MergeAllStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var TakeUntilStream = (function (_super) {
        __extends(TakeUntilStream, _super);
        function TakeUntilStream(source, otherStream) {
            _super.call(this, null);
            this._source = null;
            this._otherStream = null;
            this._source = source;
            this._otherStream = wdFrp.JudgeUtils.isPromise(otherStream) ? wdFrp.fromPromise(otherStream) : otherStream;
            this.scheduler = this._source.scheduler;
        }
        TakeUntilStream.create = function (source, otherSteam) {
            var obj = new this(source, otherSteam);
            return obj;
        };
        TakeUntilStream.prototype.subscribeCore = function (observer) {
            var group = wdFrp.GroupDisposable.create(), autoDetachObserver = wdFrp.AutoDetachObserver.create(observer), sourceDisposable = null;
            sourceDisposable = this._source.buildStream(observer);
            group.add(sourceDisposable);
            autoDetachObserver.setDisposable(sourceDisposable);
            group.add(this._otherStream.buildStream(wdFrp.TakeUntilObserver.create(autoDetachObserver)));
            return group;
        };
        return TakeUntilStream;
    })(wdFrp.BaseStream);
    wdFrp.TakeUntilStream = TakeUntilStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var ConcatStream = (function (_super) {
        __extends(ConcatStream, _super);
        function ConcatStream(sources) {
            _super.call(this, null);
            this._sources = wdCb.Collection.create();
            var self = this;
            this.scheduler = sources[0].scheduler;
            sources.forEach(function (source) {
                if (wdFrp.JudgeUtils.isPromise(source)) {
                    self._sources.addChild(wdFrp.fromPromise(source));
                }
                else {
                    self._sources.addChild(source);
                }
            });
        }
        ConcatStream.create = function (sources) {
            var obj = new this(sources);
            return obj;
        };
        ConcatStream.prototype.subscribeCore = function (observer) {
            var self = this, count = this._sources.getCount(), d = wdFrp.GroupDisposable.create();
            function loopRecursive(i) {
                if (i === count) {
                    observer.completed();
                    return;
                }
                d.add(self._sources.getChild(i).buildStream(wdFrp.ConcatObserver.create(observer, function () {
                    loopRecursive(i + 1);
                })));
            }
            this.scheduler.publishRecursive(observer, 0, loopRecursive);
            return wdFrp.GroupDisposable.create(d);
        };
        return ConcatStream;
    })(wdFrp.BaseStream);
    wdFrp.ConcatStream = ConcatStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var RepeatStream = (function (_super) {
        __extends(RepeatStream, _super);
        function RepeatStream(source, count) {
            _super.call(this, null);
            this._source = null;
            this._count = null;
            this._source = source;
            this._count = count;
            this.scheduler = this._source.scheduler;
        }
        RepeatStream.create = function (source, count) {
            var obj = new this(source, count);
            return obj;
        };
        RepeatStream.prototype.subscribeCore = function (observer) {
            var self = this, d = wdFrp.GroupDisposable.create();
            function loopRecursive(count) {
                if (count === 0) {
                    observer.completed();
                    return;
                }
                d.add(self._source.buildStream(wdFrp.ConcatObserver.create(observer, function () {
                    loopRecursive(count - 1);
                })));
            }
            this.scheduler.publishRecursive(observer, this._count, loopRecursive);
            return wdFrp.GroupDisposable.create(d);
        };
        return RepeatStream;
    })(wdFrp.BaseStream);
    wdFrp.RepeatStream = RepeatStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var IgnoreElementsStream = (function (_super) {
        __extends(IgnoreElementsStream, _super);
        function IgnoreElementsStream(source) {
            _super.call(this, null);
            this._source = null;
            this._source = source;
            this.scheduler = this._source.scheduler;
        }
        IgnoreElementsStream.create = function (source) {
            var obj = new this(source);
            return obj;
        };
        IgnoreElementsStream.prototype.subscribeCore = function (observer) {
            return this._source.buildStream(wdFrp.IgnoreElementsObserver.create(observer));
        };
        return IgnoreElementsStream;
    })(wdFrp.BaseStream);
    wdFrp.IgnoreElementsStream = IgnoreElementsStream;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var DeferStream = (function (_super) {
        __extends(DeferStream, _super);
        function DeferStream(buildStreamFunc) {
            _super.call(this, null);
            this._buildStreamFunc = null;
            this._buildStreamFunc = buildStreamFunc;
        }
        DeferStream.create = function (buildStreamFunc) {
            var obj = new this(buildStreamFunc);
            return obj;
        };
        DeferStream.prototype.subscribeCore = function (observer) {
            var group = wdFrp.GroupDisposable.create();
            group.add(this._buildStreamFunc().buildStream(observer));
            return group;
        };
        return DeferStream;
    })(wdFrp.BaseStream);
    wdFrp.DeferStream = DeferStream;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    wdFrp.createStream = function (subscribeFunc) {
        return wdFrp.AnonymousStream.create(subscribeFunc);
    };
    wdFrp.fromArray = function (array, scheduler) {
        if (scheduler === void 0) { scheduler = wdFrp.Scheduler.create(); }
        return wdFrp.FromArrayStream.create(array, scheduler);
    };
    wdFrp.fromPromise = function (promise, scheduler) {
        if (scheduler === void 0) { scheduler = wdFrp.Scheduler.create(); }
        return wdFrp.FromPromiseStream.create(promise, scheduler);
    };
    wdFrp.fromEventPattern = function (addHandler, removeHandler) {
        return wdFrp.FromEventPatternStream.create(addHandler, removeHandler);
    };
    wdFrp.interval = function (interval, scheduler) {
        if (scheduler === void 0) { scheduler = wdFrp.Scheduler.create(); }
        return wdFrp.IntervalStream.create(interval, scheduler);
    };
    wdFrp.intervalRequest = function (scheduler) {
        if (scheduler === void 0) { scheduler = wdFrp.Scheduler.create(); }
        return wdFrp.IntervalRequestStream.create(scheduler);
    };
    wdFrp.empty = function () {
        return wdFrp.createStream(function (observer) {
            observer.completed();
        });
    };
    wdFrp.callFunc = function (func, context) {
        if (context === void 0) { context = wdFrp.root; }
        return wdFrp.createStream(function (observer) {
            try {
                observer.next(func.call(context, null));
            }
            catch (e) {
                observer.error(e);
            }
            observer.completed();
        });
    };
    wdFrp.judge = function (condition, thenSource, elseSource) {
        return condition() ? thenSource() : elseSource();
    };
    wdFrp.defer = function (buildStreamFunc) {
        return wdFrp.DeferStream.create(buildStreamFunc);
    };
    wdFrp.just = function (returnValue) {
        return wdFrp.createStream(function (observer) {
            observer.next(returnValue);
            observer.completed();
        });
    };
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var defaultIsEqual = function (a, b) {
        return a === b;
    };
    var Record = (function () {
        function Record(time, value, actionType, comparer) {
            this._time = null;
            this._value = null;
            this._actionType = null;
            this._comparer = null;
            this._time = time;
            this._value = value;
            this._actionType = actionType;
            this._comparer = comparer || defaultIsEqual;
        }
        Record.create = function (time, value, actionType, comparer) {
            var obj = new this(time, value, actionType, comparer);
            return obj;
        };
        Object.defineProperty(Record.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (time) {
                this._time = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Record.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Record.prototype, "actionType", {
            get: function () {
                return this._actionType;
            },
            set: function (actionType) {
                this._actionType = actionType;
            },
            enumerable: true,
            configurable: true
        });
        Record.prototype.equals = function (other) {
            return this._time === other.time && this._comparer(this._value, other.value);
        };
        return Record;
    })();
    wdFrp.Record = Record;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var MockObserver = (function (_super) {
        __extends(MockObserver, _super);
        function MockObserver(scheduler) {
            _super.call(this, null, null, null);
            this._messages = [];
            this._scheduler = null;
            this._scheduler = scheduler;
        }
        MockObserver.create = function (scheduler) {
            var obj = new this(scheduler);
            return obj;
        };
        Object.defineProperty(MockObserver.prototype, "messages", {
            get: function () {
                return this._messages;
            },
            set: function (messages) {
                this._messages = messages;
            },
            enumerable: true,
            configurable: true
        });
        MockObserver.prototype.onNext = function (value) {
            this._messages.push(wdFrp.Record.create(this._scheduler.clock, value));
        };
        MockObserver.prototype.onError = function (error) {
            this._messages.push(wdFrp.Record.create(this._scheduler.clock, error));
        };
        MockObserver.prototype.onCompleted = function () {
            this._messages.push(wdFrp.Record.create(this._scheduler.clock, null));
        };
        MockObserver.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._scheduler.remove(this);
        };
        MockObserver.prototype.copy = function () {
            var result = MockObserver.create(this._scheduler);
            result.messages = this._messages;
            return result;
        };
        return MockObserver;
    })(wdFrp.Observer);
    wdFrp.MockObserver = MockObserver;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    var MockPromise = (function () {
        function MockPromise(scheduler, messages) {
            this._messages = [];
            this._scheduler = null;
            this._scheduler = scheduler;
            this._messages = messages;
        }
        MockPromise.create = function (scheduler, messages) {
            var obj = new this(scheduler, messages);
            return obj;
        };
        MockPromise.prototype.then = function (successCb, errorCb, observer) {
            //var scheduler = <TestScheduler>(this.scheduler);
            this._scheduler.setStreamMap(observer, this._messages);
        };
        return MockPromise;
    })();
    wdFrp.MockPromise = MockPromise;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var SUBSCRIBE_TIME = 200;
    var DISPOSE_TIME = 1000;
    var TestScheduler = (function (_super) {
        __extends(TestScheduler, _super);
        function TestScheduler(isReset) {
            _super.call(this);
            this._clock = null;
            this._isReset = false;
            this._isDisposed = false;
            this._timerMap = wdCb.Hash.create();
            this._streamMap = wdCb.Hash.create();
            this._subscribedTime = null;
            this._disposedTime = null;
            this._observer = null;
            this._isReset = isReset;
        }
        TestScheduler.next = function (tick, value) {
            return wdFrp.Record.create(tick, value, wdFrp.ActionType.NEXT);
        };
        TestScheduler.error = function (tick, error) {
            return wdFrp.Record.create(tick, error, wdFrp.ActionType.ERROR);
        };
        TestScheduler.completed = function (tick) {
            return wdFrp.Record.create(tick, null, wdFrp.ActionType.COMPLETED);
        };
        TestScheduler.create = function (isReset) {
            if (isReset === void 0) { isReset = false; }
            var obj = new this(isReset);
            return obj;
        };
        Object.defineProperty(TestScheduler.prototype, "clock", {
            get: function () {
                return this._clock;
            },
            set: function (clock) {
                this._clock = clock;
            },
            enumerable: true,
            configurable: true
        });
        TestScheduler.prototype.setStreamMap = function (observer, messages) {
            var self = this;
            messages.forEach(function (record) {
                var func = null;
                switch (record.actionType) {
                    case wdFrp.ActionType.NEXT:
                        func = function () {
                            observer.next(record.value);
                        };
                        break;
                    case wdFrp.ActionType.ERROR:
                        func = function () {
                            observer.error(record.value);
                        };
                        break;
                    case wdFrp.ActionType.COMPLETED:
                        func = function () {
                            observer.completed();
                        };
                        break;
                    default:
                        wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW("actionType"));
                        break;
                }
                self._streamMap.addChild(String(record.time), func);
            });
        };
        TestScheduler.prototype.remove = function (observer) {
            this._isDisposed = true;
        };
        TestScheduler.prototype.publishRecursive = function (observer, initial, recursiveFunc) {
            var self = this, next = null, completed = null;
            this._setClock();
            next = observer.next;
            completed = observer.completed;
            observer.next = function (value) {
                next.call(observer, value);
                self._tick(1);
            };
            observer.completed = function () {
                completed.call(observer);
                self._tick(1);
            };
            recursiveFunc(initial);
        };
        TestScheduler.prototype.publishInterval = function (observer, initial, interval, action) {
            var COUNT = 10, messages = [];
            this._setClock();
            while (COUNT > 0 && !this._isDisposed) {
                this._tick(interval);
                messages.push(TestScheduler.next(this._clock, initial));
                initial++;
                COUNT--;
            }
            this.setStreamMap(observer, messages);
            return NaN;
        };
        TestScheduler.prototype.publishIntervalRequest = function (observer, action) {
            var COUNT = 10, messages = [], interval = 100, num = 0;
            this._setClock();
            while (COUNT > 0 && !this._isDisposed) {
                this._tick(interval);
                messages.push(TestScheduler.next(this._clock, num));
                num++;
                COUNT--;
            }
            this.setStreamMap(observer, messages);
            return NaN;
        };
        TestScheduler.prototype._setClock = function () {
            if (this._isReset) {
                this._clock = this._subscribedTime;
            }
        };
        TestScheduler.prototype.startWithTime = function (create, subscribedTime, disposedTime) {
            var observer = this.createObserver(), source, subscription, self = this;
            this._subscribedTime = subscribedTime;
            this._disposedTime = disposedTime;
            this._clock = subscribedTime;
            this._runAt(subscribedTime, function () {
                source = create();
                subscription = source.subscribe(observer);
            });
            this._runAt(disposedTime, function () {
                subscription.dispose();
                self._isDisposed = true;
            });
            this._observer = observer;
            this.start();
            return observer;
        };
        TestScheduler.prototype.startWithSubscribe = function (create, subscribedTime) {
            if (subscribedTime === void 0) { subscribedTime = SUBSCRIBE_TIME; }
            return this.startWithTime(create, subscribedTime, DISPOSE_TIME);
        };
        TestScheduler.prototype.startWithDispose = function (create, disposedTime) {
            if (disposedTime === void 0) { disposedTime = DISPOSE_TIME; }
            return this.startWithTime(create, SUBSCRIBE_TIME, disposedTime);
        };
        TestScheduler.prototype.publicAbsolute = function (time, handler) {
            this._runAt(time, function () {
                handler();
            });
        };
        TestScheduler.prototype.start = function () {
            var extremeNumArr = this._getMinAndMaxTime(), min = extremeNumArr[0], max = extremeNumArr[1], time = min;
            while (time <= max) {
                this._clock = time;
                this._exec(time, this._timerMap);
                this._clock = time;
                this._runStream(time);
                time++;
                max = this._getMinAndMaxTime()[1];
            }
        };
        TestScheduler.prototype.createStream = function (args) {
            return wdFrp.TestStream.create(Array.prototype.slice.call(arguments, 0), this);
        };
        TestScheduler.prototype.createObserver = function () {
            return wdFrp.MockObserver.create(this);
        };
        TestScheduler.prototype.createResolvedPromise = function (time, value) {
            return wdFrp.MockPromise.create(this, [TestScheduler.next(time, value), TestScheduler.completed(time + 1)]);
        };
        TestScheduler.prototype.createRejectPromise = function (time, error) {
            return wdFrp.MockPromise.create(this, [TestScheduler.error(time, error)]);
        };
        TestScheduler.prototype._getMinAndMaxTime = function () {
            var timeArr = (this._timerMap.getKeys().addChildren(this._streamMap.getKeys()));
            timeArr = timeArr.map(function (key) {
                return Number(key);
            }).toArray();
            return [Math.min.apply(Math, timeArr), Math.max.apply(Math, timeArr)];
        };
        TestScheduler.prototype._exec = function (time, map) {
            var handler = map.getChild(String(time));
            if (handler) {
                handler();
            }
        };
        TestScheduler.prototype._runStream = function (time) {
            var handler = this._streamMap.getChild(String(time));
            if (handler) {
                handler();
            }
        };
        TestScheduler.prototype._runAt = function (time, callback) {
            this._timerMap.addChild(String(time), callback);
        };
        TestScheduler.prototype._tick = function (time) {
            this._clock += time;
        };
        return TestScheduler;
    })(wdFrp.Scheduler);
    wdFrp.TestScheduler = TestScheduler;
})(wdFrp || (wdFrp = {}));

var wdFrp;
(function (wdFrp) {
    (function (ActionType) {
        ActionType[ActionType["NEXT"] = 0] = "NEXT";
        ActionType[ActionType["ERROR"] = 1] = "ERROR";
        ActionType[ActionType["COMPLETED"] = 2] = "COMPLETED";
    })(wdFrp.ActionType || (wdFrp.ActionType = {}));
    var ActionType = wdFrp.ActionType;
})(wdFrp || (wdFrp = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wdFrp;
(function (wdFrp) {
    var TestStream = (function (_super) {
        __extends(TestStream, _super);
        function TestStream(messages, scheduler) {
            _super.call(this, null);
            this.scheduler = null;
            this._messages = null;
            this._messages = messages;
            this.scheduler = scheduler;
        }
        TestStream.create = function (messages, scheduler) {
            var obj = new this(messages, scheduler);
            return obj;
        };
        TestStream.prototype.subscribeCore = function (observer) {
            //var scheduler = <TestScheduler>(this.scheduler);
            this.scheduler.setStreamMap(observer, this._messages);
            return wdFrp.SingleDisposable.create();
        };
        return TestStream;
    })(wdFrp.BaseStream);
    wdFrp.TestStream = TestStream;
})(wdFrp || (wdFrp = {}));


var wdFrp;
(function (wdFrp) {
    wdFrp.fromNodeCallback = function (func, context) {
        return function () {
            var funcArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                funcArgs[_i - 0] = arguments[_i];
            }
            return wdFrp.createStream(function (observer) {
                var hander = function (err) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (err) {
                        observer.error(err);
                        return;
                    }
                    if (args.length <= 1) {
                        observer.next.apply(observer, args);
                    }
                    else {
                        observer.next(args);
                    }
                    observer.completed();
                };
                funcArgs.push(hander);
                func.apply(context, funcArgs);
            });
        };
    };
    wdFrp.fromStream = function (stream, finishEventName) {
        if (finishEventName === void 0) { finishEventName = "end"; }
        stream.pause();
        return wdFrp.createStream(function (observer) {
            var dataHandler = function (data) {
                observer.next(data);
            }, errorHandler = function (err) {
                observer.error(err);
            }, endHandler = function () {
                observer.completed();
            };
            stream.addListener("data", dataHandler);
            stream.addListener("error", errorHandler);
            stream.addListener(finishEventName, endHandler);
            stream.resume();
            return function () {
                stream.removeListener("data", dataHandler);
                stream.removeListener("error", errorHandler);
                stream.removeListener(finishEventName, endHandler);
            };
        });
    };
    wdFrp.fromReadableStream = function (stream) {
        return wdFrp.fromStream(stream, "end");
    };
    wdFrp.fromWritableStream = function (stream) {
        return wdFrp.fromStream(stream, "finish");
    };
    wdFrp.fromTransformStream = function (stream) {
        return wdFrp.fromStream(stream, "finish");
    };
})(wdFrp || (wdFrp = {}));


var wd;
(function (wd) {
    wd.Config = {
        isTest: false
    };
})(wd || (wd = {}));


var wdFrp;
(function (wdFrp) {
    wdFrp.fromCollection = function (collection, scheduler) {
        if (scheduler === void 0) { scheduler = wdFrp.Scheduler.create(); }
        var arr = collection.toArray();
        return arr.length === 0 ? wdFrp.empty() : wdFrp.fromArray(arr, scheduler);
    };
})(wdFrp || (wdFrp = {}));


var wd;
(function (wd) {
    function assert(cond, message) {
        if (message === void 0) { message = "contract error"; }
        wd.Log.error(!cond, message);
    }
    wd.assert = assert;
    function require(InFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (wd.Main.isTest) {
                    InFunc.apply(this, args);
                }
                return value.apply(this, args);
            };
            return descriptor;
        };
    }
    wd.require = require;
    function ensure(OutFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var result = value.apply(this, args), params = [result].concat(args);
                if (wd.Main.isTest) {
                    OutFunc.apply(this, params);
                }
                return result;
            };
            return descriptor;
        };
    }
    wd.ensure = ensure;
    function requireGetter(InFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;
            descriptor.get = function () {
                if (wd.Main.isTest) {
                    InFunc.call(this);
                }
                return getter.call(this);
            };
            return descriptor;
        };
    }
    wd.requireGetter = requireGetter;
    function requireSetter(InFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;
            descriptor.set = function (val) {
                if (wd.Main.isTest) {
                    InFunc.call(this, val);
                }
                setter.call(this, val);
            };
            return descriptor;
        };
    }
    wd.requireSetter = requireSetter;
    function ensureGetter(OutFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;
            descriptor.get = function () {
                var result = getter.call(this);
                if (wd.Main.isTest) {
                    OutFunc.call(this, result);
                }
                return result;
            };
            return descriptor;
        };
    }
    wd.ensureGetter = ensureGetter;
    function ensureSetter(OutFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;
            descriptor.set = function (val) {
                var result = setter.call(this, val), params = [result, val];
                if (wd.Main.isTest) {
                    OutFunc.apply(this, params);
                }
            };
            return descriptor;
        };
    }
    wd.ensureSetter = ensureSetter;
    function invariant(func) {
        return function (target) {
            if (wd.Main.isTest) {
                func(target);
            }
        };
    }
    wd.invariant = invariant;
})(wd || (wd = {}));


var wd;
(function (wd) {
    function cacheGetter(judgeFunc, returnCacheValueFunc, setCacheFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;
            descriptor.get = function () {
                var result = null;
                if (judgeFunc.call(this)) {
                    return returnCacheValueFunc.call(this);
                }
                result = getter.call(this);
                setCacheFunc.call(this, result);
                return result;
            };
            return descriptor;
        };
    }
    wd.cacheGetter = cacheGetter;
    function cache(judgeFunc, returnCacheValueFunc, setCacheFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var result = null;
                if (judgeFunc.apply(this, args)) {
                    return returnCacheValueFunc.apply(this, args);
                }
                result = value.apply(this, args);
                setCacheFunc.apply(this, [result].concat(args));
                return result;
            };
            return descriptor;
        };
    }
    wd.cache = cache;
})(wd || (wd = {}));


var wd;
(function (wd) {
    function virtual(target, name, descriptor) {
        return descriptor;
    }
    wd.virtual = virtual;
})(wd || (wd = {}));

var wd;
(function (wd) {
    wd.ABSTRACT_ATTRIBUTE = null;
})(wd || (wd = {}));


var wd;
(function (wd) {
    Object.defineProperty(wd, "root", {
        get: function () {
            if (wd.JudgeUtils.isNodeJs()) {
                return global;
            }
            return window;
        }
    });
})(wd || (wd = {}));

var wd;
(function (wd) {
    var Entity = (function () {
        function Entity() {
            this.uid = null;
            this.uid = Entity._count;
            Entity._count += 1;
        }
        Entity._count = 1;
        return Entity;
    })();
    wd.Entity = Entity;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.apply(this, arguments);
            this.gameObject = null;
        }
        Component.prototype.init = function () {
        };
        Component.prototype.dispose = function () {
        };
        Object.defineProperty(Component.prototype, "transform", {
            get: function () {
                if (!this.gameObject) {
                    return null;
                }
                return this.gameObject.transform;
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.addToGameObject = function (gameObject) {
            if (this.gameObject) {
                this.gameObject.removeComponent(this);
            }
            this.gameObject = gameObject;
        };
        Component.prototype.removeFromGameObject = function (gameObject) {
            this.gameObject = null;
        };
        Object.defineProperty(Component.prototype, "init",
            __decorate([
                wd.virtual
            ], Component.prototype, "init", Object.getOwnPropertyDescriptor(Component.prototype, "init")));
        Object.defineProperty(Component.prototype, "dispose",
            __decorate([
                wd.virtual
            ], Component.prototype, "dispose", Object.getOwnPropertyDescriptor(Component.prototype, "dispose")));
        return Component;
    })(wd.Entity);
    wd.Component = Component;
})(wd || (wd = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wd;
(function (wd) {
    var Transform = (function (_super) {
        __extends(Transform, _super);
        function Transform(gameObject) {
            _super.call(this);
            this._localToParentMatrix = wd.Matrix4.create();
            this._localToWorldMatrix = null;
            this._parent = null;
            this._position = wd.Vector3.create();
            this._rotation = wd.Quaternion.create(0, 0, 0, 1);
            this._scale = wd.Vector3.create(1, 1, 1);
            this._eulerAngles = null;
            this._localPosition = wd.Vector3.create(0, 0, 0);
            this._localRotation = wd.Quaternion.create(0, 0, 0, 1);
            this._localEulerAngles = null;
            this._localScale = wd.Vector3.create(1, 1, 1);
            this.dirtyWorld = null;
            this.dirtyLocal = true;
            this._children = wdCb.Collection.create();
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Transform.create = function (gameObject) {
            var obj = new this(gameObject);
            return obj;
        };
        Object.defineProperty(Transform.prototype, "localToParentMatrix", {
            get: function () {
                if (this.dirtyLocal) {
                    this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
                    this.dirtyLocal = false;
                    this.dirtyWorld = true;
                }
                return this._localToParentMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localToWorldMatrix", {
            get: function () {
                var syncList = wdCb.Collection.create(), current = this;
                while (current !== null) {
                    syncList.addChild(current);
                    current = current.parent;
                }
                syncList.reverse().forEach(function (transform) {
                    transform.sync();
                });
                return this._localToWorldMatrix;
            },
            set: function (localToWorldMatrix) {
                this._localToWorldMatrix = localToWorldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                if (this._parent) {
                    this._parent.removeChild(this);
                }
                if (!parent) {
                    this._parent = null;
                    return;
                }
                this._parent = parent;
                this._parent.addChild(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "position", {
            get: function () {
                this._position = this.localToWorldMatrix.getTranslation();
                return this._position;
            },
            set: function (position) {
                if (this._parent === null) {
                    this._localPosition = position.copy();
                }
                else {
                    this._localPosition = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(position);
                }
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "rotation", {
            get: function () {
                this._rotation.setFromMatrix(this.localToWorldMatrix);
                return this._rotation;
            },
            set: function (rotation) {
                if (this._parent === null) {
                    this._localRotation = rotation.copy();
                }
                else {
                    this._localRotation = this._parent.rotation.copy().invert().multiply(rotation);
                }
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scale", {
            get: function () {
                this._scale = this.localToWorldMatrix.getScale();
                return this._scale;
            },
            set: function (scale) {
                if (this._parent === null) {
                    this._localScale = scale.copy();
                }
                else {
                    this._localScale = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(scale);
                }
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "eulerAngles", {
            get: function () {
                this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
                return this._eulerAngles;
            },
            set: function (eulerAngles) {
                this._localRotation.setFromEulerAngles(eulerAngles);
                if (this._parent !== null) {
                    this._localRotation = this._parent.rotation.copy().invert().multiply(this._localRotation);
                }
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localPosition", {
            get: function () {
                return this._localPosition;
            },
            set: function (position) {
                this._localPosition = position.copy();
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotation", {
            get: function () {
                return this._localRotation;
            },
            set: function (rotation) {
                this._localRotation = rotation.copy();
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localEulerAngles", {
            get: function () {
                this._localEulerAngles = this._localRotation.getEulerAngles();
                return this._localEulerAngles;
            },
            set: function (localEulerAngles) {
                this._localRotation.setFromEulerAngles(localEulerAngles);
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScale", {
            get: function () {
                return this._localScale;
            },
            set: function (scale) {
                this._localScale = scale.copy();
                this.dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "up", {
            get: function () {
                return this.localToWorldMatrix.getY().normalize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "right", {
            get: function () {
                return this.localToWorldMatrix.getX().normalize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "forward", {
            get: function () {
                return this.localToWorldMatrix.getZ().normalize().scale(-1);
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.addChild = function (child) {
            this._children.addChild(child);
        };
        Transform.prototype.removeChild = function (child) {
            this._children.removeChild(child);
        };
        Transform.prototype.sync = function () {
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }
            if (this.dirtyWorld) {
                if (this._parent === null) {
                    this._localToWorldMatrix = this._localToParentMatrix.copy();
                }
                else {
                    this._localToWorldMatrix = this._parent.localToWorldMatrix.copy().multiply(this._localToParentMatrix);
                }
                this.dirtyWorld = false;
                this._children.forEach(function (child) {
                    child.dirtyWorld = true;
                });
            }
        };
        Transform.prototype.translateLocal = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var translation = null;
            if (args.length === 3) {
                translation = wd.Vector3.create(args[0], args[1], args[2]);
            }
            else {
                translation = args[0];
            }
            this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));
            this.dirtyLocal = true;
            return this;
        };
        Transform.prototype.translate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var translation = null;
            if (args.length === 3) {
                translation = wd.Vector3.create(args[0], args[1], args[2]);
            }
            else {
                translation = args[0];
            }
            this.position = translation.add(this.position);
            return this;
        };
        Transform.prototype.rotate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var eulerAngles = null, quaternion = wd.Quaternion.create();
            if (args.length === 3) {
                eulerAngles = wd.Vector3.create(args[0], args[1], args[2]);
            }
            else {
                eulerAngles = args[0];
            }
            quaternion.setFromEulerAngles(eulerAngles);
            if (this._parent === null) {
                this._localRotation = quaternion.multiply(this._localRotation);
            }
            else {
                quaternion = this._parent.rotation.copy().invert().multiply(quaternion);
                this._localRotation = quaternion.multiply(this.rotation);
            }
            this.dirtyLocal = true;
            return this;
        };
        Transform.prototype.rotateLocal = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var eulerAngles = null, quaternion = wd.Quaternion.create();
            if (args.length === 3) {
                eulerAngles = wd.Vector3.create(args[0], args[1], args[2]);
            }
            else {
                eulerAngles = args[0];
            }
            quaternion.setFromEulerAngles(eulerAngles);
            this._localRotation.multiply(quaternion);
            this.dirtyLocal = true;
            return this;
        };
        Transform.prototype.rotateAround = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var angle = null, center = null, axis = null, rot = null, dir = null;
            if (args.length === 3) {
                angle = args[0];
                center = args[1];
                axis = args[2];
            }
            else {
                angle = args[0];
                center = wd.Vector3.create(args[1], args[2], args[3]);
                axis = wd.Vector3.create(args[4], args[5], args[6]);
            }
            rot = wd.Quaternion.create().setFromAxisAngle(angle, axis);
            dir = this.position.copy().sub(center);
            dir = rot.multiplyVector3(dir);
            this.position = center.add(dir);
            this.rotation = rot.multiply(this.rotation);
            return this;
        };
        Transform.prototype.lookAt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var target = null, up = null;
            if (args.length === 1) {
                target = args[0];
                up = wd.Vector3.up;
            }
            else if (args.length === 2) {
                target = args[0];
                up = args[1];
            }
            else if (args.length === 3) {
                target = wd.Vector3.create(args[0], args[1], args[2]);
                up = wd.Vector3.up;
            }
            else {
                target = wd.Vector3.create(args[0], args[1], args[2]);
                up = wd.Vector3.create(args[3], args[4], args[5]);
            }
            this.rotation = wd.Quaternion.create().setFromMatrix(wd.Matrix4.create().setLookAt(this.position, target, up));
            return this;
        };
        return Transform;
    })(wd.Entity);
    wd.Transform = Transform;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            _super.apply(this, arguments);
            this._script = wdCb.Hash.create();
            this.parent = null;
            this.bubbleParent = null;
            this.transform = wd.Transform.create(this);
            this.name = "gameObject" + String(this.uid);
            this.actionManager = wd.ActionManager.create();
            this._children = wdCb.Collection.create();
            this._components = wdCb.Collection.create();
            this._startLoopHandler = null;
            this._endLoopHandler = null;
        }
        GameObject.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(GameObject.prototype, "script", {
            get: function () {
                return this._script;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.init = function () {
            var _this = this;
            this._startLoopHandler = wdCb.FunctionUtils.bind(this, function () {
                _this.onStartLoop();
            });
            this._endLoopHandler = wdCb.FunctionUtils.bind(this, function () {
                _this.onEndLoop();
            });
            wd.EventManager.on(wd.EngineEvent.STARTLOOP, this._startLoopHandler);
            wd.EventManager.on(wd.EngineEvent.ENDLOOP, this._endLoopHandler);
            this._components.forEach(function (component) {
                component.init();
            });
            this._execScript("init");
            this.forEach(function (child) {
                child.init();
            });
            return this;
        };
        GameObject.prototype.onStartLoop = function () {
            this._execScript("onStartLoop");
        };
        GameObject.prototype.onEndLoop = function () {
            this._execScript("onEndLoop");
        };
        GameObject.prototype.onEnter = function () {
            this._execScript("onEnter");
        };
        GameObject.prototype.onExit = function () {
            this._execScript("onExit");
        };
        GameObject.prototype.onDispose = function () {
            this._execScript("onDispose");
        };
        GameObject.prototype.dispose = function () {
            this._execScript("onDispose");
            if (this.parent) {
                this.parent.removeChild(this);
                this.parent = null;
            }
            wd.EventManager.off(this);
            wd.EventManager.off(wd.EngineEvent.STARTLOOP, this._startLoopHandler);
            wd.EventManager.off(wd.EngineEvent.ENDLOOP, this._endLoopHandler);
            this._components.forEach(function (component) {
                component.dispose();
            });
            this.forEach(function (child) {
                child.dispose();
            });
        };
        GameObject.prototype.hasChild = function (child) {
            return this._children.hasChild(child);
        };
        GameObject.prototype.addChild = function (child) {
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            child.transform.parent = this.transform;
            this._children.addChild(child);
            /*!
            no need to sort!
            because WebGLRenderer enable depth test, it will sort when needed(just as WebGLRenderer->renderSortedTransparentCommands sort the commands)
             */
            child.onEnter();
            return this;
        };
        GameObject.prototype.addChildren = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._children.addChildren(args[0]);
            return this;
        };
        GameObject.prototype.sort = function () {
            this._children = this._children.sort(this._ascendZ);
            return this;
        };
        GameObject.prototype.forEach = function (func) {
            this._children.forEach(func);
            return this;
        };
        GameObject.prototype.getChildren = function () {
            return this._children;
        };
        GameObject.prototype.getChild = function (index) {
            return this._children.getChild(index);
        };
        GameObject.prototype.findChildByUid = function (uid) {
            return this._children.findOne(function (child) {
                return child.uid === uid;
            });
        };
        GameObject.prototype.findChildByName = function (name) {
            return this._children.findOne(function (child) {
                return child.name.search(name) > -1;
            });
        };
        GameObject.prototype.findChildrenByName = function (name) {
            return this._children.filter(function (child) {
                return child.name.search(name) > -1;
            });
        };
        GameObject.prototype.getComponent = function (_class) {
            return this._components.findOne(function (component) {
                return component instanceof _class;
            });
        };
        GameObject.prototype.findComponentByUid = function (uid) {
            return this._components.findOne(function (component) {
                return component.uid === uid;
            });
        };
        GameObject.prototype.getFirstComponent = function () {
            return this._components.getChild(0);
        };
        GameObject.prototype.removeChild = function (child) {
            child.onExit();
            this._children.removeChild(child);
            child.parent = null;
            return this;
        };
        GameObject.prototype.getTopUnderPoint = function (point) {
            var result = null;
            this._children.copy().reverse().forEach(function (child) {
                result = child.getTopUnderPoint(point);
                if (result) {
                    return wdCb.$BREAK;
                }
            });
            if (result) {
                return result;
            }
            if (this.isHit(point)) {
                return this;
            }
            return null;
        };
        GameObject.prototype.isHit = function (locationInView) {
            var collider = this._getCollider();
            return collider ? collider.collideXY(locationInView.x, locationInView.y) : false;
        };
        GameObject.prototype.hasComponent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args[0] instanceof wd.Component) {
                var component = args[0];
                return this._components.hasChild(component);
            }
            else {
                var _class = args[0];
                return this._components.hasChild(function (component) {
                    return component instanceof _class;
                });
            }
        };
        GameObject.prototype.addComponent = function (component) {
            if (this.hasComponent(component)) {
                wd.Log.assert(false, "the component already exist");
                return this;
            }
            this._components.addChild(component);
            component.addToGameObject(this);
            return this;
        };
        GameObject.prototype.removeComponent = function (component) {
            this._components.removeChild(component);
            component.removeFromGameObject(this);
            return this;
        };
        GameObject.prototype.render = function (renderer, camera) {
            var geometry = this._getGeometry(), rendererComponent = this._getRendererComponent();
            if (rendererComponent && geometry) {
                rendererComponent.render(renderer, geometry, camera);
            }
            this._children.forEach(function (child) {
                child.render(renderer, camera);
            });
        };
        GameObject.prototype.update = function (time) {
            var camera = this._getCamera(), animation = this._getAnimation();
            if (camera) {
                camera.update(time);
            }
            if (animation) {
                animation.update(time);
            }
            this.actionManager.update(time);
            this._execScript("update", time);
            this._children.forEach(function (child) {
                child.update(time);
            });
        };
        GameObject.prototype._ascendZ = function (a, b) {
            return a.transform.position.z - b.transform.position.z;
        };
        GameObject.prototype._execScript = function (method, arg) {
            this._script.forEach(function (script) {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
        };
        GameObject.prototype._getGeometry = function () {
            return this.getComponent(wd.Geometry);
        };
        GameObject.prototype._getCollider = function () {
            return this.getComponent(wd.Collider);
        };
        GameObject.prototype._getCamera = function () {
            return this.getComponent(wd.CameraController);
        };
        GameObject.prototype._getAnimation = function () {
            return this.getComponent(wd.Animation);
        };
        GameObject.prototype._getRendererComponent = function () {
            return this.getComponent(wd.RendererComponent);
        };
        GameObject.prototype._getComponentCount = function (_class) {
            return this._components.filter(function (component) {
                return component instanceof _class;
            }).getCount();
        };
        Object.defineProperty(GameObject.prototype, "_getGeometry",
            __decorate([
                wd.require(function () {
                    wd.assert(this._getComponentCount(wd.Geometry) <= 1, wd.Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 geometry component"));
                })
            ], GameObject.prototype, "_getGeometry", Object.getOwnPropertyDescriptor(GameObject.prototype, "_getGeometry")));
        Object.defineProperty(GameObject.prototype, "_getCollider",
            __decorate([
                wd.require(function () {
                    wd.assert(this._getComponentCount(wd.Collider) <= 1, wd.Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 collider component"));
                })
            ], GameObject.prototype, "_getCollider", Object.getOwnPropertyDescriptor(GameObject.prototype, "_getCollider")));
        Object.defineProperty(GameObject.prototype, "_getCamera",
            __decorate([
                wd.require(function () {
                    wd.assert(this._getComponentCount(wd.CameraController) <= 1, wd.Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 camera controller"));
                })
            ], GameObject.prototype, "_getCamera", Object.getOwnPropertyDescriptor(GameObject.prototype, "_getCamera")));
        Object.defineProperty(GameObject.prototype, "_getAnimation",
            __decorate([
                wd.require(function () {
                    wd.assert(this._getComponentCount(wd.Animation) <= 1, wd.Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 animation component"));
                })
            ], GameObject.prototype, "_getAnimation", Object.getOwnPropertyDescriptor(GameObject.prototype, "_getAnimation")));
        Object.defineProperty(GameObject.prototype, "_getRendererComponent",
            __decorate([
                wd.require(function () {
                    wd.assert(this._getComponentCount(wd.RendererComponent) <= 1, wd.Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 rendererComponent"));
                })
            ], GameObject.prototype, "_getRendererComponent", Object.getOwnPropertyDescriptor(GameObject.prototype, "_getRendererComponent")));
        return GameObject;
    })(wd.Entity);
    wd.GameObject = GameObject;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Scheduler = (function () {
        function Scheduler() {
            this._scheduleCount = 0;
            this._schedules = wdCb.Hash.create();
        }
        Scheduler.create = function () {
            var obj = new this();
            return obj;
        };
        Scheduler.prototype.update = function (time) {
            var _this = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                if (scheduleItem.isStop || scheduleItem.isPause) {
                    return;
                }
                scheduleItem.update(time);
                if (scheduleItem.isFinish) {
                    _this.remove(scheduleId);
                }
            });
        };
        Scheduler.prototype.scheduleLoop = function (task, args) {
            if (args === void 0) { args = []; }
            return this._schedule(LoopScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleFrame = function (task, frame, args) {
            if (frame === void 0) { frame = 1; }
            return this._schedule(FrameScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleInterval = function (task, time, args) {
            if (time === void 0) { time = 0; }
            return this._schedule(IntervalScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleTime = function (task, time, args) {
            if (time === void 0) { time = 0; }
            return this._schedule(TimeScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.pause = function (scheduleId) {
            if (arguments.length === 0) {
                var self_1 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_1.pause(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.pause();
            }
        };
        Scheduler.prototype.resume = function (scheduleId) {
            if (arguments.length === 0) {
                var self_2 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_2.resume(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.resume();
            }
        };
        Scheduler.prototype.start = function (scheduleId) {
            if (arguments.length === 0) {
                var self_3 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_3.start(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.start();
            }
        };
        Scheduler.prototype.stop = function (scheduleId) {
            if (arguments.length === 0) {
                var self_4 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_4.stop(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.stop();
            }
        };
        Scheduler.prototype.has = function (scheduleId) {
            return !!this._schedules.hasChild(scheduleId);
        };
        Scheduler.prototype.remove = function (scheduleId) {
            this._schedules.removeChild(scheduleId);
        };
        Scheduler.prototype.removeAll = function () {
            this._schedules.removeAllChildren();
        };
        Scheduler.prototype._schedule = function (_class, args) {
            var scheduleId = this._buildId();
            this._schedules.setValue(scheduleId, _class.create.apply(_class, args));
            return scheduleId;
        };
        Scheduler.prototype._buildId = function () {
            return 'Schedule_' + (this._scheduleCount++);
        };
        return Scheduler;
    })();
    wd.Scheduler = Scheduler;
    var ScheduleItem = (function () {
        function ScheduleItem(task, args) {
            this.isPause = false;
            this.isStop = false;
            this.pauseTime = null;
            this.pauseElapsed = null;
            this.startTime = null;
            this.isFinish = false;
            this.task = null;
            this.args = null;
            this.timeController = wd.CommonTimeController.create();
            this.task = task;
            this.args = args;
        }
        ScheduleItem.prototype.pause = function () {
            this.isPause = true;
            this.timeController.pause();
        };
        ScheduleItem.prototype.resume = function () {
            this.isPause = false;
            this.timeController.resume();
        };
        ScheduleItem.prototype.start = function () {
            this.isStop = false;
            this.timeController.start();
        };
        ScheduleItem.prototype.stop = function () {
            this.isStop = true;
            this.timeController.stop();
        };
        ScheduleItem.prototype.finish = function () {
            this.isFinish = true;
        };
        return ScheduleItem;
    })();
    var TimeScheduleItem = (function (_super) {
        __extends(TimeScheduleItem, _super);
        function TimeScheduleItem(task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._time = null;
            this._time = time;
        }
        TimeScheduleItem.create = function (task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            var obj = new this(task, time, args);
            return obj;
        };
        TimeScheduleItem.prototype.update = function (time) {
            var elapsed = this.timeController.computeElapseTime(time);
            if (elapsed >= this._time) {
                this.task.apply(this, this.args);
                this.finish();
            }
        };
        return TimeScheduleItem;
    })(ScheduleItem);
    var IntervalScheduleItem = (function (_super) {
        __extends(IntervalScheduleItem, _super);
        function IntervalScheduleItem(task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._intervalTime = null;
            this._elapsed = 0;
            this._intervalTime = time;
        }
        IntervalScheduleItem.create = function (task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            var obj = new this(task, time, args);
            return obj;
        };
        IntervalScheduleItem.prototype.update = function (time) {
            var elapsed = this.timeController.computeElapseTime(time);
            if (elapsed - this._elapsed >= this._intervalTime) {
                this.task.apply(this, this.args);
                this._elapsed = elapsed;
            }
        };
        IntervalScheduleItem.prototype.start = function () {
            _super.prototype.start.call(this);
            this._elapsed = 0;
        };
        return IntervalScheduleItem;
    })(ScheduleItem);
    var LoopScheduleItem = (function (_super) {
        __extends(LoopScheduleItem, _super);
        function LoopScheduleItem() {
            _super.apply(this, arguments);
        }
        LoopScheduleItem.create = function (task, args) {
            if (args === void 0) { args = []; }
            var obj = new this(task, args);
            return obj;
        };
        LoopScheduleItem.prototype.update = function (time) {
            this.task.apply(this, this.args);
        };
        return LoopScheduleItem;
    })(ScheduleItem);
    var FrameScheduleItem = (function (_super) {
        __extends(FrameScheduleItem, _super);
        function FrameScheduleItem(task, frame, args) {
            if (frame === void 0) { frame = 1; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._frame = null;
            this._frame = frame;
        }
        FrameScheduleItem.create = function (task, frame, args) {
            if (frame === void 0) { frame = 1; }
            if (args === void 0) { args = []; }
            var obj = new this(task, frame, args);
            return obj;
        };
        FrameScheduleItem.prototype.update = function (time) {
            this._frame--;
            if (this._frame <= 0) {
                this.task.apply(this, this.args);
                this.finish();
            }
        };
        return FrameScheduleItem;
    })(ScheduleItem);
})(wd || (wd = {}));


var wd;
(function (wd) {
    var GameState;
    (function (GameState) {
        GameState[GameState["NORMAL"] = 0] = "NORMAL";
        GameState[GameState["STOP"] = 1] = "STOP";
        GameState[GameState["PAUSE"] = 2] = "PAUSE";
    })(GameState || (GameState = {}));
    var Director = (function () {
        function Director() {
            this.scene = wd.Scene.create();
            this.scheduler = wd.Scheduler.create();
            this.renderer = null;
            this.scriptStreams = wdCb.Hash.create();
            this._gameLoop = null;
            this._gameState = GameState.NORMAL;
            this._timeController = wd.DirectorTimeController.create();
            this._isFirstStart = true;
        }
        Director.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        };
        Object.defineProperty(Director.prototype, "gameTime", {
            get: function () {
                return this._timeController.gameTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "fps", {
            get: function () {
                return this._timeController.fps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isNormal", {
            get: function () {
                return this._gameState === GameState.NORMAL;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isStop", {
            get: function () {
                return this._gameState === GameState.STOP;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isPause", {
            get: function () {
                return this._gameState === GameState.PAUSE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isTimeChange", {
            get: function () {
                return this._timeController.isTimeChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "elapsed", {
            get: function () {
                return this._timeController.elapsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "view", {
            get: function () {
                return wd.DeviceManager.getInstance().view;
            },
            enumerable: true,
            configurable: true
        });
        Director.prototype.initWhenCreate = function () {
            this.renderer = wd.WebGLRenderer.create();
        };
        Director.prototype.start = function () {
            this._gameState = GameState.NORMAL;
            this.startLoop();
        };
        Director.prototype.stop = function () {
            this._gameLoop && this._gameLoop.dispose();
            this._gameState = GameState.STOP;
            this._timeController.stop();
            this.scheduler.stop();
        };
        Director.prototype.pause = function () {
            if (this._gameState === GameState.PAUSE) {
                return;
            }
            this._gameState = GameState.PAUSE;
            this._timeController.pause();
            this.scheduler.pause();
        };
        Director.prototype.resume = function () {
            this._gameState = GameState.NORMAL;
            this._timeController.resume();
            this.scheduler.resume();
        };
        Director.prototype.getTopUnderPoint = function (point) {
            var top = this.scene.getTopUnderPoint(point);
            return top ? top : this.scene;
        };
        Director.prototype.startLoop = function () {
            var self = this;
            this._gameLoop = wdFrp.judge(function () { return self._isFirstStart; }, function () {
                return self._buildLoadScriptStream();
            }, function () {
                return wdFrp.empty();
            })
                .concat(this._buildInitStream())
                .ignoreElements()
                .concat(this._buildLoopStream())
                .subscribe(function (time) {
                /*!
                 I assume that the time is DOMHighResTimeStamp, but it may be DOMTimeStamp in some browser!
                 so it need polyfill
                 */
                self._loopBody(time);
            });
        };
        Director.prototype._buildLoadScriptStream = function () {
            return wdFrp.fromCollection(this.scriptStreams.getValues())
                .mergeAll();
        };
        Director.prototype._buildInitStream = function () {
            var _this = this;
            return wdFrp.callFunc(function () {
                _this._init();
            }, this);
        };
        Director.prototype._init = function () {
            this._isFirstStart = false;
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));
            this.scene.onEnter();
            this.scene.init();
            this.renderer.init();
            this._timeController.start();
            this.scheduler.start();
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_INIT));
        };
        Director.prototype._buildLoopStream = function () {
            return wdFrp.intervalRequest();
        };
        Director.prototype._loopBody = function (time) {
            var elapseTime = null;
            if (this._gameState === GameState.PAUSE || this._gameState === GameState.STOP) {
                return false;
            }
            elapseTime = this._timeController.computeElapseTime(time);
            this._timeController.tick(elapseTime);
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.STARTLOOP));
            this._run(elapseTime);
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.ENDLOOP));
            return true;
        };
        Director.prototype._run = function (time) {
            this.scene.update(time);
            this.scene.render(this.renderer);
            this.renderer.render();
            this.scheduler.update(time);
        };
        Director._instance = null;
        return Director;
    })();
    wd.Director = Director;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Main = (function () {
        function Main() {
        }
        Main.setConfig = function (_a) {
            var canvasId = _a.canvasId, _b = _a.isTest, isTest = _b === void 0 ? wd.Config.isTest : _b, _c = _a.screenSize, screenSize = _c === void 0 ? wd.ScreenSize.FULL : _c;
            this.isTest = isTest;
            this.screenSize = screenSize;
            this._canvasId = canvasId;
            return this;
        };
        Main.init = function () {
            wd.DeviceManager.getInstance().createGL(this._canvasId);
            wd.DeviceManager.getInstance().setScreen();
            wd.GPUDetector.getInstance().detect();
            return this;
        };
        Main.isTest = null;
        Main.screenSize = null;
        Main._canvasId = null;
        return Main;
    })();
    wd.Main = Main;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.apply(this, arguments);
            this.side = null;
            this.shadowMap = {
                enable: true,
                softType: ShadowMapSoftType.NONE
            };
            this.shader = null;
            this.camera = null;
            this.isUseProgram = false;
            this._lightManager = wd.LightManager.create();
            this._renderTargetRenderers = wdCb.Collection.create();
        }
        Scene.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Scene.prototype, "ambientLight", {
            get: function () {
                return this._lightManager.ambientLight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "directionLights", {
            get: function () {
                return this._lightManager.directionLights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "pointLights", {
            get: function () {
                return this._lightManager.pointLights;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.init = function () {
            this.addComponent(wd.TopCollider.create());
            _super.prototype.init.call(this);
            this._renderTargetRenderers.forEach(function (renderTargetRenderer) { return renderTargetRenderer.init(); });
            return this;
        };
        Scene.prototype.useProgram = function (shader) {
            this.isUseProgram = true;
            this.shader = shader;
        };
        Scene.prototype.unUseProgram = function () {
            this.isUseProgram = false;
        };
        Scene.prototype.addChild = function (child) {
            if (this._isCamera(child)) {
                this.camera = child;
            }
            else if (this._isLight(child)) {
                this._lightManager.addChild(child);
            }
            return _super.prototype.addChild.call(this, child);
        };
        Scene.prototype.addRenderTargetRenderer = function (renderTargetRenderer) {
            this._renderTargetRenderers.addChild(renderTargetRenderer);
        };
        Scene.prototype.removeRenderTargetRenderer = function (renderTargetRenderer) {
            this._renderTargetRenderers.removeChild(renderTargetRenderer);
        };
        Scene.prototype.render = function (renderer) {
            var self = this;
            this._renderTargetRenderers.forEach(function (target) {
                target.render(renderer, self.camera);
            });
            _super.prototype.render.call(this, renderer, this.camera);
        };
        Scene.prototype._isCamera = function (child) {
            return child.hasComponent(wd.CameraController);
        };
        Scene.prototype._isLight = function (child) {
            return child.hasComponent(wd.Light);
        };
        Object.defineProperty(Scene.prototype, "render",
            __decorate([
                wd.require(function (renderer) {
                    wd.assert(!!this.camera, wd.Log.info.FUNC_MUST("scene", "add camera"));
                })
            ], Scene.prototype, "render", Object.getOwnPropertyDescriptor(Scene.prototype, "render")));
        return Scene;
    })(wd.GameObject);
    wd.Scene = Scene;
    (function (ShadowMapSoftType) {
        ShadowMapSoftType[ShadowMapSoftType["NONE"] = 0] = "NONE";
        ShadowMapSoftType[ShadowMapSoftType["PCF"] = 1] = "PCF";
    })(wd.ShadowMapSoftType || (wd.ShadowMapSoftType = {}));
    var ShadowMapSoftType = wd.ShadowMapSoftType;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var LightManager = (function () {
        function LightManager() {
            this._lights = wdCb.Hash.create();
        }
        LightManager.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(LightManager.prototype, "ambientLight", {
            get: function () {
                return this._lights.getChild(wd.AmbientLight.type);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightManager.prototype, "directionLights", {
            get: function () {
                return this._lights.getChild(wd.DirectionLight.type);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightManager.prototype, "pointLights", {
            get: function () {
                return this._lights.getChild(wd.PointLight.type);
            },
            enumerable: true,
            configurable: true
        });
        LightManager.prototype.addChild = function (light) {
            if (light.hasComponent(wd.AmbientLight)) {
                this._lights.addChild(wd.AmbientLight.type, light);
            }
            else if (light.hasComponent(wd.DirectionLight)) {
                this._lights.appendChild(wd.DirectionLight.type, light);
            }
            else if (light.hasComponent(wd.PointLight)) {
                this._lights.appendChild(wd.PointLight.type, light);
            }
            else {
                wd.Log.error(true, wd.Log.info.FUNC_INVALID("light"));
            }
        };
        return LightManager;
    })();
    wd.LightManager = LightManager;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    /*!it's flipX when viewer is inside the skybox*/
    var Skybox = (function (_super) {
        __extends(Skybox, _super);
        function Skybox() {
            _super.apply(this, arguments);
        }
        Skybox.create = function () {
            var obj = new this();
            obj.initWhenCreate();
            return obj;
        };
        Skybox.prototype.initWhenCreate = function () {
            this.addComponent(wd.SkyboxRenderer.create());
        };
        return Skybox;
    })(wd.GameObject);
    wd.Skybox = Skybox;
})(wd || (wd = {}));

var wd;
(function (wd) {
    wd.DEG_TO_RAD = Math.PI / 180;
    wd.RAD_TO_DEG = 180 / Math.PI;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Vector2 = (function () {
        function Vector2() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.values = new Float32Array(2);
            if (args.length > 0) {
                this.values[0] = args[0];
                this.values[1] = args[1];
            }
        }
        Vector2.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var m = null;
            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0], args[1]);
            }
            return m;
        };
        Object.defineProperty(Vector2.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (x) {
                this.values[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (y) {
                this.values[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Vector2;
    })();
    wd.Vector2 = Vector2;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Vector3 = (function () {
        function Vector3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.values = null;
            this.values = new Float32Array(3);
            if (args.length > 0) {
                this.values[0] = args[0];
                this.values[1] = args[1];
                this.values[2] = args[2];
            }
        }
        Vector3.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var m = null;
            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0], args[1], args[2]);
            }
            return m;
        };
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (x) {
                this.values[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (y) {
                this.values[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this.values[2];
            },
            set: function (z) {
                this.values[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.normalize = function () {
            var v = this.values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                v[0] = 0;
                v[1] = 0;
                v[2] = 0;
                return this;
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            if (v[0] === -0) {
                v[0] = 0;
            }
            if (v[1] === -0) {
                v[1] = 0;
            }
            if (v[2] === -0) {
                v[2] = 0;
            }
            return this;
        };
        Vector3.prototype.isZero = function () {
            var v = this.values;
            return v[0] === 0 && v[1] === 0 && v[2] === 0;
        };
        Vector3.prototype.scale = function (scalar) {
            var v = this.values;
            v[0] *= scalar;
            v[1] *= scalar;
            v[2] *= scalar;
            return this;
        };
        Vector3.prototype.set = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 3) {
                this.x = args[0];
                this.y = args[1];
                this.z = args[2];
            }
            else {
                var v = args[0];
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            }
        };
        Vector3.prototype.sub = function (v) {
            this.values[0] = this.values[0] - v.values[0];
            this.values[1] = this.values[1] - v.values[1];
            this.values[2] = this.values[2] - v.values[2];
            return this;
        };
        Vector3.prototype.sub2 = function (v1, v2) {
            this.values[0] = v1.values[0] - v2.values[0];
            this.values[1] = v1.values[1] - v2.values[1];
            this.values[2] = v1.values[2] - v2.values[2];
            return this;
        };
        Vector3.prototype.add = function (v) {
            this.values[0] = this.values[0] + v.values[0];
            this.values[1] = this.values[1] + v.values[1];
            this.values[2] = this.values[2] + v.values[2];
            return this;
        };
        Vector3.prototype.add2 = function (v1, v2) {
            this.values[0] = v1.values[0] + v2.values[0];
            this.values[1] = v1.values[1] + v2.values[1];
            this.values[2] = v1.values[2] + v2.values[2];
            return this;
        };
        Vector3.prototype.reverse = function () {
            this.values[0] = -this.values[0];
            this.values[1] = -this.values[1];
            this.values[2] = -this.values[2];
            return this;
        };
        Vector3.prototype.copy = function () {
            var result = Vector3.create(), i = 0, len = this.values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this.values[i];
            }
            return result;
        };
        Vector3.prototype.toVector4 = function () {
            return wd.Vector4.create(this.values[0], this.values[1], this.values[2], 1.0);
        };
        Vector3.prototype.length = function () {
            var v = this.values;
            return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        };
        Vector3.prototype.cross = function (lhs, rhs) {
            var a, b, r, ax, ay, az, bx, by, bz;
            a = lhs.values;
            b = rhs.values;
            r = this.values;
            ax = a[0];
            ay = a[1];
            az = a[2];
            bx = b[0];
            by = b[1];
            bz = b[2];
            r[0] = ay * bz - by * az;
            r[1] = az * bx - bz * ax;
            r[2] = ax * by - bx * ay;
            return this;
        };
        Vector3.prototype.lerp = function (lhs, rhs, alpha) {
            var a = lhs.values, b = rhs.values, r = this.values;
            r[0] = a[0] + alpha * (b[0] - a[0]);
            r[1] = a[1] + alpha * (b[1] - a[1]);
            r[2] = a[2] + alpha * (b[2] - a[2]);
            return this;
        };
        Vector3.prototype.dot = function (rhs) {
            var a = this.values, b = rhs.values;
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };
        Vector3.prototype.isEqual = function (v) {
            return this.x === v.x && this.y === v.y && this.z === v.z;
        };
        Vector3.prototype.toArray = function () {
            return [this.x, this.y, this.z];
        };
        Vector3.up = Vector3.create(0, 1, 0);
        Vector3.forward = Vector3.create(0, 0, 1);
        Vector3.right = Vector3.create(1, 0, 0);
        return Vector3;
    })();
    wd.Vector3 = Vector3;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Vector4 = (function () {
        function Vector4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.values = new Float32Array(4);
            if (args.length > 0) {
                this.values[0] = args[0];
                this.values[1] = args[1];
                this.values[2] = args[2];
                this.values[3] = args[3];
            }
        }
        Vector4.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var m = null;
            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0], args[1], args[2], args[3]);
            }
            return m;
        };
        Object.defineProperty(Vector4.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (x) {
                this.values[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (y) {
                this.values[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "z", {
            get: function () {
                return this.values[2];
            },
            set: function (z) {
                this.values[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "w", {
            get: function () {
                return this.values[3];
            },
            set: function (w) {
                this.values[3] = w;
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.normalize = function () {
            var v = this.values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
            if (d === 0) {
                return Vector4.create(0, 0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            v[3] = v[3] / d;
            return this;
        };
        Vector4.prototype.copy = function () {
            return this.copyHelper(Vector4.create());
        };
        Vector4.prototype.toVector3 = function () {
            return wd.Vector3.create(this.values[0], this.values[1], this.values[2]);
        };
        Vector4.prototype.multiplyScalar = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            this.w *= scalar;
            return this;
        };
        Vector4.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
        };
        Vector4.prototype.set = function (x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        };
        Vector4.prototype.copyHelper = function (vector4) {
            var result = vector4, i = 0, len = this.values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this.values[i];
            }
            return result;
        };
        return Vector4;
    })();
    wd.Vector4 = Vector4;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    var Matrix4 = (function () {
        function Matrix4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.values = null;
            this._matrixArr = null;
            if (args.length === 1) {
                this.values = args[0];
            }
            else {
                this.values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            this._matrixArr = [];
        }
        Matrix4.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var m = null;
            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0]);
            }
            return m;
        };
        Matrix4.prototype.push = function () {
            this._matrixArr.push(this.values);
        };
        Matrix4.prototype.pop = function () {
            this.values = this._matrixArr.pop();
        };
        Matrix4.prototype.setIdentity = function () {
            var e = this.values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix4.prototype.invert = function () {
            var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, invDet, m;
            m = this.values;
            a00 = m[0];
            a01 = m[1];
            a02 = m[2];
            a03 = m[3];
            a10 = m[4];
            a11 = m[5];
            a12 = m[6];
            a13 = m[7];
            a20 = m[8];
            a21 = m[9];
            a22 = m[10];
            a23 = m[11];
            a30 = m[12];
            a31 = m[13];
            a32 = m[14];
            a33 = m[15];
            b00 = a00 * a11 - a01 * a10;
            b01 = a00 * a12 - a02 * a10;
            b02 = a00 * a13 - a03 * a10;
            b03 = a01 * a12 - a02 * a11;
            b04 = a01 * a13 - a03 * a11;
            b05 = a02 * a13 - a03 * a12;
            b06 = a20 * a31 - a21 * a30;
            b07 = a20 * a32 - a22 * a30;
            b08 = a20 * a33 - a23 * a30;
            b09 = a21 * a32 - a22 * a31;
            b10 = a21 * a33 - a23 * a31;
            b11 = a22 * a33 - a23 * a32;
            invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
            return this;
        };
        Matrix4.prototype.invertTo3x3 = function () {
            var a11, a21, a31, a12, a22, a32, a13, a23, a33, m, r, det, idet;
            var mat3 = wd.Matrix3.create();
            m = this.values;
            r = mat3.values;
            a11 = m[10] * m[5] - m[6] * m[9];
            a21 = -m[10] * m[1] + m[2] * m[9];
            a31 = m[6] * m[1] - m[2] * m[5];
            a12 = -m[10] * m[4] + m[6] * m[8];
            a22 = m[10] * m[0] - m[2] * m[8];
            a32 = -m[6] * m[0] + m[2] * m[4];
            a13 = m[9] * m[4] - m[5] * m[8];
            a23 = -m[9] * m[0] + m[1] * m[8];
            a33 = m[5] * m[0] - m[1] * m[4];
            det = m[0] * a11 + m[1] * a12 + m[2] * a13;
            if (det === 0) {
                wd.Log.warn("can't invert matrix, determinant is 0");
                return mat3;
            }
            idet = 1 / det;
            r[0] = idet * a11;
            r[1] = idet * a21;
            r[2] = idet * a31;
            r[3] = idet * a12;
            r[4] = idet * a22;
            r[5] = idet * a32;
            r[6] = idet * a13;
            r[7] = idet * a23;
            r[8] = idet * a33;
            return mat3;
        };
        Matrix4.prototype.transpose = function () {
            var te = this.values;
            var tmp;
            tmp = te[1];
            te[1] = te[4];
            te[4] = tmp;
            tmp = te[2];
            te[2] = te[8];
            te[8] = tmp;
            tmp = te[6];
            te[6] = te[9];
            te[9] = tmp;
            tmp = te[3];
            te[3] = te[12];
            te[12] = tmp;
            tmp = te[7];
            te[7] = te[13];
            te[13] = tmp;
            tmp = te[11];
            te[11] = te[14];
            te[14] = tmp;
            return this;
        };
        Matrix4.prototype.setTranslate = function (x, y, z) {
            var e = this.values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = x;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = y;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = z;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix4.prototype.translate = function (x, y, z) {
            this.applyMatrix(Matrix4.create().setTranslate(x, y, z));
            return this;
        };
        Matrix4.prototype.setRotate = function (angle, x, y, z) {
            var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
            var angle = Math.PI * angle / 180;
            e = this.values;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (0 !== x && 0 === y && 0 === z) {
                if (x < 0) {
                    s = -s;
                }
                e[0] = 1;
                e[4] = 0;
                e[8] = 0;
                e[12] = 0;
                e[1] = 0;
                e[5] = c;
                e[9] = -s;
                e[13] = 0;
                e[2] = 0;
                e[6] = s;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 !== y && 0 === z) {
                if (y < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = 0;
                e[8] = s;
                e[12] = 0;
                e[1] = 0;
                e[5] = 1;
                e[9] = 0;
                e[13] = 0;
                e[2] = -s;
                e[6] = 0;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 === y && 0 !== z) {
                if (z < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = -s;
                e[8] = 0;
                e[12] = 0;
                e[1] = s;
                e[5] = c;
                e[9] = 0;
                e[13] = 0;
                e[2] = 0;
                e[6] = 0;
                e[10] = 1;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else {
                len = Math.sqrt(x * x + y * y + z * z);
                if (len !== 1) {
                    rlen = 1 / len;
                    x *= rlen;
                    y *= rlen;
                    z *= rlen;
                }
                nc = 1 - c;
                xy = x * y;
                yz = y * z;
                zx = z * x;
                xs = x * s;
                ys = y * s;
                zs = z * s;
                e[0] = x * x * nc + c;
                e[1] = xy * nc + zs;
                e[2] = zx * nc - ys;
                e[3] = 0;
                e[4] = xy * nc - zs;
                e[5] = y * y * nc + c;
                e[6] = yz * nc + xs;
                e[7] = 0;
                e[8] = zx * nc + ys;
                e[9] = yz * nc - xs;
                e[10] = z * z * nc + c;
                e[11] = 0;
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
            }
            return this;
        };
        Matrix4.prototype.rotate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var angle = args[0];
            if (args.length === 2) {
                var vector3 = args[1];
                this.applyMatrix(Matrix4.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
            }
            else if (args.length === 4) {
                var x = args[1], y = args[2], z = args[3];
                this.applyMatrix(Matrix4.create().setRotate(angle, x, y, z));
            }
            return this;
        };
        Matrix4.prototype.setScale = function (x, y, z) {
            var e = this.values;
            e[0] = x;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = y;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = z;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix4.prototype.scale = function (x, y, z) {
            this.applyMatrix(Matrix4.create().setScale(x, y, z));
            return this;
        };
        Matrix4.prototype.setLookAt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var x, y, z, eye, center, up;
            if (args.length === 3) {
                eye = args[0];
                center = args[1];
                up = args[2];
            }
            else if (args.length === 9) {
                eye = wd.Vector3.create(args[0], args[1], args[2]);
                center = wd.Vector3.create(args[3], args[4], args[5]);
                up = wd.Vector3.create(args[6], args[7], args[8]);
            }
            x = wd.Vector3.create();
            z = eye.copy().sub(center).normalize();
            y = up.copy().normalize();
            x.cross(y, z).normalize();
            y.cross(z, x);
            var r = this.values;
            r[0] = x.x;
            r[1] = x.y;
            r[2] = x.z;
            r[3] = 0;
            r[4] = y.x;
            r[5] = y.y;
            r[6] = y.z;
            r[7] = 0;
            r[8] = z.x;
            r[9] = z.y;
            r[10] = z.z;
            r[11] = 0;
            r[12] = eye.x;
            r[13] = eye.y;
            r[14] = eye.z;
            r[15] = 1;
            return this;
        };
        Matrix4.prototype.lookAt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var matrix = Matrix4.create();
            this.applyMatrix(matrix.setLookAt.apply(matrix, args));
            return this;
        };
        Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
            var e = this.values, rw, rh, rd;
            rw = 1 / (right - left);
            rh = 1 / (top - bottom);
            rd = 1 / (far - near);
            e[0] = 2 * rw;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 2 * rh;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = -2 * rd;
            e[11] = 0;
            e[12] = -(right + left) * rw;
            e[13] = -(top + bottom) * rh;
            e[14] = -(far + near) * rd;
            e[15] = 1;
            return this;
        };
        Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
            this.applyMatrix(Matrix4.create().setOrtho(left, right, bottom, top, near, far));
            return this;
        };
        Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
            var e = null, rd = null, s = null, ct = null, fovy = Math.PI * fovy / 180 / 2;
            s = Math.sin(fovy);
            wd.Log.error(s === 0, wd.Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
            rd = 1 / (far - near);
            ct = Math.cos(fovy) / s;
            e = this.values;
            e[0] = ct / aspect;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = ct;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = -(far + near) * rd;
            e[11] = -1;
            e[12] = 0;
            e[13] = 0;
            e[14] = -2 * near * far * rd;
            e[15] = 0;
            return this;
        };
        Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
            this.applyMatrix(Matrix4.create().setPerspective(fovy, aspect, near, far));
            return this;
        };
        Matrix4.prototype.applyMatrix = function (other) {
            var a = this, b = other.copy();
            this.values = b.multiply(a).values;
            return this;
        };
        Matrix4.prototype.multiply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var mat1 = null, mat2 = null, result = null;
            result = this.values;
            if (args.length === 1) {
                mat1 = this.values;
                mat2 = args[0].values;
            }
            else if (args.length === 2) {
                mat1 = args[0].values;
                mat2 = args[1].values;
            }
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
            result[0] = A * a + B * e + C * i + D * m;
            result[1] = A * b + B * f + C * j + D * n;
            result[2] = A * c + B * g + C * k + D * o;
            result[3] = A * d + B * h + C * l + D * p;
            result[4] = E * a + F * e + G * i + H * m;
            result[5] = E * b + F * f + G * j + H * n;
            result[6] = E * c + F * g + G * k + H * o;
            result[7] = E * d + F * h + G * l + H * p;
            result[8] = I * a + J * e + K * i + L * m;
            result[9] = I * b + J * f + K * j + L * n;
            result[10] = I * c + J * g + K * k + L * o;
            result[11] = I * d + J * h + K * l + L * p;
            result[12] = M * a + N * e + O * i + P * m;
            result[13] = M * b + N * f + O * j + P * n;
            result[14] = M * c + N * g + O * k + P * o;
            result[15] = M * d + N * h + O * l + P * p;
            return this;
        };
        Matrix4.prototype.multiplyVector4 = function (vector) {
            var mat1 = this.values, vec4 = vector.values;
            var result = [];
            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
            return wd.Vector4.create(result[0], result[1], result[2], result[3]);
        };
        Matrix4.prototype.multiplyVector3 = function (vector) {
            var mat1 = this.values, vec3 = vector.values;
            var result = [];
            result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8] + mat1[12];
            result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9] + mat1[13];
            result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10] + mat1[14];
            return wd.Vector3.create(result[0], result[1], result[2]);
        };
        Matrix4.prototype.copy = function () {
            var result = Matrix4.create(), i = 0, len = this.values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this.values[i];
            }
            return result;
        };
        Matrix4.prototype.getX = function () {
            return wd.Vector3.create(this.values[0], this.values[1], this.values[2]);
        };
        Matrix4.prototype.getY = function () {
            return wd.Vector3.create(this.values[4], this.values[5], this.values[6]);
        };
        Matrix4.prototype.getZ = function () {
            return wd.Vector3.create(this.values[8], this.values[9], this.values[10]);
        };
        Matrix4.prototype.getTranslation = function () {
            return wd.Vector3.create(this.values[12], this.values[13], this.values[14]);
        };
        Matrix4.prototype.getScale = function () {
            return wd.Vector3.create(this.getX().length(), this.getY().length(), this.getZ().length());
        };
        Matrix4.prototype.getEulerAngles = function () {
            var x, y, z, sx, sy, sz, m, halfPi;
            var scale = this.getScale();
            sx = scale.x;
            sy = scale.y;
            sz = scale.z;
            m = this.values;
            y = Math.asin(-m[2] / sx);
            halfPi = Math.PI * 0.5;
            if (y < halfPi) {
                if (y > -halfPi) {
                    x = Math.atan2(m[6] / sy, m[10] / sz);
                    z = Math.atan2(m[1] / sx, m[0] / sx);
                }
                else {
                    z = 0;
                    x = -Math.atan2(m[4] / sy, m[5] / sy);
                }
            }
            else {
                z = 0;
                x = Math.atan2(m[4] / sy, m[5] / sy);
            }
            return wd.Vector3.create(x, y, z).scale(wd.RAD_TO_DEG);
        };
        Matrix4.prototype.setTRS = function (t, r, s) {
            var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
            tx = t.x;
            ty = t.y;
            tz = t.z;
            qx = r.x;
            qy = r.y;
            qz = r.z;
            qw = r.w;
            sx = s.x;
            sy = s.y;
            sz = s.z;
            x2 = qx + qx;
            y2 = qy + qy;
            z2 = qz + qz;
            xx = qx * x2;
            xy = qx * y2;
            xz = qx * z2;
            yy = qy * y2;
            yz = qy * z2;
            zz = qz * z2;
            wx = qw * x2;
            wy = qw * y2;
            wz = qw * z2;
            m = this.values;
            m[0] = (1 - (yy + zz)) * sx;
            m[1] = (xy + wz) * sx;
            m[2] = (xz - wy) * sx;
            m[3] = 0;
            m[4] = (xy - wz) * sy;
            m[5] = (1 - (xx + zz)) * sy;
            m[6] = (yz + wx) * sy;
            m[7] = 0;
            m[8] = (xz + wy) * sz;
            m[9] = (yz - wx) * sz;
            m[10] = (1 - (xx + yy)) * sz;
            m[11] = 0;
            m[12] = tx;
            m[13] = ty;
            m[14] = tz;
            m[15] = 1;
            return this;
        };
        Object.defineProperty(Matrix4.prototype, "setOrtho",
            __decorate([
                wd.require(function (left, right, bottom, top, near, far) {
                    wd.assert(left !== right && bottom !== top && near !== far, wd.Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
                })
            ], Matrix4.prototype, "setOrtho", Object.getOwnPropertyDescriptor(Matrix4.prototype, "setOrtho")));
        Object.defineProperty(Matrix4.prototype, "setPerspective",
            __decorate([
                wd.require(function (fovy, aspect, near, far) {
                    wd.assert(near !== far && aspect !== 0, wd.Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
                    wd.assert(near > 0, wd.Log.info.FUNC_MUST("near", "> 0"));
                    wd.assert(far > 0, wd.Log.info.FUNC_MUST("far", "> 0"));
                })
            ], Matrix4.prototype, "setPerspective", Object.getOwnPropertyDescriptor(Matrix4.prototype, "setPerspective")));
        return Matrix4;
    })();
    wd.Matrix4 = Matrix4;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Matrix3 = (function () {
        function Matrix3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.values = null;
            if (args.length === 1) {
                this.values = args[0];
            }
            else {
                this.values = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            }
        }
        Matrix3.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var m = null;
            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0]);
            }
            return m;
        };
        Matrix3.prototype.setIdentity = function () {
            var e = this.values;
            e[0] = 1;
            e[3] = 0;
            e[6] = 0;
            e[1] = 0;
            e[4] = 1;
            e[7] = 0;
            e[2] = 0;
            e[5] = 0;
            e[8] = 1;
            return this;
        };
        Matrix3.prototype.invert = function () {
            var me = this.values, te = new Float32Array(16), d = this.values;
            te[0] = me[10] * me[5] - me[6] * me[9];
            te[1] = -me[10] * me[1] + me[2] * me[9];
            te[2] = me[6] * me[1] - me[2] * me[5];
            te[3] = -me[10] * me[4] + me[6] * me[8];
            te[4] = me[10] * me[0] - me[2] * me[8];
            te[5] = -me[6] * me[0] + me[2] * me[4];
            te[6] = me[9] * me[4] - me[5] * me[8];
            te[7] = -me[9] * me[0] + me[1] * me[8];
            te[8] = me[5] * me[0] - me[1] * me[4];
            var det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];
            if (det === 0) {
                wd.Log.warn("can't invert matrix, determinant is 0");
                this.setIdentity();
                return this;
            }
            det = 1 / det;
            for (var i = 0; i < 9; i++) {
                d[i] = te[i] * det;
            }
            return;
        };
        Matrix3.prototype.multiplyScalar = function (s) {
            var te = this.values;
            te[0] *= s;
            te[3] *= s;
            te[6] *= s;
            te[1] *= s;
            te[4] *= s;
            te[7] *= s;
            te[2] *= s;
            te[5] *= s;
            te[8] *= s;
            return this;
        };
        Matrix3.prototype.multiplyVector3 = function (vector) {
            var x = vector.x, y = vector.y, z = vector.z, result = wd.Vector3.create(), e = this.values;
            result.x = e[0] * x + e[3] * y + e[6] * z;
            result.y = e[1] * x + e[4] * y + e[7] * z;
            result.z = e[2] * x + e[5] * y + e[8] * z;
            return result;
        };
        Matrix3.prototype.transpose = function () {
            var tmp, m = this.values;
            tmp = m[1];
            m[1] = m[3];
            m[3] = tmp;
            tmp = m[2];
            m[2] = m[6];
            m[6] = tmp;
            tmp = m[5];
            m[5] = m[7];
            m[7] = tmp;
            return this;
        };
        Matrix3.prototype.copy = function () {
            var me = this.values;
            return Matrix3.create().set(me[0], me[3], me[6], me[1], me[4], me[7], me[2], me[5], me[8]);
        };
        Matrix3.prototype.set = function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
            var te = this.values;
            te[0] = n11;
            te[3] = n12;
            te[6] = n13;
            te[1] = n21;
            te[4] = n22;
            te[7] = n23;
            te[2] = n31;
            te[5] = n32;
            te[8] = n33;
            return this;
        };
        return Matrix3;
    })();
    wd.Matrix3 = Matrix3;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this.x = null;
            this.y = null;
            this.z = null;
            this.w = null;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Quaternion.create = function (x, y, z, w) {
            var obj = new this(x, y, z, w);
            return obj;
        };
        Quaternion.prototype.setFromEulerAngles = function (eulerAngles) {
            var sx, cx, sy, cy, sz, cz, halfToRad, ex = eulerAngles.x, ey = eulerAngles.y, ez = eulerAngles.z;
            halfToRad = 0.5 * wd.DEG_TO_RAD;
            ex *= halfToRad;
            ey *= halfToRad;
            ez *= halfToRad;
            sx = Math.sin(ex);
            cx = Math.cos(ex);
            sy = Math.sin(ey);
            cy = Math.cos(ey);
            sz = Math.sin(ez);
            cz = Math.cos(ez);
            this.x = sx * cy * cz - cx * sy * sz;
            this.y = cx * sy * cz + sx * cy * sz;
            this.z = cx * cy * sz - sx * sy * cz;
            this.w = cx * cy * cz + sx * sy * sz;
            return this;
        };
        Quaternion.prototype.multiply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w, rhs1, rhs2, result = this;
            if (args.length === 1) {
                rhs1 = this;
                rhs2 = args[0];
            }
            else if (args.length === 2) {
                rhs1 = args[0];
                rhs2 = args[1];
            }
            q1x = rhs1.x;
            q1y = rhs1.y;
            q1z = rhs1.z;
            q1w = rhs1.w;
            q2x = rhs2.x;
            q2y = rhs2.y;
            q2z = rhs2.z;
            q2w = rhs2.w;
            result.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
            result.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
            result.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
            result.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
            return result;
        };
        Quaternion.prototype.setFromMatrix = function (matrix) {
            var m00, m01, m02, m10, m11, m12, m20, m21, m22, tr, s, rs, lx, ly, lz, m;
            m = matrix.values;
            m00 = m[0];
            m01 = m[1];
            m02 = m[2];
            m10 = m[4];
            m11 = m[5];
            m12 = m[6];
            m20 = m[8];
            m21 = m[9];
            m22 = m[10];
            lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);
            m00 *= lx;
            m01 *= lx;
            m02 *= lx;
            m10 *= ly;
            m11 *= ly;
            m12 *= ly;
            m20 *= lz;
            m21 *= lz;
            m22 *= lz;
            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                this.w = s * 0.5;
                s = 0.5 / s;
                this.x = (m12 - m21) * s;
                this.y = (m20 - m02) * s;
                this.z = (m01 - m10) * s;
            }
            else {
                if (m00 > m11) {
                    if (m00 > m22) {
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);
                        this.x = rs * 0.5;
                        rs = 0.5 / rs;
                        this.w = (m12 - m21) * rs;
                        this.y = (m01 + m10) * rs;
                        this.z = (m02 + m20) * rs;
                    }
                    else {
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);
                        this.z = rs * 0.5;
                        rs = 0.5 / rs;
                        this.w = (m01 - m10) * rs;
                        this.x = (m20 + m02) * rs;
                        this.y = (m21 + m12) * rs;
                    }
                }
                else if (m11 > m22) {
                    rs = (m11 - (m22 + m00)) + 1;
                    rs = Math.sqrt(rs);
                    this.y = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m20 - m02) * rs;
                    this.z = (m12 + m21) * rs;
                    this.x = (m10 + m01) * rs;
                }
                else {
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);
                    this.z = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m01 - m10) * rs;
                    this.x = (m20 + m02) * rs;
                    this.y = (m21 + m12) * rs;
                }
            }
            return this;
        };
        Quaternion.prototype.setFromAxisAngle = function (angle, axis) {
            var sa, ca;
            axis = axis.normalize();
            angle *= 0.5 * wd.DEG_TO_RAD;
            sa = Math.sin(angle);
            ca = Math.cos(angle);
            this.x = sa * axis.x;
            this.y = sa * axis.y;
            this.z = sa * axis.z;
            this.w = ca;
            return this;
        };
        Quaternion.prototype.invert = function () {
            return this.conjugate().normalize();
        };
        Quaternion.prototype.conjugate = function () {
            this.x *= -1;
            this.y *= -1;
            this.z *= -1;
            return this;
        };
        Quaternion.prototype.clone = function () {
            return Quaternion.create(this.x, this.y, this.z, this.w);
        };
        Quaternion.prototype.copy = function () {
            return Quaternion.create(this.x, this.y, this.z, this.w);
        };
        Quaternion.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                this.x = this.y = this.z = 0;
                this.w = 1;
            }
            else {
                len = 1 / len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
                this.w *= len;
            }
            return this;
        };
        Quaternion.prototype.length = function () {
            var x, y, z, w;
            x = this.x;
            y = this.y;
            z = this.z;
            w = this.w;
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        Quaternion.prototype.multiplyVector3 = function (vector) {
            var q = this;
            var x = vector.x;
            var y = vector.y;
            var z = vector.z;
            var qx = q.x;
            var qy = q.y;
            var qz = q.z;
            var qw = q.w;
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;
            return wd.Vector3.create(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
        };
        Quaternion.prototype.set = function (x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        };
        Quaternion.prototype.sub = function (quat) {
            var result = quat.copy().invert().multiply(this);
            this.set(result.x, result.y, result.z, result.w);
            return this;
        };
        Quaternion.prototype.getEulerAngles = function () {
            var x, y, z, qx, qy, qz, qw, a2;
            qx = this.x;
            qy = this.y;
            qz = this.z;
            qw = this.w;
            a2 = 2 * (qw * qy - qx * qz);
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            }
            else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            }
            else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }
            return wd.Vector3.create(x, y, z).scale(wd.RAD_TO_DEG);
        };
        return Quaternion;
    })();
    wd.Quaternion = Quaternion;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Plane = (function () {
        function Plane(a, b, c, d) {
            this.normal = wd.Vector3.create(0, 1, 0);
            this.d = 0;
            this.normal = wd.Vector3.create(a, b, c);
            this.d = d;
        }
        Plane.create = function (a, b, c, d) {
            var obj = new this(a, b, c, d);
            return obj;
        };
        Plane.prototype.getReflectionMatrix = function () {
            this.normalize();
            var x = this.normal.x;
            var y = this.normal.y;
            var z = this.normal.z;
            var temp = -2 * x;
            var temp2 = -2 * y;
            var temp3 = -2 * z;
            var result = wd.Matrix4.create();
            result.values[0] = (temp * x) + 1;
            result.values[1] = temp2 * x;
            result.values[2] = temp3 * x;
            result.values[3] = 0.0;
            result.values[4] = temp * y;
            result.values[5] = (temp2 * y) + 1;
            result.values[6] = temp3 * y;
            result.values[7] = 0.0;
            result.values[8] = temp * z;
            result.values[9] = temp2 * z;
            result.values[10] = (temp3 * z) + 1;
            result.values[11] = 0.0;
            result.values[12] = temp * this.d;
            result.values[13] = temp2 * this.d;
            result.values[14] = temp3 * this.d;
            result.values[15] = 1.0;
            return result;
        };
        Plane.prototype.normalize = function () {
            var norm = (Math.sqrt((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y) + (this.normal.z * this.normal.z)));
            var magnitude = 0;
            if (norm !== 0) {
                magnitude = 1.0 / norm;
            }
            this.normal.x *= magnitude;
            this.normal.y *= magnitude;
            this.normal.z *= magnitude;
            this.d *= magnitude;
            return this;
        };
        Plane.prototype.copy = function () {
            return Plane.create(this.normal.x, this.normal.y, this.normal.z, this.d);
        };
        return Plane;
    })();
    wd.Plane = Plane;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            _super.apply(this, arguments);
        }
        return Animation;
    })(wd.Component);
    wd.Animation = Animation;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MorphAnimation = (function (_super) {
        __extends(MorphAnimation, _super);
        function MorphAnimation() {
            _super.apply(this, arguments);
            this.interpolation = 0;
            this.currentFrame = 0;
            this.nextFrame = 1;
            this.duration = null;
            this.fps = null;
            this.currentAnimName = null;
            this.isFrameChange = false;
            this._currentTime = 0;
            this._oldTime = 0;
            this._frameCount = null;
            this._state = AnimationState.DEFAULT;
            this._isResume = false;
            this._isStartFromStop = false;
            this._pauseTime = null;
            this._resumeTime = null;
        }
        MorphAnimation.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(MorphAnimation.prototype, "isStart", {
            get: function () {
                return this._state === AnimationState.RUN;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MorphAnimation.prototype, "isStop", {
            get: function () {
                return this._state === AnimationState.STOP;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MorphAnimation.prototype, "isPause", {
            get: function () {
                return this._state === AnimationState.PAUSE;
            },
            enumerable: true,
            configurable: true
        });
        MorphAnimation.prototype.init = function () {
        };
        MorphAnimation.prototype.dispose = function () {
        };
        MorphAnimation.prototype.play = function (animName, fps) {
            var geometry = this.gameObject.getComponent(wd.ModelGeometry);
            this.currentAnimName = animName;
            this.fps = fps;
            this.duration = 1.0 / fps * 1000;
            this._frameCount = geometry.morphTargets.getChild(animName).getCount();
            this._start();
        };
        MorphAnimation.prototype.pause = function () {
            this._state = AnimationState.PAUSE;
            this._pauseTime = this._currentTime;
        };
        MorphAnimation.prototype.resume = function () {
            this._state = AnimationState.RUN;
            this._isResume = true;
            this._resumeTime = this._oldTime;
        };
        MorphAnimation.prototype.stop = function () {
            this._state = AnimationState.STOP;
        };
        MorphAnimation.prototype.update = function (time) {
            if (this._state === AnimationState.DEFAULT) {
                return;
            }
            if (this.isStop || this.isPause) {
                this._oldTime = time;
                return;
            }
            if (this._isResume) {
                this._isResume = false;
                this._continueFromPausePoint(time);
            }
            this._currentTime = time;
            if (this._isStartFromStop) {
                this._isStartFromStop = false;
                this._resetAnim();
            }
            if (this._currentTime - this._oldTime > this.duration) {
                this.isFrameChange = true;
                this._oldTime = this._floor(this._currentTime);
                this.currentFrame = this.nextFrame;
                this.nextFrame++;
                if (this.nextFrame >= this._frameCount) {
                    this.nextFrame = 0;
                }
            }
            else {
                this.isFrameChange = false;
            }
            this.interpolation = this.fps * (this._currentTime - this._oldTime) / 1000;
        };
        MorphAnimation.prototype._start = function () {
            this._currentTime = 0;
            this._oldTime = 0;
            this.currentFrame = 0;
            this.nextFrame = this.currentFrame + 1;
            if (this.isStop) {
                this._isStartFromStop = true;
            }
            this._state = AnimationState.RUN;
        };
        MorphAnimation.prototype._floor = function (time) {
            return time - time % this.duration;
        };
        MorphAnimation.prototype._resetAnim = function () {
            this._oldTime = this._currentTime;
        };
        MorphAnimation.prototype._continueFromPausePoint = function (currentTime) {
            this._oldTime = currentTime - (this._resumeTime - this._pauseTime) % this.duration;
        };
        Object.defineProperty(MorphAnimation.prototype, "play",
            __decorate([
                wd.require(function (animName, fps) {
                    var geometry = this.gameObject.getComponent(wd.ModelGeometry);
                    wd.assert(geometry, wd.Log.info.FUNC_SHOULD("this gameObject", "add ModelGeometry component"));
                    wd.assert(geometry.morphTargets.getChild(animName) && geometry.morphTargets.getChild(animName).getCount() > 0, wd.Log.info.FUNC_NOT_EXIST("\"" + animName + "\" animation"));
                }),
                wd.ensure(function () {
                    wd.assert(this._frameCount > 1, wd.Log.info.FUNC_SHOULD("frames.count", "> 1"));
                })
            ], MorphAnimation.prototype, "play", Object.getOwnPropertyDescriptor(MorphAnimation.prototype, "play")));
        return MorphAnimation;
    })(wd.Animation);
    wd.MorphAnimation = MorphAnimation;
    var AnimationState;
    (function (AnimationState) {
        AnimationState[AnimationState["DEFAULT"] = 0] = "DEFAULT";
        AnimationState[AnimationState["RUN"] = 1] = "RUN";
        AnimationState[AnimationState["STOP"] = 2] = "STOP";
        AnimationState[AnimationState["PAUSE"] = 3] = "PAUSE";
    })(AnimationState || (AnimationState = {}));
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Geometry = (function (_super) {
        __extends(Geometry, _super);
        function Geometry() {
            _super.apply(this, arguments);
            this._material = null;
            this.buffers = null;
        }
        Object.defineProperty(Geometry.prototype, "material", {
            get: function () {
                return this._material;
            },
            set: function (material) {
                this._material = material;
                this._material.geometry = this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "geometryData", {
            get: function () {
                return this.buffers.geometryData;
            },
            enumerable: true,
            configurable: true
        });
        Geometry.prototype.init = function () {
            var geometryData = null, _a = this.computeData(), vertices = _a.vertices, faces = _a.faces, texCoords = _a.texCoords, colors = _a.colors, morphTargets = _a.morphTargets;
            this.buffers = this.createBufferContainer();
            geometryData = this.createGeometryData(vertices, faces, texCoords, colors, morphTargets);
            this.buffers.geometryData = geometryData;
            this.buffers.init();
            this._material.init();
            this.computeNormals();
        };
        Geometry.prototype.computeNormals = function () {
            if (this.isSmoothShading()) {
                if (!this.hasVertexNormals()) {
                    this.computeVertexNormals();
                }
            }
            else {
                if (!this.hasFaceNormals()) {
                    this.computeFaceNormals();
                }
            }
        };
        Geometry.prototype.hasFaceNormals = function () {
            return this.buffers.geometryData.hasFaceNormals();
        };
        Geometry.prototype.hasVertexNormals = function () {
            return this.buffers.geometryData.hasVertexNormals();
        };
        Geometry.prototype.isSmoothShading = function () {
            return this._material.shading === wd.Shading.SMOOTH;
        };
        Geometry.prototype.dispose = function () {
            this.buffers.dispose();
            this._material.dispose();
        };
        Geometry.prototype.computeFaceNormals = function () {
            this.buffers.geometryData.computeFaceNormals();
        };
        Geometry.prototype.computeVertexNormals = function () {
            this.buffers.geometryData.computeVertexNormals();
        };
        Geometry.prototype.createBufferContainer = function () {
            return wd.CommonBufferContainer.create();
        };
        Geometry.prototype.createGeometryData = function (vertices, faces, texCoords, colors, morphTargets) {
            return this.createCommonGeometryData(vertices, faces, texCoords, colors);
        };
        Geometry.prototype.createCommonGeometryData = function (vertices, faces, texCoords, colors) {
            var geometryData = wd.CommonGeometryData.create(this);
            geometryData.vertices = vertices;
            geometryData.faces = faces;
            geometryData.texCoords = texCoords;
            geometryData.colors = colors;
            return geometryData;
        };
        Object.defineProperty(Geometry.prototype, "init",
            __decorate([
                wd.ensure(function () {
                    var geometryData = this.buffers.geometryData;
                    wd.assert(geometryData.vertices.length > 0, wd.Log.info.FUNC_MUST("vertices.count", "> 0"));
                    wd.assert(geometryData.faces.length * 3 === geometryData.indices.length, wd.Log.info.FUNC_SHOULD("faces.count", "be " + geometryData.indices.length / 3 + ", but actual is " + geometryData.faces.length));
                })
            ], Geometry.prototype, "init", Object.getOwnPropertyDescriptor(Geometry.prototype, "init")));
        Object.defineProperty(Geometry.prototype, "computeNormals",
            __decorate([
                wd.virtual
            ], Geometry.prototype, "computeNormals", Object.getOwnPropertyDescriptor(Geometry.prototype, "computeNormals")));
        Object.defineProperty(Geometry.prototype, "hasFaceNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], Geometry.prototype, "hasFaceNormals", Object.getOwnPropertyDescriptor(Geometry.prototype, "hasFaceNormals")));
        Object.defineProperty(Geometry.prototype, "hasVertexNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], Geometry.prototype, "hasVertexNormals", Object.getOwnPropertyDescriptor(Geometry.prototype, "hasVertexNormals")));
        Object.defineProperty(Geometry.prototype, "computeFaceNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], Geometry.prototype, "computeFaceNormals", Object.getOwnPropertyDescriptor(Geometry.prototype, "computeFaceNormals")));
        Object.defineProperty(Geometry.prototype, "createBufferContainer",
            __decorate([
                wd.virtual
            ], Geometry.prototype, "createBufferContainer", Object.getOwnPropertyDescriptor(Geometry.prototype, "createBufferContainer")));
        Object.defineProperty(Geometry.prototype, "createGeometryData",
            __decorate([
                wd.virtual
            ], Geometry.prototype, "createGeometryData", Object.getOwnPropertyDescriptor(Geometry.prototype, "createGeometryData")));
        return Geometry;
    })(wd.Component);
    wd.Geometry = Geometry;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var GeometryUtils = (function () {
        function GeometryUtils() {
        }
        GeometryUtils.convertToFaces = function (indices, normals) {
            var hasNormals = this.hasData(normals), faces = [];
            for (var i = 0, len = indices.length; i < len; i += 3) {
                var a = indices[i], b = indices[i + 1], c = indices[i + 2], face = wd.Face3.create(a, b, c);
                if (hasNormals) {
                    face.vertexNormals.addChildren([
                        this.getThreeComponent(normals, a),
                        this.getThreeComponent(normals, b),
                        this.getThreeComponent(normals, c)
                    ]);
                    face.faceNormal.set(face.vertexNormals.getChild(0));
                }
                faces.push(face);
            }
            return faces;
        };
        GeometryUtils.hasData = function (data) {
            return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0));
        };
        GeometryUtils.getThreeComponent = function (sourceData, index) {
            var startIndex = 3 * index;
            return wd.Vector3.create(sourceData[startIndex], sourceData[startIndex + 1], sourceData[startIndex + 2]);
        };
        GeometryUtils.setThreeComponent = function (targetData, sourceData, index) {
            if (sourceData instanceof wd.Vector3) {
                targetData[index * 3] = sourceData.x;
                targetData[index * 3 + 1] = sourceData.y;
                targetData[index * 3 + 2] = sourceData.z;
            }
            else {
                targetData[index * 3] = sourceData[0];
                targetData[index * 3 + 1] = sourceData[1];
                targetData[index * 3 + 2] = sourceData[2];
            }
        };
        Object.defineProperty(GeometryUtils, "hasData",
            __decorate([
                wd.require(function (data) {
                    if (data) {
                        wd.assert(data instanceof wdCb.Collection || data instanceof wdCb.Hash || wd.JudgeUtils.isArray(data), wd.Log.info.FUNC_SHOULD("data", "be Array or Collection or Hash"));
                    }
                })
            ], GeometryUtils, "hasData", Object.getOwnPropertyDescriptor(GeometryUtils, "hasData")));
        return GeometryUtils;
    })();
    wd.GeometryUtils = GeometryUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var ModelGeometry = (function (_super) {
        __extends(ModelGeometry, _super);
        function ModelGeometry() {
            _super.apply(this, arguments);
            this.vertices = null;
            this.colors = null;
            this.texCoords = null;
            this.faces = null;
            this.morphTargets = null;
            this.morphFaceNormals = wdCb.Hash.create();
            this.morphVertexNormals = wdCb.Hash.create();
        }
        ModelGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        ModelGeometry.prototype.hasAnimation = function () {
            return this._hasMorphTargets() && (this.gameObject && this.gameObject.hasComponent(wd.MorphAnimation));
        };
        ModelGeometry.prototype.hasMorphFaceNormals = function () {
            return this.buffers.geometryData.hasMorphFaceNormals();
        };
        ModelGeometry.prototype.hasMorphVertexNormals = function () {
            return this.buffers.geometryData.hasMorphVertexNormals();
        };
        ModelGeometry.prototype.computeMorphNormals = function () {
            this.buffers.geometryData.computeMorphNormals();
        };
        ModelGeometry.prototype.computeNormals = function () {
            _super.prototype.computeNormals.call(this);
            if (this._hasMorphTargets()) {
                if (this.isSmoothShading()) {
                    if (!this.hasMorphVertexNormals()) {
                        this.computeMorphNormals();
                    }
                }
                else {
                    if (!this.hasMorphFaceNormals()) {
                        this.computeMorphNormals();
                    }
                }
            }
        };
        ModelGeometry.prototype.computeData = function () {
            return {
                vertices: this.vertices,
                faces: this.faces,
                texCoords: this.texCoords,
                colors: this.colors,
                morphTargets: this.morphTargets
            };
        };
        ModelGeometry.prototype.createBufferContainer = function () {
            if (this.hasAnimation()) {
                return wd.MorphBufferContainer.create(this.gameObject.getComponent(wd.MorphAnimation));
            }
            return wd.CommonBufferContainer.create();
        };
        ModelGeometry.prototype.createGeometryData = function (vertices, faces, texCoords, colors, morphTargets) {
            if (this.hasAnimation()) {
                var geometryData = wd.MorphGeometryData.create(this);
                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.morphTargets = morphTargets;
                return geometryData;
            }
            return this.createCommonGeometryData(vertices, faces, texCoords, colors);
        };
        ModelGeometry.prototype._hasMorphTargets = function () {
            return this.morphTargets && this.morphTargets.getCount() > 0;
        };
        Object.defineProperty(ModelGeometry.prototype, "hasMorphFaceNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], ModelGeometry.prototype, "hasMorphFaceNormals", Object.getOwnPropertyDescriptor(ModelGeometry.prototype, "hasMorphFaceNormals")));
        Object.defineProperty(ModelGeometry.prototype, "hasMorphVertexNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], ModelGeometry.prototype, "hasMorphVertexNormals", Object.getOwnPropertyDescriptor(ModelGeometry.prototype, "hasMorphVertexNormals")));
        Object.defineProperty(ModelGeometry.prototype, "computeMorphNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(this.buffers && this.buffers.geometryData, wd.Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
                })
            ], ModelGeometry.prototype, "computeMorphNormals", Object.getOwnPropertyDescriptor(ModelGeometry.prototype, "computeMorphNormals")));
        Object.defineProperty(ModelGeometry.prototype, "createBufferContainer",
            __decorate([
                wd.require(function () {
                    if (this.hasAnimation()) {
                        wd.assert(this.gameObject.getComponent(wd.MorphAnimation), wd.Log.info.FUNC_SHOULD("gameObject with ModelGeometry", "add MorphAnimation component"));
                    }
                })
            ], ModelGeometry.prototype, "createBufferContainer", Object.getOwnPropertyDescriptor(ModelGeometry.prototype, "createBufferContainer")));
        return ModelGeometry;
    })(wd.Geometry);
    wd.ModelGeometry = ModelGeometry;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry() {
            _super.apply(this, arguments);
            this.width = null;
            this.height = null;
            this.depth = null;
            this.widthSegments = 1;
            this.heightSegments = 1;
            this.depthSegments = 1;
        }
        BoxGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        BoxGeometry.prototype.computeData = function () {
            var width = this.width, height = this.height, depth = this.depth, widthSegments = this.widthSegments, heightSegments = this.heightSegments, depthSegments = this.depthSegments, sides = {
                FRONT: 0,
                BACK: 1,
                TOP: 2,
                BOTTOM: 3,
                RIGHT: 4,
                LEFT: 5
            };
            var faceAxes = [
                [0, 1, 3],
                [4, 5, 7],
                [3, 2, 6],
                [1, 0, 4],
                [1, 4, 2],
                [5, 0, 6]
            ];
            var faceNormals = [
                [0, 0, 1],
                [0, 0, -1],
                [0, 1, 0],
                [0, -1, 0],
                [1, 0, 0],
                [-1, 0, 0]
            ];
            var corners = [
                wd.Vector3.create(-width, -height, depth),
                wd.Vector3.create(width, -height, depth),
                wd.Vector3.create(width, height, depth),
                wd.Vector3.create(-width, height, depth),
                wd.Vector3.create(width, -height, -depth),
                wd.Vector3.create(-width, -height, -depth),
                wd.Vector3.create(-width, height, -depth),
                wd.Vector3.create(width, height, -depth)
            ];
            var vertices = [];
            var normals = [];
            var texCoords = [];
            var indices = [];
            function generateFace(side, uSegments, vSegments) {
                var x, y, z, u, v;
                var i, j;
                var offset = vertices.length / 3;
                for (i = 0; i <= uSegments; i++) {
                    for (j = 0; j <= vSegments; j++) {
                        var temp1 = wd.Vector3.create();
                        var temp2 = wd.Vector3.create();
                        var temp3 = wd.Vector3.create();
                        var r = wd.Vector3.create();
                        temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                        temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                        temp3.sub2(temp2, corners[faceAxes[side][0]]);
                        r.add2(temp1, temp3);
                        u = i / uSegments;
                        v = j / vSegments;
                        vertices.push(r.x, r.y, r.z);
                        normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
                        texCoords.push(u, v);
                        if ((i < uSegments) && (j < vSegments)) {
                            indices.push(offset + j + i * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1), offset + j + i * (uSegments + 1) + 1);
                            indices.push(offset + j + (i + 1) * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1) + 1, offset + j + i * (uSegments + 1) + 1);
                        }
                    }
                }
            }
            generateFace(sides.FRONT, widthSegments, heightSegments);
            generateFace(sides.BACK, widthSegments, heightSegments);
            generateFace(sides.TOP, widthSegments, depthSegments);
            generateFace(sides.BOTTOM, widthSegments, depthSegments);
            generateFace(sides.RIGHT, depthSegments, heightSegments);
            generateFace(sides.LEFT, depthSegments, heightSegments);
            return {
                vertices: vertices,
                faces: wd.GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        };
        return BoxGeometry;
    })(wd.Geometry);
    wd.BoxGeometry = BoxGeometry;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RectGeometry = (function (_super) {
        __extends(RectGeometry, _super);
        function RectGeometry() {
            _super.apply(this, arguments);
            this.width = null;
            this.height = null;
        }
        RectGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        RectGeometry.prototype.computeData = function () {
            var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertices = [], texCoords = [], indices = [], normals = [];
            vertices = [
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ];
            indices = [
                0, 1, 2, 0, 2, 3
            ];
            texCoords = [
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ];
            normals = [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1
            ];
            return {
                vertices: vertices,
                faces: wd.GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        };
        return RectGeometry;
    })(wd.Geometry);
    wd.RectGeometry = RectGeometry;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var PlaneGeometry = (function (_super) {
        __extends(PlaneGeometry, _super);
        function PlaneGeometry() {
            _super.apply(this, arguments);
            this.width = null;
            this.height = null;
            this.widthSegments = 1;
            this.heightSegments = 1;
        }
        PlaneGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        PlaneGeometry.prototype.computeData = function () {
            var width = this.width, height = this.height, widthSegments = this.widthSegments, heightSegments = this.heightSegments, x = null, y = null, z = null, u = null, v = null, i = null, j = null, vertices = [], texCoords = [], normals = [], indices = [];
            for (i = 0; i <= widthSegments; i++) {
                for (j = 0; j <= heightSegments; j++) {
                    x = -width + 2.0 * width * i / widthSegments;
                    y = 0.0;
                    z = -(-height + 2.0 * height * j / heightSegments);
                    u = i / widthSegments;
                    v = j / heightSegments;
                    vertices.push(x, y, z);
                    normals.push(0.0, 1.0, 0.0);
                    texCoords.push(u, v);
                    if ((i < widthSegments) && (j < heightSegments)) {
                        indices.push(j + i * (widthSegments + 1), j + (i + 1) * (widthSegments + 1), j + i * (widthSegments + 1) + 1);
                        indices.push(j + (i + 1) * (widthSegments + 1), j + (i + 1) * (widthSegments + 1) + 1, j + i * (widthSegments + 1) + 1);
                    }
                }
            }
            return {
                vertices: vertices,
                faces: wd.GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        };
        return PlaneGeometry;
    })(wd.Geometry);
    wd.PlaneGeometry = PlaneGeometry;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (SphereDrawMode) {
        SphereDrawMode[SphereDrawMode["LATITUDELONGTITUDE"] = 0] = "LATITUDELONGTITUDE";
    })(wd.SphereDrawMode || (wd.SphereDrawMode = {}));
    var SphereDrawMode = wd.SphereDrawMode;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry() {
            _super.apply(this, arguments);
            this.radius = 1;
            this.drawMode = wd.SphereDrawMode.LATITUDELONGTITUDE;
            this.segments = 20;
        }
        SphereGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        SphereGeometry.prototype.computeData = function () {
            var radius = this.radius, drawMode = this.drawMode, segments = this.segments, data = null;
            if (drawMode === wd.SphereDrawMode.LATITUDELONGTITUDE) {
                var _a = GetDataByLatitudeLongtitude.create(radius, segments).getData(), vertices = _a.vertices, indices = _a.indices, normals = _a.normals, texCoords = _a.texCoords;
                return {
                    vertices: vertices,
                    faces: wd.GeometryUtils.convertToFaces(indices, normals),
                    texCoords: texCoords
                };
            }
            return data;
        };
        return SphereGeometry;
    })(wd.Geometry);
    wd.SphereGeometry = SphereGeometry;
    var GetDataByLatitudeLongtitude = (function () {
        function GetDataByLatitudeLongtitude(radius, bands) {
            this.vertices = [];
            this.indices = [];
            this.texCoords = [];
            this.normals = [];
            this.radius = null;
            this._latitudeBands = null;
            this._longitudeBands = null;
            this.radius = radius;
            this._latitudeBands = bands;
            this._longitudeBands = bands;
        }
        GetDataByLatitudeLongtitude.create = function (radius, bands) {
            var geom = new this(radius, bands);
            return geom;
        };
        GetDataByLatitudeLongtitude.prototype.getData = function () {
            for (var latNumber = 0; latNumber <= this._latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this._latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                for (var longNumber = 0; longNumber <= this._longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this._longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    var x = this.radius * cosPhi * sinTheta;
                    var y = this.radius * cosTheta;
                    var z = this.radius * sinPhi * sinTheta;
                    var u = 1 - (longNumber / this._longitudeBands);
                    var v = 1 - (latNumber / this._latitudeBands);
                    this.normals.push(x);
                    this.normals.push(y);
                    this.normals.push(z);
                    this.texCoords.push(u);
                    this.texCoords.push(v);
                    this.vertices.push(x);
                    this.vertices.push(y);
                    this.vertices.push(z);
                }
            }
            for (var latNumber = 0; latNumber < this._latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < this._longitudeBands; longNumber++) {
                    var first = latNumber * (this._longitudeBands + 1) + longNumber;
                    var second = first + this._longitudeBands + 1;
                    this.indices.push(first + 1);
                    this.indices.push(second);
                    this.indices.push(first);
                    this.indices.push(first + 1);
                    this.indices.push(second + 1);
                    this.indices.push(second);
                }
            }
            return {
                vertices: this.vertices,
                indices: this.indices,
                normals: this.normals,
                texCoords: this.texCoords
            };
        };
        return GetDataByLatitudeLongtitude;
    })();
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TriangleGeometry = (function (_super) {
        __extends(TriangleGeometry, _super);
        function TriangleGeometry() {
            _super.apply(this, arguments);
            this.width = null;
            this.height = null;
        }
        TriangleGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        TriangleGeometry.prototype.computeData = function () {
            var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertices = [], texCoords = [], indices = [], normals = [];
            vertices = [
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ];
            indices = [
                0, 1, 2
            ];
            texCoords = [
                0.5, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ];
            normals = [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1
            ];
            return {
                vertices: vertices,
                faces: wd.GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        };
        return TriangleGeometry;
    })(wd.Geometry);
    wd.TriangleGeometry = TriangleGeometry;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var GeometryData = (function () {
        function GeometryData(geometry) {
            this._vertices = null;
            this._faces = null;
            this._texCoords = null;
            this._colors = null;
            this._tangents = null;
            this.isTangentDirty = true;
            this.geometry = null;
            this._normalCache = null;
            this._normalFromFaceCache = null;
            this._normalFromVertexCache = null;
            this._indiceCache = null;
            this._normalDirty = true;
            this._indiceDirty = true;
            this.geometry = geometry;
        }
        Object.defineProperty(GeometryData.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
                this.isTangentDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "normals", {
            get: function () {
                var geometry = this.geometry;
                if (geometry.isSmoothShading()) {
                    if (!geometry.hasVertexNormals()) {
                        geometry.computeVertexNormals();
                    }
                    return this.normalsFromVertexNormals;
                }
                if (!geometry.hasFaceNormals()) {
                    geometry.computeFaceNormals();
                }
                return this.normalsFromFaceNormal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "normalsFromFaceNormal", {
            get: function () {
                var normals = null;
                if (!this.hasFaceNormals()) {
                    return [];
                }
                normals = [];
                this._faces.forEach(function (face) {
                    var normal = face.faceNormal;
                    wd.GeometryUtils.setThreeComponent(normals, normal, face.aIndex);
                    wd.GeometryUtils.setThreeComponent(normals, normal, face.bIndex);
                    wd.GeometryUtils.setThreeComponent(normals, normal, face.cIndex);
                });
                this._fillEmptyData(normals);
                return normals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "normalsFromVertexNormals", {
            get: function () {
                var normals = null;
                if (!this.hasVertexNormals()) {
                    return [];
                }
                normals = [];
                this._faces.forEach(function (face) {
                    wd.GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(0), face.aIndex);
                    wd.GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(1), face.bIndex);
                    wd.GeometryUtils.setThreeComponent(normals, face.vertexNormals.getChild(2), face.cIndex);
                });
                this._fillEmptyData(normals);
                return normals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "indices", {
            get: function () {
                var indices = [];
                for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                    var face = _a[_i];
                    indices.push(face.aIndex, face.bIndex, face.cIndex);
                }
                return indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "faces", {
            get: function () {
                return this._faces;
            },
            set: function (faces) {
                this._faces = faces;
                this.onChangeFace();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "texCoords", {
            get: function () {
                return this._texCoords;
            },
            set: function (texCoords) {
                this._texCoords = texCoords;
                this.isTangentDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "colors", {
            get: function () {
                return this._getColors(this._colors, this._vertices);
            },
            set: function (colors) {
                this._colors = colors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryData.prototype, "tangents", {
            get: function () {
                if (this.isTangentDirty) {
                    this.isTangentDirty = false;
                    this._tangents = this._calculateTangents(this._vertices, this.normals, this.texCoords, this.indices);
                }
                return this._tangents;
            },
            enumerable: true,
            configurable: true
        });
        GeometryData.prototype.computeFaceNormals = function () {
            var vertices = this._vertices;
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                face.faceNormal = this.computeFaceNormalsHelper(vertices, face.aIndex, face.bIndex, face.cIndex);
            }
        };
        GeometryData.prototype.computeVertexNormals = function () {
            var normals = null;
            if (!this.hasFaceNormals()) {
                this.computeFaceNormals();
            }
            normals = this.computeVertexNormalsHelper(this._vertices);
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                face.vertexNormals = wdCb.Collection.create([
                    normals[face.aIndex],
                    normals[face.bIndex],
                    normals[face.cIndex]
                ]);
            }
        };
        GeometryData.prototype.hasFaceNormals = function () {
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                if (face.faceNormal.isZero()) {
                    return false;
                }
            }
            return true;
        };
        GeometryData.prototype.hasVertexNormals = function () {
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                if (face.vertexNormals.getCount() === 0) {
                    return false;
                }
            }
            return true;
        };
        GeometryData.prototype.onChangeFace = function () {
            this.isTangentDirty = true;
            this._normalDirty = true;
            this._indiceDirty = true;
        };
        GeometryData.prototype.computeFaceNormalsHelper = function (vertices, aIndex, bIndex, cIndex) {
            var p0 = wd.GeometryUtils.getThreeComponent(vertices, aIndex), p1 = wd.GeometryUtils.getThreeComponent(vertices, bIndex), p2 = wd.GeometryUtils.getThreeComponent(vertices, cIndex), v0 = wd.Vector3.create().sub2(p2, p1), v1 = wd.Vector3.create().sub2(p0, p1);
            return wd.Vector3.create().cross(v0, v1).normalize();
        };
        GeometryData.prototype.computeVertexNormalsHelper = function (vertices) {
            var vl = vertices.length / 3, normals = null;
            normals = new Array(vl);
            for (var v = 0; v < vl; v++) {
                normals[v] = wd.Vector3.create();
            }
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                var faceNormal = null;
                faceNormal = face.faceNormal;
                normals[face.aIndex].add(faceNormal);
                normals[face.bIndex].add(faceNormal);
                normals[face.cIndex].add(faceNormal);
            }
            for (var v = 0; v < vl; v++) {
                normals[v].normalize();
            }
            return normals;
        };
        GeometryData.prototype._getColors = function (colors, vertices) {
            if (colors && colors.length > 0) {
                return colors;
            }
            else {
                return this._getColorsFromMaterial(vertices);
            }
        };
        GeometryData.prototype._getColorsFromMaterial = function (vertices) {
            var arr = [], i = 0, material = this.geometry.material, color = material.color, len = null;
            wdCb.Log.error(!vertices || vertices.length === 0, wdCb.Log.info.FUNC_MUST("has vertice data"));
            len = vertices.length;
            for (i = 0; i < len; i++) {
                arr.push(color.r, color.g, color.b);
            }
            return arr;
        };
        GeometryData.prototype._fillEmptyData = function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (isNaN(data[i])) {
                    data[i] = 0;
                }
            }
        };
        GeometryData.prototype._calculateTangents = function (vertices, normals, texCoords, indices) {
            var triangleCount = indices.length / 3, vertexCount = vertices.length / 3, i1, i2, i3, x1, x2, y1, y2, z1, z2, s1, s2, t1, t2, r, sdir = wd.Vector3.create(), tdir = wd.Vector3.create(), v1 = wd.Vector3.create(), v2 = wd.Vector3.create(), v3 = wd.Vector3.create(), w1 = wd.Vector2.create(), w2 = wd.Vector2.create(), w3 = wd.Vector2.create(), i, tan1 = new Float32Array(vertexCount * 3), tan2 = new Float32Array(vertexCount * 3), n = wd.Vector3.create(), temp = wd.Vector3.create(), tangents = [];
            for (i = 0; i < triangleCount; i++) {
                i1 = indices[i * 3];
                i2 = indices[i * 3 + 1];
                i3 = indices[i * 3 + 2];
                v1.set(vertices[i1 * 3], vertices[i1 * 3 + 1], vertices[i1 * 3 + 2]);
                v2.set(vertices[i2 * 3], vertices[i2 * 3 + 1], vertices[i2 * 3 + 2]);
                v3.set(vertices[i3 * 3], vertices[i3 * 3 + 1], vertices[i3 * 3 + 2]);
                w1.set(texCoords[i1 * 2], texCoords[i1 * 2 + 1]);
                w2.set(texCoords[i2 * 2], texCoords[i2 * 2 + 1]);
                w3.set(texCoords[i3 * 2], texCoords[i3 * 2 + 1]);
                x1 = v2.x - v1.x;
                x2 = v3.x - v1.x;
                y1 = v2.y - v1.y;
                y2 = v3.y - v1.y;
                z1 = v2.z - v1.z;
                z2 = v3.z - v1.z;
                s1 = w2.x - w1.x;
                s2 = w3.x - w1.x;
                t1 = w2.y - w1.y;
                t2 = w3.y - w1.y;
                r = 1.0 / (s1 * t2 - s2 * t1);
                sdir.set((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
                tdir.set((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);
                tan1[i1 * 3 + 0] += sdir.x;
                tan1[i1 * 3 + 1] += sdir.y;
                tan1[i1 * 3 + 2] += sdir.z;
                tan1[i2 * 3 + 0] += sdir.x;
                tan1[i2 * 3 + 1] += sdir.y;
                tan1[i2 * 3 + 2] += sdir.z;
                tan1[i3 * 3 + 0] += sdir.x;
                tan1[i3 * 3 + 1] += sdir.y;
                tan1[i3 * 3 + 2] += sdir.z;
                tan2[i1 * 3 + 0] += tdir.x;
                tan2[i1 * 3 + 1] += tdir.y;
                tan2[i1 * 3 + 2] += tdir.z;
                tan2[i2 * 3 + 0] += tdir.x;
                tan2[i2 * 3 + 1] += tdir.y;
                tan2[i2 * 3 + 2] += tdir.z;
                tan2[i3 * 3 + 0] += tdir.x;
                tan2[i3 * 3 + 1] += tdir.y;
                tan2[i3 * 3 + 2] += tdir.z;
            }
            t1 = wd.Vector3.create();
            t2 = wd.Vector3.create();
            for (i = 0; i < vertexCount; i++) {
                var ndott = null;
                n.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
                t1.set(tan1[i * 3], tan1[i * 3 + 1], tan1[i * 3 + 2]);
                t2.set(tan2[i * 3], tan2[i * 3 + 1], tan2[i * 3 + 2]);
                ndott = n.dot(t1);
                temp = n.copy().scale(ndott);
                temp.sub2(t1, temp).normalize();
                tangents[i * 4] = temp.x;
                tangents[i * 4 + 1] = temp.y;
                tangents[i * 4 + 2] = temp.z;
                temp.cross(n, t1);
                tangents[i * 4 + 3] = (temp.dot(t2) < 0.0) ? -1.0 : 1.0;
            }
            return tangents;
        };
        Object.defineProperty(GeometryData.prototype, "normals",
            __decorate([
                wd.requireGetter(function () {
                    wd.assert(this._faces.length > 0, wd.Log.info.FUNC_SHOULD("faces.count", "> 0"));
                    for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                        var face = _a[_i];
                        if (this.geometry.isSmoothShading()) {
                            wd.assert(face.vertexNormals && face.vertexNormals.getCount() === 3, wd.Log.info.FUNC_SHOULD("faces->vertexNormals.count", "=== 3"));
                        }
                        else {
                            wd.assert(!face.faceNormal.isZero(), wd.Log.info.FUNC_SHOULD("faces->faceNormal", "has data"));
                        }
                    }
                }),
                wd.ensureGetter(function (normals) {
                    wd.assert(normals.length > 0, wd.Log.info.FUNC_SHOULD("geometry", "contain normals data"));
                }),
                wd.cacheGetter(function () {
                    return !this._normalDirty && this._normalCache;
                }, function () {
                    return this._normalCache;
                }, function (result) {
                    this._normalCache = result;
                    this._normalDirty = false;
                })
            ], GeometryData.prototype, "normals", Object.getOwnPropertyDescriptor(GeometryData.prototype, "normals")));
        Object.defineProperty(GeometryData.prototype, "normalsFromFaceNormal",
            __decorate([
                wd.cacheGetter(function () {
                    return !this._normalDirty && this._normalFromFaceCache;
                }, function () {
                    return this._normalFromFaceCache;
                }, function (result) {
                    this._normalFromFaceCache = result;
                    this._normalDirty = false;
                })
            ], GeometryData.prototype, "normalsFromFaceNormal", Object.getOwnPropertyDescriptor(GeometryData.prototype, "normalsFromFaceNormal")));
        Object.defineProperty(GeometryData.prototype, "normalsFromVertexNormals",
            __decorate([
                wd.cacheGetter(function () {
                    return !this._normalDirty && this._normalFromVertexCache;
                }, function () {
                    return this._normalFromVertexCache;
                }, function (result) {
                    this._normalFromVertexCache = result;
                    this._normalDirty = false;
                })
            ], GeometryData.prototype, "normalsFromVertexNormals", Object.getOwnPropertyDescriptor(GeometryData.prototype, "normalsFromVertexNormals")));
        Object.defineProperty(GeometryData.prototype, "indices",
            __decorate([
                wd.cacheGetter(function () {
                    return !this._indiceDirty && this._indiceCache;
                }, function () {
                    return this._indiceCache;
                }, function (result) {
                    this._indiceCache = result;
                    this._indiceDirty = false;
                })
            ], GeometryData.prototype, "indices", Object.getOwnPropertyDescriptor(GeometryData.prototype, "indices")));
        Object.defineProperty(GeometryData.prototype, "computeFaceNormals",
            __decorate([
                wd.require(function () {
                    wd.assert(wd.GeometryUtils.hasData(this.vertices), wd.Log.info.FUNC_MUST("contain vertices"));
                }),
                wd.ensure(function () {
                    for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                        var face = _a[_i];
                        wd.assert(face.faceNormal instanceof wd.Vector3, wd.Log.info.FUNC_SHOULD_NOT("faceNormal", "be null"));
                    }
                })
            ], GeometryData.prototype, "computeFaceNormals", Object.getOwnPropertyDescriptor(GeometryData.prototype, "computeFaceNormals")));
        Object.defineProperty(GeometryData.prototype, "onChangeFace",
            __decorate([
                wd.virtual
            ], GeometryData.prototype, "onChangeFace", Object.getOwnPropertyDescriptor(GeometryData.prototype, "onChangeFace")));
        return GeometryData;
    })();
    wd.GeometryData = GeometryData;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonGeometryData = (function (_super) {
        __extends(CommonGeometryData, _super);
        function CommonGeometryData() {
            _super.apply(this, arguments);
        }
        CommonGeometryData.create = function (geometry) {
            var obj = new this(geometry);
            return obj;
        };
        return CommonGeometryData;
    })(wd.GeometryData);
    wd.CommonGeometryData = CommonGeometryData;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MorphGeometryData = (function (_super) {
        __extends(MorphGeometryData, _super);
        function MorphGeometryData() {
            _super.apply(this, arguments);
            this._morphTargets = null;
            this._morphNormalCache = null;
            this._morphNormalDirty = true;
        }
        MorphGeometryData.create = function (geometry) {
            var obj = new this(geometry);
            return obj;
        };
        Object.defineProperty(MorphGeometryData.prototype, "morphNormals", {
            get: function () {
                var geometry = this.geometry;
                this._morphNormalDirty = false;
                if (geometry.isSmoothShading()) {
                    if (!geometry.hasMorphVertexNormals()) {
                        geometry.computeMorphNormals();
                    }
                    return geometry.morphVertexNormals;
                }
                if (!geometry.hasMorphFaceNormals()) {
                    geometry.computeMorphNormals();
                }
                return geometry.morphFaceNormals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MorphGeometryData.prototype, "morphTargets", {
            get: function () {
                return this._morphTargets;
            },
            set: function (morphTargets) {
                this._morphTargets = morphTargets;
                this._morphNormalDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        MorphGeometryData.prototype.computeMorphNormals = function () {
            var geometry = this.geometry, self = this;
            this._morphTargets.forEach(function (frames, animName) {
                var faceNormalList = wdCb.Collection.create(), vertexNormalList = wdCb.Collection.create();
                frames.forEach(function (vertices) {
                    var tempGeometryData = MorphGeometryData.create(geometry), faceNormalsOfEachFrame = null, vertexNormalsOfEachFrame = null;
                    tempGeometryData.vertices = vertices;
                    tempGeometryData.faces = self._copyFaces(geometry.faces);
                    tempGeometryData.computeFaceNormals();
                    tempGeometryData.computeVertexNormals();
                    _a = self._getMorphNormals(tempGeometryData), faceNormalsOfEachFrame = _a[0], vertexNormalsOfEachFrame = _a[1];
                    faceNormalList.addChild(faceNormalsOfEachFrame);
                    vertexNormalList.addChild(vertexNormalsOfEachFrame);
                    var _a;
                });
                geometry.morphFaceNormals.addChild(animName, faceNormalList);
                geometry.morphVertexNormals.addChild(animName, vertexNormalList);
            });
        };
        MorphGeometryData.prototype.hasMorphFaceNormals = function () {
            return this.geometry.morphFaceNormals.getCount() > 0;
        };
        MorphGeometryData.prototype.hasMorphVertexNormals = function () {
            return this.geometry.morphVertexNormals.getCount() > 0;
        };
        MorphGeometryData.prototype.onChangeFace = function () {
            this._morphNormalDirty = true;
        };
        MorphGeometryData.prototype._copyFaces = function (faces) {
            var copyFaces = [];
            for (var _i = 0; _i < faces.length; _i++) {
                var face = faces[_i];
                copyFaces.push(face.copy());
            }
            return copyFaces;
        };
        MorphGeometryData.prototype._getMorphNormals = function (geometryData) {
            return [geometryData.normalsFromFaceNormal, geometryData.normalsFromVertexNormals];
        };
        Object.defineProperty(MorphGeometryData.prototype, "morphNormals",
            __decorate([
                wd.cacheGetter(function () {
                    return !this._morphNormalDirty && this._morphNormalCache;
                }, function () {
                    return this._morphNormalCache;
                }, function (result) {
                    this._morphNormalCache = result;
                })
            ], MorphGeometryData.prototype, "morphNormals", Object.getOwnPropertyDescriptor(MorphGeometryData.prototype, "morphNormals")));
        return MorphGeometryData;
    })(wd.GeometryData);
    wd.MorphGeometryData = MorphGeometryData;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var BufferContainer = (function () {
        function BufferContainer() {
            this.geometryData = null;
            this.container = wdCb.Hash.create();
        }
        BufferContainer.prototype.init = function () {
        };
        BufferContainer.prototype.getChild = function (type) {
            var result = null;
            switch (type) {
                case wd.BufferDataType.VERTICE:
                    result = this.getVertice(type);
                    break;
                case wd.BufferDataType.NORMAL:
                    result = this.getNormal(type);
                    break;
                case wd.BufferDataType.TANGENT:
                    result = this._getTangent(type);
                    break;
                case wd.BufferDataType.COLOR:
                    result = this._getColor(type);
                    break;
                case wd.BufferDataType.INDICE:
                    result = this._getIndice(type);
                    break;
                case wd.BufferDataType.TEXCOORD:
                    result = this._getTexCoord(type);
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW("BufferDataType: " + type));
                    break;
            }
            return result;
        };
        BufferContainer.prototype.hasChild = function (type) {
            var data = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            return data && data.length > 0;
        };
        BufferContainer.prototype.dispose = function () {
            this.container.forEach(function (buffer) {
                buffer.dispose();
            });
        };
        BufferContainer.prototype._getTangent = function (type) {
            var geometryData = null, result = null;
            geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            result = wd.ArrayBuffer.create(new Float32Array(geometryData), 3, wd.BufferType.FLOAT);
            return result;
        };
        BufferContainer.prototype._getColor = function (type) {
            var geometryData = null, result = null;
            geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            result = wd.ArrayBuffer.create(new Float32Array(geometryData), 3, wd.BufferType.FLOAT);
            return result;
        };
        BufferContainer.prototype._getIndice = function (type) {
            var geometryData = null, result = null;
            geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            result = wd.ElementBuffer.create(new Uint16Array(geometryData), wd.BufferType.UNSIGNED_SHORT);
            return result;
        };
        BufferContainer.prototype._getTexCoord = function (type) {
            var geometryData = null, result = null;
            geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            result = wd.ArrayBuffer.create(new Float32Array(geometryData), 2, wd.BufferType.FLOAT);
            return result;
        };
        BufferContainer.prototype._needReCalcuteTangent = function (type) {
            return this.geometryData.isTangentDirty && type === wd.BufferDataType.TANGENT;
        };
        Object.defineProperty(BufferContainer.prototype, "init",
            __decorate([
                wd.virtual
            ], BufferContainer.prototype, "init", Object.getOwnPropertyDescriptor(BufferContainer.prototype, "init")));
        Object.defineProperty(BufferContainer.prototype, "_getTangent",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type) && !this._needReCalcuteTangent(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], BufferContainer.prototype, "_getTangent", Object.getOwnPropertyDescriptor(BufferContainer.prototype, "_getTangent")));
        Object.defineProperty(BufferContainer.prototype, "_getColor",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], BufferContainer.prototype, "_getColor", Object.getOwnPropertyDescriptor(BufferContainer.prototype, "_getColor")));
        Object.defineProperty(BufferContainer.prototype, "_getIndice",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], BufferContainer.prototype, "_getIndice", Object.getOwnPropertyDescriptor(BufferContainer.prototype, "_getIndice")));
        Object.defineProperty(BufferContainer.prototype, "_getTexCoord",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], BufferContainer.prototype, "_getTexCoord", Object.getOwnPropertyDescriptor(BufferContainer.prototype, "_getTexCoord")));
        return BufferContainer;
    })();
    wd.BufferContainer = BufferContainer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var CommonBufferContainer = (function (_super) {
        __extends(CommonBufferContainer, _super);
        function CommonBufferContainer() {
            _super.apply(this, arguments);
        }
        CommonBufferContainer.create = function () {
            var obj = new this();
            return obj;
        };
        CommonBufferContainer.prototype.getVertice = function (type) {
            var geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            return wd.ArrayBuffer.create(new Float32Array(geometryData), 3, wd.BufferType.FLOAT);
        };
        CommonBufferContainer.prototype.getNormal = function (type) {
            var geometryData = this.geometryData[wd.BufferDataTable.getGeometryDataName(type)];
            return wd.ArrayBuffer.create(new Float32Array(geometryData), 3, wd.BufferType.FLOAT);
        };
        Object.defineProperty(CommonBufferContainer.prototype, "getVertice",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], CommonBufferContainer.prototype, "getVertice", Object.getOwnPropertyDescriptor(CommonBufferContainer.prototype, "getVertice")));
        Object.defineProperty(CommonBufferContainer.prototype, "getNormal",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(type);
                }, function (type) {
                    return this.container.getChild(type);
                }, function (result, type) {
                    this.container.addChild(type, result);
                })
            ], CommonBufferContainer.prototype, "getNormal", Object.getOwnPropertyDescriptor(CommonBufferContainer.prototype, "getNormal")));
        return CommonBufferContainer;
    })(wd.BufferContainer);
    wd.CommonBufferContainer = CommonBufferContainer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MorphBufferContainer = (function (_super) {
        __extends(MorphBufferContainer, _super);
        function MorphBufferContainer(animation) {
            _super.call(this);
            this._animation = null;
            this._isCacheChangeFlag = {};
            this._isCacheChangeInLastLoop = {};
            this._animation = animation;
        }
        MorphBufferContainer.create = function (animation) {
            var obj = new this(animation);
            return obj;
        };
        MorphBufferContainer.prototype.getVertice = function (type) {
            return this._getMorphData(type, this.geometryData.morphTargets);
        };
        MorphBufferContainer.prototype.getNormal = function (type) {
            return this._getMorphData(type, this.geometryData.morphNormals);
        };
        MorphBufferContainer.prototype._getMorphData = function (type, morphDataTargets) {
            var cacheData = null, frames = null, result = null;
            if (this._isNotPlayAnimation()) {
                return this._getStaticData(type);
            }
            frames = morphDataTargets.getChild(this._animation.currentAnimName);
            wdCb.Log.error(!frames, wdCb.Log.info.FUNC_SHOULD("\"" + this._animation.currentAnimName + "\" animation", "contain frame data"));
            cacheData = this.container.getChild(type);
            if (!cacheData) {
                var currentBuffer = wd.ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.currentFrame)), 3, wd.BufferType.FLOAT, wd.BufferUsage.DYNAMIC_DRAW), nextBuffer = wd.ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.nextFrame)), 3, wd.BufferType.FLOAT, wd.BufferUsage.DYNAMIC_DRAW);
                result = [currentBuffer, nextBuffer];
                this.container.addChild(type, result);
                this._isCacheChangeInLastLoop[type] = false;
            }
            else {
                if (this._animation.isFrameChange && (this._isCacheChangeInLastLoop[type] || this._isCacheNotChange(type))) {
                    var currentBuffer = cacheData[0], nextBuffer = cacheData[1], newCurrentBuffer = null, newNextBuffer = null;
                    newCurrentBuffer = nextBuffer;
                    newNextBuffer = currentBuffer.resetData(new Float32Array(frames.getChild(this._animation.nextFrame)));
                    result = [newCurrentBuffer, newNextBuffer];
                    this.container.addChild(type, result);
                    this._isCacheChangeFlag[type] = true;
                    this._isCacheChangeInLastLoop[type] = true;
                }
                else {
                    this._isCacheChangeFlag[type] = false;
                    this._isCacheChangeInLastLoop[type] = false;
                    result = cacheData;
                }
            }
            return result;
        };
        MorphBufferContainer.prototype._isCacheNotChange = function (type) {
            return !this._isCacheChangeFlag[type];
        };
        MorphBufferContainer.prototype._isNotPlayAnimation = function () {
            return this._animation.currentAnimName === null;
        };
        MorphBufferContainer.prototype._getStaticData = function (type) {
            var data = null, result = null;
            switch (type) {
                case wd.BufferDataType.VERTICE:
                    data = this.geometryData.vertices;
                    break;
                case wd.BufferDataType.NORMAL:
                    data = this.geometryData.normals;
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
                    break;
            }
            this._animation.interpolation = 0;
            result = [
                wd.ArrayBuffer.create(new Float32Array(data), 3, wd.BufferType.FLOAT, wd.BufferUsage.DYNAMIC_DRAW),
                wd.ArrayBuffer.create(new Float32Array(data), 3, wd.BufferType.FLOAT, wd.BufferUsage.DYNAMIC_DRAW),
            ];
            return result;
        };
        MorphBufferContainer.prototype._getStaticDataCacheData = function (type) {
            return "static_" + type;
        };
        Object.defineProperty(MorphBufferContainer.prototype, "getVertice",
            __decorate([
                wd.require(function (type) {
                    wd.assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, wd.Log.info.FUNC_SHOULD("set morphTargets"));
                })
            ], MorphBufferContainer.prototype, "getVertice", Object.getOwnPropertyDescriptor(MorphBufferContainer.prototype, "getVertice")));
        Object.defineProperty(MorphBufferContainer.prototype, "getNormal",
            __decorate([
                wd.require(function (type) {
                    wd.assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, wd.Log.info.FUNC_SHOULD("set morphTargets"));
                })
            ], MorphBufferContainer.prototype, "getNormal", Object.getOwnPropertyDescriptor(MorphBufferContainer.prototype, "getNormal")));
        Object.defineProperty(MorphBufferContainer.prototype, "_getStaticData",
            __decorate([
                wd.cache(function (type) {
                    return this.container.hasChild(this._getStaticDataCacheData(type));
                }, function (type) {
                    return this.container.getChild(this._getStaticDataCacheData(type));
                }, function (result, type) {
                    this.container.addChild(this._getStaticDataCacheData(type), result);
                }),
                wd.require(function (type) {
                })
            ], MorphBufferContainer.prototype, "_getStaticData", Object.getOwnPropertyDescriptor(MorphBufferContainer.prototype, "_getStaticData")));
        return MorphBufferContainer;
    })(wd.BufferContainer);
    wd.MorphBufferContainer = MorphBufferContainer;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Camera = (function () {
        function Camera() {
            this._worldToCameraMatrix = null;
            this.pMatrix = wd.Matrix4.create();
            this.gameObject = null;
            this.dirty = false;
        }
        Object.defineProperty(Camera.prototype, "cameraToWorldMatrix", {
            get: function () {
                return this.gameObject.transform.localToWorldMatrix.copy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "worldToCameraMatrix", {
            get: function () {
                if (this._worldToCameraMatrix) {
                    return this._worldToCameraMatrix;
                }
                return this.cameraToWorldMatrix.invert();
            },
            set: function (matrix) {
                this._worldToCameraMatrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.init = function () {
            if (this.dirty) {
                this.updateProjectionMatrix();
                this.dirty = false;
            }
        };
        Camera.prototype.dispose = function () {
        };
        Camera.prototype.update = function (time) {
            if (this.dirty) {
                this.updateProjectionMatrix();
                this.dirty = false;
            }
        };
        Object.defineProperty(Camera.prototype, "cameraToWorldMatrix",
            __decorate([
                wd.requireGetter(function () {
                    wd.assert(this.gameObject, wd.Log.info.FUNC_MUST_DEFINE("gameObject"));
                })
            ], Camera.prototype, "cameraToWorldMatrix", Object.getOwnPropertyDescriptor(Camera.prototype, "cameraToWorldMatrix")));
        Object.defineProperty(Camera.prototype, "init",
            __decorate([
                wd.virtual
            ], Camera.prototype, "init", Object.getOwnPropertyDescriptor(Camera.prototype, "init")));
        Object.defineProperty(Camera.prototype, "dispose",
            __decorate([
                wd.virtual
            ], Camera.prototype, "dispose", Object.getOwnPropertyDescriptor(Camera.prototype, "dispose")));
        return Camera;
    })();
    wd.Camera = Camera;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var OrthographicCamera = (function (_super) {
        __extends(OrthographicCamera, _super);
        function OrthographicCamera() {
            _super.apply(this, arguments);
            this._left = null;
            this._right = null;
            this._bottom = null;
            this._top = null;
            this._near = null;
            this._far = null;
        }
        OrthographicCamera.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(OrthographicCamera.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (left) {
                this._left = left;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrthographicCamera.prototype, "right", {
            get: function () {
                return this._right;
            },
            set: function (right) {
                this._right = right;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrthographicCamera.prototype, "bottom", {
            get: function () {
                return this._bottom;
            },
            set: function (bottom) {
                this._bottom = bottom;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrthographicCamera.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (top) {
                this._top = top;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrthographicCamera.prototype, "near", {
            get: function () {
                return this._near;
            },
            set: function (near) {
                this._near = near;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrthographicCamera.prototype, "far", {
            get: function () {
                return this._far;
            },
            set: function (far) {
                this._far = far;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        OrthographicCamera.prototype.updateProjectionMatrix = function () {
            this.pMatrix.setOrtho(this._left, this._right, this._bottom, this._top, this._near, this._far);
        };
        return OrthographicCamera;
    })(wd.Camera);
    wd.OrthographicCamera = OrthographicCamera;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var PerspectiveCamera = (function (_super) {
        __extends(PerspectiveCamera, _super);
        function PerspectiveCamera() {
            _super.apply(this, arguments);
            this._fovy = null;
            this._aspect = null;
            this._near = null;
            this._far = null;
        }
        PerspectiveCamera.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
            get: function () {
                return this._fovy;
            },
            set: function (fovy) {
                this._fovy = fovy;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
            get: function () {
                return this._aspect;
            },
            set: function (aspect) {
                this._aspect = aspect;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveCamera.prototype, "near", {
            get: function () {
                return this._near;
            },
            set: function (near) {
                this._near = near;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PerspectiveCamera.prototype, "far", {
            get: function () {
                return this._far;
            },
            set: function (far) {
                this._far = far;
                this.dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        PerspectiveCamera.prototype.zoomIn = function (speed, min) {
            if (min === void 0) { min = 1; }
            this.fovy = Math.max(this.fovy - speed, min);
        };
        PerspectiveCamera.prototype.zoomOut = function (speed, max) {
            if (max === void 0) { max = 179; }
            this.fovy = Math.min(this.fovy + speed, max);
        };
        PerspectiveCamera.prototype.updateProjectionMatrix = function () {
            this.pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
        };
        return PerspectiveCamera;
    })(wd.Camera);
    wd.PerspectiveCamera = PerspectiveCamera;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CameraController = (function (_super) {
        __extends(CameraController, _super);
        function CameraController(cameraComponent) {
            _super.call(this);
            this.camera = null;
            this.camera = cameraComponent;
        }
        Object.defineProperty(CameraController.prototype, "cameraToWorldMatrix", {
            get: function () {
                return this.camera.cameraToWorldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraController.prototype, "worldToCameraMatrix", {
            get: function () {
                return this.camera.worldToCameraMatrix;
            },
            set: function (matrix) {
                this.camera.worldToCameraMatrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraController.prototype, "pMatrix", {
            get: function () {
                return this.camera.pMatrix;
            },
            set: function (pMatrix) {
                this.camera.pMatrix = pMatrix;
            },
            enumerable: true,
            configurable: true
        });
        CameraController.prototype.init = function () {
            this.camera.gameObject = this.gameObject;
            this.camera.init();
        };
        CameraController.prototype.update = function (time) {
            this.camera.update(time);
        };
        CameraController.prototype.dispose = function () {
            this.camera.dispose();
        };
        return CameraController;
    })(wd.Component);
    wd.CameraController = CameraController;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicCameraController = (function (_super) {
        __extends(BasicCameraController, _super);
        function BasicCameraController() {
            _super.apply(this, arguments);
        }
        BasicCameraController.create = function (cameraComponent) {
            var obj = new this(cameraComponent);
            return obj;
        };
        return BasicCameraController;
    })(wd.CameraController);
    wd.BasicCameraController = BasicCameraController;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var FlyCameraController = (function (_super) {
        __extends(FlyCameraController, _super);
        function FlyCameraController(cameraComponent) {
            _super.call(this, cameraComponent);
            this._control = null;
            if (cameraComponent instanceof wd.PerspectiveCamera) {
                this._control = wd.FlyPerspectiveCameraControl.create(cameraComponent);
            }
            else {
                this._control = wd.FlyOrthographicCameraControl.create(cameraComponent);
            }
        }
        FlyCameraController.create = function (cameraComponent) {
            var obj = new this(cameraComponent);
            return obj;
        };
        FlyCameraController.prototype.init = function () {
            _super.prototype.init.call(this);
            this._control.init(this.gameObject);
        };
        FlyCameraController.prototype.update = function (time) {
            _super.prototype.update.call(this, time);
            this._control.update(time);
        };
        FlyCameraController.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._control.dispose();
        };
        return FlyCameraController;
    })(wd.CameraController);
    wd.FlyCameraController = FlyCameraController;
})(wd || (wd = {}));


var wd;
(function (wd_1) {
    var FlyCameraControl = (function () {
        function FlyCameraControl(cameraComponent) {
            this.moveSpeed = 1.2;
            this.rotateSpeed = 100;
            this.cameraComponent = null;
            this._rotateX = 0;
            this._rotateY = 0;
            this._isRotate = false;
            this._mouseDragSubscription = null;
            this._keydownSubscription = null;
            this._gameObject = null;
            this.cameraComponent = cameraComponent;
        }
        FlyCameraControl.prototype.init = function (gameObject) {
            var eulerAngles = gameObject.transform.eulerAngles;
            this._rotateX = eulerAngles.x;
            this._rotateY = eulerAngles.y;
            this._gameObject = gameObject;
            this._bindCanvasEvent();
        };
        FlyCameraControl.prototype.update = function (time) {
            if (!this._isRotate) {
                return;
            }
            this._isRotate = false;
            this._gameObject.transform.eulerAngles = wd_1.Vector3.create(this._rotateX, this._rotateY, 0);
        };
        FlyCameraControl.prototype.dispose = function () {
            this._removeEvent();
        };
        FlyCameraControl.prototype._move = function (event) {
            var speed = this.moveSpeed, gameObject = this._gameObject, keyState = event.keyState;
            if (keyState["a"] || keyState["left"]) {
                gameObject.transform.translateLocal(wd_1.Vector3.create(-speed, 0, 0));
            }
            else if (keyState["d"] || keyState["right"]) {
                gameObject.transform.translateLocal(wd_1.Vector3.create(speed, 0, 0));
            }
            else if (keyState["w"] || keyState["up"]) {
                gameObject.transform.translateLocal(wd_1.Vector3.create(0, 0, -speed));
            }
            else if (keyState["s"] || keyState["down"]) {
                gameObject.transform.translateLocal(wd_1.Vector3.create(0, 0, speed));
            }
        };
        FlyCameraControl.prototype._bindCanvasEvent = function () {
            var self = this, rotateSpeed = this.rotateSpeed, scene = wd_1.Director.getInstance().scene, mouseup = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEUP), mousemove = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEMOVE), mousedown = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEDOWN), keydown = wd_1.EventManager.fromEvent(wd_1.EventName.KEYDOWN), mousedrag = null, canvas = wd_1.Director.getInstance().view;
            mousedrag = mousedown.flatMap(function (e) {
                e.stopPropagation();
                return mousemove.map(function (e) {
                    var movementDelta = e.movementDelta, dx = null, wd = null, factor = rotateSpeed / canvas.height;
                    dx = factor * movementDelta.x;
                    wd = factor * movementDelta.y;
                    self._isRotate = true;
                    return {
                        dx: dx,
                        wd: wd
                    };
                }).takeUntil(mouseup);
            });
            this._mouseDragSubscription = mousedrag.subscribe(function (pos) {
                self._rotateY -= pos.dx;
                self._rotateX -= pos.wd;
            });
            this._keydownSubscription = keydown.subscribe(function (e) {
                self._move(e);
                self.zoom(e);
            });
        };
        FlyCameraControl.prototype._removeEvent = function () {
            this._mouseDragSubscription.dispose();
            this._keydownSubscription.dispose();
        };
        return FlyCameraControl;
    })();
    wd_1.FlyCameraControl = FlyCameraControl;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var FlyPerspectiveCameraControl = (function (_super) {
        __extends(FlyPerspectiveCameraControl, _super);
        function FlyPerspectiveCameraControl() {
            _super.apply(this, arguments);
            this.zoomSpeed = 10;
        }
        FlyPerspectiveCameraControl.create = function (cameraComponent) {
            var obj = new this(cameraComponent);
            return obj;
        };
        FlyPerspectiveCameraControl.prototype.zoom = function (event) {
            var speed = this.zoomSpeed, keyState = event.keyState;
            if (keyState["g"]) {
                this.cameraComponent.zoomIn(speed);
            }
            else if (keyState["h"]) {
                this.cameraComponent.zoomOut(speed);
            }
        };
        return FlyPerspectiveCameraControl;
    })(wd.FlyCameraControl);
    wd.FlyPerspectiveCameraControl = FlyPerspectiveCameraControl;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var FlyOrthographicCameraControl = (function (_super) {
        __extends(FlyOrthographicCameraControl, _super);
        function FlyOrthographicCameraControl() {
            _super.apply(this, arguments);
        }
        FlyOrthographicCameraControl.create = function (cameraComponent) {
            var obj = new this(cameraComponent);
            return obj;
        };
        FlyOrthographicCameraControl.prototype.zoom = function (event) {
        };
        return FlyOrthographicCameraControl;
    })(wd.FlyCameraControl);
    wd.FlyOrthographicCameraControl = FlyOrthographicCameraControl;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd_1) {
    var ArcballCameraController = (function (_super) {
        __extends(ArcballCameraController, _super);
        function ArcballCameraController() {
            _super.apply(this, arguments);
            this.moveSpeedX = 1;
            this.moveSpeedY = 1;
            this.rotateSpeed = 1;
            this.distance = 10;
            this.phi = Math.PI / 2;
            this.theta = Math.PI / 2;
            this.target = wd_1.Vector3.create(0, 0, 0);
            this.thetaMargin = 0.05;
            this.minDistance = 0.05;
            this._isChange = true;
            this._mouseDragSubscription = null;
            this._mouseWheelSubscription = null;
            this._keydownSubscription = null;
        }
        ArcballCameraController.create = function (cameraComponent) {
            var obj = new this(cameraComponent);
            return obj;
        };
        ArcballCameraController.prototype.init = function () {
            _super.prototype.init.call(this);
            this._bindCanvasEvent();
        };
        ArcballCameraController.prototype.update = function (time) {
            /*!
             X= r*cos(phi)*sin(theta);
             Z= r*sin(phi)*sin(theta);
             Y= r*cos(theta);
             */
            var x = null, y = null, z = null;
            _super.prototype.update.call(this, time);
            if (!this._isChange) {
                return;
            }
            this._isChange = false;
            x = ((this.distance) * Math.cos(this.phi) * Math.sin(this.theta) + this.target.x);
            z = ((this.distance) * Math.sin(this.phi) * Math.sin(this.theta) + this.target.z);
            y = ((this.distance) * Math.cos(this.theta) + this.target.y);
            this.gameObject.transform.position = wd_1.Vector3.create(x, y, z);
            this.gameObject.transform.lookAt(this.target);
        };
        ArcballCameraController.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._removeEvent();
        };
        ArcballCameraController.prototype._bindCanvasEvent = function () {
            var self = this, scene = wd_1.Director.getInstance().scene, mouseup = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEUP), mousemove = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEMOVE), mousedown = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEDOWN), mousewheel = wd_1.EventManager.fromEvent(scene, wd_1.EventName.MOUSEWHEEL), keydown = wd_1.EventManager.fromEvent(wd_1.EventName.KEYDOWN), mousedrag = null;
            mousedrag = mousedown.flatMap(function (e) {
                e.stopPropagation();
                return mousemove.takeUntil(mouseup);
            });
            this._mouseDragSubscription = mousedrag.subscribe(function (e) {
                self._changeOrbit(e);
            });
            this._mouseWheelSubscription = mousewheel.subscribe(function (e) {
                e.preventDefault();
                self._changeDistance(e);
            });
            this._keydownSubscription = keydown.subscribe(function (e) {
                self._changeTarget(e);
            });
        };
        ArcballCameraController.prototype._changeOrbit = function (e) {
            var movementDelta = e.movementDelta;
            this._isChange = true;
            this.phi += movementDelta.x / (100 / this.rotateSpeed);
            this.theta -= movementDelta.y / (100 / this.rotateSpeed);
            this._contrainTheta();
        };
        ArcballCameraController.prototype._changeTarget = function (e) {
            var moveSpeedX = this.moveSpeedX, moveSpeedY = this.moveSpeedY, dx = null, wd = null, keyState = e.keyState, transform = this.gameObject.transform;
            this._isChange = true;
            if (keyState["a"] || keyState["left"]) {
                dx = -moveSpeedX;
            }
            else if (keyState["d"] || keyState["right"]) {
                dx = moveSpeedX;
            }
            else if (keyState["w"] || keyState["up"]) {
                wd = moveSpeedY;
            }
            else if (keyState["s"] || keyState["down"]) {
                wd = -moveSpeedY;
            }
            this.target.add(wd_1.Vector3.create(transform.right.x * (dx), 0, transform.right.z * (dx)));
            this.target.add(wd_1.Vector3.create(transform.up.x * wd, transform.up.y * wd, 0));
        };
        ArcballCameraController.prototype._changeDistance = function (e) {
            this._isChange = true;
            this.distance -= e.wheel;
            this._contrainDistance();
        };
        ArcballCameraController.prototype._contrainDistance = function () {
            this.distance = wd_1.MathUtils.bigThan(this.distance, this.minDistance);
        };
        ArcballCameraController.prototype._contrainTheta = function () {
            this.theta = wd_1.MathUtils.clamp(this.theta, this.thetaMargin, Math.PI - this.thetaMargin);
        };
        ArcballCameraController.prototype._removeEvent = function () {
            this._mouseDragSubscription.dispose();
            this._mouseWheelSubscription.dispose();
            this._keydownSubscription.dispose();
        };
        return ArcballCameraController;
    })(wd_1.CameraController);
    wd_1.ArcballCameraController = ArcballCameraController;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.apply(this, arguments);
            this.p_target = null;
            this.isFinish = false;
        }
        Object.defineProperty(Action.prototype, "isStart", {
            get: function () {
                return !this.isStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "isStop", {
            get: function () {
                return wd.Log.error(true, wd.Log.info.ABSTRACT_ATTRIBUTE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "isPause", {
            get: function () {
                return wd.Log.error(true, wd.Log.info.ABSTRACT_ATTRIBUTE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "target", {
            get: function () {
                return this.p_target;
            },
            set: function (target) {
                this.p_target = target;
            },
            enumerable: true,
            configurable: true
        });
        Action.prototype.reset = function () {
            this.isFinish = false;
        };
        Action.prototype.addToGameObject = function (gameObject) {
            _super.prototype.addToGameObject.call(this, gameObject);
            this.target = gameObject;
            gameObject.actionManager.addChild(this);
        };
        Action.prototype.removeFromGameObject = function (gameObject) {
            _super.prototype.removeFromGameObject.call(this, gameObject);
            gameObject.actionManager.removeChild(this);
        };
        Action.prototype.init = function () {
            this.start();
        };
        Action.prototype.finish = function () {
            this.isFinish = true;
            this.stop();
        };
        return Action;
    })(wd.Component);
    wd.Action = Action;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ActionInstant = (function (_super) {
        __extends(ActionInstant, _super);
        function ActionInstant() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(ActionInstant.prototype, "isStop", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActionInstant.prototype, "isPause", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ActionInstant.prototype.start = function () {
        };
        ActionInstant.prototype.stop = function () {
        };
        ActionInstant.prototype.pause = function () {
        };
        ActionInstant.prototype.resume = function () {
        };
        return ActionInstant;
    })(wd.Action);
    wd.ActionInstant = ActionInstant;
})(wd || (wd = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wd;
(function (wd) {
    var CallFunc = (function (_super) {
        __extends(CallFunc, _super);
        function CallFunc(func, context, dataArr) {
            _super.call(this);
            this._context = null;
            this._callFunc = null;
            this._dataArr = null;
            this._context = context || wd.root;
            this._callFunc = func;
            this._dataArr = wdCb.Collection.create(dataArr);
        }
        CallFunc.create = function (func, context) {
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
            var dataArr = Array.prototype.slice.call(arguments, 2), action = new this(func, context, dataArr);
            return action;
        };
        CallFunc.prototype.reverse = function () {
            return this;
        };
        CallFunc.prototype.update = function (time) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.p_target, this._dataArr);
            }
            this.finish();
        };
        CallFunc.prototype.copy = function () {
            return new CallFunc(this._context, this._callFunc, this._dataArr.copy(true).getChildren());
        };
        return CallFunc;
    })(wd.ActionInstant);
    wd.CallFunc = CallFunc;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var ActionInterval = (function (_super) {
        __extends(ActionInterval, _super);
        function ActionInterval() {
            _super.apply(this, arguments);
            this.elapsed = null;
            this.duration = null;
            this._isStop = true;
            this._isPause = false;
            this._timeController = wd.CommonTimeController.create();
        }
        Object.defineProperty(ActionInterval.prototype, "isStop", {
            get: function () {
                return this._isStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActionInterval.prototype, "isPause", {
            get: function () {
                return this._isPause;
            },
            enumerable: true,
            configurable: true
        });
        ActionInterval.prototype.update = function (time) {
            if (time < this._timeController.startTime) {
                return;
            }
            this.elapsed = this._convertToRatio(this._timeController.computeElapseTime(time));
            this.updateBody(time);
            if (this.elapsed === 1) {
                this.finish();
            }
        };
        ActionInterval.prototype.start = function () {
            this._isStop = false;
            this._timeController.start();
        };
        ActionInterval.prototype.stop = function () {
            this._isStop = true;
            this._timeController.stop();
        };
        ActionInterval.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._isStop = true;
        };
        ActionInterval.prototype.pause = function () {
            this._isPause = true;
            this._timeController.pause();
        };
        ActionInterval.prototype.resume = function () {
            this._isPause = false;
            this._timeController.resume();
        };
        ActionInterval.prototype.updateBody = function (time) {
        };
        ActionInterval.prototype._convertToRatio = function (elapsed) {
            var ratio = elapsed / this.duration;
            return ratio > 1 ? 1 : ratio;
        };
        Object.defineProperty(ActionInterval.prototype, "updateBody",
            __decorate([
                wd.virtual
            ], ActionInterval.prototype, "updateBody", Object.getOwnPropertyDescriptor(ActionInterval.prototype, "updateBody")));
        return ActionInterval;
    })(wd.Action);
    wd.ActionInterval = ActionInterval;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Control = (function (_super) {
        __extends(Control, _super);
        function Control() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Control.prototype, "target", {
            set: function (target) {
                this.p_target = target;
                this.getInnerActions().forEach(function (action) {
                    action.target = target;
                });
            },
            enumerable: true,
            configurable: true
        });
        Control.prototype.init = function () {
            _super.prototype.init.call(this);
            this.iterate("init");
        };
        Control.prototype.reverse = function () {
            this.iterate("reverse");
            return this;
        };
        Control.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.iterate("reset");
            return this;
        };
        Control.prototype.iterate = function (method, argArr) {
            this.getInnerActions().forEach(function (action) {
                action[method].apply(action, argArr);
            });
        };
        return Control;
    })(wd.ActionInterval);
    wd.Control = Control;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Sequence = (function (_super) {
        __extends(Sequence, _super);
        function Sequence(actionArr) {
            _super.call(this);
            this._actions = wdCb.Collection.create();
            this._currentAction = null;
            this._actionIndex = 0;
            this._actions.addChildren(actionArr);
        }
        Sequence.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var sequence = null;
            wd.Log.assert(args.length >= 2, "Sequence should has two actions at least");
            sequence = new this(args);
            sequence.initWhenCreate();
            return sequence;
        };
        Sequence.prototype.initWhenCreate = function () {
            this._currentAction = this._actions.getChild(0);
        };
        Sequence.prototype.update = function (time) {
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }
            this._currentAction = this._actions.getChild(this._actionIndex);
            if (this._currentAction.isFinish) {
                this._startNextActionAndJudgeFinish();
                return;
            }
            this._currentAction.update(time);
            if (this._currentAction.isFinish) {
                this._startNextActionAndJudgeFinish();
            }
            return null;
        };
        Sequence.prototype.copy = function () {
            var actionArr = [];
            this._actions.forEach(function (action) {
                actionArr.push(action.copy());
            });
            return Sequence.create.apply(Sequence, actionArr);
        };
        Sequence.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._actionIndex = 0;
            this._currentAction = this._actions.getChild(this._actionIndex);
            return this;
        };
        Sequence.prototype.start = function () {
            _super.prototype.start.call(this);
            this._currentAction.start();
            return this;
        };
        Sequence.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._currentAction.stop();
            return this;
        };
        Sequence.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._currentAction.pause();
            return this;
        };
        Sequence.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._currentAction.resume();
            return this;
        };
        Sequence.prototype.reverse = function () {
            this._actions = this._actions.reverse();
            _super.prototype.reverse.call(this);
            return this;
        };
        Sequence.prototype.getInnerActions = function () {
            return this._actions;
        };
        Sequence.prototype._startNextActionAndJudgeFinish = function () {
            this._actionIndex++;
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }
            this._actions.getChild(this._actionIndex).start();
        };
        return Sequence;
    })(wd.Control);
    wd.Sequence = Sequence;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Spawn = (function (_super) {
        __extends(Spawn, _super);
        function Spawn(actionArr) {
            _super.call(this);
            this._actions = wdCb.Collection.create();
            this._actions.addChildren(actionArr);
        }
        Spawn.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var spawn = null;
            wd.Log.assert(args.length >= 2, "Sequence should has two actions at least");
            spawn = new this(args);
            return spawn;
        };
        Spawn.prototype.update = function (time) {
            if (this._isFinish()) {
                this.finish();
                return;
            }
            this.iterate("update", [time]);
            if (this._isFinish()) {
                this.finish();
            }
        };
        Spawn.prototype.start = function () {
            _super.prototype.start.call(this);
            this.iterate("start");
            return this;
        };
        Spawn.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this.iterate("stop");
            return this;
        };
        Spawn.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this.iterate("pause");
            return this;
        };
        Spawn.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.iterate("resume");
            return this;
        };
        Spawn.prototype.copy = function () {
            var actions = [];
            this._actions.forEach(function (action) {
                actions.push(action.copy());
            });
            return Spawn.create.apply(Spawn, actions);
        };
        Spawn.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.iterate("reset");
            return this;
        };
        Spawn.prototype.reverse = function () {
            this._actions = this._actions.reverse();
            _super.prototype.reverse.call(this);
            return this;
        };
        Spawn.prototype.getInnerActions = function () {
            return this._actions;
        };
        Spawn.prototype.iterate = function (method, argArr) {
            this._actions.forEach(function (action) {
                action[method].apply(action, argArr);
            });
        };
        Spawn.prototype._isFinish = function () {
            var isFinish = true;
            this._actions.forEach(function (action) {
                if (!action.isFinish) {
                    isFinish = false;
                    return wdCb.$BREAK;
                }
            });
            return isFinish;
        };
        return Spawn;
    })(wd.Control);
    wd.Spawn = Spawn;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DelayTime = (function (_super) {
        __extends(DelayTime, _super);
        function DelayTime(delayTime) {
            _super.call(this);
            this.duration = delayTime;
        }
        DelayTime.create = function (delayTime) {
            var action = new this(delayTime);
            return action;
        };
        DelayTime.prototype.reverse = function () {
            return this;
        };
        DelayTime.prototype.copy = function () {
            return DelayTime.create(this.duration);
        };
        return DelayTime;
    })(wd.ActionInterval);
    wd.DelayTime = DelayTime;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Repeat = (function (_super) {
        __extends(Repeat, _super);
        function Repeat(action, times) {
            _super.call(this);
            this._innerAction = null;
            this._originTimes = null;
            this._times = null;
            this._innerAction = action;
            this._times = times;
        }
        Repeat.create = function (action, times) {
            var repeat = new this(action, times);
            repeat.initWhenCreate();
            return repeat;
        };
        Repeat.prototype.initWhenCreate = function () {
            this._originTimes = this._times;
        };
        Repeat.prototype.update = function (time) {
            if (this._times === 0) {
                this.finish();
                return;
            }
            this._innerAction.update(time);
            if (this._innerAction.isFinish) {
                this._times -= 1;
                if (this._times !== 0) {
                    this._innerAction.reset();
                    this._innerAction.start();
                    return;
                }
                this.finish();
            }
        };
        Repeat.prototype.copy = function () {
            return Repeat.create(this._innerAction.copy(), this._times);
        };
        Repeat.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._times = this._originTimes;
            return this;
        };
        Repeat.prototype.start = function () {
            _super.prototype.start.call(this);
            this._innerAction.start();
        };
        Repeat.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._innerAction.stop();
        };
        Repeat.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._innerAction.pause();
        };
        Repeat.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._innerAction.resume();
        };
        Repeat.prototype.getInnerActions = function () {
            return wdCb.Collection.create([this._innerAction]);
        };
        return Repeat;
    })(wd.Control);
    wd.Repeat = Repeat;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RepeatForever = (function (_super) {
        __extends(RepeatForever, _super);
        function RepeatForever(action) {
            _super.call(this);
            this._innerAction = null;
            this._innerAction = action;
        }
        RepeatForever.create = function (action) {
            var repeat = new this(action);
            return repeat;
        };
        RepeatForever.prototype.update = function (time) {
            this._innerAction.update(time);
            if (this._innerAction.isFinish) {
                this._innerAction.reset();
                this._innerAction.start();
            }
        };
        RepeatForever.prototype.copy = function () {
            return RepeatForever.create(this._innerAction.copy());
        };
        RepeatForever.prototype.start = function () {
            _super.prototype.start.call(this);
            this._innerAction.start();
        };
        RepeatForever.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._innerAction.stop();
        };
        RepeatForever.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._innerAction.pause();
        };
        RepeatForever.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._innerAction.resume();
        };
        RepeatForever.prototype.getInnerActions = function () {
            return wdCb.Collection.create([this._innerAction]);
        };
        return RepeatForever;
    })(wd.Control);
    wd.RepeatForever = RepeatForever;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    /*! referenced from:
     https://github.com/tweenjs/tween.js
     */
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween() {
            _super.apply(this, arguments);
            this._object = null;
            this._valuesStart = wdCb.Hash.create();
            this._valuesEnd = wdCb.Hash.create();
            this._easingFunction = Tween.Easing.Linear.None;
            this._interpolationFunction = Tween.Interpolation.Linear;
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
            this._onFinishCallback = null;
            this._onStopCallback = null;
        }
        Tween.create = function () {
            var obj = new this();
            return obj;
        };
        Tween.prototype.updateBody = function (time) {
            var self = this, easeValue = null;
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback !== null) {
                    this._onStartCallback.call(this._object.getChildren());
                }
                this._onStartCallbackFired = true;
            }
            easeValue = this._easingFunction(this.elapsed);
            this._valuesEnd.forEach(function (value, key) {
                var start = self._valuesStart.getChild(key), end = value;
                if (end instanceof Array) {
                    self._object.setValue(key, self._interpolationFunction(end, easeValue));
                }
                else {
                    if (wd.JudgeUtils.isString(end)) {
                        end = start + wd.root.parseFloat(end, 10);
                    }
                    if (wd.JudgeUtils.isNumber(end)) {
                        self._object.setValue(key, start + (end - start) * easeValue);
                    }
                }
            });
            if (this._onUpdateCallback !== null) {
                this._onUpdateCallback.call(this._object.getChildren(), easeValue);
            }
            return true;
        };
        Tween.prototype.from = function (object) {
            var self = this;
            this._object = wdCb.Hash.create(object);
            this._object.forEach(function (value, key) {
                self._valuesStart.addChild(key, wd.root.parseFloat(value, 10));
            });
            return this;
        };
        Tween.prototype.to = function (properties, duration) {
            if (duration === void 0) { duration = 1000; }
            this.duration = duration;
            this._valuesEnd = wdCb.Hash.create(properties);
            return this;
        };
        Tween.prototype.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            this._valuesEnd.forEach(function (value, key) {
                if (value instanceof Array) {
                    if (value.length === 0) {
                        return;
                    }
                    self._valuesEnd.setValue(key, [self._object.getChild(key)].concat(self._valuesEnd.getChild(key)));
                }
                self._valuesStart.setValue(key, self._object.getChild(key));
                if ((self._valuesStart.getChild(key) instanceof Array) === false) {
                    self._valuesStart.setValue(key, self._valuesStart.getChild(key) * 1.0);
                }
            });
        };
        Tween.prototype.start = function () {
            _super.prototype.start.call(this);
            this._onStartCallbackFired = false;
            return this;
        };
        Tween.prototype.stop = function () {
            _super.prototype.stop.call(this);
            if (this._onStopCallback !== null) {
                this._onStopCallback.call(this._object.getChildren());
            }
            return this;
        };
        Tween.prototype.copy = function () {
            return Tween.create().from(this._valuesStart.getChildren())
                .to(this._valuesEnd.getChildren(), this.duration)
                .easing(this._easingFunction)
                .interpolation(this._interpolationFunction)
                .onStart(this._onStartCallback)
                .onStop(this._onStopCallback)
                .onFinish(this._onFinishCallback)
                .onUpdate(this._onUpdateCallback);
        };
        Tween.prototype.reverse = function () {
            var tmp = this._valuesStart;
            this._valuesStart = this._valuesEnd;
            this._valuesEnd = tmp;
        };
        Tween.prototype.easing = function (easing) {
            this._easingFunction = easing;
            return this;
        };
        Tween.prototype.interpolation = function (interpolation) {
            this._interpolationFunction = interpolation;
            return this;
        };
        Tween.prototype.onUpdate = function (callback) {
            this._onUpdateCallback = callback;
            return this;
        };
        Tween.prototype.onFinish = function (callback) {
            this._onFinishCallback = callback;
            return this;
        };
        Tween.prototype.onStart = function (callback) {
            this._onStartCallback = callback;
            return this;
        };
        Tween.prototype.onStop = function (callback) {
            this._onStopCallback = callback;
            return this;
        };
        Tween.prototype.finish = function () {
            _super.prototype.finish.call(this);
            if (this._onFinishCallback !== null) {
                this._onFinishCallback.call(this._object.getChildren());
            }
        };
        Tween.Easing = {
            Linear: {
                None: function (k) {
                    return k;
                }
            },
            Quadratic: {
                In: function (k) {
                    return k * k;
                },
                Out: function (k) {
                    return k * (2 - k);
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k;
                    return -0.5 * (--k * (k - 2) - 1);
                }
            },
            Cubic: {
                In: function (k) {
                    return k * k * k;
                },
                Out: function (k) {
                    return --k * k * k + 1;
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k;
                    return 0.5 * ((k -= 2) * k * k + 2);
                }
            },
            Quartic: {
                In: function (k) {
                    return k * k * k * k;
                },
                Out: function (k) {
                    return 1 - (--k * k * k * k);
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k * k;
                    return -0.5 * ((k -= 2) * k * k * k - 2);
                }
            },
            Quintic: {
                In: function (k) {
                    return k * k * k * k * k;
                },
                Out: function (k) {
                    return --k * k * k * k * k + 1;
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k * k * k;
                    return 0.5 * ((k -= 2) * k * k * k * k + 2);
                }
            },
            Sinusoidal: {
                In: function (k) {
                    return 1 - Math.cos(k * Math.PI / 2);
                },
                Out: function (k) {
                    return Math.sin(k * Math.PI / 2);
                },
                InOut: function (k) {
                    return 0.5 * (1 - Math.cos(Math.PI * k));
                }
            },
            Exponential: {
                In: function (k) {
                    return k === 0 ? 0 : Math.pow(1024, k - 1);
                },
                Out: function (k) {
                    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                },
                InOut: function (k) {
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if ((k *= 2) < 1)
                        return 0.5 * Math.pow(1024, k - 1);
                    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                }
            },
            Circular: {
                In: function (k) {
                    return 1 - Math.sqrt(1 - k * k);
                },
                Out: function (k) {
                    return Math.sqrt(1 - (--k * k));
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return -0.5 * (Math.sqrt(1 - k * k) - 1);
                    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                }
            },
            Elastic: {
                In: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                },
                Out: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
                },
                InOut: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    if ((k *= 2) < 1)
                        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
                }
            },
            Back: {
                In: function (k) {
                    var s = 1.70158;
                    return k * k * ((s + 1) * k - s);
                },
                Out: function (k) {
                    var s = 1.70158;
                    return --k * k * ((s + 1) * k + s) + 1;
                },
                InOut: function (k) {
                    var s = 1.70158 * 1.525;
                    if ((k *= 2) < 1)
                        return 0.5 * (k * k * ((s + 1) * k - s));
                    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                }
            },
            Bounce: {
                In: function (k) {
                    return 1 - Tween.Easing.Bounce.Out(1 - k);
                },
                Out: function (k) {
                    if (k < (1 / 2.75)) {
                        return 7.5625 * k * k;
                    }
                    else if (k < (2 / 2.75)) {
                        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                    }
                    else if (k < (2.5 / 2.75)) {
                        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                    }
                    else {
                        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                    }
                },
                InOut: function (k) {
                    if (k < 0.5)
                        return Tween.Easing.Bounce.In(k * 2) * 0.5;
                    return Tween.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                }
            }
        };
        Tween.Interpolation = {
            Linear: function (v, k) {
                var m = v.length - 1, f = m * k, i = Math.floor(f), fn = Tween.Interpolation.Utils.Linear;
                if (k < 0)
                    return fn(v[0], v[1], f);
                if (k > 1)
                    return fn(v[m], v[m - 1], m - f);
                return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
            },
            Bezier: function (v, k) {
                var b = 0, n = v.length - 1, pw = Math.pow, bn = Tween.Interpolation.Utils.Bernstein, i;
                for (i = 0; i <= n; i++) {
                    b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
                }
                return b;
            },
            CatmullRom: function (v, k) {
                var m = v.length - 1, f = m * k, i = Math.floor(f), fn = Tween.Interpolation.Utils.CatmullRom;
                if (v[0] === v[m]) {
                    if (k < 0)
                        i = Math.floor(f = m * (1 + k));
                    return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
                }
                else {
                    if (k < 0)
                        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                    if (k > 1)
                        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                    return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
                }
            },
            Utils: {
                Linear: function (p0, p1, t) {
                    return (p1 - p0) * t + p0;
                },
                Bernstein: function (n, i) {
                    var fc = Tween.Interpolation.Utils.Factorial;
                    return fc(n) / fc(i) / fc(n - i);
                },
                Factorial: (function () {
                    var a = [1];
                    return function (n) {
                        var s = 1, i;
                        if (a[n])
                            return a[n];
                        for (i = n; i > 1; i--)
                            s *= i;
                        return a[n] = s;
                    };
                })(),
                CatmullRom: function (p0, p1, p2, p3, t) {
                    var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
                }
            }
        };
        return Tween;
    })(wd.ActionInterval);
    wd.Tween = Tween;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ActionManager = (function () {
        function ActionManager() {
            this._children = wdCb.Collection.create();
        }
        ActionManager.create = function () {
            var obj = new this();
            return obj;
        };
        ActionManager.prototype.addChild = function (action) {
            if (this.hasChild(action)) {
                return;
            }
            this._children.addChild(action);
        };
        ActionManager.prototype.removeChild = function (action) {
            this._children.removeChild(action);
        };
        ActionManager.prototype.hasChild = function (action) {
            return this._children.hasChild(action);
        };
        ActionManager.prototype.update = function (time) {
            var self = this, removeQueue = [];
            this._children.forEach(function (child) {
                /*! fix "if remove other action of children when invoke "child.update", it will error in iteration after */
                if (!child) {
                    return;
                }
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                if (child.isStop || child.isPause) {
                    return;
                }
                child.update(time);
            });
            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        };
        return ActionManager;
    })();
    wd.ActionManager = ActionManager;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RendererComponent = (function (_super) {
        __extends(RendererComponent, _super);
        function RendererComponent() {
            _super.apply(this, arguments);
        }
        return RendererComponent;
    })(wd.Component);
    wd.RendererComponent = RendererComponent;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MeshRenderer = (function (_super) {
        __extends(MeshRenderer, _super);
        function MeshRenderer() {
            _super.apply(this, arguments);
        }
        MeshRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        MeshRenderer.prototype.render = function (renderer, geometry, camera) {
            renderer.addCommand(this.createDrawCommand(renderer, geometry, camera));
        };
        MeshRenderer.prototype.createDrawCommand = function (renderer, geometry, camera) {
            var quadCmd = renderer.createQuadCommand(), cameraComponent = camera.getComponent(wd.CameraController), material = geometry.material;
            quadCmd.buffers = geometry.buffers;
            quadCmd.animation = geometry.gameObject.getComponent(wd.Animation);
            quadCmd.mMatrix = this.transform.localToWorldMatrix;
            quadCmd.vMatrix = cameraComponent.worldToCameraMatrix;
            quadCmd.pMatrix = cameraComponent.pMatrix;
            quadCmd.material = material;
            quadCmd.z = this.gameObject.transform.position.z;
            return quadCmd;
        };
        Object.defineProperty(MeshRenderer.prototype, "createDrawCommand",
            __decorate([
                wd.require(function (renderer, geometry, camera) {
                    var controller = camera.getComponent(wd.CameraController);
                    wd.assert(!!controller && !!controller.camera, wd.Log.info.FUNC_MUST("camera", "add Camera Component"));
                    wd.assert(!!geometry, wd.Log.info.FUNC_MUST("Mesh", "add geometry component"));
                })
            ], MeshRenderer.prototype, "createDrawCommand", Object.getOwnPropertyDescriptor(MeshRenderer.prototype, "createDrawCommand")));
        return MeshRenderer;
    })(wd.RendererComponent);
    wd.MeshRenderer = MeshRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SkyboxRenderer = (function (_super) {
        __extends(SkyboxRenderer, _super);
        function SkyboxRenderer() {
            _super.apply(this, arguments);
        }
        SkyboxRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        SkyboxRenderer.prototype.render = function (renderer, geometry, camera) {
            renderer.skyboxCommand = this.createDrawCommand(renderer, geometry, camera);
        };
        return SkyboxRenderer;
    })(wd.MeshRenderer);
    wd.SkyboxRenderer = SkyboxRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Collider = (function (_super) {
        __extends(Collider, _super);
        function Collider() {
            _super.apply(this, arguments);
        }
        Collider.prototype.collideXY = function (localX, localY) {
            return false;
        };
        Collider.prototype.collide = function (collider) {
            return false;
        };
        return Collider;
    })(wd.Component);
    wd.Collider = Collider;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TopCollider = (function (_super) {
        __extends(TopCollider, _super);
        function TopCollider() {
            _super.apply(this, arguments);
        }
        TopCollider.create = function () {
            var obj = new this();
            return obj;
        };
        TopCollider.prototype.collideXY = function (localX, localY) {
            return true;
        };
        TopCollider.prototype.collide = function (collider) {
            return true;
        };
        return TopCollider;
    })(wd.Collider);
    wd.TopCollider = TopCollider;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Script = (function (_super) {
        __extends(Script, _super);
        function Script(url) {
            if (url === void 0) { url = null; }
            _super.call(this);
            this.url = null;
            this.url = url;
        }
        Script.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 0) {
                return new this();
            }
            if (args.length === 1) {
                var url = args[0];
                return new this(url);
            }
        };
        Script.addScript = function (scriptName, _class) {
            this.script.push({
                name: scriptName,
                class: _class
            });
        };
        Script.prototype.createLoadJsStream = function () {
            wd.Log.error(!this.url, wd.Log.info.FUNC_MUST_DEFINE("url"));
            return wd.LoaderManager.getInstance().load(this.url)
                .map(function () {
                return Script.script.pop();
            });
        };
        Script.prototype.addToGameObject = function (gameObject) {
            var self = this;
            _super.prototype.addToGameObject.call(this, gameObject);
            wd.Director.getInstance().scriptStreams.addChild(this.uid.toString(), this.createLoadJsStream()
                .do(function (data) {
                self._addScriptToGameObject(gameObject, data);
            }));
        };
        Script.prototype.removeFromGameObject = function (gameObject) {
            _super.prototype.removeFromGameObject.call(this, gameObject);
            wd.Director.getInstance().scriptStreams.removeChild(this.uid.toString());
        };
        Script.prototype._addScriptToGameObject = function (gameObject, data) {
            gameObject.script.addChild(data.name, new data.class(gameObject));
        };
        Script.script = wdCb.Stack.create();
        return Script;
    })(wd.Component);
    wd.Script = Script;
})(wd || (wd = {}));



var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Light = (function (_super) {
        __extends(Light, _super);
        function Light() {
            _super.apply(this, arguments);
            this.color = wd.Color.create("#ffffff");
            this.castShadow = false;
            this.shadowCameraNear = 0.1;
            this.shadowCameraFar = 5000;
            this.shadowBias = wd.ShaderChunk.NULL;
            this.shadowDarkness = 0;
            this.shadowMapWidth = 1024;
            this.shadowMapHeight = 1024;
            this.shadowMap = null;
            this.shadowMapRenderer = null;
        }
        Object.defineProperty(Light.prototype, "position", {
            get: function () {
                return this.gameObject.transform.position;
            },
            enumerable: true,
            configurable: true
        });
        return Light;
    })(wd.Component);
    wd.Light = Light;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var AmbientLight = (function (_super) {
        __extends(AmbientLight, _super);
        function AmbientLight() {
            _super.apply(this, arguments);
        }
        AmbientLight.create = function () {
            var obj = new this();
            return obj;
        };
        AmbientLight.type = "ambientLight";
        return AmbientLight;
    })(wd.Light);
    wd.AmbientLight = AmbientLight;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DirectionLight = (function (_super) {
        __extends(DirectionLight, _super);
        function DirectionLight() {
            _super.apply(this, arguments);
            this._shadowRenderList = null;
            this.intensity = 1;
            this.shadowCameraLeft = -1000;
            this.shadowCameraRight = 1000;
            this.shadowCameraTop = 1000;
            this.shadowCameraBottom = -1000;
            this._beforeInitHandler = null;
        }
        DirectionLight.create = function () {
            var obj = new this();
            obj.initWhenCreate();
            return obj;
        };
        Object.defineProperty(DirectionLight.prototype, "shadowRenderList", {
            get: function () {
                return this._shadowRenderList;
            },
            set: function (shadowRenderList) {
                if (wd.JudgeUtils.isArray(shadowRenderList)) {
                    this._shadowRenderList = wdCb.Collection.create(shadowRenderList);
                }
                else if (shadowRenderList instanceof wdCb.Collection) {
                    this._shadowRenderList = shadowRenderList;
                }
                else {
                    wd.Log.error(true, wd.Log.info.FUNC_MUST_BE("shadowRenderList", "array or wdCb.Collection"));
                }
            },
            enumerable: true,
            configurable: true
        });
        DirectionLight.prototype.initWhenCreate = function () {
            var _this = this;
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, function () {
                if (_this.castShadow) {
                    _this.shadowMap = wd.TwoDShadowMapTexture.create();
                    _this.shadowMapRenderer = wd.TwoDShadowMapRenderTargetRenderer.create(_this);
                    wd.Director.getInstance().scene.addRenderTargetRenderer(_this.shadowMapRenderer);
                }
            });
            wd.EventManager.on(wd.EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        };
        DirectionLight.prototype.dispose = function () {
            if (this.castShadow) {
                this.shadowMap.dispose();
                wd.Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
            wd.EventManager.off(wd.EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        };
        DirectionLight.type = "directionLight";
        DirectionLight.defaultPosition = wd.Vector3.create(0, 0, 1);
        return DirectionLight;
    })(wd.Light);
    wd.DirectionLight = DirectionLight;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var PointLight = (function (_super) {
        __extends(PointLight, _super);
        function PointLight() {
            _super.apply(this, arguments);
            this._rangeLevel = null;
            this._shadowRenderList = null;
            this.intensity = 1;
            this._attenuation = wd.Attenuation.create();
            this._beforeInitHandler = null;
        }
        PointLight.create = function () {
            var obj = new this();
            obj.initWhenCreate();
            return obj;
        };
        Object.defineProperty(PointLight.prototype, "rangeLevel", {
            get: function () {
                return this._rangeLevel;
            },
            set: function (rangeLevel) {
                this._rangeLevel = rangeLevel;
                this._attenuation.rangeLevel = this._rangeLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointLight.prototype, "range", {
            get: function () {
                return this._attenuation.range;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointLight.prototype, "constant", {
            get: function () {
                return this._attenuation.constant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointLight.prototype, "linear", {
            get: function () {
                return this._attenuation.linear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointLight.prototype, "quadratic", {
            get: function () {
                return this._attenuation.quadratic;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointLight.prototype, "shadowRenderList", {
            get: function () {
                return this._shadowRenderList;
            },
            set: function (shadowRenderList) {
                if (wd.JudgeUtils.isDirectObject(shadowRenderList)) {
                    this._shadowRenderList = wdCb.Hash.create(shadowRenderList);
                }
                else if (shadowRenderList instanceof wdCb.Hash) {
                    this._shadowRenderList = shadowRenderList;
                }
                else {
                    wd.Log.error(true, wd.Log.info.FUNC_MUST_BE("shadowRenderList", "object or wdCb.Hash"));
                }
            },
            enumerable: true,
            configurable: true
        });
        PointLight.prototype.initWhenCreate = function () {
            var _this = this;
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, function () {
                if (_this.castShadow) {
                    _this.shadowMap = wd.CubemapShadowMapTexture.create();
                    _this.shadowMapRenderer = wd.CubemapShadowMapRenderTargetRenderer.create(_this);
                    wd.Director.getInstance().scene.addRenderTargetRenderer(_this.shadowMapRenderer);
                }
            });
            wd.EventManager.on(wd.EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        };
        PointLight.prototype.dispose = function () {
            if (this.castShadow) {
                this.shadowMap.dispose();
                wd.Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
        };
        PointLight.type = "pointLight";
        return PointLight;
    })(wd.Light);
    wd.PointLight = PointLight;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Attenuation = (function () {
        function Attenuation() {
            this._range = null;
            this._linear = null;
            this._quadratic = null;
            this._rangeLevel = 0;
        }
        Attenuation.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Attenuation.prototype, "constant", {
            get: function () {
                return 1.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attenuation.prototype, "range", {
            get: function () {
                return this._range;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attenuation.prototype, "linear", {
            get: function () {
                return this._linear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attenuation.prototype, "quadratic", {
            get: function () {
                return this._quadratic;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Attenuation.prototype, "rangeLevel", {
            get: function () {
                return this._rangeLevel;
            },
            set: function (rangeLevel) {
                this._rangeLevel = rangeLevel;
                this.setByRangeLevel();
            },
            enumerable: true,
            configurable: true
        });
        Attenuation.prototype.setByRangeLevel = function () {
            switch (this._rangeLevel) {
                case 0:
                    this._range = 7;
                    this._linear = 0.7;
                    this._quadratic = 1.8;
                    break;
                case 1:
                    this._range = 13;
                    this._linear = 0.35;
                    this._quadratic = 0.44;
                    break;
                case 2:
                    this._range = 20;
                    this._linear = 0.22;
                    this._quadratic = 0.20;
                    break;
                case 3:
                    this._range = 32;
                    this._linear = 0.14;
                    this._quadratic = 0.07;
                    break;
                case 4:
                    this._range = 50;
                    this._linear = 0.09;
                    this._quadratic = 0.032;
                    break;
                case 5:
                    this._range = 65;
                    this._linear = 0.07;
                    this._quadratic = 0.017;
                    break;
                case 6:
                    this._range = 100;
                    this._linear = 0.045;
                    this._quadratic = 0.0075;
                    break;
                case 7:
                    this._range = 160;
                    this._linear = 0.027;
                    this._quadratic = 0.0028;
                    break;
                case 8:
                    this._range = 200;
                    this._linear = 0.022;
                    this._quadratic = 0.0019;
                    break;
                case 9:
                    this._range = 325;
                    this._linear = 0.014;
                    this._quadratic = 0.0007;
                    break;
                case 10:
                    this._range = 600;
                    this._linear = 0.007;
                    this._quadratic = 0.0002;
                    break;
                case 11:
                    this._range = 3250;
                    this._linear = 0.0014;
                    this._quadratic = 0.000007;
                    break;
                default:
                    wd.Log.error(true, "over light range");
                    break;
            }
        };
        return Attenuation;
    })();
    wd.Attenuation = Attenuation;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isView = function (obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        };
        JudgeUtils.isEqual = function (target1, target2) {
            return target1.uid === target2.uid;
        };
        JudgeUtils.isPowerOfTwo = function (value) {
            return (value & (value - 1)) === 0 && value !== 0;
        };
        JudgeUtils.isFloatArray = function (data) {
            return Object.prototype.toString.call(data) === "[object Float32Array]" || Object.prototype.toString.call(data) === "[object Float16Array]";
        };
        return JudgeUtils;
    })(wdCb.JudgeUtils);
    wd.JudgeUtils = JudgeUtils;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var MathUtils = (function () {
        function MathUtils() {
        }
        MathUtils.clamp = function (num, below, up) {
            if (num < below) {
                return below;
            }
            else if (num > up) {
                return up;
            }
            return num;
        };
        MathUtils.bigThan = function (num, below) {
            return num < below ? below : num;
        };
        return MathUtils;
    })();
    wd.MathUtils = MathUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var Log = (function (_super) {
        __extends(Log, _super);
        function Log() {
            _super.apply(this, arguments);
        }
        return Log;
    })(wdCb.Log);
    wd.Log = Log;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var TimeController = (function () {
        function TimeController() {
            this.elapsed = null;
            this.pauseElapsed = 0;
            this.pauseTime = null;
            this.startTime = null;
        }
        TimeController.prototype.start = function () {
            this.startTime = this.getNow();
            this.pauseElapsed = null;
        };
        TimeController.prototype.stop = function () {
            this.startTime = null;
        };
        TimeController.prototype.pause = function () {
            this.pauseTime = this.getNow();
        };
        TimeController.prototype.resume = function () {
            this.pauseElapsed += this.getNow() - this.pauseTime;
            this.pauseTime = null;
        };
        TimeController.prototype.computeElapseTime = function (time) {
            if (this.pauseElapsed) {
                this.elapsed = time - this.pauseElapsed - this.startTime;
                return this.elapsed;
            }
            this.elapsed = time - this.startTime;
            return this.elapsed;
        };
        return TimeController;
    })();
    wd.TimeController = TimeController;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var STARTING_FPS = 60, GAMETIME_SCALE = 1000;
    var DirectorTimeController = (function (_super) {
        __extends(DirectorTimeController, _super);
        function DirectorTimeController() {
            _super.apply(this, arguments);
            this.gameTime = null;
            this.fps = null;
            this.isTimeChange = false;
            this._lastTime = null;
        }
        DirectorTimeController.create = function () {
            var obj = new this();
            return obj;
        };
        DirectorTimeController.prototype.tick = function (time) {
            this._updateFps(time);
            this.gameTime = time / GAMETIME_SCALE;
            this._lastTime = time;
        };
        DirectorTimeController.prototype.start = function () {
            _super.prototype.start.call(this);
            this.isTimeChange = true;
            this.elapsed = 0;
        };
        DirectorTimeController.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.isTimeChange = true;
        };
        DirectorTimeController.prototype.getNow = function () {
            return wd.root.performance.now();
        };
        DirectorTimeController.prototype._updateFps = function (time) {
            if (this._lastTime === null) {
                this.fps = STARTING_FPS;
            }
            else {
                this.fps = 1000 / (time - this._lastTime);
            }
        };
        return DirectorTimeController;
    })(wd.TimeController);
    wd.DirectorTimeController = DirectorTimeController;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonTimeController = (function (_super) {
        __extends(CommonTimeController, _super);
        function CommonTimeController() {
            _super.apply(this, arguments);
        }
        CommonTimeController.create = function () {
            var obj = new this();
            return obj;
        };
        CommonTimeController.prototype.getNow = function () {
            if (wd.Director.getInstance().isTimeChange) {
                return wd.Director.getInstance().elapsed;
            }
            return wd.root.performance.now();
        };
        return CommonTimeController;
    })(wd.TimeController);
    wd.CommonTimeController = CommonTimeController;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var RenderTargetRenderer = (function () {
        function RenderTargetRenderer(renderTargetTexture) {
            this.texture = null;
            this.frameBufferOperator = null;
            this.texture = renderTargetTexture;
        }
        RenderTargetRenderer.prototype.initWhenCreate = function () {
            this.frameBufferOperator = wd.FrameBuffer.create(this.texture.width, this.texture.height);
        };
        RenderTargetRenderer.prototype.init = function () {
            this.texture.createEmptyTexture();
            this.initFrameBuffer();
        };
        RenderTargetRenderer.prototype.render = function (renderer, camera) {
            this.beforeRender();
            this.renderFrameBufferTexture(renderer, camera);
            this.afterRender();
        };
        RenderTargetRenderer.prototype.dispose = function () {
            this.frameBufferOperator.dispose();
            this.disposeFrameBuffer();
            this.texture.dispose();
        };
        RenderTargetRenderer.prototype.beforeRender = function () {
        };
        RenderTargetRenderer.prototype.afterRender = function () {
        };
        Object.defineProperty(RenderTargetRenderer.prototype, "beforeRender",
            __decorate([
                wd.virtual
            ], RenderTargetRenderer.prototype, "beforeRender", Object.getOwnPropertyDescriptor(RenderTargetRenderer.prototype, "beforeRender")));
        Object.defineProperty(RenderTargetRenderer.prototype, "afterRender",
            __decorate([
                wd.virtual
            ], RenderTargetRenderer.prototype, "afterRender", Object.getOwnPropertyDescriptor(RenderTargetRenderer.prototype, "afterRender")));
        return RenderTargetRenderer;
    })();
    wd.RenderTargetRenderer = RenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDRenderTargetRenderer = (function (_super) {
        __extends(TwoDRenderTargetRenderer, _super);
        function TwoDRenderTargetRenderer() {
            _super.apply(this, arguments);
            this.frameBuffer = null;
            this.renderBuffer = null;
        }
        TwoDRenderTargetRenderer.prototype.initFrameBuffer = function () {
            var frameBuffer = this.frameBufferOperator, gl = wd.DeviceManager.getInstance().gl;
            this.frameBuffer = frameBuffer.createFrameBuffer();
            this.renderBuffer = frameBuffer.createRenderBuffer();
            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture);
            frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
            frameBuffer.check();
            frameBuffer.unBind();
        };
        TwoDRenderTargetRenderer.prototype.renderFrameBufferTexture = function (renderer, camera) {
            var renderCamera = this.createCamera(camera);
            this.beforeRenderFrameBufferTexture(renderCamera);
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.texture.bindToUnit(0);
            this.frameBufferOperator.setViewport();
            this.getRenderList().forEach(function (child) {
                child.render(renderer, renderCamera);
            });
            this.renderRenderer(renderer);
            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        };
        TwoDRenderTargetRenderer.prototype.disposeFrameBuffer = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            gl.deleteFramebuffer(this.frameBuffer);
            gl.deleteRenderbuffer(this.renderBuffer);
        };
        return TwoDRenderTargetRenderer;
    })(wd.RenderTargetRenderer);
    wd.TwoDRenderTargetRenderer = TwoDRenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MirrorRenderTargetRenderer = (function (_super) {
        __extends(MirrorRenderTargetRenderer, _super);
        function MirrorRenderTargetRenderer() {
            _super.apply(this, arguments);
        }
        MirrorRenderTargetRenderer.create = function (mirrorTexture) {
            var obj = new this(mirrorTexture);
            obj.initWhenCreate();
            return obj;
        };
        MirrorRenderTargetRenderer.prototype.beforeRenderFrameBufferTexture = function (renderCamera) {
        };
        MirrorRenderTargetRenderer.prototype.getRenderList = function () {
            return this.texture.renderList;
        };
        MirrorRenderTargetRenderer.prototype.renderRenderer = function (renderer) {
            this._setSceneSide(wd.Side.BACK);
            renderer.render();
            this._setSceneSide(null);
        };
        MirrorRenderTargetRenderer.prototype.createCamera = function (camera) {
            var mirrorCameraComponent = null, plane = null, cameraComponent = camera.getComponent(wd.CameraController), mirrorCameraViewMatrix = null, projectionMatrix = null;
            plane = this.texture.getPlane();
            mirrorCameraViewMatrix =
                plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);
            projectionMatrix = this._setClipPlane(mirrorCameraViewMatrix, cameraComponent.pMatrix, plane);
            mirrorCameraComponent = wd.PerspectiveCamera.create();
            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.copy();
            mirrorCameraComponent.pMatrix = projectionMatrix;
            return wd.GameObject.create().addComponent(wd.BasicCameraController.create(mirrorCameraComponent)).init();
        };
        MirrorRenderTargetRenderer.prototype._setSceneSide = function (side) {
            var scene = wd.Director.getInstance().scene;
            scene.side = side;
        };
        MirrorRenderTargetRenderer.prototype._setClipPlane = function (vMatrix, pMatrix, plane) {
            var projectionMatrix = pMatrix.copy(), q = wd.Vector4.create(), clipPlane = this._getClipPlaneInCameraSpace(vMatrix, plane), c = wd.Vector4.create();
            q.x = (Math.sign(clipPlane.x) + projectionMatrix.values[8]) / projectionMatrix.values[0];
            q.y = (Math.sign(clipPlane.y) + projectionMatrix.values[9]) / projectionMatrix.values[5];
            q.z = -1.0;
            q.w = (1.0 + projectionMatrix.values[10]) / projectionMatrix.values[14];
            c = clipPlane.multiplyScalar(2.0 / clipPlane.dot(q));
            projectionMatrix.values[2] = c.x;
            projectionMatrix.values[6] = c.y;
            projectionMatrix.values[10] = c.z + 1.0;
            projectionMatrix.values[14] = c.w;
            return projectionMatrix;
        };
        MirrorRenderTargetRenderer.prototype._getClipPlaneInCameraSpace = function (vMatrix, plane) {
            var clipPlane = wd.Vector4.create(), p = vMatrix.multiplyVector3(this.texture.getPosition()), n = vMatrix.copy().invert().transpose().multiplyVector3(plane.normal).normalize();
            clipPlane.set(n.x, n.y, n.z, -p.dot(n));
            return clipPlane;
        };
        return MirrorRenderTargetRenderer;
    })(wd.TwoDRenderTargetRenderer);
    wd.MirrorRenderTargetRenderer = MirrorRenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDShadowMapRenderTargetRenderer = (function (_super) {
        __extends(TwoDShadowMapRenderTargetRenderer, _super);
        function TwoDShadowMapRenderTargetRenderer(light) {
            _super.call(this, light.shadowMap);
            this._light = null;
            this._shadowMapRendererUtils = null;
            this._light = light;
        }
        TwoDShadowMapRenderTargetRenderer.create = function (light) {
            var obj = new this(light);
            obj.initWhenCreate();
            return obj;
        };
        TwoDShadowMapRenderTargetRenderer.prototype.initWhenCreate = function () {
            this._shadowMapRendererUtils = wd.TwoDShadowMapRenderTargetRendererUtils.create(this._light, this.texture);
            _super.prototype.initWhenCreate.call(this);
        };
        TwoDShadowMapRenderTargetRenderer.prototype.init = function () {
            var self = this;
            this._shadowMapRendererUtils.bindEndLoop(function () {
                self._light.shadowRenderList.forEach(function (child) {
                    self._shadowMapRendererUtils.clearTwoDShadowMapData(child);
                });
            });
            this._shadowMapRendererUtils.createShaderWithShaderLib(wd.BuildTwoDShadowMapShaderLib.create());
            _super.prototype.init.call(this);
        };
        TwoDShadowMapRenderTargetRenderer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._shadowMapRendererUtils.unBindEndLoop();
        };
        TwoDShadowMapRenderTargetRenderer.prototype.beforeRenderFrameBufferTexture = function (renderCamera) {
            var self = this;
            this._light.shadowRenderList.removeRepeatItems().forEach(function (child) {
                self._shadowMapRendererUtils.setShadowMapData(child, renderCamera);
            });
        };
        TwoDShadowMapRenderTargetRenderer.prototype.getRenderList = function () {
            return this._light.shadowRenderList;
        };
        TwoDShadowMapRenderTargetRenderer.prototype.renderRenderer = function (renderer) {
            renderer.render();
        };
        TwoDShadowMapRenderTargetRenderer.prototype.beforeRender = function () {
            this._shadowMapRendererUtils.beforeRender();
        };
        TwoDShadowMapRenderTargetRenderer.prototype.afterRender = function () {
            this._shadowMapRendererUtils.afterRender();
        };
        TwoDShadowMapRenderTargetRenderer.prototype.createCamera = function () {
            var orthoCameraComponent = wd.OrthographicCamera.create(), light = this._light, camera = wd.GameObject.create();
            orthoCameraComponent.left = light.shadowCameraLeft;
            orthoCameraComponent.right = light.shadowCameraRight;
            orthoCameraComponent.top = light.shadowCameraTop;
            orthoCameraComponent.bottom = light.shadowCameraBottom;
            orthoCameraComponent.near = light.shadowCameraNear;
            orthoCameraComponent.far = light.shadowCameraFar;
            camera.addComponent(wd.BasicCameraController.create(orthoCameraComponent));
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);
            camera.init();
            return camera;
        };
        return TwoDShadowMapRenderTargetRenderer;
    })(wd.TwoDRenderTargetRenderer);
    wd.TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapRenderTargetRenderer = (function (_super) {
        __extends(CubemapRenderTargetRenderer, _super);
        function CubemapRenderTargetRenderer() {
            _super.apply(this, arguments);
            this._frameBuffers = wdCb.Collection.create();
            this._renderBuffers = wdCb.Collection.create();
        }
        CubemapRenderTargetRenderer.prototype.initFrameBuffer = function () {
            var frameBufferOperator = this.frameBufferOperator, gl = wd.DeviceManager.getInstance().gl;
            for (var i = 0; i < 6; i++) {
                var frameBuffer = frameBufferOperator.createFrameBuffer(), renderBuffer = frameBufferOperator.createRenderBuffer();
                this._frameBuffers.addChild(frameBuffer);
                this._renderBuffers.addChild(renderBuffer);
                frameBufferOperator.bindFrameBuffer(frameBuffer);
                frameBufferOperator.attachTexture(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.texture.glTexture);
                frameBufferOperator.attachRenderBuffer("DEPTH_ATTACHMENT", renderBuffer);
                frameBufferOperator.check();
            }
            frameBufferOperator.unBind();
        };
        CubemapRenderTargetRenderer.prototype.renderFrameBufferTexture = function (renderer, camera) {
            var i = null, renderCamera = null, faceRenderList = null, renderList = null;
            renderList = this.getRenderList();
            this.texture.bindToUnit(0);
            for (i = 0; i < 6; i++) {
                faceRenderList = renderList.getChild(this._convertIndexToFaceKey(i));
                if (this._isEmpty(faceRenderList)) {
                    continue;
                }
                renderCamera = this.createCamera(i);
                this.frameBufferOperator.bindFrameBuffer(this._frameBuffers.getChild(i));
                this.frameBufferOperator.setViewport();
                faceRenderList.forEach(function (child) {
                    child.render(renderer, renderCamera);
                });
                renderer.render();
            }
            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        };
        CubemapRenderTargetRenderer.prototype.disposeFrameBuffer = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            this._frameBuffers.forEach(function (buffer) { return gl.deleteFramebuffer(buffer); });
            this._renderBuffers.forEach(function (buffer) { return gl.deleteRenderbuffer(buffer); });
        };
        CubemapRenderTargetRenderer.prototype.createCamera = function (index) {
            var cubeCameraComponent = wd.PerspectiveCamera.create(), camera = wd.GameObject.create(), pos = this.getPosition();
            cubeCameraComponent.fovy = 90;
            this.setCamera(cubeCameraComponent);
            camera.addComponent(wd.BasicCameraController.create(cubeCameraComponent));
            camera.transform.translate(pos);
            this._lookAtFace(camera, pos, index);
            camera.init();
            return camera;
        };
        CubemapRenderTargetRenderer.prototype._isEmpty = function (faceRenderList) {
            return !faceRenderList || (faceRenderList.length && faceRenderList.length === 0) || (faceRenderList.getCount && faceRenderList.getCount() === 0);
        };
        CubemapRenderTargetRenderer.prototype._convertIndexToFaceKey = function (index) {
            var face = null;
            switch (index) {
                case 0:
                    face = "px";
                    break;
                case 1:
                    face = "nx";
                    break;
                case 2:
                    face = "py";
                    break;
                case 3:
                    face = "ny";
                    break;
                case 4:
                    face = "pz";
                    break;
                case 5:
                    face = "nz";
                    break;
                default:
                    break;
            }
            return face;
        };
        CubemapRenderTargetRenderer.prototype._lookAtFace = function (camera, position, index) {
            switch (index) {
                case 0:
                    camera.transform.lookAt(position.x + 1, position.y, position.z, 0, -1, 0);
                    break;
                case 1:
                    camera.transform.lookAt(position.x - 1, position.y, position.z, 0, -1, 0);
                    break;
                case 2:
                    camera.transform.lookAt(position.x, position.y + 1, position.z, 0, 0, 1);
                    break;
                case 3:
                    camera.transform.lookAt(position.x, position.y - 1, position.z, 0, 0, -1);
                    break;
                case 4:
                    camera.transform.lookAt(position.x, position.y, position.z + 1, 0, -1, 0);
                    break;
                case 5:
                    camera.transform.lookAt(position.x, position.y, position.z - 1, 0, -1, 0);
                    break;
                default:
                    break;
            }
        };
        return CubemapRenderTargetRenderer;
    })(wd.RenderTargetRenderer);
    wd.CubemapRenderTargetRenderer = CubemapRenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapShadowMapRenderTargetRenderer = (function (_super) {
        __extends(CubemapShadowMapRenderTargetRenderer, _super);
        function CubemapShadowMapRenderTargetRenderer(light) {
            _super.call(this, light.shadowMap);
            this._light = null;
            this._shadowMapRendererUtils = null;
            this._shader = null;
            this._light = light;
        }
        CubemapShadowMapRenderTargetRenderer.create = function (light) {
            var obj = new this(light);
            obj.initWhenCreate();
            return obj;
        };
        CubemapShadowMapRenderTargetRenderer.prototype.initWhenCreate = function () {
            this._shadowMapRendererUtils = wd.CubemapShadowMapRenderTargetRendererUtils.create(this._light, this.texture);
            _super.prototype.initWhenCreate.call(this);
        };
        CubemapShadowMapRenderTargetRenderer.prototype.init = function () {
            var self = this;
            this._shadowMapRendererUtils.bindEndLoop(function () {
                self._light.shadowRenderList.forEach(function (childList) {
                    childList.forEach(function (child) {
                        self._shadowMapRendererUtils.clearCubemapShadowMapData(child);
                    });
                });
            });
            this._shadowMapRendererUtils.createShaderWithShaderLib(wd.BuildCubemapShadowMapShaderLib.create());
            _super.prototype.init.call(this);
        };
        CubemapShadowMapRenderTargetRenderer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._shadowMapRendererUtils.unBindEndLoop();
        };
        CubemapShadowMapRenderTargetRenderer.prototype.getRenderList = function () {
            return this._light.shadowRenderList;
        };
        CubemapShadowMapRenderTargetRenderer.prototype.beforeRender = function () {
            var utils = this._shadowMapRendererUtils;
            this._convertRenderListToCollection(this.getRenderList()).removeRepeatItems().forEach(function (child) {
                utils.setShadowMapData(child);
            });
            this._shadowMapRendererUtils.beforeRender();
        };
        CubemapShadowMapRenderTargetRenderer.prototype.afterRender = function () {
            this._shadowMapRendererUtils.afterRender();
        };
        CubemapShadowMapRenderTargetRenderer.prototype.setCamera = function (camera) {
            var light = this._light;
            camera.aspect = light.shadowMapWidth / light.shadowMapHeight;
            camera.near = light.shadowCameraNear;
            camera.far = light.shadowCameraFar;
        };
        CubemapShadowMapRenderTargetRenderer.prototype.getPosition = function () {
            return this._light.position;
        };
        CubemapShadowMapRenderTargetRenderer.prototype._convertRenderListToCollection = function (renderList) {
            var resultList = wdCb.Collection.create();
            renderList.forEach(function (list) {
                if (list instanceof wdCb.Collection || wd.JudgeUtils.isArray(list)) {
                    resultList.addChildren(list);
                }
                else {
                    wd.Log.error(true, wd.Log.info.FUNC_MUST_BE("array or collection"));
                }
            });
            return resultList;
        };
        return CubemapShadowMapRenderTargetRenderer;
    })(wd.CubemapRenderTargetRenderer);
    wd.CubemapShadowMapRenderTargetRenderer = CubemapShadowMapRenderTargetRenderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DynamicCubemapRenderTargetRenderer = (function (_super) {
        __extends(DynamicCubemapRenderTargetRenderer, _super);
        function DynamicCubemapRenderTargetRenderer() {
            _super.apply(this, arguments);
        }
        DynamicCubemapRenderTargetRenderer.create = function (texture) {
            var obj = new this(texture);
            obj.initWhenCreate();
            return obj;
        };
        DynamicCubemapRenderTargetRenderer.prototype.getRenderList = function () {
            return this.texture.renderList;
        };
        DynamicCubemapRenderTargetRenderer.prototype.setCamera = function (camera) {
            camera.aspect = 1;
            camera.near = this.texture.near;
            camera.far = this.texture.far;
        };
        DynamicCubemapRenderTargetRenderer.prototype.getPosition = function () {
            return this.texture.getPosition();
        };
        return DynamicCubemapRenderTargetRenderer;
    })(wd.CubemapRenderTargetRenderer);
    wd.DynamicCubemapRenderTargetRenderer = DynamicCubemapRenderTargetRenderer;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ShadowMapRenderTargetRendererUtils = (function () {
        function ShadowMapRenderTargetRendererUtils(light, texture) {
            this.texture = null;
            this.light = null;
            this._endLoopHandler = null;
            this._shader = null;
            this.light = light;
            this.texture = texture;
        }
        ShadowMapRenderTargetRendererUtils.prototype.initWhenCreate = function () {
            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;
        };
        ShadowMapRenderTargetRendererUtils.prototype.init = function () {
            this.texture.init();
        };
        ShadowMapRenderTargetRendererUtils.prototype.setShadowMapData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var target = args[0], material = target.getComponent(wd.Geometry).material, shadowMapCamera = null;
            if (args.length === 2) {
                shadowMapCamera = args[1];
            }
            wd.Log.error(!(material instanceof wd.LightMaterial), wd.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        };
        ShadowMapRenderTargetRendererUtils.prototype.bindEndLoop = function (func) {
            this._endLoopHandler = func;
            wd.EventManager.on(wd.EngineEvent.ENDLOOP, this._endLoopHandler);
        };
        ShadowMapRenderTargetRendererUtils.prototype.unBindEndLoop = function () {
            wd.EventManager.off(wd.EngineEvent.ENDLOOP, this._endLoopHandler);
        };
        ShadowMapRenderTargetRendererUtils.prototype.beforeRender = function () {
            var scene = wd.Director.getInstance().scene;
            scene.useProgram(this._shader);
        };
        ShadowMapRenderTargetRendererUtils.prototype.afterRender = function () {
            var scene = wd.Director.getInstance().scene;
            scene.unUseProgram();
        };
        ShadowMapRenderTargetRendererUtils.prototype.createShaderWithShaderLib = function (lib) {
            this._shader = wd.Shader.create();
            this._shader.addLib(wd.CommonShaderLib.create());
            this._shader.addLib(wd.CommonVerticeShaderLib.create());
            this._shader.addLib(lib);
        };
        ShadowMapRenderTargetRendererUtils.prototype.setShadowMap = function (target, shadowMap) {
            var material = target.getComponent(wd.Geometry).material;
            if (material.hasShadowMap(shadowMap)) {
                return;
            }
            wd.Log.error(!(material instanceof wd.LightMaterial), wd.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
            this.addShadowMap(material, shadowMap);
        };
        return ShadowMapRenderTargetRendererUtils;
    })();
    wd.ShadowMapRenderTargetRendererUtils = ShadowMapRenderTargetRendererUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var CubemapShadowMapRenderTargetRendererUtils = (function (_super) {
        __extends(CubemapShadowMapRenderTargetRendererUtils, _super);
        function CubemapShadowMapRenderTargetRendererUtils() {
            _super.apply(this, arguments);
        }
        CubemapShadowMapRenderTargetRendererUtils.create = function (light, texture) {
            var obj = new this(light, texture);
            obj.initWhenCreate();
            return obj;
        };
        CubemapShadowMapRenderTargetRendererUtils.prototype.initWhenCreate = function () {
            var self = this;
            _super.prototype.initWhenCreate.call(this);
            this.light.shadowRenderList.forEach(function (childList) {
                childList.forEach(function (child) {
                    self.setShadowMap(child, self.texture);
                });
            });
        };
        CubemapShadowMapRenderTargetRendererUtils.prototype.clearCubemapShadowMapData = function (target) {
            var material = target.getComponent(wd.Geometry).material;
            material.clearCubemapShadowMapData();
        };
        CubemapShadowMapRenderTargetRendererUtils.prototype.setMaterialShadowMapData = function (material, target, shadowMapCamera) {
            material.addCubemapShadowMapData({
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                lightPos: this.light.position,
                farPlane: this.light.shadowCameraFar
            });
            material.buildCubemapShadowMapData = {
                lightPos: this.light.position,
                farPlane: this.light.shadowCameraFar
            };
        };
        CubemapShadowMapRenderTargetRendererUtils.prototype.addShadowMap = function (material, shadowMap) {
            material.addCubemapShadowMap(shadowMap);
        };
        Object.defineProperty(CubemapShadowMapRenderTargetRendererUtils.prototype, "clearCubemapShadowMapData",
            __decorate([
                wd.require(function (target) {
                    var material = target.getComponent(wd.Geometry).material;
                    wd.assert(material instanceof wd.LightMaterial, wd.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
                })
            ], CubemapShadowMapRenderTargetRendererUtils.prototype, "clearCubemapShadowMapData", Object.getOwnPropertyDescriptor(CubemapShadowMapRenderTargetRendererUtils.prototype, "clearCubemapShadowMapData")));
        return CubemapShadowMapRenderTargetRendererUtils;
    })(wd.ShadowMapRenderTargetRendererUtils);
    wd.CubemapShadowMapRenderTargetRendererUtils = CubemapShadowMapRenderTargetRendererUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var TwoDShadowMapRenderTargetRendererUtils = (function (_super) {
        __extends(TwoDShadowMapRenderTargetRendererUtils, _super);
        function TwoDShadowMapRenderTargetRendererUtils() {
            _super.apply(this, arguments);
        }
        TwoDShadowMapRenderTargetRendererUtils.create = function (light, texture) {
            var obj = new this(light, texture);
            obj.initWhenCreate();
            return obj;
        };
        TwoDShadowMapRenderTargetRendererUtils.prototype.initWhenCreate = function () {
            var self = this;
            _super.prototype.initWhenCreate.call(this);
            this.light.shadowRenderList.forEach(function (child) {
                self.setShadowMap(child, self.texture);
            });
        };
        TwoDShadowMapRenderTargetRendererUtils.prototype.clearTwoDShadowMapData = function (target) {
            var material = target.getComponent(wd.Geometry).material;
            material.clearTwoDShadowMapData();
        };
        TwoDShadowMapRenderTargetRendererUtils.prototype.setMaterialShadowMapData = function (material, target, shadowMapCamera) {
            var cameraComponent = shadowMapCamera.getComponent(wd.CameraController);
            material.addTwoDShadowMapData({
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                lightPos: this.light.position,
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            });
            material.buildTwoDShadowMapData = {
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            };
        };
        TwoDShadowMapRenderTargetRendererUtils.prototype.addShadowMap = function (material, shadowMap) {
            material.addTwoDShadowMap(shadowMap);
        };
        Object.defineProperty(TwoDShadowMapRenderTargetRendererUtils.prototype, "clearTwoDShadowMapData",
            __decorate([
                wd.require(function (target) {
                    var material = target.getComponent(wd.Geometry).material;
                    wd.assert(material instanceof wd.LightMaterial, wd.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
                })
            ], TwoDShadowMapRenderTargetRendererUtils.prototype, "clearTwoDShadowMapData", Object.getOwnPropertyDescriptor(TwoDShadowMapRenderTargetRendererUtils.prototype, "clearTwoDShadowMapData")));
        return TwoDShadowMapRenderTargetRendererUtils;
    })(wd.ShadowMapRenderTargetRendererUtils);
    wd.TwoDShadowMapRenderTargetRendererUtils = TwoDShadowMapRenderTargetRendererUtils;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Renderer = (function () {
        function Renderer() {
            this.skyboxCommand = null;
        }
        Renderer.prototype.init = function () {
        };
        return Renderer;
    })();
    wd.Renderer = Renderer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var WebGLRenderer = (function (_super) {
        __extends(WebGLRenderer, _super);
        function WebGLRenderer() {
            _super.apply(this, arguments);
            this._commandQueue = wdCb.Collection.create();
            this._clearOptions = {
                color: wd.Color.create("#000000")
            };
        }
        WebGLRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        WebGLRenderer.prototype.createQuadCommand = function () {
            return wd.QuadCommand.create();
        };
        WebGLRenderer.prototype.addCommand = function (command) {
            if (this._commandQueue.hasChild(command)) {
                return;
            }
            this._commandQueue.addChild(command);
            command.init();
        };
        WebGLRenderer.prototype.render = function () {
            var deviceManager = wd.DeviceManager.getInstance();
            deviceManager.clear(this._clearOptions);
            this._renderOpaqueCommands();
            deviceManager.depthWrite = false;
            this._renderSortedTransparentCommands();
            deviceManager.depthWrite = true;
            if (this.skyboxCommand) {
                deviceManager.depthFunc = wd.DepthFunction.LEQUAL;
                this.skyboxCommand.execute();
                deviceManager.depthFunc = wd.DepthFunction.LESS;
            }
            this._clearCommand();
        };
        WebGLRenderer.prototype.init = function () {
            var deviceManager = wd.DeviceManager.getInstance();
            deviceManager.depthTest = true;
            deviceManager.blend = false;
            deviceManager.setColorWrite(true, true, true, true);
            deviceManager.side = wd.Side.FRONT;
            deviceManager.depthWrite = true;
        };
        WebGLRenderer.prototype.setClearColor = function (color) {
            this._setClearOptions({
                color: color
            });
        };
        WebGLRenderer.prototype._renderOpaqueCommands = function () {
            this._commandQueue
                .removeChild(function (command) {
                return !command.material.blend;
            })
                .forEach(function (command) {
                command.execute();
            });
        };
        WebGLRenderer.prototype._renderSortedTransparentCommands = function () {
            var self = this;
            this._commandQueue
                .sort(function (a, b) {
                return self._getObjectToCameraZDistance(b) - self._getObjectToCameraZDistance(a);
            })
                .forEach(function (command) {
                command.execute();
            });
        };
        WebGLRenderer.prototype._getObjectToCameraZDistance = function (quad) {
            return wd.Director.getInstance().scene.camera.transform.position.z - quad.z;
        };
        WebGLRenderer.prototype._clearCommand = function () {
            this._commandQueue.removeAllChildren();
            this.skyboxCommand = null;
        };
        WebGLRenderer.prototype._setClearOptions = function (clearOptions) {
            wdCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        };
        return WebGLRenderer;
    })(wd.Renderer);
    wd.WebGLRenderer = WebGLRenderer;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (DrawMode) {
        DrawMode[DrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    })(wd.DrawMode || (wd.DrawMode = {}));
    var DrawMode = wd.DrawMode;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (BufferType) {
        BufferType[BufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
        BufferType[BufferType["SHORT"] = "SHORT"] = "SHORT";
        BufferType[BufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
        BufferType[BufferType["INT"] = "INT"] = "INT";
        BufferType[BufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
        BufferType[BufferType["FLOAT"] = "FLOAT"] = "FLOAT";
    })(wd.BufferType || (wd.BufferType = {}));
    var BufferType = wd.BufferType;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (BufferDataType) {
        BufferDataType[BufferDataType["VERTICE"] = "VERTICE"] = "VERTICE";
        BufferDataType[BufferDataType["INDICE"] = "INDICE"] = "INDICE";
        BufferDataType[BufferDataType["NORMAL"] = "NORMAL"] = "NORMAL";
        BufferDataType[BufferDataType["TEXCOORD"] = "TEXCOORD"] = "TEXCOORD";
        BufferDataType[BufferDataType["TANGENT"] = "TANGENT"] = "TANGENT";
        BufferDataType[BufferDataType["COLOR"] = "COLOR"] = "COLOR";
    })(wd.BufferDataType || (wd.BufferDataType = {}));
    var BufferDataType = wd.BufferDataType;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (BufferUsage) {
        BufferUsage[BufferUsage["STREAM_DRAW"] = "STREAM_DRAW"] = "STREAM_DRAW";
        BufferUsage[BufferUsage["STATIC_DRAW"] = "STATIC_DRAW"] = "STATIC_DRAW";
        BufferUsage[BufferUsage["DYNAMIC_DRAW"] = "DYNAMIC_DRAW"] = "DYNAMIC_DRAW";
    })(wd.BufferUsage || (wd.BufferUsage = {}));
    var BufferUsage = wd.BufferUsage;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Buffer = (function () {
        function Buffer() {
            this.buffer = null;
            this.type = null;
            this.num = null;
        }
        Buffer.prototype.dispose = function () {
            wd.DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        };
        return Buffer;
    })();
    wd.Buffer = Buffer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ElementBuffer = (function (_super) {
        __extends(ElementBuffer, _super);
        function ElementBuffer() {
            _super.apply(this, arguments);
            this._typeSize = null;
            this.data = null;
        }
        ElementBuffer.create = function (data, type) {
            var obj = new this();
            obj.initWhenCreate(data, type);
            return obj;
        };
        Object.defineProperty(ElementBuffer.prototype, "typeSize", {
            get: function () { return this._typeSize; },
            enumerable: true,
            configurable: true
        });
        ElementBuffer.prototype.initWhenCreate = function (data, type) {
            var gl = wd.DeviceManager.getInstance().gl;
            if (!data || !this._checkDataType(data, type)) {
                return null;
            }
            this.buffer = gl.createBuffer();
            if (!this.buffer) {
                wd.Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            this.type = gl[type];
            this.num = data.length;
            this.data = data;
            this._typeSize = this._getInfo(type).size;
            return this.buffer;
        };
        ElementBuffer.prototype._checkDataType = function (data, type) {
            var info = this._getInfo(type);
            return data instanceof info.typeClass;
        };
        ElementBuffer.prototype._getInfo = function (type) {
            var info = null;
            switch (type) {
                case wd.BufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case wd.BufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case wd.BufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case wd.BufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case wd.BufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case wd.BufferType.FLOAT:
                    info = {
                        typeClass: Float32Array,
                        size: 4
                    };
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("BufferType"));
                    break;
            }
            return info;
        };
        return ElementBuffer;
    })(wd.Buffer);
    wd.ElementBuffer = ElementBuffer;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var ArrayBuffer = (function (_super) {
        __extends(ArrayBuffer, _super);
        function ArrayBuffer() {
            _super.apply(this, arguments);
            this.count = null;
            this.data = null;
            this._type = null;
        }
        ArrayBuffer.create = function (data, num, type, usage) {
            if (usage === void 0) { usage = wd.BufferUsage.STATIC_DRAW; }
            var obj = new this();
            obj.initWhenCreate(data, num, type, usage);
            return obj;
        };
        ArrayBuffer.prototype.initWhenCreate = function (data, num, type, usage) {
            var gl = wd.DeviceManager.getInstance().gl;
            if (!data) {
                return null;
            }
            this.buffer = gl.createBuffer();
            if (!this.buffer) {
                wd.Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl[usage]);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this.num = num;
            this.type = gl[type];
            this._type = type;
            this.count = data.length / num;
            this.data = data;
            return this.buffer;
        };
        ArrayBuffer.prototype.resetData = function (data, num, type) {
            if (num === void 0) { num = this.num; }
            if (type === void 0) { type = this._type; }
            var gl = wd.DeviceManager.getInstance().gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
            this.num = num;
            this.type = gl[type];
            this.count = data.length / num;
            this.data = data;
            return this;
        };
        Object.defineProperty(ArrayBuffer.prototype, "resetData",
            __decorate([
                wd.require(function (data, num, type) {
                    if (num === void 0) { num = this.num; }
                    if (type === void 0) { type = this._type; }
                    wd.assert(this.buffer, wd.Log.info.FUNC_MUST("create gl buffer"));
                })
            ], ArrayBuffer.prototype, "resetData", Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "resetData")));
        return ArrayBuffer;
    })(wd.Buffer);
    wd.ArrayBuffer = ArrayBuffer;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var _table = wdCb.Hash.create();
    _table.addChild(wd.BufferDataType.VERTICE, "vertices");
    _table.addChild(wd.BufferDataType.INDICE, "indices");
    _table.addChild(wd.BufferDataType.NORMAL, "normals");
    _table.addChild(wd.BufferDataType.TEXCOORD, "texCoords");
    _table.addChild(wd.BufferDataType.COLOR, "colors");
    _table.addChild(wd.BufferDataType.TANGENT, "tangents");
    var BufferDataTable = (function () {
        function BufferDataTable() {
        }
        BufferDataTable.getGeometryDataName = function (type) {
            var result = _table.getChild(type);
            wd.Log.error(result === void 0, wd.Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
            return result;
        };
        return BufferDataTable;
    })();
    wd.BufferDataTable = BufferDataTable;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Program = (function () {
        function Program() {
            this._program = null;
            this._shader = null;
        }
        Program.create = function () {
            var obj = new this();
            return obj;
        };
        Program.prototype.use = function () {
            wd.DeviceManager.getInstance().gl.useProgram(this._program);
        };
        Program.prototype.getUniformLocation = function (name) {
            return wd.DeviceManager.getInstance().gl.getUniformLocation(this._program, name);
        };
        Program.prototype.sendUniformData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var gl = wd.DeviceManager.getInstance().gl, pos = null, type = null, data = null;
            if (args[0] === null || args[0] instanceof WebGLUniformLocation) {
                pos = args[0];
            }
            else {
                var name_1 = args[0];
                pos = this.getUniformLocation(name_1);
            }
            type = args[1];
            data = args[2];
            if (this.isUniformDataNotExistByLocation(pos) || data === null) {
                return;
            }
            if (wd.JudgeUtils.isFunction(data)) {
                data = data();
            }
            switch (type) {
                case wd.VariableType.FLOAT_1:
                    gl.uniform1f(pos, data);
                    break;
                case wd.VariableType.FLOAT_2:
                    gl.uniform2f(pos, data[0], data[1]);
                    break;
                case wd.VariableType.FLOAT_3:
                    data = this._convertToVector3(data);
                    gl.uniform3f(pos, data.x, data.y, data.z);
                    break;
                case wd.VariableType.FLOAT_4:
                    data = this._convertToVector4(data);
                    gl.uniform4f(pos, data.x, data.y, data.z, data.w);
                    break;
                case wd.VariableType.FLOAT_MAT3:
                    gl.uniformMatrix3fv(pos, false, data.values);
                    break;
                case wd.VariableType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos, false, data.values);
                    break;
                case wd.VariableType.NUMBER_1:
                case wd.VariableType.SAMPLER_CUBE:
                case wd.VariableType.SAMPLER_2D:
                    gl.uniform1i(pos, data);
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("VariableType:", type));
                    break;
            }
        };
        Program.prototype.sendUniformDataFromCustomShader = function () {
            var self = this;
            this._shader.uniforms
                .filter(function (val) {
                return val.value !== wd.VariableCategory.ENGINE;
            })
                .forEach(function (val, key) {
                if (val.type === wd.VariableType.STRUCTURE) {
                    wd.Log.error(!wd.JudgeUtils.isDirectObject(val.value), wd.Log.info.FUNC_MUST_BE("value's type", "object{}"));
                    for (var i in val.value) {
                        self.sendStructureData(key + "." + i, val.value[i].type, val.value[i].value);
                    }
                }
                else {
                    self.sendUniformData(key, val.type, val.value);
                }
            });
        };
        Program.prototype.sendAttributeData = function (name, type, data) {
            var gl = wd.DeviceManager.getInstance().gl, pos = null;
            pos = gl.getAttribLocation(this._program, name);
            if (pos === -1 || data === null) {
                return;
            }
            if (wd.JudgeUtils.isFunction(data)) {
                data = data();
                wd.Log.error(!(data instanceof wd.ArrayBuffer), wd.Log.info.FUNC_MUST_BE("ArrayBuffer"));
            }
            switch (type) {
                case wd.VariableType.BUFFER:
                    gl.bindBuffer(gl.ARRAY_BUFFER, data.buffer);
                    gl.vertexAttribPointer(pos, data.num, data.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("VariableType:", type));
                    break;
            }
        };
        Program.prototype.sendAttributeDataFromCustomShader = function () {
            var self = this;
            this._shader.attributes
                .filter(function (val) {
                return val.value !== wd.VariableCategory.ENGINE;
            })
                .forEach(function (val, key) {
                self.sendAttributeData(key, self._convertAttributeDataType(val), val.value);
            });
        };
        Program.prototype.sendStructureData = function (name, type, data) {
            this.sendUniformData(name, type, data);
        };
        Program.prototype.initWithShader = function (shader) {
            var gl = wd.DeviceManager.getInstance().gl, vs = null, fs = null;
            this._program = wd.DeviceManager.getInstance().gl.createProgram();
            vs = shader.createVsShader();
            fs = shader.createFsShader();
            this._shader = shader;
            gl.attachShader(this._program, vs);
            gl.attachShader(this._program, fs);
            /*!
             if warn:"Attribute 0 is disabled. This has significant performance penalty" when run,
             then do this before linkProgram:
             gl.bindAttribLocation( this._program, 0, "a_position");



             can reference here:
             http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


             OpenGL requires attribute zero to be enabled otherwise it will not render anything.
             On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
             attach it to attribute zero, and enable it.

             It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
             if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

             require your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.
             */
            gl.bindAttribLocation(this._program, 0, "a_position");
            gl.linkProgram(this._program);
            wd.Log.error(gl.getProgramParameter(this._program, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this._program));
            /*!
             should detach and delete shaders after linking the program

             explain:
             The shader object, due to being attached to the program object, will continue to exist even if you delete the shader object. It will only be deleted by the system when it is no longer attached to any program object (and when the user has asked to delete it, of course).

             "Deleting" the shader, as with all OpenGL objects, merely sets a flag that says you don't need it any more. OpenGL will keep it around for as long as it needs it itself, and will do the actual delete any time later (most likely, but not necessarily, after the program is deleted).
             */
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            return this;
        };
        Program.prototype.dispose = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            gl.deleteProgram(this._program);
            this._program = undefined;
        };
        Program.prototype.isUniformDataNotExistByLocation = function (pos) {
            return pos === null;
        };
        Program.prototype._convertAttributeDataType = function (val) {
            return wd.VariableType.BUFFER;
        };
        Program.prototype._convertToVector3 = function (data) {
            if (wd.JudgeUtils.isArray(data)) {
                return wd.Vector3.create(data[0], data[1], data[2]);
            }
            return data;
        };
        Program.prototype._convertToVector4 = function (data) {
            if (wd.JudgeUtils.isArray(data)) {
                return wd.Vector4.create(data[0], data[1], data[2], data[3]);
            }
            return data;
        };
        Object.defineProperty(Program.prototype, "_convertToVector3",
            __decorate([
                wd.require(function (data) {
                    wd.assert(wd.JudgeUtils.isArray(data) || data instanceof wd.Vector3, wd.Log.info.FUNC_MUST_BE("shader->attributes->value", "Array<Array<any>> or Array<Vector3> stucture"));
                })
            ], Program.prototype, "_convertToVector3", Object.getOwnPropertyDescriptor(Program.prototype, "_convertToVector3")));
        Object.defineProperty(Program.prototype, "_convertToVector4",
            __decorate([
                wd.require(function (data) {
                    wd.assert(wd.JudgeUtils.isArray(data) || data instanceof wd.Vector4, wd.Log.info.FUNC_MUST_BE("shader->attributes->value", "Array<Array<any>> or Array<Vector4> stucture"));
                })
            ], Program.prototype, "_convertToVector4", Object.getOwnPropertyDescriptor(Program.prototype, "_convertToVector4")));
        return Program;
    })();
    wd.Program = Program;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var QuadCommand = (function () {
        function QuadCommand() {
            this.buffers = null;
            this.mMatrix = null;
            this.vMatrix = null;
            this.pMatrix = null;
            this.drawMode = wd.DrawMode.TRIANGLES;
            this.z = null;
            this.material = null;
            this.animation = null;
        }
        QuadCommand.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(QuadCommand.prototype, "program", {
            get: function () {
                return this.material.program;
            },
            enumerable: true,
            configurable: true
        });
        QuadCommand.prototype.execute = function () {
            this.material.updateTexture();
            this.material.updateShader(this);
            this._draw();
        };
        QuadCommand.prototype.init = function () {
        };
        QuadCommand.prototype._draw = function () {
            var totalNum = 0, startOffset = 0, vertexBuffer = null, gl = wd.DeviceManager.getInstance().gl;
            this._setEffects();
            if (this.buffers.hasChild(wd.BufferDataType.INDICE)) {
                var indexBuffer = this.buffers.getChild(wd.BufferDataType.INDICE);
                totalNum = indexBuffer.num;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                gl.drawElements(gl[this.drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else {
                vertexBuffer = this.buffers.getChild(wd.BufferDataType.VERTICE);
                totalNum = vertexBuffer.num;
                gl.drawArrays(gl[this.drawMode], startOffset, totalNum);
            }
        };
        QuadCommand.prototype._setEffects = function () {
            var deviceManager = wd.DeviceManager.getInstance(), material = this.material;
            deviceManager.setColorWrite(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
            deviceManager.polygonOffsetMode = material.polygonOffsetMode;
            deviceManager.side = this._getSide();
            deviceManager.blend = material.blend;
            if (material.blendFuncSeparate && material.blendEquationSeparate) {
                deviceManager.setBlendFuncSeparate(material.blendFuncSeparate);
                deviceManager.setBlendEquationSeparate(material.blendEquationSeparate);
            }
            else {
                wdCb.Log.error(!material.blendSrc || !material.blendDst || !material.blendEquation, wdCb.Log.info.FUNC_MUST("material.blendSrc || material.blendDst || material.blendEquation", "be set"));
                deviceManager.setBlendFunc(material.blendSrc, material.blendDst);
                deviceManager.setBlendEquation(material.blendEquation);
            }
        };
        QuadCommand.prototype._getSide = function () {
            var scene = wd.Director.getInstance().scene;
            return scene.side ? scene.side : this.material.side;
        };
        return QuadCommand;
    })();
    wd.QuadCommand = QuadCommand;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var FrameBuffer = (function () {
        function FrameBuffer(width, height) {
            this.width = null;
            this.height = null;
            this._originScissorTest = null;
            this.width = width;
            this.height = height;
        }
        FrameBuffer.create = function (width, height) {
            var obj = new this(width, height);
            return obj;
        };
        Object.defineProperty(FrameBuffer.prototype, "gl", {
            get: function () {
                return wd.DeviceManager.getInstance().gl;
            },
            enumerable: true,
            configurable: true
        });
        FrameBuffer.prototype.createFrameBuffer = function () {
            return this.gl.createFramebuffer();
        };
        FrameBuffer.prototype.bindFrameBuffer = function (buffer) {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
        };
        FrameBuffer.prototype.setViewport = function () {
            var deviceManager = wd.DeviceManager.getInstance();
            deviceManager.setViewport(0, 0, this.width, this.height);
            this._originScissorTest = deviceManager.scissorTest;
            deviceManager.scissorTest = false;
        };
        FrameBuffer.prototype.restoreViewport = function () {
            var deviceManager = wd.DeviceManager.getInstance(), view = deviceManager.view;
            deviceManager.setViewport(0, 0, view.width, view.height);
            deviceManager.scissorTest = this._originScissorTest;
        };
        FrameBuffer.prototype.dispose = function () {
            this.unBind();
        };
        FrameBuffer.prototype.unBind = function () {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        FrameBuffer.prototype.createRenderBuffer = function () {
            var gl = this.gl, renderBuffer = gl.createRenderbuffer();
            wd.Log.error(!renderBuffer, "Failed to create renderbuffer object");
            return renderBuffer;
        };
        FrameBuffer.prototype.attachTexture = function (glTarget, texture) {
            var gl = this.gl;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, glTarget, texture, 0);
        };
        FrameBuffer.prototype.attachRenderBuffer = function (type, renderBuffer) {
            var gl = this.gl;
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl[type], gl.RENDERBUFFER, renderBuffer);
        };
        FrameBuffer.prototype.check = function () {
            var gl = this.gl, e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (e !== gl.FRAMEBUFFER_COMPLETE) {
                wd.Log.error(true, "Frame buffer object is incomplete:" + e.toString());
            }
        };
        return FrameBuffer;
    })();
    wd.FrameBuffer = FrameBuffer;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Shader = (function () {
        function Shader() {
            this._attributes = wdCb.Hash.create();
            this._uniforms = wdCb.Hash.create();
            this._vsSource = "";
            this._fsSource = "";
            this.program = wd.Program.create();
            this._definitionDataDirty = true;
            this._libs = wdCb.Collection.create();
            this._sourceBuilder = wd.ShaderSourceBuilder.create();
        }
        Shader.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Shader.prototype, "attributes", {
            get: function () {
                return this._attributes;
            },
            set: function (attributes) {
                if (this._isNotEqual(attributes, this._attributes)) {
                    this._definitionDataDirty = true;
                }
                this._attributes = attributes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shader.prototype, "uniforms", {
            get: function () {
                return this._uniforms;
            },
            set: function (uniforms) {
                if (this._isNotEqual(uniforms, this._uniforms)) {
                    this._definitionDataDirty = true;
                }
                this._uniforms = uniforms;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shader.prototype, "vsSource", {
            get: function () {
                return this._vsSource;
            },
            set: function (vsSource) {
                if (vsSource !== this._vsSource) {
                    this._definitionDataDirty = true;
                }
                this._vsSource = vsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shader.prototype, "fsSource", {
            get: function () {
                return this._fsSource;
            },
            set: function (fsSource) {
                if (fsSource !== this._fsSource) {
                    this._definitionDataDirty = true;
                }
                this._fsSource = fsSource;
            },
            enumerable: true,
            configurable: true
        });
        Shader.prototype.createVsShader = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        };
        Shader.prototype.createFsShader = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        };
        Shader.prototype.isEqual = function (other) {
            return this.vsSource === other.vsSource
                && this.fsSource === other.fsSource;
        };
        Shader.prototype.init = function () {
        };
        Shader.prototype.update = function (quadCmd, material) {
            var program = this.program;
            this.buildDefinitionData(quadCmd, material);
            if (this._definitionDataDirty) {
                this.program.initWithShader(this);
                this._definitionDataDirty = false;
            }
            this.program.use();
            this._libs.forEach(function (lib) {
                lib.sendShaderVariables(program, quadCmd, material);
            });
            program.sendAttributeDataFromCustomShader();
            program.sendUniformDataFromCustomShader();
            material.mapManager.sendData(program);
        };
        Shader.prototype.hasLib = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args[0] instanceof wd.ShaderLib) {
                var lib = args[0];
                return this._libs.hasChild(lib);
            }
            else {
                var _class = args[0];
                return this._libs.hasChild(function (lib) {
                    return lib instanceof _class;
                });
            }
        };
        Shader.prototype.addLib = function (lib) {
            this._libs.addChild(lib);
        };
        Shader.prototype.addShaderLibToTop = function (lib) {
            this._libs.unShiftChild(lib);
        };
        Shader.prototype.getLib = function (libClass) {
            return this._libs.findOne(function (lib) {
                return lib instanceof libClass;
            });
        };
        Shader.prototype.getLibs = function () {
            return this._libs;
        };
        Shader.prototype.removeLib = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this._libs.removeChild(args[0]);
        };
        Shader.prototype.removeAllLibs = function () {
            this._libs.removeAllChildren();
        };
        Shader.prototype.sortLib = function (func) {
            this._libs = this._libs.sort(func);
        };
        Shader.prototype.read = function (definitionData) {
            this._sourceBuilder.read(definitionData);
        };
        Shader.prototype.buildDefinitionData = function (quadCmd, material) {
            this._libs.forEach(function (lib) {
                lib.setShaderDefinition(quadCmd, material);
            });
            this._sourceBuilder.clearShaderDefinition();
            this._sourceBuilder.build(this._libs);
            this.attributes = this._sourceBuilder.attributes;
            this.uniforms = this._sourceBuilder.uniforms;
            this.vsSource = this._sourceBuilder.vsSource;
            this.fsSource = this._sourceBuilder.fsSource;
        };
        Shader.prototype._initShader = function (shader, source) {
            var gl = wd.DeviceManager.getInstance().gl;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                return shader;
            }
            else {
                wd.Log.log(gl.getShaderInfoLog(shader));
                wd.Log.log("attributes:\n", this.attributes);
                wd.Log.log("uniforms:\n", this.uniforms);
                wd.Log.log("source:\n", source);
            }
        };
        Shader.prototype._isNotEqual = function (list1, list2) {
            var result = false;
            list1.forEach(function (data, key) {
                var list2Data = list2.getChild(key);
                if (!list2Data || data.type !== list2Data.type || data.value !== list2Data.value) {
                    result = true;
                    return wdCb.$BREAK;
                }
            });
            return result;
        };
        return Shader;
    })();
    wd.Shader = Shader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ShaderSourceBuilder = (function () {
        function ShaderSourceBuilder() {
            this.attributes = wdCb.Hash.create();
            this.uniforms = wdCb.Hash.create();
            this.vsSource = "";
            this.vsSourceTop = "";
            this.vsSourceDefine = "";
            this.vsSourceVarDeclare = "";
            this.vsSourceFuncDeclare = "";
            this.vsSourceFuncDefine = "";
            this.vsSourceBody = "";
            this.fsSource = "";
            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
            this.vsSourceDefineList = wdCb.Collection.create();
            this.fsSourceDefineList = wdCb.Collection.create();
            this.attributesFromShaderLib = wdCb.Hash.create();
            this.uniformsFromShaderLib = wdCb.Hash.create();
            this.vsSourceFromShaderLib = "";
            this.vsSourceTopFromShaderLib = "";
            this.vsSourceDefineFromShaderLib = "";
            this.vsSourceVarDeclareFromShaderLib = "";
            this.vsSourceFuncDeclareFromShaderLib = "";
            this.vsSourceFuncDefineFromShaderLib = "";
            this.vsSourceBodyFromShaderLib = "";
            this.fsSourceFromShaderLib = "";
            this.fsSourceTopFromShaderLib = "";
            this.fsSourceDefineFromShaderLib = "";
            this.fsSourceVarDeclareFromShaderLib = "";
            this.fsSourceFuncDeclareFromShaderLib = "";
            this.fsSourceFuncDefineFromShaderLib = "";
            this.fsSourceBodyFromShaderLib = "";
            this.vsSourceDefineListFromShaderLib = wdCb.Collection.create();
            this.fsSourceDefineListFromShaderLib = wdCb.Collection.create();
        }
        ShaderSourceBuilder.create = function () {
            var obj = new this();
            return obj;
        };
        ShaderSourceBuilder.prototype.read = function (definitionData) {
            if (definitionData.attributes) {
                this.attributesFromShaderLib = (definitionData.attributes instanceof wdCb.Hash ? definitionData.attributes : wdCb.Hash.create(definitionData.attributes));
            }
            if (definitionData.uniforms) {
                this.uniformsFromShaderLib = (definitionData.uniforms instanceof wdCb.Hash ? definitionData.uniforms : wdCb.Hash.create(definitionData.uniforms));
            }
            this.vsSourceTopFromShaderLib = definitionData.vsSourceTop || "";
            this.vsSourceDefineFromShaderLib = definitionData.vsSourceDefine || "";
            this.vsSourceVarDeclareFromShaderLib = definitionData.vsSourceVarDeclare || "";
            this.vsSourceFuncDeclareFromShaderLib = definitionData.vsSourceFuncDeclare || "";
            this.vsSourceFuncDefineFromShaderLib = definitionData.vsSourceFuncDefine || "";
            this.vsSourceBodyFromShaderLib = definitionData.vsSourceBody || "";
            this.fsSourceTopFromShaderLib = definitionData.fsSourceTop || "";
            this.fsSourceDefineFromShaderLib = definitionData.fsSourceDefine || "";
            this.fsSourceVarDeclareFromShaderLib = definitionData.fsSourceVarDeclare || "";
            this.fsSourceFuncDeclareFromShaderLib = definitionData.fsSourceFuncDeclare || "";
            this.fsSourceFuncDefineFromShaderLib = definitionData.fsSourceFuncDefine || "";
            this.fsSourceBodyFromShaderLib = definitionData.fsSourceBody || "";
        };
        ShaderSourceBuilder.prototype.build = function (libs) {
            var self = this;
            this._readLibSource(libs);
            this._buildVsSource();
            this._buildFsSource();
            this.attributes
                .filter(function (data) {
                return (wd.JudgeUtils.isArray(data.value) || wd.JudgeUtils.isFloatArray(data.value)) && data.value !== wd.VariableCategory.ENGINE;
            })
                .forEach(function (data, key) {
                data.value = self._convertArrayToArrayBuffer(data.type, data.value);
            });
        };
        ShaderSourceBuilder.prototype.clearShaderDefinition = function () {
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();
            this.vsSourceDefineList.removeAllChildren();
            this.fsSourceDefineList.removeAllChildren();
            this.vsSourceTop = "";
            this.vsSourceDefine = "";
            this.vsSourceVarDeclare = "";
            this.vsSourceFuncDeclare = "";
            this.vsSourceFuncDefine = "";
            this.vsSourceBody = "";
            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
        };
        ShaderSourceBuilder.prototype._readLibSource = function (libs) {
            var self = this, vsSourceTop = "", vsSourceDefine = "", vsSourceVarDeclare = "", vsSourceFuncDeclare = "", vsSourceFuncDefine = "", vsSourceBody = "", fsSourceTop = "", fsSourceDefine = "", fsSourceVarDeclare = "", fsSourceFuncDeclare = "", fsSourceFuncDefine = "", fsSourceBody = "";
            libs.forEach(function (lib) {
                self.attributes.addChildren(lib.attributes);
                self.uniforms.addChildren(lib.uniforms);
                vsSourceTop += lib.vsSourceTop;
                vsSourceDefine += lib.vsSourceDefine;
                vsSourceVarDeclare += lib.vsSourceVarDeclare;
                vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                vsSourceFuncDefine += lib.vsSourceFuncDefine;
                vsSourceBody += lib.vsSourceBody;
                fsSourceTop += lib.fsSourceTop;
                fsSourceDefine += lib.fsSourceDefine;
                fsSourceVarDeclare += lib.fsSourceVarDeclare;
                fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                fsSourceFuncDefine += lib.fsSourceFuncDefine;
                fsSourceBody += lib.fsSourceBody;
                self.vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                self.fsSourceDefineList.addChildren(lib.fsSourceDefineList);
            });
            /*! ensure shader lib's code is before custom shader's source */
            this.attributes.addChildren(this.attributesFromShaderLib);
            this.uniforms.addChildren(this.uniformsFromShaderLib);
            this.vsSourceTop = vsSourceTop + this.vsSourceTopFromShaderLib;
            this.vsSourceDefine = vsSourceDefine + this.vsSourceDefineFromShaderLib;
            this.vsSourceVarDeclare = vsSourceVarDeclare + this.vsSourceVarDeclareFromShaderLib;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare + this.vsSourceFuncDeclareFromShaderLib;
            this.vsSourceFuncDefine = vsSourceFuncDefine + this.vsSourceFuncDefineFromShaderLib;
            this.vsSourceBody = vsSourceBody + this.vsSourceBodyFromShaderLib;
            this.fsSourceTop = fsSourceTop + this.fsSourceTopFromShaderLib;
            this.fsSourceDefine = fsSourceDefine + this.fsSourceDefineFromShaderLib;
            this.fsSourceVarDeclare = fsSourceVarDeclare + this.fsSourceVarDeclareFromShaderLib;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare + this.fsSourceFuncDeclareFromShaderLib;
            this.fsSourceFuncDefine = fsSourceFuncDefine + this.fsSourceFuncDefineFromShaderLib;
            this.fsSourceBody = fsSourceBody + this.fsSourceBodyFromShaderLib;
        };
        ShaderSourceBuilder.prototype._buildVsSource = function () {
            this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceVarDeclare() + this._buildVsSourceFuncDeclare() + this._buildVsSourceFuncDefine() + this._buildVsSourceBody();
        };
        ShaderSourceBuilder.prototype._buildFsSource = function () {
            this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceVarDeclare() + this._buildFsSourceFuncDeclare() + this._buildFsSourceFuncDefine() + this._buildFsSourceBody();
        };
        ShaderSourceBuilder.prototype._buildVsSourceTop = function () {
            return this._getPrecisionSource() + this.vsSourceTop;
        };
        ShaderSourceBuilder.prototype._buildVsSourceDefine = function () {
            return this._buildSourceDefine(this.vsSourceDefineList) + this.vsSourceDefine;
        };
        ShaderSourceBuilder.prototype._buildVsSourceVarDeclare = function () {
            return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceVarDeclare, this.vsSourceFuncDefine, this.vsSourceBody) + this.vsSourceVarDeclare;
        };
        ShaderSourceBuilder.prototype._buildVsSourceFuncDeclare = function () {
            return this.vsSourceFuncDeclare;
        };
        ShaderSourceBuilder.prototype._buildVsSourceFuncDefine = function () {
            return this.vsSourceFuncDefine;
        };
        ShaderSourceBuilder.prototype._buildVsSourceBody = function () {
            return wd.ShaderSnippet.main_begin + this.vsSourceBody + wd.ShaderSnippet.main_end;
        };
        ShaderSourceBuilder.prototype._buildFsSourceTop = function () {
            return this._getPrecisionSource() + this.fsSourceTop;
        };
        ShaderSourceBuilder.prototype._buildFsSourceDefine = function () {
            return this._buildSourceDefine(this.fsSourceDefineList) + this.fsSourceDefine;
        };
        ShaderSourceBuilder.prototype._buildFsSourceVarDeclare = function () {
            return this._generateUniformSource(this.fsSourceVarDeclare, this.fsSourceFuncDefine, this.fsSourceBody) + this.fsSourceVarDeclare;
        };
        ShaderSourceBuilder.prototype._buildFsSourceFuncDeclare = function () {
            return this.fsSourceFuncDeclare;
        };
        ShaderSourceBuilder.prototype._buildFsSourceFuncDefine = function () {
            return this.fsSourceFuncDefine;
        };
        ShaderSourceBuilder.prototype._buildFsSourceBody = function () {
            return wd.ShaderSnippet.main_begin + this.fsSourceBody + wd.ShaderSnippet.main_end;
        };
        ShaderSourceBuilder.prototype._buildSourceDefine = function (defineList) {
            var result = "";
            defineList.forEach(function (define) {
                if (define.value === void 0) {
                    result += "#define " + define.name + "\n";
                }
                else {
                    result += "#define " + define.name + " " + define.value + "\n";
                }
            });
            return result;
        };
        ShaderSourceBuilder.prototype._getPrecisionSource = function () {
            var precision = wd.GPUDetector.getInstance().precision, result = null;
            switch (precision) {
                case wd.GPUPrecision.HIGHP:
                    result = wd.ShaderChunk.highp_fragment.top;
                    break;
                case wd.GPUPrecision.MEDIUMP:
                    result = wd.ShaderChunk.mediump_fragment.top;
                    break;
                case wd.GPUPrecision.LOWP:
                    result = wd.ShaderChunk.lowp_fragment.top;
                    break;
                default:
                    result = "";
                    break;
            }
            return result;
        };
        ShaderSourceBuilder.prototype._generateAttributeSource = function () {
            var result = "";
            this.attributes.filter(function (data, key) {
                return !!data;
            }).forEach(function (data, key) {
                result += "attribute " + wd.VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
            });
            return result;
        };
        ShaderSourceBuilder.prototype._generateUniformSource = function (sourceVarDeclare, sourceFuncDefine, sourceBody) {
            var result = "", self = this;
            this.uniforms.filter(function (data, key) {
                return !!data && data.type !== wd.VariableType.STRUCTURE && data.type !== wd.VariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
            }).forEach(function (data, key) {
                result += "uniform " + wd.VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
            });
            return result;
        };
        ShaderSourceBuilder.prototype._isExistInSource = function (key, source) {
            return source.indexOf(key) !== -1;
        };
        ShaderSourceBuilder.prototype._convertArrayToArrayBuffer = function (type, value) {
            var num = this._getBufferNum(type);
            if (wd.JudgeUtils.isArray(value)) {
                return wd.ArrayBuffer.create(new Float32Array(value), num, wd.BufferType.FLOAT);
            }
            else if (wd.JudgeUtils.isFloatArray(value)) {
                return wd.ArrayBuffer.create(value, num, wd.BufferType.FLOAT);
            }
        };
        ShaderSourceBuilder.prototype._getBufferNum = function (type) {
            var num = null;
            switch (type) {
                case wd.VariableType.FLOAT_1:
                case wd.VariableType.NUMBER_1:
                    num = 1;
                    break;
                case wd.VariableType.FLOAT_3:
                    num = 3;
                    break;
                case wd.VariableType.FLOAT_4:
                    num = 4;
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_UNEXPECT("VariableType", type));
                    break;
            }
            return num;
        };
        return ShaderSourceBuilder;
    })();
    wd.ShaderSourceBuilder = ShaderSourceBuilder;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (VariableType) {
        VariableType[VariableType["FLOAT_1"] = 0] = "FLOAT_1";
        VariableType[VariableType["FLOAT_2"] = 1] = "FLOAT_2";
        VariableType[VariableType["FLOAT_3"] = 2] = "FLOAT_3";
        VariableType[VariableType["FLOAT_4"] = 3] = "FLOAT_4";
        VariableType[VariableType["FLOAT_MAT3"] = 4] = "FLOAT_MAT3";
        VariableType[VariableType["FLOAT_MAT4"] = 5] = "FLOAT_MAT4";
        VariableType[VariableType["BUFFER"] = 6] = "BUFFER";
        VariableType[VariableType["SAMPLER_CUBE"] = 7] = "SAMPLER_CUBE";
        VariableType[VariableType["SAMPLER_2D"] = 8] = "SAMPLER_2D";
        VariableType[VariableType["NUMBER_1"] = 9] = "NUMBER_1";
        VariableType[VariableType["STRUCTURE"] = 10] = "STRUCTURE";
        VariableType[VariableType["STRUCTURES"] = 11] = "STRUCTURES";
    })(wd.VariableType || (wd.VariableType = {}));
    var VariableType = wd.VariableType;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (VariableCategory) {
        /*! avoid to equal 0
        for example, when compare to texture index, it may equal texture 0
        */
        VariableCategory[VariableCategory["ENGINE"] = "ENGINE"] = "ENGINE";
        VariableCategory[VariableCategory["CUSTOM"] = "CUSTOM"] = "CUSTOM";
    })(wd.VariableCategory || (wd.VariableCategory = {}));
    var VariableCategory = wd.VariableCategory;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var VariableLib = (function () {
        function VariableLib() {
        }
        VariableLib.a_position = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_currentFramePosition = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_nextFramePosition = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_normal = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_currentFrameNormal = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_nextFrameNormal = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_color = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_texCoord = {
            type: wd.VariableType.FLOAT_2,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.a_tangent = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_mMatrix = {
            type: wd.VariableType.FLOAT_MAT4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_vMatrix = {
            type: wd.VariableType.FLOAT_MAT4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_pMatrix = {
            type: wd.VariableType.FLOAT_MAT4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_normalMatrix = {
            type: wd.VariableType.FLOAT_MAT3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_samplerCube0 = {
            type: wd.VariableType.SAMPLER_CUBE,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_sampler2D0 = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_sampler2D1 = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_diffuseMapSampler = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_specularMapSampler = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_normalMapSampler = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_mirrorSampler = {
            type: wd.VariableType.SAMPLER_2D,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_cameraPos = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_refractionRatio = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_reflectivity = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_sourceRegion = {
            type: wd.VariableType.FLOAT_4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_repeatRegion = {
            type: wd.VariableType.FLOAT_4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_combineMode = {
            type: wd.VariableType.NUMBER_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_mixRatio = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_diffuse = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_specular = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_shininess = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_isBothSide = {
            type: wd.VariableType.NUMBER_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_opacity = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_ambient = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_directionLights = {
            type: wd.VariableType.STRUCTURES,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_pointLights = {
            type: wd.VariableType.STRUCTURES,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_vpMatrixFromLight = {
            type: wd.VariableType.FLOAT_MAT4,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_lightPos = {
            type: wd.VariableType.FLOAT_3,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_farPlane = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        VariableLib.u_interpolation = {
            type: wd.VariableType.FLOAT_1,
            value: wd.VariableCategory.ENGINE
        };
        return VariableLib;
    })();
    wd.VariableLib = VariableLib;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var _table = wdCb.Hash.create();
    _table.addChild(wd.VariableType.FLOAT_1, "float");
    _table.addChild(wd.VariableType.FLOAT_2, "vec2");
    _table.addChild(wd.VariableType.FLOAT_3, "vec3");
    _table.addChild(wd.VariableType.FLOAT_4, "vec4");
    _table.addChild(wd.VariableType.FLOAT_MAT3, "mat3");
    _table.addChild(wd.VariableType.FLOAT_MAT4, "mat4");
    _table.addChild(wd.VariableType.NUMBER_1, "int");
    _table.addChild(wd.VariableType.SAMPLER_CUBE, "samplerCube");
    _table.addChild(wd.VariableType.SAMPLER_2D, "sampler2D");
    var VariableTypeTable = (function () {
        function VariableTypeTable() {
        }
        VariableTypeTable.getVariableType = function (type) {
            var result = _table.getChild(type);
            wd.Log.error(result === void 0, wd.Log.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));
            return result;
        };
        return VariableTypeTable;
    })();
    wd.VariableTypeTable = VariableTypeTable;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var _table = wdCb.Hash.create();
    _table.addChild("diffuseMap", "u_diffuseMapSampler");
    _table.addChild("specularMap", "u_specularMapSampler");
    _table.addChild("normalMap", "u_normalMapSampler");
    _table.addChild("mirrorReflectionMap", "u_mirrorSampler");
    var VariableNameTable = (function () {
        function VariableNameTable() {
        }
        VariableNameTable.getVariableName = function (name) {
            var result = _table.getChild(name);
            wd.Log.error(result === void 0, wd.Log.info.FUNC_NOT_EXIST(name, "in VariableNameTable"));
            return result;
        };
        return VariableNameTable;
    })();
    wd.VariableNameTable = VariableNameTable;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var ShaderLib = (function () {
        function ShaderLib() {
            this.type = wd.ABSTRACT_ATTRIBUTE;
            this.attributes = wdCb.Hash.create();
            this.uniforms = wdCb.Hash.create();
            this.vsSourceTop = "";
            this.vsSourceDefine = "";
            this.vsSourceVarDeclare = "";
            this.vsSourceFuncDeclare = "";
            this.vsSourceFuncDefine = "";
            this.vsSourceBody = "";
            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
            this.vsSourceDefineList = wdCb.Collection.create();
            this.fsSourceDefineList = wdCb.Collection.create();
        }
        ShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            var vs = null, fs = null;
            this._clearShaderDefinition();
            vs = this.getVsChunk();
            fs = this.getFsChunk();
            vs && this.setVsSource(vs);
            fs && this.setFsSource(fs);
        };
        ShaderLib.prototype.getVsChunk = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var type = args.length === 0 ? this.type : args[0];
            return this._getChunk(type, ShaderLibType.vs);
        };
        ShaderLib.prototype.getFsChunk = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var type = args.length === 0 ? this.type : args[0];
            return this._getChunk(type, ShaderLibType.fs);
        };
        ShaderLib.prototype.setVsSource = function (vs, operator) {
            if (operator === void 0) { operator = "="; }
            this._setSource(vs, ShaderLibType.vs, operator);
        };
        ShaderLib.prototype.setFsSource = function (fs, operator) {
            if (operator === void 0) { operator = "="; }
            this._setSource(fs, ShaderLibType.fs, operator);
        };
        ShaderLib.prototype.addAttributeVariable = function (variableArr) {
            this._addVariable(this.attributes, variableArr);
        };
        ShaderLib.prototype.addUniformVariable = function (variableArr) {
            this._addVariable(this.uniforms, variableArr);
        };
        ShaderLib.prototype.sendAttributeData = function (program, name, data) {
            program.sendAttributeData(name, wd.VariableType.BUFFER, data);
        };
        ShaderLib.prototype.sendUniformData = function (program, name, data) {
            program.sendUniformData(name, wd.VariableLib[name].type, data);
        };
        ShaderLib.prototype._clearShaderDefinition = function () {
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();
            this.vsSourceDefineList.removeAllChildren();
            this.fsSourceDefineList.removeAllChildren();
            this.vsSourceTop = "";
            this.vsSourceDefine = "";
            this.vsSourceVarDeclare = "";
            this.vsSourceFuncDeclare = "";
            this.vsSourceFuncDefine = "";
            this.vsSourceBody = "";
            this.fsSourceTop = "";
            this.fsSourceDefine = "";
            this.fsSourceVarDeclare = "";
            this.fsSourceFuncDeclare = "";
            this.fsSourceFuncDefine = "";
            this.fsSourceBody = "";
        };
        ShaderLib.prototype._getChunk = function (type, sourceType) {
            var key = null;
            if (type.indexOf(".glsl") > -1) {
                key = "" + wdCb.PathUtils.basename(type, ".glsl");
            }
            else {
                if (sourceType === ShaderLibType.vs) {
                    key = type + "_vertex";
                }
                else {
                    key = type + "_fragment";
                }
            }
            return wd.ShaderChunk[key] ? wd.ShaderChunk[key] : wd.ShaderChunk.empty;
        };
        ShaderLib.prototype._setSource = function (chunk, sourceType, operator) {
            if (!chunk) {
                return;
            }
            switch (operator) {
                case "+":
                    this[(sourceType + "SourceTop")] += chunk.top;
                    this[(sourceType + "SourceDefine")] += chunk.define;
                    this[(sourceType + "SourceVarDeclare")] += chunk.varDeclare;
                    this[(sourceType + "SourceFuncDeclare")] += chunk.funcDeclare;
                    this[(sourceType + "SourceFuncDefine")] += chunk.funcDefine;
                    this[(sourceType + "SourceBody")] += chunk.body;
                    break;
                case "=":
                    this[(sourceType + "SourceTop")] = chunk.top;
                    this[(sourceType + "SourceDefine")] = chunk.define;
                    this[(sourceType + "SourceVarDeclare")] = chunk.varDeclare;
                    this[(sourceType + "SourceFuncDeclare")] = chunk.funcDeclare;
                    this[(sourceType + "SourceFuncDefine")] = chunk.funcDefine;
                    this[(sourceType + "SourceBody")] = chunk.body;
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("opertor:", operator));
                    break;
            }
        };
        ShaderLib.prototype._addVariable = function (target, variableArr) {
            variableArr.forEach(function (variable) {
                wd.Log.assert(wd.VariableLib[variable], wd.Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));
                target.addChild(variable, wd.VariableLib[variable]);
            });
        };
        Object.defineProperty(ShaderLib.prototype, "setShaderDefinition",
            __decorate([
                wd.virtual
            ], ShaderLib.prototype, "setShaderDefinition", Object.getOwnPropertyDescriptor(ShaderLib.prototype, "setShaderDefinition")));
        Object.defineProperty(ShaderLib.prototype, "sendUniformData",
            __decorate([
                wd.require(function (program, name, data) {
                    wd.assert(!!wd.VariableLib[name], name + " should exist in VariableLib");
                })
            ], ShaderLib.prototype, "sendUniformData", Object.getOwnPropertyDescriptor(ShaderLib.prototype, "sendUniformData")));
        return ShaderLib;
    })();
    wd.ShaderLib = ShaderLib;
    var ShaderLibType;
    (function (ShaderLibType) {
        ShaderLibType[ShaderLibType["vs"] = "vs"] = "vs";
        ShaderLibType[ShaderLibType["fs"] = "fs"] = "fs";
    })(ShaderLibType || (ShaderLibType = {}));
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonShaderLib = (function (_super) {
        __extends(CommonShaderLib, _super);
        function CommonShaderLib() {
            _super.apply(this, arguments);
            this.type = "common";
        }
        CommonShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        CommonShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_mMatrix", quadCmd.mMatrix);
            this.sendUniformData(program, "u_vMatrix", quadCmd.vMatrix);
            this.sendUniformData(program, "u_pMatrix", quadCmd.pMatrix);
        };
        CommonShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);
            this.vsSourceDefine = wd.ShaderChunk.common_define.define + wd.ShaderChunk.common_vertex.define;
            this.vsSourceFuncDefine = wd.ShaderChunk.common_function.funcDefine + wd.ShaderChunk.common_vertex.funcDefine;
            this.fsSourceDefine = wd.ShaderChunk.common_define.define + wd.ShaderChunk.common_fragment.define;
            this.fsSourceFuncDefine = wd.ShaderChunk.common_function.funcDefine + wd.ShaderChunk.common_fragment.funcDefine;
        };
        return CommonShaderLib;
    })(wd.ShaderLib);
    wd.CommonShaderLib = CommonShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonVerticeShaderLib = (function (_super) {
        __extends(CommonVerticeShaderLib, _super);
        function CommonVerticeShaderLib() {
            _super.apply(this, arguments);
            this.type = "commonVertice";
        }
        CommonVerticeShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        CommonVerticeShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this._sendAttributeVariables(program, quadCmd);
        };
        CommonVerticeShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_position"]);
        };
        CommonVerticeShaderLib.prototype._sendAttributeVariables = function (program, quadCmd) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.VERTICE)) {
                this.sendAttributeData(program, "a_position", quadCmd.buffers.getChild(wd.BufferDataType.VERTICE));
            }
        };
        return CommonVerticeShaderLib;
    })(wd.ShaderLib);
    wd.CommonVerticeShaderLib = CommonVerticeShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonNormalShaderLib = (function (_super) {
        __extends(CommonNormalShaderLib, _super);
        function CommonNormalShaderLib() {
            _super.apply(this, arguments);
            this.type = "commonNormal";
        }
        CommonNormalShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        CommonNormalShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this._sendAttributeVariables(program, quadCmd);
        };
        CommonNormalShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_normal"]);
        };
        CommonNormalShaderLib.prototype._sendAttributeVariables = function (program, quadCmd) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.NORMAL)) {
                this.sendAttributeData(program, "a_normal", quadCmd.buffers.getChild(wd.BufferDataType.NORMAL));
            }
        };
        return CommonNormalShaderLib;
    })(wd.ShaderLib);
    wd.CommonNormalShaderLib = CommonNormalShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicShaderLib = (function (_super) {
        __extends(BasicShaderLib, _super);
        function BasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "basic";
        }
        BasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        BasicShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.COLOR)) {
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */
                this.sendAttributeData(program, "a_color", quadCmd.buffers.getChild(wd.BufferDataType.COLOR));
                this.sendUniformData(program, "u_opacity", material.opacity);
            }
        };
        BasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_color"]);
            this.addUniformVariable(["u_opacity"]);
            this.vsSourceBody = wd.ShaderSnippet.setPos_mvp + wd.ShaderChunk.basic_vertex.body;
        };
        return BasicShaderLib;
    })(wd.ShaderLib);
    wd.BasicShaderLib = BasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicEndShaderLib = (function (_super) {
        __extends(BasicEndShaderLib, _super);
        function BasicEndShaderLib() {
            _super.apply(this, arguments);
            this.type = "basicEnd";
        }
        BasicEndShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        BasicEndShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        return BasicEndShaderLib;
    })(wd.ShaderLib);
    wd.BasicEndShaderLib = BasicEndShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MorphCommonShaderLib = (function (_super) {
        __extends(MorphCommonShaderLib, _super);
        function MorphCommonShaderLib() {
            _super.apply(this, arguments);
            this.type = "morphCommon";
        }
        MorphCommonShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        MorphCommonShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            var anim = (quadCmd.animation);
            this.sendUniformData(program, "u_interpolation", anim.interpolation);
        };
        MorphCommonShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_interpolation"]);
        };
        Object.defineProperty(MorphCommonShaderLib.prototype, "sendShaderVariables",
            __decorate([
                wd.require(function (program, quadCmd, material) {
                    wd.assert(!!quadCmd.animation, wd.Log.info.FUNC_SHOULD("gameObject", "add MorphAnimation component"));
                })
            ], MorphCommonShaderLib.prototype, "sendShaderVariables", Object.getOwnPropertyDescriptor(MorphCommonShaderLib.prototype, "sendShaderVariables")));
        return MorphCommonShaderLib;
    })(wd.ShaderLib);
    wd.MorphCommonShaderLib = MorphCommonShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var MorphVerticeShaderLib = (function (_super) {
        __extends(MorphVerticeShaderLib, _super);
        function MorphVerticeShaderLib() {
            _super.apply(this, arguments);
            this.type = "morphVertice";
        }
        MorphVerticeShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        MorphVerticeShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.VERTICE)) {
                var morphVerticeData = quadCmd.buffers.getChild(wd.BufferDataType.VERTICE);
                this.sendAttributeData(program, "a_currentFramePosition", morphVerticeData[0]);
                this.sendAttributeData(program, "a_nextFramePosition", morphVerticeData[1]);
            }
        };
        MorphVerticeShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_currentFramePosition", "a_nextFramePosition"]);
        };
        Object.defineProperty(MorphVerticeShaderLib.prototype, "sendShaderVariables",
            __decorate([
                wd.require(function (program, quadCmd, material) {
                    wd.assert(!!quadCmd.animation, wd.Log.info.FUNC_SHOULD("gameObject", "add MorphAnimation component"));
                })
            ], MorphVerticeShaderLib.prototype, "sendShaderVariables", Object.getOwnPropertyDescriptor(MorphVerticeShaderLib.prototype, "sendShaderVariables")));
        return MorphVerticeShaderLib;
    })(wd.ShaderLib);
    wd.MorphVerticeShaderLib = MorphVerticeShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MorphNormalShaderLib = (function (_super) {
        __extends(MorphNormalShaderLib, _super);
        function MorphNormalShaderLib() {
            _super.apply(this, arguments);
            this.type = "morphNormal";
        }
        MorphNormalShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        MorphNormalShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.NORMAL)) {
                var morphNormalData = quadCmd.buffers.getChild(wd.BufferDataType.NORMAL);
                this.sendAttributeData(program, "a_currentFrameNormal", morphNormalData[0]);
                this.sendAttributeData(program, "a_nextFrameNormal", morphNormalData[1]);
            }
        };
        MorphNormalShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_currentFrameNormal", "a_nextFrameNormal"]);
        };
        return MorphNormalShaderLib;
    })(wd.ShaderLib);
    wd.MorphNormalShaderLib = MorphNormalShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SkyboxShaderLib = (function (_super) {
        __extends(SkyboxShaderLib, _super);
        function SkyboxShaderLib() {
            _super.apply(this, arguments);
            this.type = "skybox";
        }
        SkyboxShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        SkyboxShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        SkyboxShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_samplerCube0"]);
        };
        return SkyboxShaderLib;
    })(wd.ShaderLib);
    wd.SkyboxShaderLib = SkyboxShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var EnvMapForBasicShaderLib = (function (_super) {
        __extends(EnvMapForBasicShaderLib, _super);
        function EnvMapForBasicShaderLib() {
            _super.apply(this, arguments);
        }
        EnvMapForBasicShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_normalMatrix", quadCmd.mMatrix.copy().invertTo3x3().transpose());
            this.sendUniformData(program, "u_cameraPos", wd.Director.getInstance().scene.camera.transform.position);
        };
        EnvMapForBasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_samplerCube0", "u_cameraPos", "u_normalMatrix"]);
            this.vsSourceBody = wd.ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        };
        EnvMapForBasicShaderLib.prototype.setEnvMapSource = function () {
            var vs = this.getVsChunk("envMap_forBasic"), fs = this.getFsChunk("envMap_forBasic");
            this.vsSourceTop = vs.top;
            this.vsSourceDefine = vs.define;
            this.vsSourceVarDeclare = vs.varDeclare;
            this.vsSourceFuncDeclare = vs.funcDeclare;
            this.vsSourceFuncDefine = vs.funcDefine;
            this.vsSourceBody += vs.body;
            this.setFsSource(fs);
        };
        return EnvMapForBasicShaderLib;
    })(wd.ShaderLib);
    wd.EnvMapForBasicShaderLib = EnvMapForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicEnvMapForBasicShaderLib = (function (_super) {
        __extends(BasicEnvMapForBasicShaderLib, _super);
        function BasicEnvMapForBasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "basic_envMap_forBasic";
        }
        BasicEnvMapForBasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        return BasicEnvMapForBasicShaderLib;
    })(wd.EnvMapForBasicShaderLib);
    wd.BasicEnvMapForBasicShaderLib = BasicEnvMapForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ReflectionForBasicShaderLib = (function (_super) {
        __extends(ReflectionForBasicShaderLib, _super);
        function ReflectionForBasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "reflection_forBasic";
        }
        ReflectionForBasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        ReflectionForBasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return ReflectionForBasicShaderLib;
    })(wd.EnvMapForBasicShaderLib);
    wd.ReflectionForBasicShaderLib = ReflectionForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RefractionForBasicShaderLib = (function (_super) {
        __extends(RefractionForBasicShaderLib, _super);
        function RefractionForBasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "refraction_forBasic";
        }
        RefractionForBasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        RefractionForBasicShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
        };
        RefractionForBasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_refractionRatio"]);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return RefractionForBasicShaderLib;
    })(wd.EnvMapForBasicShaderLib);
    wd.RefractionForBasicShaderLib = RefractionForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var FresnelForBasicShaderLib = (function (_super) {
        __extends(FresnelForBasicShaderLib, _super);
        function FresnelForBasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "fresnel_forBasic";
        }
        FresnelForBasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        FresnelForBasicShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
            this.sendUniformData(program, "u_reflectivity", material.reflectivity);
        };
        FresnelForBasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return FresnelForBasicShaderLib;
    })(wd.EnvMapForBasicShaderLib);
    wd.FresnelForBasicShaderLib = FresnelForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var EnvMapForLightShaderLib = (function (_super) {
        __extends(EnvMapForLightShaderLib, _super);
        function EnvMapForLightShaderLib() {
            _super.apply(this, arguments);
        }
        EnvMapForLightShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        EnvMapForLightShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_samplerCube0"]);
            this.vsSourceBody = wd.ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        };
        EnvMapForLightShaderLib.prototype.setEnvMapSource = function () {
            var vs = this.getVsChunk("envMap_forLight"), fs = this.getFsChunk("envMap_forLight");
            this.vsSourceTop = vs.top;
            this.vsSourceDefine = vs.define;
            this.vsSourceVarDeclare = vs.varDeclare;
            this.vsSourceFuncDeclare = vs.funcDeclare;
            this.vsSourceFuncDefine = vs.funcDefine;
            this.vsSourceBody += vs.body;
            this.setFsSource(fs);
        };
        return EnvMapForLightShaderLib;
    })(wd.ShaderLib);
    wd.EnvMapForLightShaderLib = EnvMapForLightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicEnvMapForLightShaderLib = (function (_super) {
        __extends(BasicEnvMapForLightShaderLib, _super);
        function BasicEnvMapForLightShaderLib() {
            _super.apply(this, arguments);
            this.type = "basic_forLight_envMap";
        }
        BasicEnvMapForLightShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        return BasicEnvMapForLightShaderLib;
    })(wd.EnvMapForLightShaderLib);
    wd.BasicEnvMapForLightShaderLib = BasicEnvMapForLightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ReflectionForLightShaderLib = (function (_super) {
        __extends(ReflectionForLightShaderLib, _super);
        function ReflectionForLightShaderLib() {
            _super.apply(this, arguments);
            this.type = "reflection_forLight";
        }
        ReflectionForLightShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        ReflectionForLightShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return ReflectionForLightShaderLib;
    })(wd.EnvMapForLightShaderLib);
    wd.ReflectionForLightShaderLib = ReflectionForLightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RefractionForLightShaderLib = (function (_super) {
        __extends(RefractionForLightShaderLib, _super);
        function RefractionForLightShaderLib() {
            _super.apply(this, arguments);
            this.type = "refraction_forLight";
        }
        RefractionForLightShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        RefractionForLightShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
        };
        RefractionForLightShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_refractionRatio"]);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return RefractionForLightShaderLib;
    })(wd.EnvMapForLightShaderLib);
    wd.RefractionForLightShaderLib = RefractionForLightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var FresnelForLightShaderLib = (function (_super) {
        __extends(FresnelForLightShaderLib, _super);
        function FresnelForLightShaderLib() {
            _super.apply(this, arguments);
            this.type = "fresnel_forLight";
        }
        FresnelForLightShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        FresnelForLightShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            if (material.reflectivity !== wd.ShaderChunk.NULL) {
                this.sendUniformData(program, "u_reflectivity", material.reflectivity);
            }
            else {
                this.sendUniformData(program, "u_reflectivity", wd.ShaderChunk.NULL);
                this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
            }
        };
        FresnelForLightShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);
            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        };
        return FresnelForLightShaderLib;
    })(wd.EnvMapForLightShaderLib);
    wd.FresnelForLightShaderLib = FresnelForLightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MapShaderLib = (function (_super) {
        __extends(MapShaderLib, _super);
        function MapShaderLib() {
            _super.apply(this, arguments);
        }
        MapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.TEXCOORD)) {
                this.sendAttributeData(program, "a_texCoord", quadCmd.buffers.getChild(wd.BufferDataType.TEXCOORD));
            }
        };
        MapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_texCoord"]);
            this.addUniformVariable(["u_sampler2D0", "u_sourceRegion", "u_repeatRegion"]);
            this._setMapSource();
        };
        MapShaderLib.prototype._setMapSource = function () {
            var vs = this.getVsChunk("map_forBasic"), fs = this.getFsChunk("map_forBasic");
            this.vsSourceTop = vs.top;
            this.vsSourceDefine = vs.define;
            this.vsSourceVarDeclare = vs.varDeclare;
            this.vsSourceFuncDeclare = vs.funcDeclare;
            this.vsSourceFuncDefine = vs.funcDefine;
            this.vsSourceBody = vs.body;
            this.setFsSource(fs);
        };
        return MapShaderLib;
    })(wd.ShaderLib);
    wd.MapShaderLib = MapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicMapShaderLib = (function (_super) {
        __extends(BasicMapShaderLib, _super);
        function BasicMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "map_forBasic";
        }
        BasicMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        return BasicMapShaderLib;
    })(wd.MapShaderLib);
    wd.BasicMapShaderLib = BasicMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MultiMapShaderLib = (function (_super) {
        __extends(MultiMapShaderLib, _super);
        function MultiMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "multi_map_forBasic";
        }
        MultiMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        MultiMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            this.sendUniformData(program, "u_combineMode", material.mapCombineMode);
            this.sendUniformData(program, "u_mixRatio", material.mapMixRatio);
        };
        MultiMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_sampler2D1", "u_combineMode", "u_mixRatio"]);
            this.fsSourceFuncDefine = this.getFsChunk().funcDefine;
            this.fsSourceBody = this.getFsChunk().body;
        };
        return MultiMapShaderLib;
    })(wd.MapShaderLib);
    wd.MultiMapShaderLib = MultiMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MirrorForBasicShaderLib = (function (_super) {
        __extends(MirrorForBasicShaderLib, _super);
        function MirrorForBasicShaderLib() {
            _super.apply(this, arguments);
            this.type = "mirror_forBasic";
        }
        MirrorForBasicShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        MirrorForBasicShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        MirrorForBasicShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_mirrorSampler"]);
        };
        return MirrorForBasicShaderLib;
    })(wd.ShaderLib);
    wd.MirrorForBasicShaderLib = MirrorForBasicShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var LightCommonShaderLib = (function (_super) {
        __extends(LightCommonShaderLib, _super);
        function LightCommonShaderLib() {
            _super.apply(this, arguments);
            this.type = "lightCommon";
        }
        LightCommonShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        LightCommonShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        LightCommonShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.setVsSource(this.getVsChunk("light_common.glsl"));
            this.setVsSource(this.getVsChunk(), "+");
            this.setFsSource(this.getFsChunk("light_common.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        };
        return LightCommonShaderLib;
    })(wd.ShaderLib);
    wd.LightCommonShaderLib = LightCommonShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var LightShaderLib = (function (_super) {
        __extends(LightShaderLib, _super);
        function LightShaderLib() {
            _super.apply(this, arguments);
            this.type = "light";
        }
        LightShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        LightShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_normalMatrix", quadCmd.mMatrix.copy().invertTo3x3().transpose());
            this.sendUniformData(program, "u_cameraPos", wd.Director.getInstance().scene.camera.transform.position);
            this.sendUniformData(program, "u_shininess", material.shininess);
            this.sendUniformData(program, "u_opacity", material.opacity);
            this._sendLightVariables(program);
        };
        LightShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_normalMatrix", "u_cameraPos", "u_shininess", "u_ambient", "u_opacity", "u_isBothSide"]);
            this._setLightDefinition(material);
        };
        LightShaderLib.prototype._sendLightVariables = function (program) {
            var scene = wd.Director.getInstance().scene, directionLights = scene.directionLights, ambientLight = scene.ambientLight, pointLights = scene.pointLights;
            if (ambientLight) {
                this.sendUniformData(program, "u_ambient", ambientLight.getComponent(wd.AmbientLight).color.toVector3());
            }
            if (pointLights) {
                this._sendPointLightVariables(program, pointLights);
            }
            if (directionLights) {
                this._sendDirectionLightVariables(program, directionLights);
            }
        };
        LightShaderLib.prototype._sendPointLightVariables = function (program, pointLights) {
            pointLights.forEach(function (pointLight, index) {
                var lightComponent = pointLight.getComponent(wd.PointLight);
                program.sendStructureData("u_pointLights[" + index + "].position", wd.VariableType.FLOAT_3, lightComponent.position);
                program.sendStructureData("u_pointLights[" + index + "].color", wd.VariableType.FLOAT_3, lightComponent.color.toVector3());
                program.sendStructureData("u_pointLights[" + index + "].intensity", wd.VariableType.FLOAT_1, lightComponent.intensity);
                program.sendStructureData("u_pointLights[" + index + "].range", wd.VariableType.FLOAT_1, lightComponent.range);
                program.sendStructureData("u_pointLights[" + index + "].constant", wd.VariableType.FLOAT_1, lightComponent.constant);
                program.sendStructureData("u_pointLights[" + index + "].linear", wd.VariableType.FLOAT_1, lightComponent.linear);
                program.sendStructureData("u_pointLights[" + index + "].quadratic", wd.VariableType.FLOAT_1, lightComponent.quadratic);
            });
        };
        LightShaderLib.prototype._sendDirectionLightVariables = function (program, directionLights) {
            var self = this;
            directionLights.forEach(function (directionLight, index) {
                var lightComponent = directionLight.getComponent(wd.DirectionLight);
                if (self._isZero(lightComponent.position)) {
                    program.sendStructureData("u_directionLights[" + index + "].position", wd.VariableType.FLOAT_3, wd.DirectionLight.defaultPosition);
                }
                else {
                    program.sendStructureData("u_directionLights[" + index + "].position", wd.VariableType.FLOAT_3, lightComponent.position);
                }
                program.sendStructureData("u_directionLights[" + index + "].color", wd.VariableType.FLOAT_3, lightComponent.color.toVector3());
                program.sendStructureData("u_directionLights[" + index + "].intensity", wd.VariableType.FLOAT_1, lightComponent.intensity);
            });
        };
        LightShaderLib.prototype._isZero = function (position) {
            var val = position.values;
            return val[0] === 0 && val[1] === 0 && val[2] === 0;
        };
        LightShaderLib.prototype._setLightDefinition = function (material) {
            var scene = wd.Director.getInstance().scene, directionLights = scene.directionLights, pointLights = scene.pointLights, direction_lights_count = 0, point_lights_count = 0;
            if (directionLights) {
                this.addUniformVariable(["u_directionLights"]);
                direction_lights_count = directionLights.getCount();
            }
            if (pointLights) {
                this.addUniformVariable(["u_pointLights"]);
                point_lights_count = pointLights.getCount();
            }
            this._addDefine(this.vsSourceDefineList, direction_lights_count, point_lights_count);
            this._addDefine(this.fsSourceDefineList, direction_lights_count, point_lights_count);
            if (material.side === wd.Side.BOTH) {
                this.fsSourceDefineList.addChildren([{
                        name: "BOTH_SIDE"
                    }]);
            }
        };
        LightShaderLib.prototype._addDefine = function (list, direction_lights_count, point_lights_count) {
            list.addChildren([{
                    name: "DIRECTION_LIGHTS_COUNT",
                    value: direction_lights_count
                }, {
                    name: "POINT_LIGHTS_COUNT",
                    value: point_lights_count
                }]);
        };
        return LightShaderLib;
    })(wd.ShaderLib);
    wd.LightShaderLib = LightShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var LightEndShaderLib = (function (_super) {
        __extends(LightEndShaderLib, _super);
        function LightEndShaderLib() {
            _super.apply(this, arguments);
            this.type = "lightEnd";
        }
        LightEndShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        LightEndShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        return LightEndShaderLib;
    })(wd.ShaderLib);
    wd.LightEndShaderLib = LightEndShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var LightMapShaderLib = (function (_super) {
        __extends(LightMapShaderLib, _super);
        function LightMapShaderLib() {
            _super.apply(this, arguments);
        }
        LightMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            if (quadCmd.buffers.hasChild(wd.BufferDataType.TEXCOORD)) {
                this.sendAttributeData(program, "a_texCoord", quadCmd.buffers.getChild(wd.BufferDataType.TEXCOORD));
            }
        };
        LightMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_texCoord"]);
        };
        return LightMapShaderLib;
    })(wd.ShaderLib);
    wd.LightMapShaderLib = LightMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DiffuseMapShaderLib = (function (_super) {
        __extends(DiffuseMapShaderLib, _super);
        function DiffuseMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "diffuseMap";
        }
        DiffuseMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        DiffuseMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable([
                wd.VariableNameTable.getVariableName("diffuseMap"),
                "u_sourceRegion", "u_repeatRegion"
            ]);
        };
        return DiffuseMapShaderLib;
    })(wd.LightMapShaderLib);
    wd.DiffuseMapShaderLib = DiffuseMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SpecularMapShaderLib = (function (_super) {
        __extends(SpecularMapShaderLib, _super);
        function SpecularMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "specularMap";
        }
        SpecularMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        SpecularMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable([
                wd.VariableNameTable.getVariableName("specularMap")
            ]);
        };
        return SpecularMapShaderLib;
    })(wd.LightMapShaderLib);
    wd.SpecularMapShaderLib = SpecularMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var NormalMapShaderLib = (function (_super) {
        __extends(NormalMapShaderLib, _super);
        function NormalMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "normalMap";
        }
        NormalMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        NormalMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            _super.prototype.sendShaderVariables.call(this, program, quadCmd, material);
            if (quadCmd.buffers.hasChild(wd.BufferDataType.TANGENT)) {
                this.sendAttributeData(program, "a_tangent", quadCmd.buffers.getChild(wd.BufferDataType.TANGENT));
            }
        };
        NormalMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addAttributeVariable(["a_tangent"]);
            this.addUniformVariable([
                wd.VariableNameTable.getVariableName("normalMap")
            ]);
        };
        return NormalMapShaderLib;
    })(wd.LightMapShaderLib);
    wd.NormalMapShaderLib = NormalMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var NoDiffuseMapShaderLib = (function (_super) {
        __extends(NoDiffuseMapShaderLib, _super);
        function NoDiffuseMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "noDiffuseMap";
        }
        NoDiffuseMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        NoDiffuseMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_diffuse", material.color.toVector3());
        };
        NoDiffuseMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_diffuse"]);
        };
        return NoDiffuseMapShaderLib;
    })(wd.ShaderLib);
    wd.NoDiffuseMapShaderLib = NoDiffuseMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var NoSpecularMapShaderLib = (function (_super) {
        __extends(NoSpecularMapShaderLib, _super);
        function NoSpecularMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "noSpecularMap";
        }
        NoSpecularMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        NoSpecularMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_specular", material.specular.toVector3());
        };
        NoSpecularMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable(["u_specular"]);
        };
        return NoSpecularMapShaderLib;
    })(wd.ShaderLib);
    wd.NoSpecularMapShaderLib = NoSpecularMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var NoNormalMapShaderLib = (function (_super) {
        __extends(NoNormalMapShaderLib, _super);
        function NoNormalMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "noNormalMap";
        }
        NoNormalMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        NoNormalMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        return NoNormalMapShaderLib;
    })(wd.ShaderLib);
    wd.NoNormalMapShaderLib = NoNormalMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BuildShadowMapShaderLib = (function (_super) {
        __extends(BuildShadowMapShaderLib, _super);
        function BuildShadowMapShaderLib() {
            _super.apply(this, arguments);
        }
        BuildShadowMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.setFsSource(this.getFsChunk("commonBuildShadowMap_fragment.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        };
        return BuildShadowMapShaderLib;
    })(wd.ShaderLib);
    wd.BuildShadowMapShaderLib = BuildShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BuildTwoDShadowMapShaderLib = (function (_super) {
        __extends(BuildTwoDShadowMapShaderLib, _super);
        function BuildTwoDShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "buildTwoDShadowMap";
        }
        BuildTwoDShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        BuildTwoDShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_vpMatrixFromLight", material.buildTwoDShadowMapData.vpMatrixFromLight);
        };
        BuildTwoDShadowMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        };
        return BuildTwoDShadowMapShaderLib;
    })(wd.BuildShadowMapShaderLib);
    wd.BuildTwoDShadowMapShaderLib = BuildTwoDShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BuildCubemapShadowMapShaderLib = (function (_super) {
        __extends(BuildCubemapShadowMapShaderLib, _super);
        function BuildCubemapShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "buildCubemapShadowMap";
        }
        BuildCubemapShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        BuildCubemapShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            this.sendUniformData(program, "u_lightPos", material.buildCubemapShadowMapData.lightPos);
            this.sendUniformData(program, "u_farPlane", material.buildCubemapShadowMapData.farPlane);
        };
        BuildCubemapShadowMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this.addUniformVariable([
                "u_lightPos", "u_farPlane"
            ]);
        };
        return BuildCubemapShadowMapShaderLib;
    })(wd.BuildShadowMapShaderLib);
    wd.BuildCubemapShadowMapShaderLib = BuildCubemapShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TotalShadowMapShaderLib = (function (_super) {
        __extends(TotalShadowMapShaderLib, _super);
        function TotalShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "totalShadowMap";
        }
        TotalShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        TotalShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        return TotalShadowMapShaderLib;
    })(wd.ShaderLib);
    wd.TotalShadowMapShaderLib = TotalShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ShadowMapShaderLib = (function (_super) {
        __extends(ShadowMapShaderLib, _super);
        function ShadowMapShaderLib() {
            _super.apply(this, arguments);
        }
        ShadowMapShaderLib.prototype.setShaderDefinition = function (quadCmd, material) {
            _super.prototype.setShaderDefinition.call(this, quadCmd, material);
            this._setShadowMapSource();
        };
        ShadowMapShaderLib.prototype._setShadowMapSource = function () {
            var scene = wd.Director.getInstance().scene, twoDShadowMapCount = scene.directionLights ? scene.directionLights.filter(function (light) {
                return light.getComponent(wd.DirectionLight).castShadow;
            }).getCount() : 0, cubemapShadowMapCount = scene.pointLights ? scene.pointLights.filter(function (light) {
                return light.getComponent(wd.PointLight).castShadow;
            }).getCount() : 0;
            if (scene.shadowMap.softType === wd.ShadowMapSoftType.PCF) {
                this.fsSourceDefineList.addChildren([{
                        name: "SHADOWMAP_TYPE_PCF"
                    }]);
            }
            this.vsSourceDefineList.addChild({
                name: "TWOD_SHADOWMAP_COUNT",
                value: twoDShadowMapCount
            });
            this.fsSourceDefineList.addChildren([
                {
                    name: "TWOD_SHADOWMAP_COUNT",
                    value: twoDShadowMapCount
                },
                {
                    name: "CUBEMAP_SHADOWMAP_COUNT",
                    value: cubemapShadowMapCount
                },
            ]);
        };
        return ShadowMapShaderLib;
    })(wd.ShaderLib);
    wd.ShadowMapShaderLib = ShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDShadowMapShaderLib = (function (_super) {
        __extends(TwoDShadowMapShaderLib, _super);
        function TwoDShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "twoDShadowMap";
        }
        TwoDShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        TwoDShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            material.twoDShadowMapDatas.forEach(function (data, index) {
                program.sendStructureData("u_vpMatrixFromLight[" + index + "]", wd.VariableType.FLOAT_MAT4, data.vpMatrixFromLight);
                program.sendStructureData("u_twoDShadowSize[" + index + "]", wd.VariableType.FLOAT_2, data.shadowSize);
                program.sendStructureData("u_twoDShadowBias[" + index + "]", wd.VariableType.FLOAT_1, data.shadowBias);
                program.sendStructureData("u_twoDShadowDarkness[" + index + "]", wd.VariableType.FLOAT_1, data.shadowDarkness);
                program.sendStructureData("u_twoDLightPos[" + index + "]", wd.VariableType.FLOAT_3, data.lightPos);
            });
        };
        return TwoDShadowMapShaderLib;
    })(wd.ShadowMapShaderLib);
    wd.TwoDShadowMapShaderLib = TwoDShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapShadowMapShaderLib = (function (_super) {
        __extends(CubemapShadowMapShaderLib, _super);
        function CubemapShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "cubemapShadowMap";
        }
        CubemapShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        CubemapShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
            material.cubemapShadowMapDatas.forEach(function (data, index) {
                program.sendStructureData("u_cubemapLightPos[" + index + "]", wd.VariableType.FLOAT_3, data.lightPos);
                program.sendStructureData("u_farPlane[" + index + "]", wd.VariableType.FLOAT_1, data.farPlane);
                program.sendStructureData("u_cubemapShadowBias[" + index + "]", wd.VariableType.FLOAT_1, data.shadowBias);
                program.sendStructureData("u_cubemapShadowDarkness[" + index + "]", wd.VariableType.FLOAT_1, data.shadowDarkness);
            });
        };
        return CubemapShadowMapShaderLib;
    })(wd.ShadowMapShaderLib);
    wd.CubemapShadowMapShaderLib = CubemapShadowMapShaderLib;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var NoShadowMapShaderLib = (function (_super) {
        __extends(NoShadowMapShaderLib, _super);
        function NoShadowMapShaderLib() {
            _super.apply(this, arguments);
            this.type = "noShadowMap";
        }
        NoShadowMapShaderLib.create = function () {
            var obj = new this();
            return obj;
        };
        NoShadowMapShaderLib.prototype.sendShaderVariables = function (program, quadCmd, material) {
        };
        return NoShadowMapShaderLib;
    })(wd.ShaderLib);
    wd.NoShadowMapShaderLib = NoShadowMapShaderLib;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ShaderChunk = (function () {
        function ShaderChunk() {
        }
        ShaderChunk.empty = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
        ShaderChunk.NULL = -1.0;
        ShaderChunk.morphNormal_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec3 a_normal = a_currentFrameNormal + (a_nextFrameNormal - a_currentFrameNormal) * u_interpolation;\n", };
        ShaderChunk.morphVertice_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec3 a_position = a_currentFramePosition + (a_nextFramePosition - a_currentFramePosition) * u_interpolation;\n", };
        ShaderChunk.common_define = { top: "", define: "#define NULL -1.0\n", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.common_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.common_function = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n", body: "", };
        ShaderChunk.common_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.highp_fragment = { top: "precision highp float;\nprecision highp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.lowp_fragment = { top: "precision lowp float;\nprecision lowp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.mediump_fragment = { top: "precision mediump float;\nprecision mediump int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.basicEnd_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n", };
        ShaderChunk.basic_fragment = { top: "", define: "", varDeclare: "varying vec3 v_color;\n", funcDeclare: "", funcDefine: "", body: "vec4 totalColor = vec4(v_color, 1.0);\n", };
        ShaderChunk.basic_vertex = { top: "", define: "", varDeclare: "varying vec3 v_color;\n", funcDeclare: "", funcDefine: "", body: "v_color = a_color;\n", };
        ShaderChunk.lightCommon_fragment = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.lightCommon_vertex = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", funcDeclare: "", funcDefine: "", body: "v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));\n", };
        ShaderChunk.lightEnd_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n", };
        ShaderChunk.light_common = { top: "", define: "", varDeclare: "", funcDeclare: "vec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n", funcDefine: "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n    //return vec3(0.0) - lightPos;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n", body: "", };
        ShaderChunk.light_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "float getBlinnPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n    vec3 halfAngle = normalize(lightDir + viewDir);\n    float blinnTerm = dot(normal, halfAngle);\n\n    blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n    blinnTerm = dotResultBetweenNormAndLight < 0.0 ? 0.0 : blinnTerm;\n    blinnTerm = pow(blinnTerm, shininess);\n\n	return blinnTerm;\n}\n\nvec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n    vec3 materialDiffuse = getMaterialDiffuse();\n    vec3 materialSpecular = getMaterialSpecular();\n\n    float dotResultBetweenNormAndLight = dot(normal, lightDir);\n    float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n\n    vec3 ambientColor = u_ambient * materialDiffuse;\n\n    vec3 diffuseColor = diff * color * materialDiffuse * intensity;\n\n\n    float spec = getBlinnPhongShininess(u_shininess, normal, lightDir, viewDir, dotResultBetweenNormAndLight);\n\n    vec3 specularColor = spec * materialSpecular * intensity;\n\n    return  ambientColor + attenuation * (diffuseColor + specularColor);\n}\n\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n    //lightDir is not normalize computing distance\n    float distance = length(lightDir);\n\n    float attenuation = 0.0;\n    if(distance < light.range)\n    {\n        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n    }\n\n    lightDir = normalize(lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n    float attenuation = 1.0;\n\n    lightDir = normalize(lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvec3 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec3 totalLight = vec3(0.0);\n\n    #if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);\n       }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);\n       }\n    #endif\n\n    return totalLight;\n}\n", body: "vec3 normal = normalize(getNormal());\n\n	#ifdef BOTH_SIDE\n		normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n	#endif\n\n    vec3 viewDir = normalize(getViewDir());\n\n    vec4 totalColor = vec4(calcTotalLight(normal, viewDir), 1.0);\n\n    totalColor *= vec4(getShadowVisibility(), 1.0);\n", };
        ShaderChunk.light_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n", };
        ShaderChunk.map_forBasic_fragment = { top: "", define: "", varDeclare: "varying vec2 v_mapCoord;\n", funcDeclare: "", funcDefine: "", body: "totalColor *= texture2D(u_sampler2D0, v_mapCoord);\n", };
        ShaderChunk.map_forBasic_vertex = { top: "", define: "", varDeclare: "varying vec2 v_mapCoord;\n", funcDeclare: "", funcDefine: "", body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_mapCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n", };
        ShaderChunk.multi_map_forBasic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec4 getMapColor(){\n            vec4 color0 = texture2D(u_sampler2D0, v_mapCoord);\n            vec4 color1 = texture2D(u_sampler2D1, v_mapCoord);\n            if(u_combineMode == 0){\n                return mix(color0, color1, u_mixRatio);\n            }\n            else if(u_combineMode == 1){\n                return color0 * color1;\n            }\n            else if(u_combineMode == 2){\n                return color0 + color1;\n            }\n		}\n", body: "totalColor *= getMapColor();\n", };
        ShaderChunk.mirror_forBasic_fragment = { top: "", define: "", varDeclare: "varying vec4 v_mirrorCoord;\n", funcDeclare: "", funcDefine: "//todo add more blend way to mix mirror color and textureColor\n		float blendOverlay(float base, float blend) {\n			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n		}\n		vec4 getMirrorColor(in vec4 materialColor){\n			vec4 color = texture2DProj(u_mirrorSampler, v_mirrorCoord);\n\n			color = vec4(blendOverlay(materialColor.r, color.r), blendOverlay(materialColor.g, color.g), blendOverlay(materialColor.b, color.b), 1.0);\n\n			return color;\n		}\n", body: "totalColor = getMirrorColor(totalColor);\n", };
        ShaderChunk.mirror_forBasic_vertex = { top: "", define: "", varDeclare: "varying vec4 v_mirrorCoord;\n", funcDeclare: "", funcDefine: "", body: "mat4 textureMatrix = mat4(\n                        0.5, 0.0, 0.0, 0.0,\n                        0.0, 0.5, 0.0, 0.0,\n                        0.0, 0.0, 0.5, 0.0,\n                        0.5, 0.5, 0.5, 1.0\n);\n\nv_mirrorCoord = textureMatrix * gl_Position;\n", };
        ShaderChunk.skybox_fragment = { top: "", define: "", varDeclare: "varying vec3 v_dir;\n", funcDeclare: "", funcDefine: "", body: "gl_FragColor = textureCube(u_samplerCube0, v_dir);\n", };
        ShaderChunk.skybox_vertex = { top: "", define: "", varDeclare: "varying vec3 v_dir;\n", funcDeclare: "", funcDefine: "", body: "vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * vec4(a_position, 1.0);\n\n    gl_Position = pos.xyww;\n\n    v_dir = a_position;\n", };
        ShaderChunk.diffuseMap_fragment = { top: "", define: "", varDeclare: "varying vec2 v_diffuseMapTexCoord;\n", funcDeclare: "", funcDefine: "vec3 getMaterialDiffuse() {\n        return vec3(texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord));\n    }\n", body: "", };
        ShaderChunk.diffuseMap_vertex = { top: "", define: "", varDeclare: "varying vec2 v_diffuseMapTexCoord;\n", funcDeclare: "", funcDefine: "", body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_diffuseMapTexCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n    //v_diffuseMapTexCoord = a_texCoord;\n", };
        ShaderChunk.noDiffuseMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n", body: "", };
        ShaderChunk.noNormalMap_fragment = { top: "", define: "", varDeclare: "varying vec3 v_normal;\n", funcDeclare: "vec3 getNormal();\n\n", funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDirByLightPos(u_directionLights[x].position);\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\nvec3 getNormal(){\n    return v_normal;\n}\n\n", body: "", };
        ShaderChunk.noNormalMap_vertex = { top: "", define: "", varDeclare: "varying vec3 v_normal;\n", funcDeclare: "", funcDefine: "", body: "//v_normal = normalize( vec3(u_normalMatrix * vec4(a_normal, 1.0)));\n    v_normal = normalize( u_normalMatrix * a_normal);\n", };
        ShaderChunk.noSpecularMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getMaterialSpecular() {\n        return u_specular;\n    }\n", body: "", };
        ShaderChunk.normalMap_fragment = { top: "", define: "", varDeclare: "varying vec2 v_normalMapTexCoord;\nvarying vec3 v_viewDir;\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n", funcDeclare: "vec3 getNormal();\n\nvec3 getLightDir(vec3 lightPos);\n\n", funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_pointLightDir[x];\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_directionLightDir[x];\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return v_viewDir;\n}\nvec3 getNormal(){\n        // Obtain normal from normal map in range [0,1]\n        vec3 normal = texture2D(u_normalMapSampler, v_normalMapTexCoord).rgb;\n\n        // Transform normal vector to range [-1,1]\n        return normalize(normal * 2.0 - 1.0);  // this normal is in tangent space\n}\n", body: "", };
        ShaderChunk.normalMap_vertex = { top: "", define: "", varDeclare: "varying vec2 v_normalMapTexCoord;\n	varying vec3 v_viewDir;\n\n\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n", funcDeclare: "", funcDefine: "mat3 computeTBN(){\n            //vec3 T = normalize(normalMatrix * tangent);\n            //vec3 B = normalize(normalMatrix * bitangent);\n            //vec3 N = normalize(normalMatrix * normal);\n\n            vec3 T = normalize(u_normalMatrix * a_tangent);\n            vec3 N = normalize(u_normalMatrix * a_normal);\n            // re-orthogonalize T with respect to N\n            T = normalize(T - dot(T, N) * N);\n            // then retrieve perpendicular vector B with the cross product of T and N\n            vec3 B = cross(T, N);\n\n\n            return transpose(mat3(T, B, N));\n        }\n", body: "mat3 TBN = computeTBN();\n\n    //v_tangentLightPos = TBN * light.position;\n    //v_tangentCameraPos  = TBN * u_cameraPos;\n    //v_tangentPos  = TBN * v_position;\n\n\n    vec3 tangentPosition = TBN * vec3(u_mMatrix * vec4(a_position, 1.0));\n\n    v_normalMapTexCoord = a_texCoord;\n\n    v_viewDir = normalize(TBN * u_cameraPos - tangentPosition);\n\n\n#if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            //not normalize for computing distance\n            v_pointLightDir[i] = TBN * getPointLightDirByLightPos(u_pointLights[i].position, tangentPosition);\n       }\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            v_directionLightDir[i] = normalize(- TBN * getDirectionLightDirByLightPos(u_directionLights[i].position));\n       }\n#endif\n\n", };
        ShaderChunk.specularMap_fragment = { top: "", define: "", varDeclare: "varying vec2 v_specularMapTexCoord;\n", funcDeclare: "", funcDefine: "vec3 getMaterialSpecular() {\n        return vec3(texture2D(u_specularMapSampler, v_specularMapTexCoord));\n    }\n", body: "", };
        ShaderChunk.specularMap_vertex = { top: "", define: "", varDeclare: "varying vec2 v_specularMapTexCoord;\n", funcDeclare: "", funcDefine: "", body: "v_specularMapTexCoord = a_texCoord;\n", };
        ShaderChunk.buildCubemapShadowMap_fragment = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n", funcDeclare: "", funcDefine: "", body: "\n// get distance between fragment and light source\n    float lightDistance = length(v_worldPosition - u_lightPos);\n\n    // map to [0,1] range by dividing by farPlane\n    lightDistance = lightDistance / u_farPlane;\n\n\ngl_FragData[0] = packDepth(lightDistance);\n\n\n//gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);\n//gl_FragData[0] = vec4(lightDistance, 1.0, 1.0, 1.0);\n", };
        ShaderChunk.buildCubemapShadowMap_vertex = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n", funcDeclare: "", funcDefine: "", body: "v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));\n    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n", };
        ShaderChunk.buildTwoDShadowMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragData[0] = packDepth(gl_FragCoord.z);\n", };
        ShaderChunk.buildTwoDShadowMap_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_Position = u_vpMatrixFromLight * u_mMatrix * vec4(a_position, 1.0);\n//gl_Position = u_pMatrix* u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n", };
        ShaderChunk.commonBuildShadowMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "// Packing a float in GLSL with multiplication and mod\nvec4 packDepth(in float depth) {\n    const vec4 bit_shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);\n    const vec4 bit_mask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);\n    // combination of mod and multiplication and division works better\n    vec4 res = mod(depth * bit_shift * vec4(255), vec4(256) ) / vec4(255);\n    res -= res.xxyz * bit_mask;\n\n    return res;\n}\n", body: "", };
        ShaderChunk.cubemapShadowMap_fragment = { top: "", define: "", varDeclare: "uniform samplerCube u_cubemapShadowMapSampler[ CUBEMAP_SHADOWMAP_COUNT ];\n	uniform float u_cubemapShadowDarkness[ CUBEMAP_SHADOWMAP_COUNT ];\n	uniform float u_cubemapShadowBias[ CUBEMAP_SHADOWMAP_COUNT ];\n	uniform float u_farPlane[ CUBEMAP_SHADOWMAP_COUNT ];\n	uniform vec3 u_cubemapLightPos[ CUBEMAP_SHADOWMAP_COUNT ];\n", funcDeclare: "", funcDefine: "// PCF\nfloat getCubemapShadowVisibilityByPCF(float currentDepth, vec3 fragToLight, samplerCube cubemapShadowMapSampler, float shadowBias, float farPlane, float shadowDarkness){\n    //only support in opengl es 3.0+\n    //vec3 sampleOffsetDirections[20] = vec3[]\n    //(\n       //vec3( 1,  1,  1), vec3( 1, -1,  1), vec3(-1, -1,  1), vec3(-1,  1,  1),\n       //vec3( 1,  1, -1), vec3( 1, -1, -1), vec3(-1, -1, -1), vec3(-1,  1, -1),\n       //vec3( 1,  1,  0), vec3( 1, -1,  0), vec3(-1, -1,  0), vec3(-1,  1,  0),\n       //vec3( 1,  0,  1), vec3(-1,  0,  1), vec3( 1,  0, -1), vec3(-1,  0, -1),\n       //vec3( 0,  1,  1), vec3( 0, -1,  1), vec3( 0, -1, -1), vec3( 0,  1, -1)\n    //);\n\n    vec3 sampleOffsetDirections[20];\n\n    sampleOffsetDirections[0] = vec3( 1,  1,  1);\n    sampleOffsetDirections[1] = vec3( 1,  -1,  1);\n    sampleOffsetDirections[2] = vec3( -1,  -1,  1);\n    sampleOffsetDirections[3] = vec3( -1,  1,  1);\n\n    sampleOffsetDirections[4] = vec3( 1,  1,  -1);\n    sampleOffsetDirections[5] = vec3( 1,  -1,  -1);\n    sampleOffsetDirections[6] = vec3( -1,  -1,  -1);\n    sampleOffsetDirections[7] = vec3( -1,  1,  -1);\n\n    sampleOffsetDirections[8] = vec3( 1,  1,  0);\n    sampleOffsetDirections[9] = vec3( 1,  -1,  0);\n    sampleOffsetDirections[10] = vec3( -1,  -1,  0);\n    sampleOffsetDirections[11] = vec3( -1,  1,  0);\n\n    sampleOffsetDirections[12] = vec3( 1,  0,  1);\n    sampleOffsetDirections[13] = vec3( -1,  0,  1);\n    sampleOffsetDirections[14] = vec3( 1,  0,  -1);\n    sampleOffsetDirections[15] = vec3( -1,  0,  -1);\n\n    sampleOffsetDirections[16] = vec3( 0,  1,  1);\n    sampleOffsetDirections[17] = vec3( 0,  -1,  1);\n    sampleOffsetDirections[18] = vec3( 0,  -1,  -1);\n    sampleOffsetDirections[19] = vec3( 0,  1,  -1);\n\n    float shadow = 0.0;\n    int samples = 20;\n\n    //float diskRadius = 0.00000;\n    //Another interesting trick we can apply here is that we can change the diskRadius based on how far the viewer is away from a fragment; this way we can increase the offset radius by the distance to the viewer, making the shadows softer when far away and sharper when close by.\n    float viewDistance = length(u_cameraPos - v_worldPosition);\n    float diskRadius = (1.0 + (viewDistance / farPlane)) / 25.0;\n\n    //for(int i = 0; i < samples; ++i)\n    for(int i = 0; i < 20; ++i)\n    {\n        float pcfDepth = unpackDepth(textureCube(cubemapShadowMapSampler, fragToLight + sampleOffsetDirections[i] * diskRadius));\n        pcfDepth *= farPlane;   // Undo mapping [0;1]\n        shadow += currentDepth - shadowBias > pcfDepth  ? shadowDarkness : 1.0;\n    }\n    shadow /= float(samples);\n\n    return shadow;\n}\n\n\nfloat getCubemapShadowVisibility(vec3 lightDir, samplerCube cubemapShadowMapSampler, vec3 lightPos, float farPlane, float shadowBias, float  shadowDarkness) {\n// Get vector between fragment position and light position\n    vec3 fragToLight= v_worldPosition - lightPos;\n    // Use the light to fragment vector to sample from the depth map\n    // Now get current linear depth as the length between the fragment and light position\n    float currentDepth = length(fragToLight);\n\n    #if defined(SHADOWMAP_TYPE_PCF)\n    return getCubemapShadowVisibilityByPCF(currentDepth, fragToLight, cubemapShadowMapSampler, getShadowBias(lightDir, shadowBias), farPlane, shadowDarkness);\n    #endif\n\n    float closestDepth = unpackDepth(textureCube(cubemapShadowMapSampler, fragToLight));\n\n    // It is currently in linear range between [0,1]. Re-transform back to original value\n    closestDepth *= farPlane;\n\n\n    return float(currentDepth > closestDepth + getShadowBias(lightDir, shadowBias) ? shadowDarkness : 1.0);\n}\n", body: "", };
        ShaderChunk.noShadowMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n", body: "", };
        ShaderChunk.totalShadowMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "float getShadowBias(vec3 lightDir, float shadowBias);\nfloat unpackDepth(vec4 rgbaDepth);\n", funcDefine: "float getShadowBias(vec3 lightDir, float shadowBias){\n    float bias = shadowBias;\n\n    if(shadowBias == NULL){\n        bias = 0.005;\n    }\n\n\n     /*!\n     A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:\n     */\n\n     return max(bias * (1.0 - dot(normalize(getNormal()), lightDir)), bias);\n\n    //return bias;\n}\n\nfloat unpackDepth(vec4 rgbaDepth) {\n    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);\n    return dot(rgbaDepth, bitShift);\n}\n\nvec3 getShadowVisibility() {\n    vec3 shadowColor = vec3(1.0);\n    vec3 twoDLightDir = vec3(0.0);\n    vec3 cubemapLightDir = vec3(0.0);\n\n\n    //to normalMap, the lightDir use the origin one instead of normalMap's lightDir here(the lightDir is used for computing shadowBias, the origin one is enough for it)\n\n    #if TWOD_SHADOWMAP_COUNT > 0\n	for( int i = 0; i < TWOD_SHADOWMAP_COUNT; i ++ ) {\n        twoDLightDir = getDirectionLightDirByLightPos(u_twoDLightPos[i]);\n\n	////if is opposite to direction of light rays, no shadow\n\n        shadowColor *= getTwoDShadowVisibility(twoDLightDir, u_twoDShadowMapSampler[i], v_positionFromLight[i], u_twoDShadowBias[i], u_twoDShadowDarkness[i], u_twoDShadowSize[i]);\n	}\n	#endif\n\n\n	#if CUBEMAP_SHADOWMAP_COUNT > 0\n	for( int i = 0; i < CUBEMAP_SHADOWMAP_COUNT; i ++ ) {\n        cubemapLightDir = getPointLightDirByLightPos(u_cubemapLightPos[i]);\n\n	////if is opposite to direction of light rays, no shadow\n\n        shadowColor *= getCubemapShadowVisibility(cubemapLightDir, u_cubemapShadowMapSampler[i], u_cubemapLightPos[i], u_farPlane[i], u_cubemapShadowBias[i], u_cubemapShadowDarkness[i]);\n	}\n	#endif\n\n	return shadowColor;\n}\n\n", body: "", };
        ShaderChunk.twoDShadowMap_fragment = { top: "", define: "", varDeclare: "varying vec4 v_positionFromLight[ TWOD_SHADOWMAP_COUNT ];\n	uniform sampler2D u_twoDShadowMapSampler[ TWOD_SHADOWMAP_COUNT ];\n	uniform float u_twoDShadowDarkness[ TWOD_SHADOWMAP_COUNT ];\n	uniform float u_twoDShadowBias[ TWOD_SHADOWMAP_COUNT ];\n	uniform vec2 u_twoDShadowSize[ TWOD_SHADOWMAP_COUNT ];\n	uniform vec3 u_twoDLightPos[ TWOD_SHADOWMAP_COUNT ];\n", funcDeclare: "", funcDefine: "// PCF\nfloat getTwoDShadowVisibilityByPCF(float currentDepth, vec2 shadowCoord, sampler2D twoDShadowMapSampler, float shadowBias, float shadowDarkness, vec2 shadowMapSize){\n\n    float shadow = 0.0;\n    vec2 texelSize = vec2(1.0 / shadowMapSize[0], 1.0 / shadowMapSize[1]);\n\n    for(int x = -1; x <= 1; ++x)\n    {\n        for(int y = -1; y <= 1; ++y)\n        {\n            float pcfDepth = unpackDepth(texture2D(twoDShadowMapSampler, shadowCoord + vec2(x, y) * texelSize));\n            shadow += currentDepth - shadowBias > pcfDepth  ? shadowDarkness : 1.0;\n        }\n    }\n    shadow /= 9.0;\n\n    return shadow;\n}\n\n\n\nfloat getTwoDShadowVisibility(vec3 lightDir, sampler2D twoDShadowMapSampler, vec4 v_positionFromLight, float shadowBias, float shadowDarkness, vec2 shadowSize) {\n    //project texture\n    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;\n    //vec3 shadowCoord = vec3(0.5, 0.5, 0.5);\n\n    #ifdef SHADOWMAP_TYPE_PCF\n    // Percentage-close filtering\n    // (9 pixel kernel)\n    return getTwoDShadowVisibilityByPCF(shadowCoord.z, shadowCoord.xy, twoDShadowMapSampler, getShadowBias(lightDir, shadowBias), shadowDarkness, shadowSize);\n\n    #else\n    return shadowCoord.z > unpackDepth(texture2D(twoDShadowMapSampler, shadowCoord.xy)) + getShadowBias(lightDir, shadowBias) ? shadowDarkness : 1.0;\n    #endif\n}\n", body: "", };
        ShaderChunk.twoDShadowMap_vertex = { top: "", define: "", varDeclare: "varying vec4 v_positionFromLight[ TWOD_SHADOWMAP_COUNT ];\nuniform mat4 u_vpMatrixFromLight[ TWOD_SHADOWMAP_COUNT ];\n", funcDeclare: "", funcDefine: "", body: "for( int i = 0; i < TWOD_SHADOWMAP_COUNT; i ++ ) {\n    v_positionFromLight[i] = u_vpMatrixFromLight[i] * vec4(v_worldPosition, 1.0);\n	}\n", };
        ShaderChunk.basic_envMap_forBasic_fragment = { top: "", define: "", varDeclare: "varying vec3 v_dir;\n", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, v_dir);\n", };
        ShaderChunk.basic_envMap_forBasic_vertex = { top: "", define: "", varDeclare: "varying vec3 v_dir;\n", funcDeclare: "", funcDefine: "", body: "v_dir = a_position;\n", };
        ShaderChunk.envMap_forBasic_fragment = { top: "", define: "", varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n", funcDeclare: "", funcDefine: "", body: "vec3 inDir = normalize(v_position - u_cameraPos);\n", };
        ShaderChunk.envMap_forBasic_vertex = { top: "", define: "", varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n", funcDeclare: "", funcDefine: "", body: "v_normal = normalize( u_normalMatrix * a_normal);\n    v_position = vec3(u_mMatrix * vec4(a_position, 1.0));\n", };
        ShaderChunk.fresnel_forBasic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){\n    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);\n    float fresnelPower = 5.0;\n    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);\n\n    return ratio / 100.0;\n}\nvec4 getEnvMapTotalColor(vec3 inDir, vec3 normal){\n    vec3 reflectDir = reflect(inDir, normal);\n    vec3 refractDir = refract(inDir, normal, u_refractionRatio);\n\n    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);\n    vec4 refractColor = textureCube(u_samplerCube0, refractDir);\n\n    vec4 totalColor = vec4(0.0);\n\n	if(u_reflectivity != NULL){\n        totalColor = mix(reflectColor, refractColor, u_reflectivity);\n	}\n	else{\n        totalColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));\n	}\n\n	return totalColor;\n}\n", body: "totalColor *= getEnvMapTotalColor(inDir, normalize(v_normal));\n", };
        ShaderChunk.reflection_forBasic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, reflect(inDir, normalize(v_normal)));\n", };
        ShaderChunk.refraction_forBasic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, refract(inDir, normalize(v_normal), u_refractionRatio));\n", };
        ShaderChunk.basic_envMap_forLight_fragment = { top: "", define: "", varDeclare: "varying vec3 v_basicEnvMap_dir;\n", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, v_basicEnvMap_dir);\n", };
        ShaderChunk.basic_envMap_forLight_vertex = { top: "", define: "", varDeclare: "varying vec3 v_basicEnvMap_dir;\n", funcDeclare: "", funcDefine: "", body: "v_basicEnvMap_dir = a_position;\n", };
        ShaderChunk.envMap_forLight_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec3 inDir = normalize(v_worldPosition - u_cameraPos);\n", };
        ShaderChunk.envMap_forLight_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "", };
        ShaderChunk.fresnel_forLight_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){\n    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);\n    float fresnelPower = 5.0;\n    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);\n\n    return ratio / 100.0;\n}\n\nvec4 getEnvMapTotalColor(vec3 inDir, vec3 normal){\n    vec3 reflectDir = reflect(inDir, normal);\n    vec3 refractDir = refract(inDir, normal, u_refractionRatio);\n\n    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);\n    vec4 refractColor = textureCube(u_samplerCube0, refractDir);\n\n    vec4 totalColor = vec4(0.0);\n\n	if(u_reflectivity != NULL){\n        totalColor = mix(reflectColor, refractColor, u_reflectivity);\n	}\n	else{\n        totalColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));\n	}\n\n	return totalColor;\n}\n", body: "totalColor *= getEnvMapTotalColor(inDir, normalize(getNormal()));\n", };
        ShaderChunk.reflection_forLight_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, reflect(inDir, normalize(getNormal())));\n", };
        ShaderChunk.refraction_forLight_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "totalColor *= textureCube(u_samplerCube0, refract(inDir, getNormal(), u_refractionRatio));\n", };
        return ShaderChunk;
    })();
    wd.ShaderChunk = ShaderChunk;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ShaderSnippet = (function () {
        function ShaderSnippet() {
        }
        ShaderSnippet.main_begin = "void main(void){\n";
        ShaderSnippet.main_end = "}\n";
        ShaderSnippet.setPos_mvp = "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n";
        return ShaderSnippet;
    })();
    wd.ShaderSnippet = ShaderSnippet;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Material = (function () {
        function Material() {
            this._blendType = null;
            this._blendSrc = wd.BlendFunc.ONE;
            this._blendDst = wd.BlendFunc.ZERO;
            this._blendEquation = wd.BlendEquation.ADD;
            this.shader = wd.Shader.create();
            this.color = wd.Color.create("#ffffff");
            this.redWrite = true;
            this.greenWrite = true;
            this.blueWrite = true;
            this.alphaWrite = true;
            this.polygonOffsetMode = wd.PolygonOffsetMode.NONE;
            this.side = wd.Side.FRONT;
            this.blend = false;
            this.blendFuncSeparate = null;
            this.blendEquationSeparate = [wd.BlendEquation.ADD, wd.BlendEquation.ADD];
            this.shading = wd.Shading.FLAT;
            this.refractionRatio = 0;
            this.reflectivity = wd.ShaderChunk.NULL;
            this.mapCombineMode = wd.TextureCombineMode.MIX;
            this.mapMixRatio = 0.5;
            this.mapManager = wd.MapManager.create(this);
            this.geometry = null;
        }
        Object.defineProperty(Material.prototype, "program", {
            get: function () {
                return this.shader.program;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "blendType", {
            get: function () {
                if (this._blendType) {
                    return this._blendType;
                }
                if ((this.blendSrc === wd.BlendFunc.ONE)
                    && (this.blendDst === wd.BlendFunc.ZERO)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.NONE;
                }
                else if ((this.blendSrc === wd.BlendFunc.SRC_ALPHA)
                    && (this.blendDst === wd.BlendFunc.ONE_MINUS_SRC_ALPHA)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.NORMAL;
                }
                else if ((this.blendSrc === wd.BlendFunc.ONE)
                    && (this.blendDst === wd.BlendFunc.ONE)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.ADDITIVE;
                }
                else if ((this.blendSrc === wd.BlendFunc.SRC_ALPHA)
                    && (this.blendDst === wd.BlendFunc.ONE)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.ADDITIVEALPHA;
                }
                else if ((this.blendSrc === wd.BlendFunc.DST_COLOR)
                    && (this.blendDst === wd.BlendFunc.ZERO)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.MULTIPLICATIVE;
                }
                else if ((this.blendSrc === wd.BlendFunc.ONE)
                    && (this.blendDst === wd.BlendFunc.ONE_MINUS_SRC_ALPHA)
                    && (this.blendEquation === wd.BlendEquation.ADD)) {
                    return wd.BlendType.PREMULTIPLIED;
                }
                else {
                    return wd.BlendType.NORMAL;
                }
            },
            set: function (blendType) {
                switch (blendType) {
                    case wd.BlendType.NONE:
                        this.blend = false;
                        this.blendSrc = wd.BlendFunc.ONE;
                        this.blendDst = wd.BlendFunc.ZERO;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    case wd.BlendType.NORMAL:
                        this.blend = true;
                        this.blendSrc = wd.BlendFunc.SRC_ALPHA;
                        this.blendDst = wd.BlendFunc.ONE_MINUS_SRC_ALPHA;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    case wd.BlendType.PREMULTIPLIED:
                        this.blend = true;
                        this.blendSrc = wd.BlendFunc.ONE;
                        this.blendDst = wd.BlendFunc.ONE_MINUS_SRC_ALPHA;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    case wd.BlendType.ADDITIVE:
                        this.blend = true;
                        this.blendSrc = wd.BlendFunc.ONE;
                        this.blendDst = wd.BlendFunc.ONE;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    case wd.BlendType.ADDITIVEALPHA:
                        this.blend = true;
                        this.blendSrc = wd.BlendFunc.SRC_ALPHA;
                        this.blendDst = wd.BlendFunc.ONE;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    case wd.BlendType.MULTIPLICATIVE:
                        this.blend = true;
                        this.blendSrc = wd.BlendFunc.DST_COLOR;
                        this.blendDst = wd.BlendFunc.ZERO;
                        this.blendEquation = wd.BlendEquation.ADD;
                        break;
                    default:
                        wd.Log.error(true, wd.Log.info.FUNC_INVALID("blendType"));
                        break;
                }
                this._blendType = blendType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "envMap", {
            get: function () {
                return this.mapManager.getEnvMap();
            },
            set: function (envMap) {
                this.mapManager.setEnvMap(envMap);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "blendSrc", {
            get: function () {
                return this._blendSrc;
            },
            set: function (blendSrc) {
                this._blendSrc = blendSrc;
                this.blendFuncSeparate = null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "blendDst", {
            get: function () {
                return this._blendDst;
            },
            set: function (blendDst) {
                this._blendDst = blendDst;
                this.blendFuncSeparate = null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "blendEquation", {
            get: function () {
                return this._blendEquation;
            },
            set: function (blendEquation) {
                this._blendEquation = blendEquation;
                this.blendEquationSeparate = null;
            },
            enumerable: true,
            configurable: true
        });
        Material.prototype.init = function () {
            this._addTopShaderLib();
            this.addShaderLib();
            this.mapManager.init();
            this.shader.init();
        };
        Material.prototype.dispose = function () {
            this.mapManager.dispose();
        };
        Material.prototype.updateTexture = function () {
            this.mapManager.update();
        };
        Material.prototype.updateShader = function (quadCmd) {
            var scene = wd.Director.getInstance().scene;
            if (scene.isUseProgram) {
                scene.shader.update(quadCmd, this);
            }
            else {
                this.shader.update(quadCmd, this);
            }
        };
        Material.prototype.addShaderLib = function () {
        };
        Material.prototype.addMap = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.mapManager.addMap.apply(this.mapManager, args);
        };
        Material.prototype.addNormalShaderLib = function () {
            if (this._hasAnimation() && !this.shader.hasLib(wd.MorphNormalShaderLib)) {
                this._addShaderLibToTop(wd.MorphNormalShaderLib.create());
            }
            else if (!this.shader.hasLib(wd.CommonNormalShaderLib)) {
                this._addShaderLibToTop(wd.CommonNormalShaderLib.create());
            }
        };
        Material.prototype.setBlendByOpacity = function (opacity) {
            if (opacity < 1.0 && opacity > 0.0) {
                this.blend = true;
            }
            else {
                this.blend = false;
            }
        };
        Material.prototype._addTopShaderLib = function () {
            this.shader.addLib(wd.CommonShaderLib.create());
            if (this._hasAnimation()) {
                this.shader.addLib(wd.MorphCommonShaderLib.create());
                this.shader.addLib(wd.MorphVerticeShaderLib.create());
            }
            else {
                this.shader.addLib(wd.CommonVerticeShaderLib.create());
            }
        };
        Material.prototype._addShaderLibToTop = function (lib) {
            this.shader.addShaderLibToTop(lib);
        };
        Material.prototype._hasAnimation = function () {
            if (this.geometry instanceof wd.ModelGeometry) {
                var geo = (this.geometry);
                return geo.hasAnimation();
            }
            return false;
        };
        Object.defineProperty(Material.prototype, "init",
            __decorate([
                wd.require(function () {
                    wd.assert(!(this.mirrorMap && this.envMap), wd.Log.info.FUNC_SHOULD_NOT("mirrorMap and envMap", "be set both"));
                })
            ], Material.prototype, "init", Object.getOwnPropertyDescriptor(Material.prototype, "init")));
        Object.defineProperty(Material.prototype, "addShaderLib",
            __decorate([
                wd.virtual
            ], Material.prototype, "addShaderLib", Object.getOwnPropertyDescriptor(Material.prototype, "addShaderLib")));
        return Material;
    })();
    wd.Material = Material;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var BasicMaterial = (function (_super) {
        __extends(BasicMaterial, _super);
        function BasicMaterial() {
            _super.apply(this, arguments);
            this._opacity = 1.0;
        }
        BasicMaterial.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(BasicMaterial.prototype, "map", {
            set: function (map) {
                if (map instanceof wd.Texture || map instanceof wd.TextureAsset) {
                    this.addMap(map);
                }
                else {
                    var mapArr = (arguments[0]);
                    wdCb.Log.error(mapArr.length > 2, wdCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));
                    for (var _i = 0; _i < mapArr.length; _i++) {
                        var m = mapArr[_i];
                        this.addMap(m);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicMaterial.prototype, "mirrorMap", {
            get: function () {
                return this.mapManager.getMirrorMap();
            },
            set: function (mirrorMap) {
                this.mapManager.setMirrorMap(mirrorMap);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicMaterial.prototype, "opacity", {
            get: function () {
                return this._opacity;
            },
            set: function (opacity) {
                this.setBlendByOpacity(opacity);
                this._opacity = opacity;
            },
            enumerable: true,
            configurable: true
        });
        BasicMaterial.prototype.addShaderLib = function () {
            var envMap = null;
            this.shader.addLib(wd.BasicShaderLib.create());
            this._setMapShaderLib();
            envMap = this.envMap;
            if (envMap) {
                this._setEnvMapShaderLib(envMap);
            }
            this._setMirrorMapShaderLib();
            this.shader.addLib(wd.BasicEndShaderLib.create());
        };
        BasicMaterial.prototype._setMapShaderLib = function () {
            var mapManager = this.mapManager, mapCount = mapManager.getMapCount(function (map) {
                return !mapManager.isMirrorMap(map);
            });
            if (mapCount > 0) {
                if (mapCount > 1) {
                    this.shader.addLib(wd.MultiMapShaderLib.create());
                }
                else {
                    this.shader.addLib(wd.BasicMapShaderLib.create());
                }
            }
        };
        BasicMaterial.prototype._setEnvMapShaderLib = function (envMap) {
            this.addNormalShaderLib();
            switch (envMap.mode) {
                case wd.EnvMapMode.BASIC:
                    this.shader.addLib(wd.BasicEnvMapForBasicShaderLib.create());
                    break;
                case wd.EnvMapMode.REFLECTION:
                    this.shader.addLib(wd.ReflectionForBasicShaderLib.create());
                    break;
                case wd.EnvMapMode.REFRACTION:
                    this.shader.addLib(wd.RefractionForBasicShaderLib.create());
                    break;
                case wd.EnvMapMode.FRESNEL:
                    this.shader.addLib(wd.FresnelForBasicShaderLib.create());
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("EnvMapMode"));
                    break;
            }
        };
        BasicMaterial.prototype._setMirrorMapShaderLib = function () {
            if (this.mirrorMap) {
                this.shader.addLib(wd.MirrorForBasicShaderLib.create());
            }
        };
        return BasicMaterial;
    })(wd.Material);
    wd.BasicMaterial = BasicMaterial;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SkyboxMaterial = (function (_super) {
        __extends(SkyboxMaterial, _super);
        function SkyboxMaterial() {
            _super.apply(this, arguments);
        }
        SkyboxMaterial.create = function () {
            var obj = new this();
            obj.initWhenCreate();
            return obj;
        };
        SkyboxMaterial.prototype.initWhenCreate = function () {
            this.side = wd.Side.BACK;
        };
        SkyboxMaterial.prototype.addShaderLib = function () {
            this.shader.addLib(wd.SkyboxShaderLib.create());
        };
        return SkyboxMaterial;
    })(wd.Material);
    wd.SkyboxMaterial = SkyboxMaterial;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var LightMaterial = (function (_super) {
        __extends(LightMaterial, _super);
        function LightMaterial() {
            _super.apply(this, arguments);
            this._diffuseMap = null;
            this._specularMap = null;
            this._normalMap = null;
            this._shininess = 32;
            this._opacity = 1.0;
            this.twoDShadowMapDatas = wdCb.Collection.create();
            this.cubemapShadowMapDatas = wdCb.Collection.create();
            this.buildTwoDShadowMapData = null;
            this.buildCubemapShadowMapData = null;
            this.specular = wd.Color.create("0x111111");
            this._twoDShadowMapSamplerIndex = 0;
            this._cubemapShadowMapSamplerIndex = 0;
        }
        LightMaterial.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(LightMaterial.prototype, "diffuseMap", {
            get: function () {
                return this._diffuseMap;
            },
            set: function (diffuseMap) {
                this.addMap(diffuseMap, {
                    samplerVariableName: wd.VariableNameTable.getVariableName("diffuseMap")
                });
                this._diffuseMap = diffuseMap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightMaterial.prototype, "specularMap", {
            get: function () {
                return this._specularMap;
            },
            set: function (specularMap) {
                this.addMap(specularMap, {
                    samplerVariableName: wd.VariableNameTable.getVariableName("specularMap")
                });
                this._specularMap = specularMap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightMaterial.prototype, "normalMap", {
            get: function () {
                return this._normalMap;
            },
            set: function (normalMap) {
                this.addMap(normalMap, {
                    samplerVariableName: wd.VariableNameTable.getVariableName("normalMap")
                });
                this._normalMap = normalMap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightMaterial.prototype, "shininess", {
            get: function () {
                if (Number(this._shininess) <= 0) {
                    return 32;
                }
                return this._shininess;
            },
            set: function (shininess) {
                this._shininess = shininess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightMaterial.prototype, "opacity", {
            get: function () {
                return this._opacity;
            },
            set: function (opacity) {
                this.setBlendByOpacity(opacity);
                this._opacity = opacity;
            },
            enumerable: true,
            configurable: true
        });
        LightMaterial.prototype.addTwoDShadowMap = function (shadowMap) {
            this.addMap(shadowMap, {
                samplerData: this._twoDShadowMapSamplerIndex
            });
            this._twoDShadowMapSamplerIndex++;
        };
        LightMaterial.prototype.addCubemapShadowMap = function (shadowMap) {
            this.addMap(shadowMap, {
                samplerData: this._cubemapShadowMapSamplerIndex
            });
            this._cubemapShadowMapSamplerIndex++;
        };
        LightMaterial.prototype.hasShadowMap = function (map) {
            return this.mapManager.hasMap(map);
        };
        LightMaterial.prototype.addTwoDShadowMapData = function (shadowMapData) {
            this.twoDShadowMapDatas.addChild(shadowMapData);
        };
        LightMaterial.prototype.addCubemapShadowMapData = function (shadowMapData) {
            this.cubemapShadowMapDatas.addChild(shadowMapData);
        };
        LightMaterial.prototype.clearTwoDShadowMapData = function () {
            this.twoDShadowMapDatas.removeAllChildren();
        };
        LightMaterial.prototype.clearCubemapShadowMapData = function () {
            this.cubemapShadowMapDatas.removeAllChildren();
        };
        LightMaterial.prototype.addShaderLib = function () {
            var envMap = null;
            this.addNormalShaderLib();
            this.shader.addLib(wd.LightCommonShaderLib.create());
            this._setPhongMapShaderLib();
            this.shader.addLib(wd.LightShaderLib.create());
            envMap = this.envMap;
            if (envMap) {
                this._setEnvMapShaderLib(envMap);
            }
            this.shader.addLib(wd.LightEndShaderLib.create());
        };
        LightMaterial.prototype._setPhongMapShaderLib = function () {
            var scene = wd.Director.getInstance().scene;
            if (this._diffuseMap) {
                this.shader.addLib(wd.DiffuseMapShaderLib.create());
            }
            else {
                this.shader.addLib(wd.NoDiffuseMapShaderLib.create());
            }
            if (this._specularMap) {
                this.shader.addLib(wd.SpecularMapShaderLib.create());
            }
            else {
                this.shader.addLib(wd.NoSpecularMapShaderLib.create());
            }
            if (this._normalMap) {
                this.shader.addLib(wd.NormalMapShaderLib.create());
            }
            else {
                this.shader.addLib(wd.NoNormalMapShaderLib.create());
            }
            if (scene.shadowMap.enable && (this._hasTwoDShadowMap() || this._hasCubemapShadowMap())) {
                if (this._hasTwoDShadowMap()) {
                    this.shader.addLib(wd.TwoDShadowMapShaderLib.create());
                }
                if (this._hasCubemapShadowMap()) {
                    this.shader.addLib(wd.CubemapShadowMapShaderLib.create());
                }
                this.shader.addLib(wd.TotalShadowMapShaderLib.create());
            }
            else {
                this.shader.addLib(wd.NoShadowMapShaderLib.create());
            }
        };
        LightMaterial.prototype._setEnvMapShaderLib = function (envMap) {
            switch (envMap.mode) {
                case wd.EnvMapMode.BASIC:
                    this.shader.addLib(wd.BasicEnvMapForLightShaderLib.create());
                    break;
                case wd.EnvMapMode.REFLECTION:
                    this.shader.addLib(wd.ReflectionForLightShaderLib.create());
                    break;
                case wd.EnvMapMode.REFRACTION:
                    this.shader.addLib(wd.RefractionForLightShaderLib.create());
                    break;
                case wd.EnvMapMode.FRESNEL:
                    this.shader.addLib(wd.FresnelForLightShaderLib.create());
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("EnvMapMode"));
                    break;
            }
        };
        LightMaterial.prototype._hasTwoDShadowMap = function () {
            return this.mapManager.hasMap(function (map) {
                return map instanceof wd.TwoDShadowMapTexture;
            });
        };
        LightMaterial.prototype._hasCubemapShadowMap = function () {
            return this.mapManager.hasMap(function (map) {
                return map instanceof wd.CubemapShadowMapTexture;
            });
        };
        return LightMaterial;
    })(wd.Material);
    wd.LightMaterial = LightMaterial;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (Shading) {
        Shading[Shading["FLAT"] = 0] = "FLAT";
        Shading[Shading["SMOOTH"] = 1] = "SMOOTH";
    })(wd.Shading || (wd.Shading = {}));
    var Shading = wd.Shading;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var MapManager = (function () {
        function MapManager(material) {
            this._material = null;
            this._textures = wdCb.Hash.create();
            this._mirrorMap = null;
            this._material = material;
        }
        MapManager.create = function (material) {
            var obj = new this(material);
            return obj;
        };
        MapManager.prototype.init = function () {
            this._getMapList().forEach(function (texture) {
                texture.init();
            });
        };
        MapManager.prototype.addMap = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var map = null;
            if (args[0] instanceof wd.TextureAsset) {
                var asset = args[0];
                map = asset.toTexture();
            }
            else if (args[0] instanceof wd.Texture) {
                map = args[0];
            }
            if (args.length === 2) {
                var option = args[1];
                this._setMapOption(map, option);
            }
            map.material = this._material;
            this._textures.appendChild("map", map);
        };
        MapManager.prototype.getMap = function (index) {
            return this._textures.getChild("map").getChild(index);
        };
        MapManager.prototype.hasMap = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var maps = null;
            maps = this._textures.getChild("map");
            return maps && maps.hasChild(args[0]);
        };
        MapManager.prototype.getMapCount = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 0) {
                var map = this._textures.getChild("map");
                return map ? map.getCount() : 0;
            }
            else {
                var filterFunc = args[0], map = this._textures.getChild("map");
                return map ? map.filter(filterFunc).getCount() : 0;
            }
        };
        MapManager.prototype.getEnvMap = function () {
            return this._getMap("envMap");
        };
        MapManager.prototype.setEnvMap = function (envMap) {
            this._setMap("envMap", envMap);
        };
        MapManager.prototype.getMirrorMap = function () {
            return this._mirrorMap;
        };
        MapManager.prototype.setMirrorMap = function (mirrorMap) {
            this.addMap(mirrorMap, {
                samplerVariableName: wd.VariableNameTable.getVariableName("mirrorReflectionMap")
            });
            this._mirrorMap = mirrorMap;
        };
        MapManager.prototype.isMirrorMap = function (map) {
            return map === this._mirrorMap;
        };
        MapManager.prototype.removeAllChildren = function () {
            this._textures.removeAllChildren();
        };
        MapManager.prototype.dispose = function () {
            this._getMapList().forEach(function (texture) {
                texture.dispose();
            });
            this.removeAllChildren();
        };
        MapManager.prototype.update = function () {
            this._getMapList()
                .filter(function (texture) {
                return texture instanceof wd.BasicTexture && texture.needUpdate;
            })
                .forEach(function (texture, index) {
                texture.update(index);
            });
        };
        MapManager.prototype.sendData = function (program) {
            this._getMapList().forEach(function (texture, index) {
                var samplerName = texture.getSamplerName(index), pos = program.getUniformLocation(samplerName);
                if (program.isUniformDataNotExistByLocation(pos)) {
                    return;
                }
                texture.bindToUnit(index);
                texture.sendData(program, pos, index);
            });
        };
        MapManager.prototype._getMapList = function () {
            return this._textures.toCollection();
        };
        MapManager.prototype._getMap = function (key) {
            return this._textures.getChild(key);
        };
        MapManager.prototype._setMap = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var key = args[0], map = args[1];
            if (!map) {
                this._removeMap(key, map);
                return;
            }
            if (arguments.length === 3) {
                var option = args[1];
                this._setMapOption(map, option);
            }
            map.material = this._material;
            this._textures.addChild(key, map);
        };
        MapManager.prototype._removeMap = function (key, map) {
            this._textures.removeChild(key);
        };
        MapManager.prototype._setMapOption = function (map, option) {
            map.variableData = option;
        };
        return MapManager;
    })();
    wd.MapManager = MapManager;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Loader = (function () {
        function Loader() {
            this._container = wdCb.Hash.create();
        }
        Loader.prototype.load = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var url = args[0], id = null, self = this, data = null, stream = null;
            if (args.length === 1) {
                if (wd.JudgeUtils.isArray(url)) {
                    id = url.join("-");
                }
                else {
                    id = url;
                }
            }
            else {
                id = args[1];
            }
            data = this._container.getChild(id);
            if (data) {
                stream = wdFrp.just(data);
            }
            else {
                stream = this.loadAsset(url)
                    .do(function (data) {
                    self._container.addChild(id, data);
                }, function (err) {
                    self._errorHandle(url, err);
                }, null);
            }
            return stream;
        };
        Loader.prototype.get = function (id) {
            return this._container.getChild(id);
        };
        Loader.prototype.has = function (id) {
            return this._container.hasChild(id);
        };
        Loader.prototype.dispose = function () {
            this._container.removeAllChildren();
        };
        Loader.prototype._errorHandle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var path = null, err = null;
            if (wd.JudgeUtils.isArray(args[0])) {
                path = args[0].join(",");
            }
            else {
                path = args[0];
            }
            err = args[1];
            wd.Log.log("load " + path + " asset fail:" + err);
        };
        return Loader;
    })();
    wd.Loader = Loader;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var GLSLLoader = (function (_super) {
        __extends(GLSLLoader, _super);
        function GLSLLoader() {
            _super.apply(this, arguments);
        }
        GLSLLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        GLSLLoader.prototype.loadAsset = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var url = args[0];
            return wd.AjaxLoader.load(url, "text");
        };
        GLSLLoader._instance = null;
        Object.defineProperty(GLSLLoader.prototype, "loadAsset",
            __decorate([
                wd.require(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    wd.assert(!wd.JudgeUtils.isArray(args[0]), wd.Log.info.FUNC_MUST_BE("url", "string"));
                })
            ], GLSLLoader.prototype, "loadAsset", Object.getOwnPropertyDescriptor(GLSLLoader.prototype, "loadAsset")));
        return GLSLLoader;
    })(wd.Loader);
    wd.GLSLLoader = GLSLLoader;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var JsLoader = (function (_super) {
        __extends(JsLoader, _super);
        function JsLoader() {
            _super.apply(this, arguments);
        }
        JsLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        JsLoader.prototype.loadAsset = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, url = args[0];
            return wdFrp.fromPromise(new RSVP.Promise(function (resolve, reject) {
                var script = self._createScript();
                script.addEventListener("error", function (e) {
                    reject("error");
                });
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            resolve(url);
                        }
                    };
                }
                else {
                    script.onload = function () {
                        resolve(url);
                    };
                }
                /*! set the src attribute after the onload callback is set, to avoid an instant loading failing to fire the callback */
                script.src = url;
                _this._appendScript(script);
            }));
        };
        JsLoader.prototype._createScript = function () {
            var script = document.createElement("script");
            script.type = "text/javascript";
            return script;
        };
        JsLoader.prototype._appendScript = function (script) {
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        JsLoader._instance = null;
        Object.defineProperty(JsLoader.prototype, "loadAsset",
            __decorate([
                wd.require(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    wd.assert(!wd.JudgeUtils.isArray(args[0]), wd.Log.info.FUNC_MUST_BE("url", "string"));
                })
            ], JsLoader.prototype, "loadAsset", Object.getOwnPropertyDescriptor(JsLoader.prototype, "loadAsset")));
        return JsLoader;
    })(wd.Loader);
    wd.JsLoader = JsLoader;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var VideoLoader = (function (_super) {
        __extends(VideoLoader, _super);
        function VideoLoader() {
            _super.apply(this, arguments);
        }
        VideoLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        VideoLoader.prototype.loadAsset = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var urlArr = null;
            if (wd.JudgeUtils.isString(args[0])) {
                urlArr = [args[0]];
            }
            else {
                urlArr = args[0];
            }
            return wdFrp.fromPromise(new RSVP.Promise(function (resolve, reject) {
                wd.Video.create({
                    urlArr: urlArr,
                    onLoad: function (video) {
                        resolve(wd.VideoTextureAsset.create(video));
                    },
                    onError: function (err) {
                        reject(err);
                    }
                });
            }));
        };
        VideoLoader._instance = null;
        return VideoLoader;
    })(wd.Loader);
    wd.VideoLoader = VideoLoader;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var TextureLoader = (function (_super) {
        __extends(TextureLoader, _super);
        function TextureLoader() {
            _super.apply(this, arguments);
        }
        TextureLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        TextureLoader.prototype.loadAsset = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var extname = null, stream = null, url = args[0];
            extname = wdCb.PathUtils.extname(url).toLowerCase();
            switch (extname) {
                case ".jpg":
                case ".jpeg":
                case ".gif":
                case ".bmp":
                    stream = wd.ImageLoader.load(url)
                        .map(function (image) {
                        var asset = wd.ImageTextureAsset.create(image);
                        asset.format = wd.TextureFormat.RGB;
                        return asset;
                    });
                    break;
                case ".png":
                    stream = wd.ImageLoader.load(url)
                        .map(function (image) {
                        return wd.ImageTextureAsset.create(image);
                    });
                    break;
                case ".dds":
                    stream = wd.CompressedTextureLoader.load(url);
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_NOT_SUPPORT(extname));
                    break;
            }
            return stream;
        };
        TextureLoader._instance = null;
        Object.defineProperty(TextureLoader.prototype, "loadAsset",
            __decorate([
                wd.require(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    wd.assert(!wd.JudgeUtils.isArray(args[0]), wd.Log.info.FUNC_MUST_BE("url", "string"));
                })
            ], TextureLoader.prototype, "loadAsset", Object.getOwnPropertyDescriptor(TextureLoader.prototype, "loadAsset")));
        return TextureLoader;
    })(wd.Loader);
    wd.TextureLoader = TextureLoader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ImageLoader = (function () {
        function ImageLoader() {
        }
        ImageLoader.load = function (url) {
            return wdFrp.fromPromise(new RSVP.Promise(function (resolve, reject) {
                var img = null;
                img = new Image();
                /*!
                 经过对多个浏览器版本的测试，发现ie、opera下，当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图

                 片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们试图使这两种加载方式对用户透明，同样

                 会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引起图片的onload事件，因此上边的代码在它们里边不能得以实现效果。

                 确实，在ie，opera下，对于缓存图片的初始状态，与firefox和safari，chrome下是不一样的（有兴趣的话，可以在不同浏览器下，测试一下在给img的src赋值缓存图片的url之前，img的状态），
                 但是对onload事件的触发，却是一致的，不管是什么浏览器。

                 产生这个问题的根本原因在于，img的src赋值与 onload事件的绑定，顺序不对（在ie和opera下，先赋值src，再赋值onload，因为是缓存图片，就错过了onload事件的触发）。
                 应该先绑定onload事件，然后再给src赋值。
                 */
                img.onload = function () {
                    this.onload = null;
                    resolve(img);
                };
                img.onerror = function () {
                    reject("error");
                };
                img.src = url;
            }));
        };
        return ImageLoader;
    })();
    wd.ImageLoader = ImageLoader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var AjaxLoader = (function () {
        function AjaxLoader() {
        }
        AjaxLoader.load = function (url, dataType) {
            return wdFrp.fromPromise(new RSVP.Promise(function (resolve, reject) {
                wdCb.AjaxUtils.ajax({
                    type: "get",
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: dataType,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (XMLHttpRequest, errorThrown) {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status + "\nmessage:" + errorThrown.message + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            }));
        };
        return AjaxLoader;
    })();
    wd.AjaxLoader = AjaxLoader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ModelLoaderUtils = (function () {
        function ModelLoaderUtils() {
        }
        ModelLoaderUtils.getPath = function (filePath, mapUrl) {
            return wdCb.PathUtils.dirname(filePath) + "/" + mapUrl;
        };
        return ModelLoaderUtils;
    })();
    wd.ModelLoaderUtils = ModelLoaderUtils;
})(wd || (wd = {}));




var wd;
(function (wd) {
    var CompressedTextureLoader = (function () {
        function CompressedTextureLoader() {
        }
        CompressedTextureLoader.load = function (url) {
            var _this = this;
            return wd.AjaxLoader.load(url, "arraybuffer")
                .map(function (data) {
                var texDatas = wd.DDSParser.parse(data, true), asset = wd.CompressedTextureAsset.create();
                asset.width = texDatas.width;
                asset.height = texDatas.height;
                asset.mipmaps = texDatas.mipmaps;
                if (texDatas.mipmapCount == 1) {
                    asset.minFilter = wd.TextureFilterMode.LINEAR;
                }
                asset.format = _this._getCompressedFormat(texDatas.format);
                return asset;
            });
        };
        CompressedTextureLoader._getCompressedFormat = function (format) {
            var extension = wd.GPUDetector.getInstance().extensionCompressedTextureS3TC;
            if (format === wd.TextureFormat.RGBA) {
                return format;
            }
            if (!extension) {
                return null;
            }
            switch (format) {
                case wd.TextureFormat.RGB_S3TC_DXT1:
                    format = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;
                case wd.TextureFormat.RGBA_S3TC_DXT1:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    break;
                case wd.TextureFormat.RGBA_S3TC_DXT3:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case wd.TextureFormat.RGBA_S3TC_DXT5:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
            }
            return format;
        };
        return CompressedTextureLoader;
    })();
    wd.CompressedTextureLoader = CompressedTextureLoader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var DDS_MAGIC = 0x20534444, DDSD_CAPS = 0x1, DDSD_HEIGHT = 0x2, DDSD_WIDTH = 0x4, DDSD_PITCH = 0x8, DDSD_PIXELFORMAT = 0x1000, DDSD_MIPMAPCOUNT = 0x20000, DDSD_LINEARSIZE = 0x80000, DDSD_DEPTH = 0x800000, DDSCAPS_COMPLEX = 0x8, DDSCAPS_MIPMAP = 0x400000, DDSCAPS_TEXTURE = 0x1000, DDSCAPS2_CUBEMAP = 0x200, DDSCAPS2_CUBEMAP_POSITIVEX = 0x400, DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800, DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000, DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000, DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000, DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000, DDSCAPS2_VOLUME = 0x200000, DDPF_ALPHAPIXELS = 0x1, DDPF_ALPHA = 0x2, DDPF_FOURCC = 0x4, DDPF_RGB = 0x40, DDPF_YUV = 0x200, DDPF_LUMINANCE = 0x20000;
    var DDSParser = (function () {
        function DDSParser() {
        }
        DDSParser.parse = function (buffer, loadMipmaps) {
            if (loadMipmaps === void 0) { loadMipmaps = true; }
            var dds = new DDSData(), FOURCC_DXT1 = this._fourCCToInt32("DXT1"), FOURCC_DXT3 = this._fourCCToInt32("DXT3"), FOURCC_DXT5 = this._fourCCToInt32("DXT5"), headerLengthInt = 31, off_magic = 0, off_size = 1, off_flags = 2, off_height = 3, off_width = 4, off_mipmapCount = 7, off_pfFlags = 20, off_pfFourCC = 21, off_RGBBitCount = 22, off_RBitMask = 23, off_GBitMask = 24, off_BBitMask = 25, off_ABitMask = 26, off_caps = 27, off_caps2 = 28, off_caps3 = 29, off_caps4 = 30, header = new Int32Array(buffer, 0, headerLengthInt), blockBytes = null, fourCC = null, isRGBAUncompressed = null, dataOffset = null, width = null, height = null, faces = null;
            if (header[off_magic] !== DDS_MAGIC) {
                wd.Log.error(true, "Invalid magic number in DDS header.");
                return dds;
            }
            if ((!header[off_pfFlags]) & DDPF_FOURCC) {
                wd.Log.error(true, "Unsupported format, must contain a FourCC code.");
                return dds;
            }
            fourCC = header[off_pfFourCC];
            isRGBAUncompressed = false;
            switch (fourCC) {
                case FOURCC_DXT1:
                    blockBytes = 8;
                    dds.format = wd.TextureFormat.RGB_S3TC_DXT1;
                    break;
                case FOURCC_DXT3:
                    blockBytes = 16;
                    dds.format = wd.TextureFormat.RGBA_S3TC_DXT3;
                    break;
                case FOURCC_DXT5:
                    blockBytes = 16;
                    dds.format = wd.TextureFormat.RGBA_S3TC_DXT5;
                    break;
                default:
                    if (header[off_RGBBitCount] == 32
                        && header[off_RBitMask] & 0xff0000
                        && header[off_GBitMask] & 0xff00
                        && header[off_BBitMask] & 0xff
                        && header[off_ABitMask] & 0xff000000) {
                        isRGBAUncompressed = true;
                        blockBytes = 64;
                        dds.format = wd.TextureFormat.RGBA;
                    }
                    else {
                        wd.Log.error(true, "Unsupported FourCC code " + this._int32ToFourCC(fourCC));
                        return dds;
                    }
            }
            dds.mipmapCount = 1;
            if (header[off_flags] & DDSD_MIPMAPCOUNT && loadMipmaps !== false) {
                dds.mipmapCount = Math.max(1, header[off_mipmapCount]);
            }
            dds.isCubemap = header[off_caps2] & DDSCAPS2_CUBEMAP ? true : false;
            dds.width = header[off_width];
            dds.height = header[off_height];
            dataOffset = header[off_size] + 4;
            width = dds.width;
            height = dds.height;
            faces = dds.isCubemap ? 6 : 1;
            for (var face = 0; face < faces; face++) {
                for (var i = 0; i < dds.mipmapCount; i++) {
                    var mipmap = null, byteArray = null, dataLength = null;
                    if (isRGBAUncompressed) {
                        byteArray = this._loadARGBMip(buffer, dataOffset, width, height);
                        dataLength = byteArray.length;
                    }
                    else {
                        dataLength = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockBytes;
                        byteArray = new Uint8Array(buffer, dataOffset, dataLength);
                    }
                    mipmap = { "data": byteArray, "width": width, "height": height };
                    dds.mipmaps.addChild(mipmap);
                    dataOffset += dataLength;
                    width = Math.max(width * 0.5, 1);
                    height = Math.max(height * 0.5, 1);
                }
                width = dds.width;
                height = dds.height;
            }
            return dds;
        };
        DDSParser._fourCCToInt32 = function (value) {
            return value.charCodeAt(0) +
                (value.charCodeAt(1) << 8) +
                (value.charCodeAt(2) << 16) +
                (value.charCodeAt(3) << 24);
        };
        DDSParser._int32ToFourCC = function (value) {
            return String.fromCharCode(value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff);
        };
        DDSParser._loadARGBMip = function (buffer, dataOffset, width, height) {
            var dataLength = width * height * 4, srcBuffer = new Uint8Array(buffer, dataOffset, dataLength), byteArray = new Uint8Array(dataLength), dst = 0, src = 0;
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var b = null, g = null, r = null, a = null;
                    b = srcBuffer[src];
                    src++;
                    g = srcBuffer[src];
                    src++;
                    r = srcBuffer[src];
                    src++;
                    a = srcBuffer[src];
                    src++;
                    byteArray[dst] = r;
                    dst++;
                    byteArray[dst] = g;
                    dst++;
                    byteArray[dst] = b;
                    dst++;
                    byteArray[dst] = a;
                    dst++;
                }
            }
            return byteArray;
        };
        return DDSParser;
    })();
    wd.DDSParser = DDSParser;
    var DDSData = (function () {
        function DDSData() {
            this.mipmaps = wdCb.Collection.create();
            this.width = 0;
            this.height = 0;
            this.format = null;
            this.mipmapCount = 1;
            this.isCubemap = false;
        }
        return DDSData;
    })();
    wd.DDSData = DDSData;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var TextureAsset = (function () {
        function TextureAsset() {
            this._width = null;
            this._height = null;
            this.generateMipmaps = true;
            this.sourceRegionMethod = wd.TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            this.format = wd.TextureFormat.RGBA;
            this.source = TextureAsset.defaultTexture;
            this.repeatRegion = wd.RectRegion.create(0, 0, 1, 1);
            this.sourceRegion = null;
            this.sourceRegionMapping = wd.TextureSourceRegionMapping.CANVAS;
            this.flipY = true;
            this.premultiplyAlpha = false;
            this.unpackAlignment = 4;
            this.wrapS = wd.TextureWrapMode.CLAMP_TO_EDGE;
            this.wrapT = wd.TextureWrapMode.CLAMP_TO_EDGE;
            this.magFilter = wd.TextureFilterMode.LINEAR;
            this.minFilter = wd.TextureFilterMode.LINEAR_MIPMAP_LINEAR;
            this.type = wd.TextureType.UNSIGNED_BYTE;
            this.mipmaps = wdCb.Collection.create();
            this.anisotropy = 0;
            this.needUpdate = true;
        }
        Object.defineProperty(TextureAsset.prototype, "width", {
            get: function () {
                return this._width === null ? (this.source ? this.source.width : null) : this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureAsset.prototype, "height", {
            get: function () {
                return this._height === null ? (this.source ? this.source.height : null) : this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        TextureAsset.prototype.copyToCubemapTexture = function (cubemapFaceTexture) {
            cubemapFaceTexture.generateMipmaps = this.generateMipmaps;
            cubemapFaceTexture.minFilter = this.minFilter;
            cubemapFaceTexture.magFilter = this.magFilter;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.wrapS = this.wrapS;
            cubemapFaceTexture.wrapT = this.wrapT;
            cubemapFaceTexture.anisotropy = this.anisotropy;
            cubemapFaceTexture.premultiplyAlpha = this.premultiplyAlpha;
            cubemapFaceTexture.unpackAlignment = this.unpackAlignment;
            cubemapFaceTexture.needUpdate = this.needUpdate;
            cubemapFaceTexture.mode = wd.EnvMapMode.BASIC;
        };
        TextureAsset.prototype.copyTo = function (texture) {
            wd.Log.error(!texture, wd.Log.info.FUNC_MUST_DEFINE("texture"));
            texture.source = this.source;
            texture.width = this.width;
            texture.height = this.height;
            texture.mipmaps = this.mipmaps.copy();
            texture.wrapS = this.wrapS;
            texture.wrapT = this.wrapT;
            texture.magFilter = this.magFilter;
            texture.minFilter = this.minFilter;
            texture.anisotropy = this.anisotropy;
            texture.format = this.format;
            texture.type = this.type;
            texture.repeatRegion = this.repeatRegion.copy();
            texture.sourceRegion = this.sourceRegion && this.sourceRegion.copy();
            texture.sourceRegionMapping = this.sourceRegionMapping;
            texture.sourceRegionMethod = this.sourceRegionMethod;
            texture.generateMipmaps = this.generateMipmaps;
            texture.premultiplyAlpha = this.premultiplyAlpha;
            texture.flipY = this.flipY;
            texture.unpackAlignment = this.unpackAlignment;
            texture.needUpdate = this.needUpdate;
            return texture;
        };
        TextureAsset.defaultTexture = null;
        return TextureAsset;
    })();
    wd.TextureAsset = TextureAsset;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ImageTextureAsset = (function (_super) {
        __extends(ImageTextureAsset, _super);
        function ImageTextureAsset(source) {
            _super.call(this);
            this.source = source;
        }
        ImageTextureAsset.create = function (source) {
            var obj = new this(source);
            return obj;
        };
        ImageTextureAsset.prototype.toTexture = function () {
            return wd.ImageTexture.create(this);
        };
        ImageTextureAsset.prototype.toCubemapFaceTexture = function () {
            return wd.CubemapFaceImageTexture.create(this);
        };
        ImageTextureAsset.prototype.copyToCubemapFaceTexture = function (cubemapFaceTexture) {
            cubemapFaceTexture.source = this.source;
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.sourceRegion = this.sourceRegion;
            cubemapFaceTexture.sourceRegionMethod = wd.TextureSourceRegionMethod.DRAW_IN_CANVAS;
        };
        return ImageTextureAsset;
    })(wd.TextureAsset);
    wd.ImageTextureAsset = ImageTextureAsset;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var VideoTextureAsset = (function (_super) {
        __extends(VideoTextureAsset, _super);
        function VideoTextureAsset(video) {
            _super.call(this);
            this.video = null;
            this.video = video;
            this.source = this.video.source;
        }
        VideoTextureAsset.create = function (video) {
            var obj = new this(video);
            obj.initWhenCreate();
            return obj;
        };
        VideoTextureAsset.prototype.initWhenCreate = function () {
            this.width = 0;
            this.height = 0;
            this.generateMipmaps = false;
            this.minFilter = null;
            this.magFilter = null;
            this.sourceRegion = null;
            this.sourceRegionMethod = null;
        };
        VideoTextureAsset.prototype.toTexture = function () {
            return wd.VideoTexture.create(this);
        };
        VideoTextureAsset.prototype.toCubemapFaceTexture = function () {
            return wd.Log.error(true, wd.Log.info.FUNC_NOT_SUPPORT("video texture", "cubemap"));
        };
        VideoTextureAsset.prototype.copyToCubemapFaceTexture = function (cubemapFaceTexture) {
            wd.Log.error(true, wd.Log.info.FUNC_NOT_SUPPORT("video texture", "cubemap"));
        };
        return VideoTextureAsset;
    })(wd.TextureAsset);
    wd.VideoTextureAsset = VideoTextureAsset;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CompressedTextureAsset = (function (_super) {
        __extends(CompressedTextureAsset, _super);
        function CompressedTextureAsset() {
            _super.apply(this, arguments);
        }
        CompressedTextureAsset.create = function () {
            var obj = new this();
            obj.initWhenCreate();
            return obj;
        };
        CompressedTextureAsset.prototype.initWhenCreate = function () {
            this.generateMipmaps = false;
            /*!
             flipping doesn't work for compressed textures
             */
            this.flipY = false;
        };
        CompressedTextureAsset.prototype.toTexture = function () {
            return wd.CompressedTexture.create(this);
        };
        CompressedTextureAsset.prototype.toCubemapFaceTexture = function () {
            return wd.CubemapFaceCompressedTexture.create(this);
        };
        CompressedTextureAsset.prototype.copyToCubemapFaceTexture = function (cubemapFaceTexture) {
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.mipmaps = this.mipmaps;
            cubemapFaceTexture.minFilter = this.minFilter;
        };
        return CompressedTextureAsset;
    })(wd.TextureAsset);
    wd.CompressedTextureAsset = CompressedTextureAsset;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureFilterMode) {
        TextureFilterMode[TextureFilterMode["NEAREST"] = "NEAREST"] = "NEAREST";
        TextureFilterMode[TextureFilterMode["NEAREST_MIPMAP_MEAREST"] = "NEAREST_MIPMAP_MEAREST"] = "NEAREST_MIPMAP_MEAREST";
        TextureFilterMode[TextureFilterMode["NEAREST_MIPMAP_LINEAR"] = "NEAREST_MIPMAP_LINEAR"] = "NEAREST_MIPMAP_LINEAR";
        TextureFilterMode[TextureFilterMode["LINEAR"] = "LINEAR"] = "LINEAR";
        TextureFilterMode[TextureFilterMode["LINEAR_MIPMAP_NEAREST"] = "LINEAR_MIPMAP_NEAREST"] = "LINEAR_MIPMAP_NEAREST";
        TextureFilterMode[TextureFilterMode["LINEAR_MIPMAP_LINEAR"] = "LINEAR_MIPMAP_LINEAR"] = "LINEAR_MIPMAP_LINEAR";
    })(wd.TextureFilterMode || (wd.TextureFilterMode = {}));
    var TextureFilterMode = wd.TextureFilterMode;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureWrapMode) {
        TextureWrapMode[TextureWrapMode["REPEAT"] = "REPEAT"] = "REPEAT";
        TextureWrapMode[TextureWrapMode["MIRRORED_REPEAT"] = "MIRRORED_REPEAT"] = "MIRRORED_REPEAT";
        TextureWrapMode[TextureWrapMode["CLAMP_TO_EDGE"] = "CLAMP_TO_EDGE"] = "CLAMP_TO_EDGE";
    })(wd.TextureWrapMode || (wd.TextureWrapMode = {}));
    var TextureWrapMode = wd.TextureWrapMode;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureFormat) {
        TextureFormat[TextureFormat["RGB"] = "RGB"] = "RGB";
        TextureFormat[TextureFormat["RGBA"] = "RGBA"] = "RGBA";
        TextureFormat[TextureFormat["ALPHA"] = "ALPHA"] = "ALPHA";
        TextureFormat[TextureFormat["LUMINANCE"] = "LUMINANCE"] = "LUMINANCE";
        TextureFormat[TextureFormat["LUMINANCE_ALPHA"] = "LUMINANCE_ALPHA"] = "LUMINANCE_ALPHA";
        TextureFormat[TextureFormat["RGB_S3TC_DXT1"] = "RGB_S3TC_DXT1"] = "RGB_S3TC_DXT1";
        TextureFormat[TextureFormat["RGBA_S3TC_DXT1"] = "RGBA_S3TC_DXT1"] = "RGBA_S3TC_DXT1";
        TextureFormat[TextureFormat["RGBA_S3TC_DXT3"] = "RGBA_S3TC_DXT3"] = "RGBA_S3TC_DXT3";
        TextureFormat[TextureFormat["RGBA_S3TC_DXT5"] = "RGBA_S3TC_DXT5"] = "RGBA_S3TC_DXT5";
    })(wd.TextureFormat || (wd.TextureFormat = {}));
    var TextureFormat = wd.TextureFormat;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureType) {
        TextureType[TextureType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
        TextureType[TextureType["UNSIGNED_SHORT_5_6_5"] = "UNSIGNED_SHORT_5_6_5"] = "UNSIGNED_SHORT_5_6_5";
        TextureType[TextureType["UNSIGNED_SHORT_4_4_4_4"] = "UNSIGNED_SHORT_4_4_4_4"] = "UNSIGNED_SHORT_4_4_4_4";
        TextureType[TextureType["UNSIGNED_SHORT_5_5_5_1"] = "UNSIGNED_SHORT_5_5_5_1"] = "UNSIGNED_SHORT_5_5_5_1";
    })(wd.TextureType || (wd.TextureType = {}));
    var TextureType = wd.TextureType;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (EnvMapMode) {
        EnvMapMode[EnvMapMode["BASIC"] = 0] = "BASIC";
        EnvMapMode[EnvMapMode["REFLECTION"] = 1] = "REFLECTION";
        EnvMapMode[EnvMapMode["REFRACTION"] = 2] = "REFRACTION";
        EnvMapMode[EnvMapMode["FRESNEL"] = 3] = "FRESNEL";
    })(wd.EnvMapMode || (wd.EnvMapMode = {}));
    var EnvMapMode = wd.EnvMapMode;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureCombineMode) {
        TextureCombineMode[TextureCombineMode["MIX"] = 0] = "MIX";
        TextureCombineMode[TextureCombineMode["MULTIPLY"] = 1] = "MULTIPLY";
        TextureCombineMode[TextureCombineMode["ADD"] = 2] = "ADD";
    })(wd.TextureCombineMode || (wd.TextureCombineMode = {}));
    var TextureCombineMode = wd.TextureCombineMode;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureSourceRegionMapping) {
        /*! canvas mapping
        origin point is in left-up corner
        y axis is downcast
         */
        TextureSourceRegionMapping[TextureSourceRegionMapping["CANVAS"] = 0] = "CANVAS";
        TextureSourceRegionMapping[TextureSourceRegionMapping["UV"] = 1] = "UV";
    })(wd.TextureSourceRegionMapping || (wd.TextureSourceRegionMapping = {}));
    var TextureSourceRegionMapping = wd.TextureSourceRegionMapping;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureSourceRegionMethod) {
        TextureSourceRegionMethod[TextureSourceRegionMethod["CHANGE_TEXCOORDS_IN_GLSL"] = 0] = "CHANGE_TEXCOORDS_IN_GLSL";
        TextureSourceRegionMethod[TextureSourceRegionMethod["DRAW_IN_CANVAS"] = 1] = "DRAW_IN_CANVAS";
    })(wd.TextureSourceRegionMethod || (wd.TextureSourceRegionMethod = {}));
    var TextureSourceRegionMethod = wd.TextureSourceRegionMethod;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (TextureTarget) {
        TextureTarget[TextureTarget["TEXTURE_2D"] = "TEXTURE_2D"] = "TEXTURE_2D";
        TextureTarget[TextureTarget["TEXTURE_CUBE_MAP"] = "TEXTURE_CUBE_MAP"] = "TEXTURE_CUBE_MAP";
    })(wd.TextureTarget || (wd.TextureTarget = {}));
    var TextureTarget = wd.TextureTarget;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var LoaderManager = (function () {
        function LoaderManager() {
            this.assetCount = 0;
            this.currentLoadedCount = 0;
            this._assetTable = wdCb.Hash.create();
        }
        LoaderManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        LoaderManager.prototype.load = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            if (wd.JudgeUtils.isString(args[0])) {
                var url = args[0], id = url;
                return this._createLoadSingleAssetStream(url, id);
            }
            else {
                var assetArr = args[0];
                return wdFrp.fromArray(assetArr).flatMap(function (asset) {
                    return self._createLoadMultiAssetStream(asset.url, asset.id);
                });
            }
        };
        LoaderManager.prototype.reset = function () {
            this.assetCount = 0;
            this.currentLoadedCount = 0;
        };
        LoaderManager.prototype.dispose = function () {
            this.reset();
            wd.LoaderFactory.createAllLoader().forEach(function (loader) {
                loader.dispose();
            });
        };
        LoaderManager.prototype.get = function (id) {
            return this._assetTable.getChild(id).get(id);
        };
        LoaderManager.prototype._createLoadMultiAssetStream = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var url = args[0], id = args[1], loader = this._getLoader(url), stream = null, self = this;
            if (!loader.has(id)) {
                self.assetCount++;
            }
            return this._addToAssetTable(loader.load(url, id)
                .map(function (data) {
                self.currentLoadedCount++;
                return {
                    currentLoadedCount: self.currentLoadedCount,
                    assetCount: self.assetCount
                };
            }), id, loader);
        };
        LoaderManager.prototype._createLoadSingleAssetStream = function (url, id) {
            var loader = this._getLoader(url);
            return this._addToAssetTable(loader.load(url, id), id, loader);
        };
        LoaderManager.prototype._getLoader = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var extname = null;
            if (wd.JudgeUtils.isArray(args[0])) {
                extname = wdCb.PathUtils.extname(args[0][0]);
            }
            else {
                extname = wdCb.PathUtils.extname(args[0]);
            }
            return wd.LoaderFactory.create(extname.toLowerCase());
        };
        LoaderManager.prototype._addToAssetTable = function (loadStream, id, loader) {
            var self = this;
            return loadStream.do(null, null, function () {
                self._assetTable.addChild(id, loader);
            });
        };
        LoaderManager._instance = null;
        return LoaderManager;
    })();
    wd.LoaderManager = LoaderManager;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var LoaderFactory = (function () {
        function LoaderFactory() {
        }
        LoaderFactory.create = function (extname) {
            var loader = null;
            switch (extname) {
                case ".js":
                    loader = wd.JsLoader.getInstance();
                    break;
                case ".glsl":
                    loader = wd.GLSLLoader.getInstance();
                    break;
                case ".jpg":
                case ".jpeg":
                case ".png":
                case ".dds":
                case ".gif":
                case ".bmp":
                    loader = wd.TextureLoader.getInstance();
                    break;
                case ".mp4":
                case ".ogv":
                case ".webm":
                    loader = wd.VideoLoader.getInstance();
                    break;
                case ".wd":
                    loader = wd.WDLoader.getInstance();
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_UNEXPECT(extname));
                    break;
            }
            return loader;
        };
        LoaderFactory.createAllLoader = function () {
            return wdCb.Collection.create([wd.JsLoader.getInstance(), wd.GLSLLoader.getInstance(), wd.TextureLoader.getInstance(), wd.VideoLoader.getInstance()]);
        };
        return LoaderFactory;
    })();
    wd.LoaderFactory = LoaderFactory;
})(wd || (wd = {}));



var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var WDLoader = (function (_super) {
        __extends(WDLoader, _super);
        function WDLoader() {
            _super.apply(this, arguments);
            this._wdParser = wd.WDParser.create();
            this._wdBuilder = wd.WDBuilder.create();
            this._parseData = null;
        }
        WDLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        WDLoader.prototype.loadAsset = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var url = args[0], self = this;
            return wd.AjaxLoader.load(url, "json")
                .flatMap(function (json) {
                self._parseData = self._wdParser.parse(json);
                return _this._createLoadMapStream(url);
            })
                .concat(wdFrp.callFunc(function () {
                return self._wdBuilder.build(self._parseData);
            }));
        };
        WDLoader.prototype._createLoadMapStream = function (filePath) {
            var streamArr = [], parseData = this._parseData, i = null;
            parseData.materials.forEach(function (material) {
                var mapUrlArr = [];
                if (material.diffuseMapUrl) {
                    mapUrlArr.push(["diffuseMap", material.diffuseMapUrl]);
                }
                if (material.specularMapUrl) {
                    mapUrlArr.push(["specularMap", material.specularMapUrl]);
                }
                if (material.normalMapUrl) {
                    mapUrlArr.push(["normalMap", material.normalMapUrl]);
                }
                streamArr.push(wdFrp.fromArray(mapUrlArr)
                    .flatMap(function (_a) {
                    var type = _a[0], mapUrl = _a[1];
                    return wd.TextureLoader.getInstance().load(wd.ModelLoaderUtils.getPath(filePath, mapUrl))
                        .do(function (asset) {
                        material[type] = asset.toTexture();
                    }, null, null);
                }));
            });
            return wdFrp.fromArray(streamArr).mergeAll();
        };
        WDLoader._instance = null;
        Object.defineProperty(WDLoader.prototype, "loadAsset",
            __decorate([
                wd.require(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    wd.assert(!wd.JudgeUtils.isArray(args[0]), wd.Log.info.FUNC_MUST_BE("url", "string"));
                })
            ], WDLoader.prototype, "loadAsset", Object.getOwnPropertyDescriptor(WDLoader.prototype, "loadAsset")));
        return WDLoader;
    })(wd.Loader);
    wd.WDLoader = WDLoader;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var WDParser = (function () {
        function WDParser() {
            this._data = {};
            this._objectParser = wd.WDObjectParser.create();
        }
        WDParser.create = function () {
            var obj = new this();
            return obj;
        };
        WDParser.prototype.parse = function (json) {
            this._parseMetadata(json);
            this._parseScene(json);
            this._parseMaterial(json);
            this._parseObject(json);
            return this._data;
        };
        WDParser.prototype._parseMetadata = function (json) {
            this._data.metadata = json.metadata;
        };
        WDParser.prototype._parseObject = function (json) {
            this._objectParser.parse(this._data, json);
        };
        WDParser.prototype._parseScene = function (json) {
            this._data.scene = json.scene;
            if (json.scene.ambientColor) {
                this._data.scene.ambientColor = this._createColor(json.scene.ambientColor);
            }
        };
        WDParser.prototype._parseMaterial = function (json) {
            var _this = this;
            this._data.materials = wdCb.Hash.create(json.materials);
            this._data.materials.forEach(function (material) {
                if (material.diffuseColor) {
                    material.diffuseColor = _this._createColor(material.diffuseColor);
                }
                if (material.specularColor) {
                    material.specularColor = _this._createColor(material.specularColor);
                }
            });
        };
        WDParser.prototype._createColor = function (colorArr) {
            return wd.Color.create("rgb(" + colorArr.join(",").replace(/^(\d+),/g, "$1.0,").replace(/,(\d+),/g, ",$1.0,").replace(/,(\d+)$/g, ",$1.0") + ")");
        };
        return WDParser;
    })();
    wd.WDParser = WDParser;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var WDObjectParser = (function () {
        function WDObjectParser() {
        }
        WDObjectParser.create = function () {
            var obj = new this();
            return obj;
        };
        WDObjectParser.prototype.parse = function (data, json) {
            var parse = null, self = this;
            data.objects = wdCb.Collection.create(json.objects);
            parse = function (object) {
                if (self._isObjectContainer(object)) {
                    object.isContainer = true;
                }
                else {
                    object.isContainer = false;
                    self._parseFromIndices(object);
                }
                if (object.children) {
                    object.children = wdCb.Collection.create(object.children);
                    object.children.forEach(function (child) {
                        child.parent = object;
                        parse(child);
                    });
                }
            };
            data.objects.forEach(function (object) {
                object.parent = null;
                parse(object);
                self._removeObjectContainerData(object);
            });
        };
        WDObjectParser.prototype._isObjectContainer = function (object) {
            return !wd.GeometryUtils.hasData(object.verticeIndices);
        };
        WDObjectParser.prototype._parseFromIndices = function (object) {
            this._duplicateVertexWithDifferentUvs(object);
            this._parseObjectFromIndices(object);
            this._removeRebundantIndiceData(object);
        };
        WDObjectParser.prototype._duplicateVertexWithDifferentUvs = function (object) {
            var arr = [], container = wdCb.Hash.create(), verticeIndices = object.verticeIndices, uvIndices = object.uvIndices;
            if (!wd.GeometryUtils.hasData(uvIndices)) {
                return;
            }
            for (var i = 0, len = verticeIndices.length; i < len; i++) {
                var verticeIndex = verticeIndices[i];
                if (this._isSameVertexWithDifferentUvsByCompareToFirstOne(arr, uvIndices[i], verticeIndex)) {
                    if (this._isUvIndiceEqualTheOneOfAddedVertex(container, verticeIndex, uvIndices[i])) {
                        verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, uvIndices[i]);
                    }
                    else {
                        this._addVertexData(object, container, verticeIndex, i);
                    }
                    verticeIndex = verticeIndices[i];
                }
                arr[verticeIndex] = uvIndices[i];
            }
        };
        WDObjectParser.prototype._isSameVertexWithDifferentUvsByCompareToFirstOne = function (arr, uvIndex, verticeIndex) {
            return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== uvIndex;
        };
        WDObjectParser.prototype._addVertexData = function (object, container, verticeIndex, index) {
            var verticeIndices = object.verticeIndices, uvIndices = object.uvIndices, normalIndices = object.normalIndices, vertices = this._findData(object, "vertices"), normals = this._findData(object, "normals"), morphTargets = this._findData(object, "morphTargets"), verticeIndexOfAddedVertex = null;
            this._addThreeComponent(vertices, verticeIndex);
            verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);
            verticeIndices[index] = verticeIndexOfAddedVertex;
            if (wd.GeometryUtils.hasData(morphTargets)) {
                for (var _i = 0; _i < morphTargets.length; _i++) {
                    var frame = morphTargets[_i];
                    this._addThreeComponent(frame.vertices, verticeIndex);
                    if (wd.GeometryUtils.hasData(frame.normals)) {
                        this._addDuplicateNormalOfAddedVertex(frame.normals, normalIndices, index, verticeIndex);
                    }
                }
            }
            if (wd.GeometryUtils.hasData(normals)) {
                this._addDuplicateNormalOfAddedVertex(normals, normalIndices, index, verticeIndex);
                if (wd.GeometryUtils.hasData(normalIndices)) {
                    normalIndices[index] = verticeIndexOfAddedVertex;
                }
            }
            container.appendChild(String(verticeIndex), [uvIndices[index], verticeIndexOfAddedVertex]);
        };
        WDObjectParser.prototype._addDuplicateNormalOfAddedVertex = function (normals, normalIndices, index, oldVerticeIndex) {
            if (!wd.GeometryUtils.hasData(normalIndices)) {
                this._addThreeComponent(normals, normals, oldVerticeIndex);
                return;
            }
            this._addThreeComponent(normals, normals, normalIndices[index]);
        };
        WDObjectParser.prototype._isUvIndiceEqualTheOneOfAddedVertex = function (container, targetVerticeIndex, targetUvIndex) {
            var data = container.getChild(String(targetVerticeIndex));
            if (!data) {
                return false;
            }
            return data.hasChild(function (_a) {
                var uvIndex = _a[0], verticeIndex = _a[1];
                return uvIndex === targetUvIndex;
            });
        };
        WDObjectParser.prototype._getVerticeIndexOfAddedVertexByFindContainer = function (container, targetVerticeIndex, targetUvIndex) {
            var data = container.getChild(String(targetVerticeIndex));
            return data.findOne(function (_a) {
                var uvIndex = _a[0], verticeIndex = _a[1];
                return uvIndex === targetUvIndex;
            })[1];
        };
        WDObjectParser.prototype._getVerticeIndexOfAddedVertex = function (vertices) {
            return vertices.length / 3 - 1;
        };
        WDObjectParser.prototype._addThreeComponent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 2) {
                var data = args[0], index = args[1];
                data.push(data[index * 3], data[index * 3 + 1], data[index * 3 + 2]);
            }
            else {
                var targetData = args[0], sourceData = args[1], index = args[2];
                targetData.push(sourceData[index * 3], sourceData[index * 3 + 1], sourceData[index * 3 + 2]);
            }
        };
        WDObjectParser.prototype._parseObjectFromIndices = function (object) {
            var vertices = [], uvs = [], faces = [], face = null, colors = [], objectVertices = this._findData(object, "vertices"), objectUVs = this._findData(object, "uvs"), objectNormals = this._findData(object, "normals"), objectColors = this._findData(object, "colors");
            for (var i = 0, len = object.verticeIndices.length; i < len; i += 3) {
                var aIndex = object.verticeIndices[i], bIndex = object.verticeIndices[i + 1], cIndex = object.verticeIndices[i + 2], indexArr = [i, i + 1, i + 2], verticeIndiceArr = [aIndex, bIndex, cIndex];
                face = wd.Face3.create(aIndex, bIndex, cIndex);
                if (wd.GeometryUtils.hasData(object.uvIndices) && wd.GeometryUtils.hasData(objectUVs)) {
                    this._setUV(uvs, objectUVs, object.uvIndices, indexArr, verticeIndiceArr);
                }
                if (wd.GeometryUtils.hasData(objectNormals)) {
                    this._setNormal(face.vertexNormals, objectNormals, object.normalIndices, indexArr, verticeIndiceArr);
                }
                faces.push(face);
            }
            object.vertices = objectVertices;
            if (!wd.GeometryUtils.hasData(object.uvIndices)) {
                object.uvs = objectUVs;
            }
            else {
                object.uvs = uvs;
            }
            object.colors = objectColors;
            object.faces = faces;
            this._setMorphTargets(object, object.verticeIndices, object.normalIndices);
        };
        WDObjectParser.prototype._getAnimName = function (frameName) {
            var PATTERN = /([a-z]+)_?(\d+)/, DEFAULT_ANIM_NAME = "default";
            var parts = frameName.match(PATTERN);
            return parts && parts.length > 1 ? parts[1] : DEFAULT_ANIM_NAME;
        };
        WDObjectParser.prototype._removeRebundantIndiceData = function (object) {
            delete object.verticeIndices;
            delete object.uvIndices;
            delete object.normalIndices;
        };
        WDObjectParser.prototype._removeObjectContainerData = function (object) {
            var remove = null;
            remove = function (object) {
                if (object.isContainer) {
                    delete object.vertices;
                    delete object.uvs;
                    delete object.colors;
                }
                if (object.children) {
                    object.children.forEach(function (child) {
                        remove(child);
                    });
                }
            };
            remove(object);
        };
        WDObjectParser.prototype._findData = function (object, dataName) {
            var data = null;
            do {
                data = object[dataName];
            } while (!data && (object = object.parent) !== null);
            return data;
        };
        WDObjectParser.prototype._setUV = function (targetUVs, sourceUVs, uvIndices, indexArr, verticeIndiceArr) {
            var uvIndice1 = null, uvIndice2 = null, uvIndice3 = null, index1 = indexArr[0], index2 = indexArr[1], index3 = indexArr[2], aIndex = verticeIndiceArr[0], bIndex = verticeIndiceArr[1], cIndex = verticeIndiceArr[2];
            uvIndice1 = uvIndices[index1];
            uvIndice2 = uvIndices[index2];
            uvIndice3 = uvIndices[index3];
            this._setTwoComponentData(targetUVs, sourceUVs, aIndex, uvIndice1);
            this._setTwoComponentData(targetUVs, sourceUVs, bIndex, uvIndice2);
            this._setTwoComponentData(targetUVs, sourceUVs, cIndex, uvIndice3);
        };
        WDObjectParser.prototype._setTwoComponentData = function (targetData, sourceData, index, indice) {
            targetData[index * 2] = sourceData[indice * 2];
            targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
        };
        WDObjectParser.prototype._setThreeComponentData = function (targetData, sourceData, index, indice) {
            targetData[index * 3] = sourceData[indice * 3];
            targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
            targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
        };
        WDObjectParser.prototype._getThreeComponentData = function (sourceData, index) {
            var startIndex = 3 * index;
            return wd.Vector3.create(sourceData[startIndex], sourceData[startIndex + 1], sourceData[startIndex + 2]);
        };
        WDObjectParser.prototype._setNormal = function (targetNormals, sourceNormals, normalIndices, indexArr, verticeIndiceArr) {
            var index1 = indexArr[0], index2 = indexArr[1], index3 = indexArr[2];
            if (!wd.GeometryUtils.hasData(normalIndices)) {
                this._addNormalData(targetNormals, sourceNormals, verticeIndiceArr);
                return;
            }
            this._addNormalData(targetNormals, sourceNormals, [normalIndices[index1], normalIndices[index2], normalIndices[index3]]);
        };
        WDObjectParser.prototype._addNormalData = function (targetNormals, sourceNormals, normalIndiceArr) {
            var aIndex = normalIndiceArr[0], bIndex = normalIndiceArr[1], cIndex = normalIndiceArr[2];
            if (targetNormals instanceof wdCb.Collection) {
                targetNormals.addChildren([
                    this._getThreeComponentData(sourceNormals, aIndex),
                    this._getThreeComponentData(sourceNormals, bIndex),
                    this._getThreeComponentData(sourceNormals, cIndex)
                ]);
            }
            else {
                var normals = targetNormals;
                for (var _i = 0, _a = [this._getThreeComponentData(sourceNormals, aIndex), this._getThreeComponentData(sourceNormals, bIndex), this._getThreeComponentData(sourceNormals, cIndex)]; _i < _a.length; _i++) {
                    var v = _a[_i];
                    normals.push(v.x, v.y, v.z);
                }
            }
        };
        WDObjectParser.prototype._setMorphTargets = function (object, verticeIndices, normalIndices) {
            var objectMorphTargets = this._findData(object, "morphTargets"), morphTargets = null, morphNormals = null;
            if (wd.GeometryUtils.hasData(objectMorphTargets)) {
                morphTargets = wdCb.Hash.create();
                morphNormals = wdCb.Hash.create();
                for (var _i = 0; _i < objectMorphTargets.length; _i++) {
                    var frameData = objectMorphTargets[_i];
                    var animName = this._getAnimName(frameData.name);
                    morphTargets.appendChild(animName, frameData.vertices);
                    if (wd.GeometryUtils.hasData(frameData.normals)) {
                        if (wd.GeometryUtils.hasData(normalIndices)) {
                            var normals = [];
                            for (var i = 0, len = verticeIndices.length; i < len; i++) {
                                this._setThreeComponentData(normals, frameData.normals, verticeIndices[i], normalIndices[i]);
                            }
                            morphNormals.appendChild(animName, normals);
                        }
                        else {
                            morphNormals.appendChild(animName, frameData.normals);
                        }
                    }
                }
            }
            object.morphTargets = morphTargets;
            object.morphNormals = morphNormals;
        };
        Object.defineProperty(WDObjectParser.prototype, "_getVerticeIndexOfAddedVertexByFindContainer",
            __decorate([
                wd.require(function (container, targetVerticeIndex, targetUvIndex) {
                    wd.assert(this._isUvIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetUvIndex), wd.Log.info.FUNC_SHOULD("uvIndex", "equal the one of added vertex"));
                })
            ], WDObjectParser.prototype, "_getVerticeIndexOfAddedVertexByFindContainer", Object.getOwnPropertyDescriptor(WDObjectParser.prototype, "_getVerticeIndexOfAddedVertexByFindContainer")));
        Object.defineProperty(WDObjectParser.prototype, "_removeRebundantIndiceData",
            __decorate([
                wd.ensure(function (returnValue, object) {
                    wd.assert(!object.verticeIndices, wd.Log.info.FUNC_SHOULD("object.verticeIndices", "be removed"));
                    wd.assert(!object.uvIndices, wd.Log.info.FUNC_SHOULD("object.uvIndices", "be removed"));
                    wd.assert(!object.normalIndices, wd.Log.info.FUNC_SHOULD("object.normalIndices", "be removed"));
                })
            ], WDObjectParser.prototype, "_removeRebundantIndiceData", Object.getOwnPropertyDescriptor(WDObjectParser.prototype, "_removeRebundantIndiceData")));
        return WDObjectParser;
    })();
    wd.WDObjectParser = WDObjectParser;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var WDBuilder = (function () {
        function WDBuilder() {
            this._result = wdCb.Hash.create();
        }
        WDBuilder.create = function () {
            var obj = new this();
            return obj;
        };
        WDBuilder.prototype.build = function (parseData) {
            this._buildMetadata(parseData);
            this._buildScene(parseData);
            this._buildModels(parseData);
            return this._result;
        };
        WDBuilder.prototype._buildMetadata = function (parseData) {
            var metadata = wdCb.Hash.create();
            for (var i in parseData.metadata) {
                if (parseData.metadata.hasOwnProperty(i)) {
                    metadata.addChild(i, parseData.metadata[i]);
                }
            }
            this._result.addChild("metadata", metadata);
        };
        WDBuilder.prototype._buildScene = function (parseData) {
            var scene = wdCb.Hash.create();
            if (parseData.scene.ambientColor) {
                scene.addChild("ambientColor", parseData.scene.ambientColor);
            }
            this._result.addChild("scene", scene);
        };
        WDBuilder.prototype._buildModels = function (parseData) {
            var models = wdCb.Collection.create(), self = this, build = null;
            build = function (objects, models) {
                objects.forEach(function (object) {
                    var geometry = null, model = null;
                    model = wd.GameObject.create();
                    if (!self._isModelContainer(object)) {
                        geometry = wd.ModelGeometry.create();
                        geometry.vertices = object.vertices;
                        geometry.faces = object.faces;
                        geometry.texCoords = object.uvs;
                        geometry.colors = object.colors;
                        if (object.material) {
                            geometry.material = self._buildMaterial(object.material, parseData.materials);
                        }
                        geometry.morphTargets = object.morphTargets;
                        geometry.morphFaceNormals = object.morphNormals;
                        geometry.morphVertexNormals = object.morphNormals;
                        if (wd.GeometryUtils.hasData(geometry.morphTargets)) {
                            model.addComponent(wd.MorphAnimation.create());
                        }
                        model.addComponent(geometry);
                    }
                    model.name = object.name;
                    model.addComponent(wd.MeshRenderer.create());
                    models.addChild(model);
                    if (object.children) {
                        build(object.children, model);
                    }
                });
            };
            build(parseData.objects, models);
            this._result.addChild("models", models);
        };
        WDBuilder.prototype._isModelContainer = function (object) {
            return object.isContainer;
        };
        WDBuilder.prototype._buildMaterial = function (materialName, materials) {
            var DEFAULTYPE = "LightMaterial";
            var materialData = null, type = null, material = null;
            _a = materials.findOne(function (material, name) {
                return name === materialName;
            }), materialData = _a[1];
            type = materialData.type || DEFAULTYPE;
            wdCb.Log.error(!wd[type], wdCb.Log.info.FUNC_NOT_EXIST("materialClass:" + type));
            material = wd[type].create();
            material.name = materialName;
            if (materialData.diffuseColor) {
                material.color = materialData.diffuseColor;
            }
            if (materialData.specularColor) {
                material.specular = materialData.specularColor;
            }
            if (materialData.diffuseMap) {
                material.diffuseMap = materialData.diffuseMap;
            }
            if (materialData.specularMap) {
                material.specularMap = materialData.specularMap;
            }
            if (materialData.normalMap) {
                material.normalMap = materialData.normalMap;
            }
            if (materialData.shininess !== null) {
                material.shininess = materialData.shininess;
            }
            if (materialData.opacity !== null) {
                material.opacity = materialData.opacity;
            }
            return material;
            var _a;
        };
        return WDBuilder;
    })();
    wd.WDBuilder = WDBuilder;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventListenerMap = (function () {
        function EventListenerMap() {
            this._listenerMap = wdCb.Hash.create();
        }
        EventListenerMap.create = function () {
            var obj = new this();
            return obj;
        };
        EventListenerMap.prototype.appendChild = function (target, eventName, data) {
            this._listenerMap.appendChild(this._buildKey(target, eventName), data);
        };
        EventListenerMap.prototype.getChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            if (args.length === 1 && wd.JudgeUtils.isString(args[0])) {
                var eventName = args[0];
                return this._listenerMap.getChild(eventName);
            }
            else if (args.length === 1) {
                var target = args[0];
                return this._listenerMap.filter(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (args.length === 2) {
                var target = args[0], eventName = args[1];
                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.hasChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1 && wd.JudgeUtils.isFunction(args[0])) {
                return this._listenerMap.hasChild(args[0]);
            }
            else if (args.length === 2) {
                var target = args[0], eventName = args[1], list = this._listenerMap.getChild(this._buildKey(target, eventName));
                return list && list.getCount() > 0;
            }
        };
        EventListenerMap.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventListenerMap.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventListenerMap.prototype.removeChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, result = null;
            if (args.length === 1 && wd.JudgeUtils.isString(args[0])) {
                var eventName = args[0];
                result = this._listenerMap.removeChild(eventName);
            }
            else if (args.length === 2 && wd.JudgeUtils.isFunction(args[1])) {
                var eventName = args[0], handler = args[1], list = null;
                list = this._listenerMap.getChild(eventName);
                result = wdCb.Collection.create().addChild(list.removeChild(function (val) {
                    return val.originHandler === handler;
                }));
                if (list.getCount() === 0) {
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if (args.length === 2 && wd.JudgeUtils.isNumber(args[0])) {
                var uid = args[0], eventName = args[1];
                result = this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if (args.length === 1) {
                var target = args[0];
                result = this._listenerMap.removeChild(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (args.length === 2) {
                var target = args[0], eventName = args[1];
                result = this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if (args.length === 3) {
                var target = args[0], eventName = args[1], resultList = wdCb.Collection.create(), handler = args[2];
                this._listenerMap.forEach(function (list, key) {
                    var result = list.removeChild(function (val) {
                        return val.originHandler === handler;
                    });
                    if (result.getCount() > 0) {
                        resultList.addChild(result);
                    }
                    if (list.getCount() === 0) {
                        return wdCb.$REMOVE;
                    }
                });
                result = resultList;
            }
            return result;
        };
        EventListenerMap.prototype.getEventOffDataList = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = wdCb.Collection.create(), target = args[0], self = this;
            if (args.length === 1) {
                this.getChild(target)
                    .forEach(function (list, key) {
                    if (list && list.getCount() > 0) {
                        result.addChild({
                            eventName: self.getEventNameFromKey(key),
                            domHandler: list.getChild(0).domHandler
                        });
                    }
                });
                return result;
            }
            else if (args.length === 2) {
                var eventName = args[1], list = this.getChild(target, eventName);
                if (list && list.getCount() > 0) {
                    result.addChild({
                        eventName: eventName,
                        domHandler: list.getChild(0).domHandler
                    });
                }
                return result;
            }
        };
        EventListenerMap.prototype.getEventNameFromKey = function (key) {
            var separator = "" + EventListenerMap.eventSeparator;
            return key.indexOf(separator) > -1 ? key.split(separator)[1] : key;
        };
        EventListenerMap.prototype.getUidFromKey = function (key) {
            var separator = "" + EventListenerMap.eventSeparator;
            return key.indexOf(separator) > -1 ? Number(key.split(separator)[0]) : null;
        };
        EventListenerMap.prototype.isTarget = function (key, target, list) {
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        };
        EventListenerMap.prototype._buildKey = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (wd.JudgeUtils.isNumber(args[0])) {
                var uid = args[0], eventName = args[1];
                return this._buildKeyWithUid(uid, eventName);
            }
            else {
                var target = args[0], eventName = args[1];
                return target ? this._buildKeyWithUid(target.uid, eventName) : eventName;
            }
        };
        EventListenerMap.prototype._buildKeyWithUid = function (uid, eventName) {
            return "" + String(uid) + EventListenerMap.eventSeparator + eventName;
        };
        EventListenerMap.eventSeparator = "@";
        return EventListenerMap;
    })();
    wd.EventListenerMap = EventListenerMap;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (EventType) {
        EventType[EventType["MOUSE"] = 0] = "MOUSE";
        EventType[EventType["KEYBOARD"] = 1] = "KEYBOARD";
        EventType[EventType["CUSTOM"] = 2] = "CUSTOM";
    })(wd.EventType || (wd.EventType = {}));
    var EventType = wd.EventType;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (EventName) {
        EventName[EventName["CLICK"] = "click"] = "CLICK";
        EventName[EventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
        EventName[EventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
        EventName[EventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
        EventName[EventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
        EventName[EventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
        EventName[EventName["MOUSEWHEEL"] = "mousewheel"] = "MOUSEWHEEL";
        EventName[EventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
        EventName[EventName["KEYUP"] = "keyup"] = "KEYUP";
        EventName[EventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
    })(wd.EventName || (wd.EventName = {}));
    var EventName = wd.EventName;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (EventPhase) {
        EventPhase[EventPhase["BROADCAST"] = 0] = "BROADCAST";
        EventPhase[EventPhase["EMIT"] = 1] = "EMIT";
    })(wd.EventPhase || (wd.EventPhase = {}));
    var EventPhase = wd.EventPhase;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var _table = wdCb.Hash.create();
    _table.addChild(wd.EventName.CLICK, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEOVER, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEOUT, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEMOVE, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEDOWN, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEUP, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.MOUSEWHEEL, wd.EventType.MOUSE);
    _table.addChild(wd.EventName.KEYDOWN, wd.EventType.KEYBOARD);
    _table.addChild(wd.EventName.KEYPRESS, wd.EventType.KEYBOARD);
    _table.addChild(wd.EventName.KEYUP, wd.EventType.KEYBOARD);
    var EventTable = (function () {
        function EventTable() {
        }
        EventTable.getEventType = function (eventName) {
            var result = _table.getChild(eventName);
            if (result === void 0) {
                result = wd.EventType.CUSTOM;
            }
            return result;
        };
        return EventTable;
    })();
    wd.EventTable = EventTable;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Event = (function () {
        function Event(eventName) {
            this.p_type = null;
            this.name = null;
            this.target = null;
            this.currentTarget = null;
            this.isStopPropagation = false;
            this.phase = null;
            this.name = eventName;
        }
        Object.defineProperty(Event.prototype, "type", {
            get: function () {
                wd.Log.error(this.p_type === null, wd.Log.info.ABSTRACT_ATTRIBUTE);
                return this.p_type;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.stopPropagation = function () {
            this.isStopPropagation = true;
        };
        Event.prototype.copyMember = function (destination, source, memberArr) {
            memberArr.forEach(function (member) {
                destination[member] = source[member];
            });
            return destination;
        };
        return Event;
    })();
    wd.Event = Event;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DomEvent = (function (_super) {
        __extends(DomEvent, _super);
        function DomEvent(event, eventName) {
            _super.call(this, eventName);
            this._event = null;
            this.event = event;
        }
        Object.defineProperty(DomEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || wd.root.event;
            },
            enumerable: true,
            configurable: true
        });
        DomEvent.prototype.preventDefault = function () {
            var e = this._event;
            if (bowser.msie && Number(bowser.version) <= 8) {
                e.returnValue = false;
            }
            else {
                e.preventDefault();
            }
        };
        return DomEvent;
    })(wd.Event);
    wd.DomEvent = DomEvent;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd_1) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent() {
            _super.apply(this, arguments);
            this.p_type = wd_1.EventType.MOUSE;
            this._location = null;
            this._locationInView = null;
            this._button = null;
        }
        MouseEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(MouseEvent.prototype, "location", {
            get: function () {
                var point = null, e = this.event;
                if (this._location) {
                    return this._location;
                }
                point = wd_1.Point.create();
                if (bowser.msie) {
                    point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                    point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
                }
                else {
                    point.x = e.pageX;
                    point.y = e.pageY;
                }
                return point;
            },
            set: function (point) {
                this._location = point;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "locationInView", {
            get: function () {
                var point = null, viewOffset = null;
                if (this._locationInView) {
                    return this._locationInView;
                }
                point = this.location;
                viewOffset = wd_1.DeviceManager.getInstance().view.offset;
                return wd_1.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
            },
            set: function (locationInView) {
                this._locationInView = locationInView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "button", {
            get: function () {
                var e = this.event, mouseButton = null;
                if (this._button) {
                    return this._button;
                }
                if (bowser.msie) {
                    switch (e.button) {
                        case 1:
                            mouseButton = wd_1.MouseButton.LEFT;
                            break;
                        case 4:
                            mouseButton = wd_1.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = wd_1.MouseButton.CENTER;
                            break;
                        default:
                            wd_1.Log.error(true, wd_1.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            break;
                    }
                }
                else {
                    switch (e.button) {
                        case 0:
                            mouseButton = wd_1.MouseButton.LEFT;
                            break;
                        case 1:
                            mouseButton = wd_1.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = wd_1.MouseButton.CENTER;
                            break;
                        default:
                            wd_1.Log.error(true, wd_1.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            break;
                    }
                }
                return mouseButton;
            },
            set: function (button) {
                this._button = button;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "wheel", {
            get: function () {
                /*!
                 FF uses 'detail' and returns a value in 'no. of lines' to scroll
                 WebKit and Opera use 'wheelDelta', WebKit goes in multiples of 120 per wheel notch
                 */
                var e = this.event;
                if (e.detail) {
                    return -1 * e.detail;
                }
                if (e.wheelDelta) {
                    return e.wheelDelta / 120;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "movementDelta", {
            get: function () {
                var e = this.event, dx = null, wd = null;
                if (this._isPointerLocked()) {
                    dx = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
                    wd = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
                }
                else {
                    var location_1 = this.location, handler = wd_1.MouseEventHandler.getInstance(), lastX = handler.lastX, lastY = handler.lastY;
                    if (lastX === null && lastY === null) {
                        dx = 0;
                        wd = 0;
                    }
                    else {
                        dx = location_1.x - lastX;
                        wd = location_1.y - lastY;
                    }
                }
                return {
                    x: dx,
                    y: wd
                };
            },
            enumerable: true,
            configurable: true
        });
        MouseEvent.prototype.copy = function () {
            var eventObj = MouseEvent.create(this.event, this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
        };
        MouseEvent.prototype._isPointerLocked = function () {
            return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
        };
        return MouseEvent;
    })(wd_1.DomEvent);
    wd_1.MouseEvent = MouseEvent;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var SPECIAL_KEY_MAP = {
        8: "backspace",
        9: "tab",
        10: "return",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        59: ";",
        61: "=",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, SHIFT_KEY_MAP = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    };
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent() {
            _super.apply(this, arguments);
            this.p_type = wd.EventType.KEYBOARD;
        }
        KeyboardEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
            get: function () {
                return this.event.ctrlKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "altKey", {
            get: function () {
                return this.event.altKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
            get: function () {
                return this.event.shiftKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
            get: function () {
                return this.event.metaKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
            get: function () {
                return this.event.keyCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "key", {
            get: function () {
                var key = SPECIAL_KEY_MAP[this.keyCode], char = null;
                if (!key) {
                    char = String.fromCharCode(this.keyCode).toLowerCase();
                    if (this.shiftKey) {
                        return SHIFT_KEY_MAP[char];
                    }
                    return char;
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "keyState", {
            get: function () {
                return wd.KeyboardEventHandler.getInstance().keyState;
            },
            enumerable: true,
            configurable: true
        });
        KeyboardEvent.prototype.copy = function () {
            var eventObj = KeyboardEvent.create(this.event, this.name);
            return this.copyMember(eventObj, this, ["altKey", "shiftKey", "ctrlKey", "metaKey", "keyCode", "key"]);
        };
        return KeyboardEvent;
    })(wd.DomEvent);
    wd.KeyboardEvent = KeyboardEvent;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent() {
            _super.apply(this, arguments);
            this.p_type = wd.EventType.CUSTOM;
            this.userData = null;
        }
        CustomEvent.create = function (eventName) {
            var obj = new this(eventName);
            return obj;
        };
        CustomEvent.prototype.copyPublicAttri = function (destination, source) {
            var property = null;
            wdCb.ExtendUtils.extend(destination, function (item, property) {
                return property.slice(0, 1) !== "_"
                    && !wd.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        CustomEvent.prototype.copy = function () {
            var eventObj = CustomEvent.create(this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return CustomEvent;
    })(wd.Event);
    wd.CustomEvent = CustomEvent;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (MouseButton) {
        MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
        MouseButton[MouseButton["RIGHT"] = 1] = "RIGHT";
        MouseButton[MouseButton["CENTER"] = 2] = "CENTER";
    })(wd.MouseButton || (wd.MouseButton = {}));
    var MouseButton = wd.MouseButton;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventListener = (function () {
        function EventListener(option) {
            this.eventType = null;
            this.priority = null;
            this.handlerDataList = wdCb.Collection.create();
            this.eventType = option.eventType;
            this.priority = option.priority || 1;
        }
        EventListener.create = function (option) {
            var obj = new this(option);
            obj.initWhenCreate(option);
            return obj;
        };
        EventListener.prototype.initWhenCreate = function (option) {
            this._setHandlerDataList(option);
        };
        EventListener.prototype._setHandlerDataList = function (option) {
            var i = null, REGEX_HANDER = /on\w+/;
            for (i in option) {
                if (option.hasOwnProperty(i)) {
                    if (REGEX_HANDER.test(i)) {
                        this.handlerDataList.addChild({
                            eventName: this._parseEventName(i),
                            handler: option[i]
                        });
                    }
                }
            }
        };
        EventListener.prototype._parseEventName = function (handlerName) {
            return handlerName.slice(2).toLowerCase();
        };
        return EventListener;
    })();
    wd.EventListener = EventListener;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventHandler = (function () {
        function EventHandler() {
        }
        return EventHandler;
    })();
    wd.EventHandler = EventHandler;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var DomEventHandler = (function (_super) {
        __extends(DomEventHandler, _super);
        function DomEventHandler() {
            _super.apply(this, arguments);
        }
        DomEventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, dom = this.getDom(), eventRegister = wd.EventRegister.getInstance(), eventOffDataList = null;
            eventOffDataList = eventRegister.remove.apply(eventRegister, args);
            if (eventOffDataList) {
                eventOffDataList.forEach(function (list) {
                    list.forEach(function (eventOffData) {
                        self._unBind(dom, eventOffData.eventName, eventOffData.domHandler);
                    });
                });
            }
            this.clearHandler();
        };
        DomEventHandler.prototype.clearHandler = function () {
        };
        DomEventHandler.prototype.buildDomHandler = function (target, eventName) {
            var self = this, context = wd.root;
            return wdCb.EventUtils.bindEvent(context, function (event) {
                self.triggerDomEvent(event, eventName, target);
            });
        };
        DomEventHandler.prototype.handler = function (target, eventName, handler, priority) {
            var domHandler = null, originHandler = handler;
            handler = this.addEngineHandler(target, eventName, handler);
            if (!wd.EventRegister.getInstance().isBinded(target, eventName)) {
                domHandler = this._bind(this.getDom(), eventName, target);
            }
            else {
                domHandler = wd.EventRegister.getInstance().getDomHandler(target, eventName);
            }
            wd.EventRegister.getInstance().register(target, eventName, handler, originHandler, domHandler, priority);
        };
        DomEventHandler.prototype._bind = function (dom, eventName, target) {
            var domHandler = null;
            domHandler = this.buildDomHandler(target, eventName);
            wdCb.EventUtils.addEvent(dom, eventName, domHandler);
            return domHandler;
        };
        DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
            wdCb.EventUtils.removeEvent(dom, eventName, handler);
        };
        Object.defineProperty(DomEventHandler.prototype, "clearHandler",
            __decorate([
                wd.virtual
            ], DomEventHandler.prototype, "clearHandler", Object.getOwnPropertyDescriptor(DomEventHandler.prototype, "clearHandler")));
        return DomEventHandler;
    })(wd.EventHandler);
    wd.DomEventHandler = DomEventHandler;
})(wd || (wd = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var wd;
(function (wd) {
    var MouseEventHandler = (function (_super) {
        __extends(MouseEventHandler, _super);
        function MouseEventHandler() {
            _super.apply(this, arguments);
            this.lastX = null;
            this.lastY = null;
        }
        MouseEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        MouseEventHandler.prototype.on = function (target, eventName, handler, priority) {
            this.handler(target, eventName, handler, priority);
        };
        MouseEventHandler.prototype.trigger = function (target, event, notSetTarget) {
            var eventName = event.name, registerDataList = null, isStopPropagation = false;
            if (!(target instanceof wd.GameObject)) {
                wd.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            if (!notSetTarget) {
                event.target = target;
            }
            registerDataList = wd.EventRegister.getInstance().getEventRegisterDataList(target, eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        MouseEventHandler.prototype.getDom = function () {
            return wd.DeviceManager.getInstance().view.dom;
        };
        MouseEventHandler.prototype.triggerDomEvent = function (event, eventName, target) {
            var eventObj = this._createEventObject(event, eventName, target);
            wd.EventManager.emit(this._getTopTarget(eventObj), eventObj);
        };
        MouseEventHandler.prototype.addEngineHandler = function (target, eventName, handler) {
            var resultHandler = null;
            switch (eventName) {
                case wd.EventName.MOUSEMOVE:
                    resultHandler = this._handleMove(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }
            return resultHandler;
        };
        MouseEventHandler.prototype.clearHandler = function () {
            this.lastX = null;
            this.lastY = null;
        };
        MouseEventHandler.prototype._getTopTarget = function (event) {
            return wd.Director.getInstance().getTopUnderPoint(event.locationInView);
        };
        MouseEventHandler.prototype._handleMove = function (handler) {
            var self = this;
            return function (event) {
                handler(event);
                self._saveLocation(event);
            };
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventName, currentTarget) {
            var obj = wd.MouseEvent.create(event ? event : wd.root.event, eventName);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler.prototype._saveLocation = function (event) {
            var location = null;
            location = event.location;
            this.lastX = location.x;
            this.lastY = location.y;
        };
        MouseEventHandler._instance = null;
        Object.defineProperty(MouseEventHandler.prototype, "on",
            __decorate([
                wd.require(function (target, eventName, handler, priority) {
                    wd.assert(target instanceof wd.GameObject, wd.Log.info.FUNC_MUST_BE("target", "GameObject"));
                })
            ], MouseEventHandler.prototype, "on", Object.getOwnPropertyDescriptor(MouseEventHandler.prototype, "on")));
        return MouseEventHandler;
    })(wd.DomEventHandler);
    wd.MouseEventHandler = MouseEventHandler;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var KeyboardEventHandler = (function (_super) {
        __extends(KeyboardEventHandler, _super);
        function KeyboardEventHandler() {
            _super.apply(this, arguments);
            this.keyState = {};
        }
        KeyboardEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        KeyboardEventHandler.prototype.on = function (eventName, handler, priority) {
            this.handler(null, eventName, handler, priority);
        };
        KeyboardEventHandler.prototype.trigger = function (event) {
            var eventName = event.name, registerDataList = null;
            registerDataList = wd.EventRegister.getInstance().getEventRegisterDataList(eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
            });
            return true;
        };
        KeyboardEventHandler.prototype.getDom = function () {
            return document;
        };
        KeyboardEventHandler.prototype.triggerDomEvent = function (event, eventName, target) {
            var eventObj = this._createEventObject(event, eventName);
            wd.EventManager.trigger(eventObj);
        };
        KeyboardEventHandler.prototype.addEngineHandler = function (target, eventName, handler) {
            var resultHandler = null;
            switch (eventName) {
                case wd.EventName.KEYDOWN:
                    resultHandler = this._handleKeyDown(handler);
                    break;
                case wd.EventName.KEYUP:
                    resultHandler = this._handleKeyUp(handler);
                    break;
                default:
                    resultHandler = handler;
                    break;
            }
            return resultHandler;
        };
        KeyboardEventHandler.prototype.clearHandler = function () {
            this.keyState = {};
        };
        KeyboardEventHandler.prototype._handleKeyDown = function (handler) {
            var self = this;
            return function (event) {
                self._setKeyStateAllFalse();
                self.keyState[event.key] = true;
                handler(event);
            };
        };
        KeyboardEventHandler.prototype._handleKeyUp = function (handler) {
            var self = this;
            return function (event) {
                self._setKeyStateAllFalse();
                handler(event);
            };
        };
        KeyboardEventHandler.prototype._setKeyStateAllFalse = function () {
            for (var i in this.keyState) {
                if (this.keyState.hasOwnProperty(i)) {
                    this.keyState[i] = false;
                }
            }
        };
        KeyboardEventHandler.prototype._createEventObject = function (event, eventName) {
            var obj = wd.KeyboardEvent.create(event ? event : wd.root.event, eventName);
            return obj;
        };
        KeyboardEventHandler._instance = null;
        return KeyboardEventHandler;
    })(wd.DomEventHandler);
    wd.KeyboardEventHandler = KeyboardEventHandler;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CustomEventHandler = (function (_super) {
        __extends(CustomEventHandler, _super);
        function CustomEventHandler() {
            _super.apply(this, arguments);
        }
        CustomEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        CustomEventHandler.prototype.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 3) {
                var eventName = args[0], handler = args[1], originHandler = handler, priority = args[2];
                wd.EventRegister.getInstance().register(null, eventName, handler, originHandler, null, priority);
            }
            else if (args.length === 4) {
                var target = args[0], eventName = args[1], handler = args[2], originHandler = handler, priority = args[3];
                wd.EventRegister.getInstance().register(target, eventName, handler, originHandler, null, priority);
            }
        };
        CustomEventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var eventRegister = wd.EventRegister.getInstance();
            eventRegister.remove.apply(eventRegister, args);
        };
        CustomEventHandler.prototype.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var event = null;
            if (args.length === 1 || args.length === 2) {
                var userData = null;
                if (args.length === 1) {
                    event = args[0];
                }
                else {
                    event = args[0];
                    userData = args[1];
                }
                return this._triggerEventHandler(event, userData);
            }
            else if (args.length === 3 || args.length === 4) {
                var target = null, userData = null, notSetTarget = null;
                if (args.length === 3) {
                    target = args[0];
                    event = args[1];
                    notSetTarget = args[2];
                }
                else {
                    target = args[0];
                    event = args[1];
                    userData = args[2];
                    notSetTarget = args[3];
                }
                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }
        };
        CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
            var listenerDataList = null, self = this;
            listenerDataList = wd.EventRegister.getInstance().getEventRegisterDataList(event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
            });
            return true;
        };
        CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            if (!notSetTarget) {
                event.target = target;
            }
            listenerDataList = wd.EventRegister.getInstance().getEventRegisterDataList(target, event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        CustomEventHandler.prototype._setUserData = function (event, userData) {
            if (userData) {
                event.userData = userData;
            }
        };
        CustomEventHandler._instance = null;
        return CustomEventHandler;
    })(wd.EventHandler);
    wd.CustomEventHandler = CustomEventHandler;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
        }
        EventDispatcher.create = function () {
            var obj = new this();
            return obj;
        };
        EventDispatcher.prototype.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                var event_1 = args[0], eventType = event_1.type;
                return wd.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_1);
            }
            else if (args.length === 2 && !(args[1] instanceof wd.Event)) {
                var event_2 = args[0], userData = args[1], eventType = event_2.type;
                wd.Log.error(eventType !== wd.EventType.CUSTOM, wd.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return wd.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_2, userData);
            }
            else if (args.length === 2 || (args.length === 3 && wd.JudgeUtils.isBoolean(args[2]))) {
                var target = args[0], event_3 = args[1], notSetTarget = args[2] === void 0 ? false : args[2], eventType = event_3.type;
                return wd.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_3, notSetTarget);
            }
            else if (args.length === 3 || args.length === 4) {
                var target = args[0], event_4 = args[1], userData = args[2], notSetTarget = args[3] === void 0 ? false : args[3], eventType = event_4.type;
                wd.Log.error(eventType !== wd.EventType.CUSTOM, wd.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return wd.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_4, userData, notSetTarget);
            }
        };
        EventDispatcher.prototype.emit = function (target, eventObject, userData) {
            var isStopPropagation = false;
            eventObject.phase = wd.EventPhase.EMIT;
            eventObject.target = target;
            do {
                isStopPropagation = this._triggerWithUserData(target, eventObject, userData, true);
                if (isStopPropagation) {
                    break;
                }
                target = this._getParent(target);
            } while (target);
        };
        EventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
            var self = this;
            eventObject.phase = wd.EventPhase.BROADCAST;
            eventObject.target = target;
            this._triggerWithUserData(target, eventObject, userData, true);
            function iterator(obj) {
                var children = obj.getChildren();
                if (children.getCount() === 0) {
                    return;
                }
                children.forEach(function (child) {
                    self._triggerWithUserData(child, eventObject.copy(), userData, true);
                    iterator(child);
                });
            }
            iterator(target);
        };
        EventDispatcher.prototype._getParent = function (target) {
            var parent = target.bubbleParent;
            return parent ? parent : target.parent;
        };
        EventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
            return userData ? this.trigger(target, event, userData, notSetTarget)
                : this.trigger(target, event, notSetTarget);
        };
        return EventDispatcher;
    })();
    wd.EventDispatcher = EventDispatcher;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventRegister = (function () {
        function EventRegister() {
            this._listenerMap = wd.EventListenerMap.create();
        }
        EventRegister.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        EventRegister.prototype.register = function (target, eventName, handler, originHandler, domHandler, priority) {
            this._listenerMap.appendChild(target, eventName, {
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        };
        EventRegister.prototype.remove = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var target = args[0], result = null;
            if (args.length === 1 && wd.JudgeUtils.isString(args[0])) {
                var eventName = args[0];
                result = this._listenerMap.removeChild(eventName);
            }
            else if (args.length === 2 && wd.JudgeUtils.isFunction(args[1])) {
                var eventName = args[0], handler = args[1];
                result = this._listenerMap.removeChild(eventName, handler);
            }
            else if (args.length === 2 && wd.JudgeUtils.isNumber(args[0])) {
                var uid = args[0], eventName = args[1];
                result = this._listenerMap.removeChild(uid, eventName);
            }
            else if (args.length === 1) {
                result = this._listenerMap.removeChild(target);
                this._handleAfterAllEventHandlerRemoved(target);
            }
            else if (args.length === 2 || args.length === 3) {
                result = this._listenerMap.removeChild.apply(this._listenerMap, args);
                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                }
            }
            return result;
        };
        EventRegister.prototype.getEventRegisterDataList = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = this._listenerMap.getChild.apply(this._listenerMap, args);
            if (!result) {
                return null;
            }
            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        };
        EventRegister.prototype.setBubbleParent = function (target, parent) {
            target.bubbleParent = parent;
        };
        EventRegister.prototype.isBinded = function (target, eventName) {
            return this._listenerMap.hasChild(target, eventName);
        };
        EventRegister.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventRegister.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventRegister.prototype.getChild = function (target, eventName) {
            return this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
        };
        EventRegister.prototype.getEventNameFromKey = function (key) {
            return this._listenerMap.getEventNameFromKey(key);
        };
        EventRegister.prototype.getUidFromKey = function (key) {
            return this._listenerMap.getUidFromKey(key);
        };
        EventRegister.prototype.getDomHandler = function (target, eventName) {
            var list = this.getChild(target, eventName);
            if (list && list.getCount() > 0) {
                return list.getChild(0).domHandler;
            }
        };
        EventRegister.prototype.isTarget = function (key, target, list) {
            return this._listenerMap.isTarget(key, target, list);
        };
        EventRegister.prototype._isAllEventHandlerRemoved = function (target) {
            return !this._listenerMap.hasChild(function (list, key) {
                return key.indexOf(String(target.uid)) > -1 && (list && list.getCount() > 0);
            });
        };
        EventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
            this.setBubbleParent(target, null);
        };
        EventRegister._instance = null;
        return EventRegister;
    })();
    wd.EventRegister = EventRegister;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var EventBinder = (function () {
        function EventBinder() {
        }
        EventBinder.create = function () {
            var obj = new this();
            return obj;
        };
        EventBinder.prototype.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                var listener = !(args[0] instanceof wd.EventListener) ? wd.EventListener.create(args[0]) : args[0];
                listener.handlerDataList.forEach(function (handlerData) {
                    wd.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (args.length === 2) {
                var target = args[0], listener = !(args[1] instanceof wd.EventListener) ? wd.EventListener.create(args[1]) : args[1];
                listener.handlerDataList.forEach(function (handlerData) {
                    wd.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (args.length === 3) {
                var eventName = args[0], handler = args[1], priority = args[2];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if (args.length === 4) {
                var target = args[0], eventName = args[1], handler = args[2], priority = args[3];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        };
        EventBinder.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var eventRegister = wd.EventRegister.getInstance();
            if (args.length === 0) {
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key), targetUid = eventRegister.getUidFromKey(key);
                    if (!targetUid) {
                        wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                            .off(eventName);
                    }
                    else {
                        wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName)).off(targetUid, eventName);
                    }
                });
            }
            else if (args.length === 1 && wd.JudgeUtils.isString(args[0])) {
                var eventName = args[0];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if (args.length === 2 && wd.JudgeUtils.isFunction(args[1])) {
                var eventName = args[0], handler = args[1];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if (args.length === 1) {
                var target = args[0];
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key);
                    if (eventRegister.isTarget(key, target, list)) {
                        wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if (args.length === 2) {
                var target = args[0], eventName = args[1];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if (args.length === 3) {
                var target = args[0], eventName = args[1], handler = args[2];
                wd.FactoryEventHandler.createEventHandler(wd.EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        };
        EventBinder.prototype._checkEventSeparator = function (eventName) {
            wd.assert(eventName.indexOf(wd.EventListenerMap.eventSeparator) === -1, wd.Log.info.FUNC_SHOULD_NOT("eventName", "contain " + wd.EventListenerMap.eventSeparator));
        };
        Object.defineProperty(EventBinder.prototype, "on",
            __decorate([
                wd.require(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length === 1) {
                    }
                    else if (args.length === 2) {
                    }
                    else if (args.length === 3) {
                        var eventName = args[0], handler = args[1], priority = args[2];
                        this._checkEventSeparator(eventName);
                    }
                    else if (args.length === 4) {
                        var target = args[0], eventName = args[1], handler = args[2], priority = args[3];
                        this._checkEventSeparator(eventName);
                    }
                })
            ], EventBinder.prototype, "on", Object.getOwnPropertyDescriptor(EventBinder.prototype, "on")));
        return EventBinder;
    })();
    wd.EventBinder = EventBinder;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var FactoryEventHandler = (function () {
        function FactoryEventHandler() {
        }
        FactoryEventHandler.createEventHandler = function (eventType) {
            var handler = null;
            switch (eventType) {
                case wd.EventType.MOUSE:
                    handler = wd.MouseEventHandler.getInstance();
                    break;
                case wd.EventType.KEYBOARD:
                    handler = wd.KeyboardEventHandler.getInstance();
                    break;
                case wd.EventType.CUSTOM:
                    handler = wd.CustomEventHandler.getInstance();
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_INVALID("eventType"));
                    break;
            }
            return handler;
        };
        return FactoryEventHandler;
    })();
    wd.FactoryEventHandler = FactoryEventHandler;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 1) {
                var listener = args[0];
                this._eventBinder.on(listener);
            }
            else if (args.length === 2 && wd.JudgeUtils.isString(args[0]) && wd.JudgeUtils.isFunction(args[1])) {
                var eventName = args[0], handler = args[1], priority = 1;
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (args.length === 2) {
                var target = args[0], listener = args[1];
                this._eventBinder.on(target, listener);
            }
            else if (args.length === 3 && wd.JudgeUtils.isString(args[0]) && wd.JudgeUtils.isFunction(args[1]) && wd.JudgeUtils.isNumber(args[2])) {
                var eventName = args[0], handler = args[1], priority = args[2];
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (args.length === 3 || args.length === 4) {
                var target = args[0], eventName = args[1], handler = args[2], priority = args[3] === undefined ? 1 : args[3];
                this._eventBinder.on(target, eventName, handler, priority);
            }
        };
        EventManager.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._eventBinder.off.apply(this._eventBinder, args);
        };
        EventManager.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._eventDispatcher.trigger.apply(this._eventDispatcher, args);
        };
        EventManager.broadcast = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, args);
        };
        EventManager.emit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._eventDispatcher.emit.apply(this._eventDispatcher, args);
        };
        EventManager.fromEvent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var addHandler = null, removeHandler = null;
            if (args.length === 1) {
                var eventName = args[0];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2 && wd.JudgeUtils.isNumber(args[1])) {
                var eventName = args[0], priority = args[1];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (args.length === 2) {
                var target = args[0], eventName = args[1];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (args.length === 3) {
                var target = args[0], eventName = args[1], priority = args[2];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            return wdFrp.fromEventPattern(addHandler, removeHandler);
        };
        EventManager.setBubbleParent = function (target, parent) {
            wd.EventRegister.getInstance().setBubbleParent(target, parent);
        };
        EventManager._eventBinder = wd.EventBinder.create();
        EventManager._eventDispatcher = wd.EventDispatcher.create();
        return EventManager;
    })();
    wd.EventManager = EventManager;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (EngineEvent) {
        /*! global event should add "dy_" prefix */
        EngineEvent[EngineEvent["STARTLOOP"] = "dy_startLoop"] = "STARTLOOP";
        EngineEvent[EngineEvent["ENDLOOP"] = "dy_endLoop"] = "ENDLOOP";
        EngineEvent[EngineEvent["BEFORE_INIT"] = "dy_beforeInit"] = "BEFORE_INIT";
        EngineEvent[EngineEvent["AFTER_INIT"] = "dy_afterInit"] = "AFTER_INIT";
    })(wd.EngineEvent || (wd.EngineEvent = {}));
    var EngineEvent = wd.EngineEvent;
})(wd || (wd = {}));


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/*!
DeviceManager is responsible for global setting of gl
 */
var wd;
(function (wd) {
    var DeviceManager = (function () {
        function DeviceManager() {
            this.view = null;
            this.gl = null;
            /*!
            test order:
            scissor test -> depth test -> stencil test -> specular add -> fog -> alpha blend -> write mask
             */
            /*!
             The scissor test culls pixels that are outside of the scissor rectangle, a user-defined rectangular sub-section of the render target.
             The scissor rectangle could be used to indicate the area of the render target where the game world is drawn. The area outside the rectangle is culled and could be devoted to a game's GUI. The scissor test cannot cull non-rectangular areas.
             Scissor rectangles cannot be set larger than the render target, but they can be set larger than the viewport.
             The scissor rectangle is managed by a device render state. A scissor test is enabled or disabled by setting the renderstate to TRUE or FALSE. This test is performed after the fragment color is computed but before alpha testing. IDirect3DDevice9
             */
            this._scissorTest = null;
            /*! 默认情况是将需要绘制的新像素的z值与深度缓冲区中对应位置的z值进行比较，如果比深度缓存中的值小，那么用新像素的颜色值更新帧缓存中对应像素的颜色值。
             但是可以使用glDepthFunc(func)来对这种默认测试方式进行修改。
             其中参数func的值可以为GL_NEVER（没有处理）、GL_ALWAYS（处理所有）、GL_LESS（小于）、GL_LEQUAL（小于等于）、GL_EQUAL（等于）、GL_GEQUAL（大于等于）、GL_GREATER（大于）或GL_NOTEQUAL（不等于），其中默认值是GL_LESS。
    
             gl.depthFunc(gl.LEQUAL);
             */
            this._depthTest = null;
            this._depthFunc = null;
            this._side = null;
            /*!
             偏移值是在z值计算后、深度检测之前加上的，此时坐标已经被映射到Normalized Device Coordinates中了，
             而此时的z轴是向内的（opengl的z轴是向外的），因此多边形偏移量为正值的话，意味着往远处移动，否则往近处移动。
             可参考下面的说明：
             The results are summed to produce the depth offset. This offset is applied in screen space, typically with positive Z pointing into the screen.
             the offset is calculated after the normal Z calculations, but applied before the depth test and before being written to the depth buffer.
             */
            this.polygonOffset = null;
            this._polygonOffsetMode = null;
            this._depthWrite = null;
            /*! blend record
            所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则 红色就是源颜色，绿色才是目标颜色。在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕 了。
    
    
             也许你迫不及待的想要绘制一个三维的带有半透明物体的场景了。但是现在恐怕还不行，还有一点是在进行三维场景的混合时必须注意的，那就是深度缓冲。
             总结起来，绘制顺序就是：首先绘制所有不透明的物体。如果两个物体都是不透明的，则谁先谁后 都没有关系。然后，将深度缓冲区设置为只读。接下来，绘制所有半透明的物体。如果两个物体都是半透明的，则谁先谁后只需要根据自己的意愿（注意了，先绘制 的将成为“目标颜色”，后绘制的将成为“源颜色”，所以绘制的顺序将会对结果造成一些影响）。最后，将深度缓冲区设置为可读可写形式。
    
             在进行混合时，绘制的顺序十分重要。因为在绘制时，正要绘制上去的是源颜色，原来存在的是目标颜色，因此先绘制的物体就成为目标颜色，后来绘制的则成为源颜色。绘制的顺序要考虑清楚，将目标颜色和设置的目标因子相对应，源颜色和设置的源因子相对应。
             在进行三维混合时，不仅要考虑源因子和目标因子，还应该考虑深度缓冲区。必须先绘制所有不透明的物体，再绘制半透明的物体。在绘制半透明物体时前，还需要将深度缓冲区设置为只读形式，否则可能出现画面错误。
            */
            this._blend = null;
            this._writeRed = null;
            this._writeGreen = null;
            this._writeBlue = null;
            this._writeAlpha = null;
            this._blendSrc = null;
            this._blendDst = null;
            this._blendEquation = null;
            this._blendFuncSeparate = null;
            this._blendEquationSeparate = null;
        }
        DeviceManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        Object.defineProperty(DeviceManager.prototype, "scissorTest", {
            get: function () {
                return this._scissorTest;
            },
            set: function (scissorTest) {
                var gl = this.gl;
                if (scissorTest) {
                    gl.enable(gl.SCISSOR_TEST);
                }
                else {
                    gl.disable(gl.SCISSOR_TEST);
                }
                this._scissorTest = scissorTest;
            },
            enumerable: true,
            configurable: true
        });
        DeviceManager.prototype.setScissor = function (x, y, width, height) {
            this.gl.scissor(x, y, width, height);
            if (!this.scissorTest) {
                this.scissorTest = true;
            }
        };
        /*! Difference between viewports and scissor rectangles

         Viewports are basically scaled views, the left side is 0 and the right side is 1. The entire view will be scaled down into that viewport after everything is projected.

         Scissor tests clip to a rectangle inside that viewport. Instead of rendering from 0 to 1, you render from .2 to .8, with black bars on the outside. This actually cuts off a portion of what would normally be visible (if you used a viewport of the same size, you'd see the same amount but shrunk slightly).

         Viewports are used for full views (consider 3D Studio Max, each viewport is the full view from that angle, but fit into a single square). Scissor tests are used to cut out extra pixels that you don't want/need to be affected (lights in deferred rendering, for instance, everything outside the range is not affected, so why bother calculating that if you already know it's not lit, just scissor around the projected sphere and forget about everything beyond that).
         */
        DeviceManager.prototype.setViewport = function (x, y, width, height) {
            this.gl.viewport(x, y, width, height);
        };
        Object.defineProperty(DeviceManager.prototype, "depthTest", {
            get: function () {
                return this._depthTest;
            },
            set: function (depthTest) {
                var gl = this.gl;
                if (this._depthTest !== depthTest) {
                    if (depthTest) {
                        gl.enable(gl.DEPTH_TEST);
                    }
                    else {
                        gl.disable(gl.DEPTH_TEST);
                    }
                    this._depthTest = depthTest;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "depthFunc", {
            get: function () {
                return this._depthFunc;
            },
            set: function (depthFunc) {
                var gl = this.gl;
                if (this._depthFunc !== depthFunc) {
                    gl.depthFunc(gl[depthFunc]);
                    this._depthFunc = depthFunc;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "side", {
            get: function () {
                return this._side;
            },
            set: function (side) {
                var gl = this.gl;
                if (this._side !== side) {
                    switch (side) {
                        case Side.NONE:
                            gl.enable(gl.CULL_FACE);
                            gl.cullFace(gl.FRONT_AND_BACK);
                            break;
                        case Side.BOTH:
                            gl.disable(gl.CULL_FACE);
                            break;
                        case Side.FRONT:
                            gl.enable(gl.CULL_FACE);
                            gl.cullFace(gl.BACK);
                            break;
                        case Side.BACK:
                            gl.enable(gl.CULL_FACE);
                            gl.cullFace(gl.FRONT);
                            break;
                        default:
                            wd.Log.error(true, wd.Log.info.FUNC_UNEXPECT("side", side));
                            break;
                    }
                    this._side = side;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "polygonOffsetMode", {
            get: function () {
                return this._polygonOffsetMode;
            },
            set: function (polygonOffsetMode) {
                var gl = this.gl;
                if (this._polygonOffsetMode !== polygonOffsetMode) {
                    switch (polygonOffsetMode) {
                        case PolygonOffsetMode.NONE:
                            gl.polygonOffset(0.0, 0.0);
                            gl.disable(gl.POLYGON_OFFSET_FILL);
                            break;
                        case PolygonOffsetMode.IN:
                            gl.enable(gl.POLYGON_OFFSET_FILL);
                            gl.polygonOffset(1.0, 1.0);
                            break;
                        case PolygonOffsetMode.OUT:
                            gl.enable(gl.POLYGON_OFFSET_FILL);
                            gl.polygonOffset(-1.0, -1.0);
                            break;
                        case PolygonOffsetMode.CUSTOM:
                            gl.enable(gl.POLYGON_OFFSET_FILL);
                            wd.Log.error(!this.polygonOffset, wd.Log.info.FUNC_MUST_DEFINE("polygonOffset"));
                            gl.polygonOffset(this.polygonOffset.x, this.polygonOffset.y);
                            break;
                        default:
                            return;
                            break;
                    }
                    this._polygonOffsetMode = polygonOffsetMode;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "depthWrite", {
            get: function () {
                return this._depthWrite;
            },
            set: function (depthWrite) {
                if (this._depthWrite !== depthWrite) {
                    this.gl.depthMask(depthWrite);
                    this._depthWrite = depthWrite;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "blend", {
            get: function () {
                return this._blend;
            },
            set: function (blend) {
                var gl = this.gl;
                if (this._blend !== blend) {
                    if (blend) {
                        gl.enable(gl.BLEND);
                    }
                    else {
                        gl.disable(gl.BLEND);
                    }
                    this._blend = blend;
                }
            },
            enumerable: true,
            configurable: true
        });
        DeviceManager.prototype.setBlendFunc = function (blendSrc, blendDst) {
            if ((this._blendSrc !== blendSrc) || (this._blendDst !== blendDst)) {
                this._blend && this.gl.blendFunc(this.gl[blendSrc], this.gl[blendDst]);
                this._blendSrc = blendSrc;
                this._blendDst = blendDst;
            }
        };
        /*!
         OpenGL gives us even more flexibility by allowing us to change the operator between the source and destination part of the equation. Right now, the source and destination components are added together, but we could also subtract them if we want. glBlendEquation(GLenum mode) allows us to set this operation and has 3 possible options:

         GL_FUNC_ADD: the default, adds both components to each other: C¯result=Src+Dst.
         GL_FUNC_SUBTRACT: subtracts both components from each other: C¯result=Src−Dst.
         GL_FUNC_REVERSE_SUBTRAThe default blend equation is

         default is FUNC_ADD
         */
        DeviceManager.prototype.setBlendEquation = function (blendEquation) {
            if (this._blendEquation !== blendEquation) {
                this._blend && this.gl.blendEquation(this.gl[blendEquation]);
                this._blendEquation = blendEquation;
            }
        };
        DeviceManager.prototype.setBlendFuncSeparate = function (blendFuncSeparate) {
            var gl = this.gl;
            if (!this._blendFuncSeparate || this._blendFuncSeparate[0] !== blendFuncSeparate[0] || this._blendFuncSeparate[1] !== blendFuncSeparate[1]) {
                this._blend && gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
                this._blendFuncSeparate = blendFuncSeparate;
            }
        };
        DeviceManager.prototype.setBlendEquationSeparate = function (blendEquationSeparate) {
            var gl = this.gl;
            if (!this._blendEquationSeparate || this._blendEquationSeparate[0] !== blendEquationSeparate[0] || this._blendEquationSeparate[1] !== blendEquationSeparate[1]) {
                this._blend && gl.blendEquationSeparate(gl[blendEquationSeparate[0]], gl[blendEquationSeparate[1]]);
                this._blendEquationSeparate = blendEquationSeparate;
            }
        };
        DeviceManager.prototype.setColorWrite = function (writeRed, writeGreen, writeBlue, writeAlpha) {
            if (this._writeRed !== writeRed
                || this._writeGreen !== writeGreen
                || this._writeBlue !== writeBlue
                || this._writeAlpha !== writeAlpha) {
                this.gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
                this._writeRed = writeRed;
                this._writeGreen = writeGreen;
                this._writeBlue = writeBlue;
                this._writeAlpha = writeAlpha;
            }
        };
        DeviceManager.prototype.clear = function (options) {
            var gl = this.gl, color = options.color;
            gl.clearColor(color.r, color.g, color.b, color.a);
            this.setColorWrite(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        };
        DeviceManager.prototype.createGL = function (canvasId) {
            var canvas = null;
            if (canvasId) {
                canvas = wdCb.DomQuery.create(canvasId).get(0);
            }
            else {
                canvas = wdCb.DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
            }
            this.view = wd.ViewWebGL.create(canvas);
            this.gl = this.view.getContext();
        };
        DeviceManager.prototype.setScreen = function () {
            var screenSize = wd.Main.screenSize, x = null, y = null, width = null, height = null;
            if (screenSize === wd.ScreenSize.FULL) {
                x = 0;
                y = 0;
                width = wd.root.innerWidth;
                height = wd.root.innerHeight;
                wdCb.DomQuery.create("body").css("margin", "0");
            }
            else {
                x = screenSize.x || 0;
                y = screenSize.y || 0;
                width = screenSize.width || wd.root.innerWidth;
                height = screenSize.height || wd.root.innerHeight;
            }
            this.view.x = x;
            this.view.y = y;
            this.view.width = width;
            this.view.height = height;
            this.setViewport(0, 0, width, height);
        };
        DeviceManager._instance = null;
        Object.defineProperty(DeviceManager.prototype, "setScreen",
            __decorate([
                wd.require(function () {
                    wd.assert(wd.Main.screenSize !== null, wd.Log.info.FUNC_NOT_EXIST("Main.screenSize"));
                })
            ], DeviceManager.prototype, "setScreen", Object.getOwnPropertyDescriptor(DeviceManager.prototype, "setScreen")));
        return DeviceManager;
    })();
    wd.DeviceManager = DeviceManager;
    (function (DepthFunction) {
        DepthFunction[DepthFunction["NEVER"] = "NEVER"] = "NEVER";
        DepthFunction[DepthFunction["ALWAYS"] = "ALWAYS"] = "ALWAYS";
        DepthFunction[DepthFunction["LESS"] = "LESS"] = "LESS";
        DepthFunction[DepthFunction["LEQUAL"] = "LEQUAL"] = "LEQUAL";
        DepthFunction[DepthFunction["EQUAL"] = "EQUAL"] = "EQUAL";
        DepthFunction[DepthFunction["GEQUAL"] = "GEQUAL"] = "GEQUAL";
        DepthFunction[DepthFunction["GREATER"] = "GREATER"] = "GREATER";
        DepthFunction[DepthFunction["NOTEQUAL"] = "NOTEQUAL"] = "NOTEQUAL";
    })(wd.DepthFunction || (wd.DepthFunction = {}));
    var DepthFunction = wd.DepthFunction;
    (function (Side) {
        Side[Side["NONE"] = 0] = "NONE";
        Side[Side["BOTH"] = 1] = "BOTH";
        Side[Side["BACK"] = 2] = "BACK";
        Side[Side["FRONT"] = 3] = "FRONT";
    })(wd.Side || (wd.Side = {}));
    var Side = wd.Side;
    (function (PolygonOffsetMode) {
        PolygonOffsetMode[PolygonOffsetMode["NONE"] = 0] = "NONE";
        PolygonOffsetMode[PolygonOffsetMode["IN"] = 1] = "IN";
        PolygonOffsetMode[PolygonOffsetMode["OUT"] = 2] = "OUT";
        PolygonOffsetMode[PolygonOffsetMode["CUSTOM"] = 3] = "CUSTOM";
    })(wd.PolygonOffsetMode || (wd.PolygonOffsetMode = {}));
    var PolygonOffsetMode = wd.PolygonOffsetMode;
    (function (BlendFunc) {
        BlendFunc[BlendFunc["ZERO"] = "ZEOR"] = "ZERO";
        BlendFunc[BlendFunc["ONE"] = "ONE"] = "ONE";
        BlendFunc[BlendFunc["SRC_COLOR"] = "SRC_COLOR"] = "SRC_COLOR";
        BlendFunc[BlendFunc["ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR";
        BlendFunc[BlendFunc["DST_COLOR"] = "DST_COLOR"] = "DST_COLOR";
        BlendFunc[BlendFunc["ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR";
        BlendFunc[BlendFunc["SRC_ALPHA"] = "SRC_ALPHA"] = "SRC_ALPHA";
        BlendFunc[BlendFunc["SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE";
        BlendFunc[BlendFunc["ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA";
        BlendFunc[BlendFunc["DST_ALPHA"] = "DST_ALPHA"] = "DST_ALPHA";
        BlendFunc[BlendFunc["ONE_MINUS_DST_ALPH"] = "ONE_MINUS_DST_ALPHA"] = "ONE_MINUS_DST_ALPH";
    })(wd.BlendFunc || (wd.BlendFunc = {}));
    var BlendFunc = wd.BlendFunc;
    (function (BlendEquation) {
        BlendEquation[BlendEquation["ADD"] = "FUNC_ADD"] = "ADD";
        BlendEquation[BlendEquation["SUBTRACT"] = "FUNC_SUBTRACT"] = "SUBTRACT";
        BlendEquation[BlendEquation["REVERSE_SUBTRAC"] = "FUNC_REVERSE_SUBTRACT"] = "REVERSE_SUBTRAC";
    })(wd.BlendEquation || (wd.BlendEquation = {}));
    var BlendEquation = wd.BlendEquation;
    (function (BlendType) {
        BlendType[BlendType["NONE"] = 0] = "NONE";
        BlendType[BlendType["NORMAL"] = 1] = "NORMAL";
        BlendType[BlendType["ADDITIVE"] = 2] = "ADDITIVE";
        BlendType[BlendType["ADDITIVEALPHA"] = 3] = "ADDITIVEALPHA";
        BlendType[BlendType["MULTIPLICATIVE"] = 4] = "MULTIPLICATIVE";
        BlendType[BlendType["PREMULTIPLIED"] = 5] = "PREMULTIPLIED";
    })(wd.BlendType || (wd.BlendType = {}));
    var BlendType = wd.BlendType;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var GPUDetector = (function () {
        function GPUDetector() {
            this.maxTextureUnit = null;
            this.maxTextureSize = null;
            this.maxCubemapTextureSize = null;
            this.maxAnisotropy = null;
            this.extensionCompressedTextureS3TC = null;
            this.extensionTextureFilterAnisotropic = null;
            this.precision = null;
            this._isDetected = false;
        }
        GPUDetector.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        Object.defineProperty(GPUDetector.prototype, "gl", {
            get: function () {
                return wd.DeviceManager.getInstance().gl;
            },
            enumerable: true,
            configurable: true
        });
        GPUDetector.prototype.detect = function () {
            this._isDetected = true;
            this._detectExtension();
            this._detectCapabilty();
        };
        GPUDetector.prototype._detectExtension = function () {
            this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc");
            this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");
        };
        GPUDetector.prototype._detectCapabilty = function () {
            var gl = this.gl;
            this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
            this.maxAnisotropy = this._getMaxAnisotropy();
            this._detectPrecision();
        };
        GPUDetector.prototype._getExtension = function (name) {
            var extension, gl = this.gl;
            switch (name) {
                case "EXT_texture_filter_anisotropic":
                    extension = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case "WEBGL_compressed_texture_s3tc":
                    extension = gl.getExtension("WEBGL_compressed_texture_s3tc") || gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case "WEBGL_compressed_texture_pvrtc":
                    extension = gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    extension = gl.getExtension(name);
            }
            return extension;
        };
        GPUDetector.prototype._getMaxAnisotropy = function () {
            var extension = this.extensionTextureFilterAnisotropic, gl = this.gl;
            return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
        };
        GPUDetector.prototype._detectPrecision = function () {
            var gl = this.gl, vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT), vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT), fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT), highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0, mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
            if (!highpAvailable) {
                if (mediumpAvailable) {
                    this.precision = GPUPrecision.MEDIUMP;
                    wd.Log.warn(wd.Log.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
                }
                else {
                    this.precision = GPUPrecision.LOWP;
                    wd.Log.warn(wd.Log.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
                }
            }
            else {
                this.precision = GPUPrecision.HIGHP;
            }
        };
        GPUDetector._instance = null;
        return GPUDetector;
    })();
    wd.GPUDetector = GPUDetector;
    (function (GPUPrecision) {
        GPUPrecision[GPUPrecision["HIGHP"] = 0] = "HIGHP";
        GPUPrecision[GPUPrecision["MEDIUMP"] = 1] = "MEDIUMP";
        GPUPrecision[GPUPrecision["LOWP"] = 2] = "LOWP";
    })(wd.GPUPrecision || (wd.GPUPrecision = {}));
    var GPUPrecision = wd.GPUPrecision;
})(wd || (wd = {}));

var wd;
(function (wd) {
    (function (ScreenSize) {
        ScreenSize[ScreenSize["FULL"] = 0] = "FULL";
    })(wd.ScreenSize || (wd.ScreenSize = {}));
    var ScreenSize = wd.ScreenSize;
})(wd || (wd = {}));

var wd;
(function (wd) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            this.x = null;
            this.y = null;
            this.x = x;
            this.y = y;
        }
        Point.create = function (x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            var obj = new this(x, y);
            return obj;
        };
        return Point;
    })();
    wd.Point = Point;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Face3 = (function () {
        function Face3(aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
            this.aIndex = null;
            this.bIndex = null;
            this.cIndex = null;
            this.faceNormal = null;
            this.vertexNormals = null;
            this.aIndex = aIndex;
            this.bIndex = bIndex;
            this.cIndex = cIndex;
            this.faceNormal = faceNormal;
            this.vertexNormals = vertexNormals;
        }
        Face3.create = function (aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
            if (faceNormal === void 0) { faceNormal = wd.Vector3.create(); }
            if (vertexNormals === void 0) { vertexNormals = wdCb.Collection.create(); }
            var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);
            return obj;
        };
        Face3.prototype.copy = function () {
            var copyFaceNormal = this.faceNormal ? this.faceNormal.copy() : null, copyVertexNormals = null;
            if (this.vertexNormals) {
                copyVertexNormals = wdCb.Collection.create();
                this.vertexNormals.forEach(function (vertexNormal) {
                    copyVertexNormals.addChild(vertexNormal.copy());
                });
            }
            return Face3.create(this.aIndex, this.bIndex, this.cIndex, copyFaceNormal, copyVertexNormals);
        };
        return Face3;
    })();
    wd.Face3 = Face3;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RectRegion = (function (_super) {
        __extends(RectRegion, _super);
        function RectRegion() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(RectRegion.prototype, "width", {
            get: function () {
                return this.z;
            },
            set: function (width) {
                this.z = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectRegion.prototype, "height", {
            get: function () {
                return this.w;
            },
            set: function (height) {
                this.w = height;
            },
            enumerable: true,
            configurable: true
        });
        RectRegion.prototype.copy = function () {
            return this.copyHelper(RectRegion.create());
        };
        RectRegion.prototype.isNotEmpty = function () {
            return this.x !== 0
                || this.y !== 0
                || this.width !== 0
                || this.height !== 0;
        };
        return RectRegion;
    })(wd.Vector4);
    wd.RectRegion = RectRegion;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ViewWebGL = (function () {
        function ViewWebGL(dom) {
            this._dom = null;
            this._dom = dom;
        }
        ViewWebGL.create = function (view) {
            var obj = new this(view);
            return obj;
        };
        Object.defineProperty(ViewWebGL.prototype, "offset", {
            get: function () {
                var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
                while (view = view.offsetParent) {
                    offset.x += view.offsetLeft;
                    offset.y += view.offsetTop;
                }
                return offset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "dom", {
            get: function () {
                return this._dom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "width", {
            get: function () {
                return this._dom.width;
            },
            set: function (width) {
                this._dom.width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "height", {
            get: function () {
                return this._dom.height;
            },
            set: function (height) {
                this._dom.height = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "x", {
            get: function () {
                return Number(this._dom.style.left.slice(0, -2));
            },
            set: function (x) {
                this._dom.style.position = "absolute";
                this._dom.style.left = x + "px";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "y", {
            get: function () {
                return Number(this._dom.style.top.slice(0, -2));
            },
            set: function (y) {
                this._dom.style.position = "absolute";
                this._dom.style.top = y + "px";
            },
            enumerable: true,
            configurable: true
        });
        ViewWebGL.prototype.getContext = function () {
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        };
        return ViewWebGL;
    })();
    wd.ViewWebGL = ViewWebGL;
})(wd || (wd = {}));

var wd;
(function (wd) {
    var Color = (function () {
        function Color() {
            this.r = null;
            this.g = null;
            this.b = null;
            this.a = null;
        }
        Color.create = function (colorVal) {
            var obj = new this();
            obj.initWhenCreate(colorVal);
            return obj;
        };
        Color.prototype.initWhenCreate = function (colorVal) {
            this._setColor(colorVal);
        };
        Color.prototype.toVector3 = function () {
            return wd.Vector3.create(this.r, this.g, this.b);
        };
        Color.prototype.toVector4 = function () {
            return wd.Vector4.create(this.r, this.g, this.b, this.a);
        };
        Color.prototype._setColor = function (colorVal) {
            var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
            var color = null;
            if (REGEX_RGBA.test(colorVal)) {
                color = REGEX_RGBA.exec(colorVal);
                this.r = this._getColorValue(color, 1);
                this.g = this._getColorValue(color, 2);
                this.b = this._getColorValue(color, 3);
                this.a = Number(color[4]);
                return this;
            }
            if (REGEX_RGB.test(colorVal)) {
                color = REGEX_RGB.exec(colorVal);
                this.r = this._getColorValue(color, 1);
                this.g = this._getColorValue(color, 2);
                this.b = this._getColorValue(color, 3);
                this.a = 1;
                return this;
            }
            /*!
             it will cause ambiguity: rgba(x,x,x)
             so the format should be:
             rgba(x.x,x.x,x.x)
             */
            if (REGEX_RGB_2.test(colorVal)) {
                color = REGEX_RGB_2.exec(colorVal);
                this.r = parseFloat(color[1]);
                this.g = parseFloat(color[2]);
                this.b = parseFloat(color[3]);
                this.a = 1;
                return this;
            }
            if (REGEX_NUM.test(colorVal)) {
                color = REGEX_NUM.exec(colorVal);
                this._setHex(parseInt(color[1], 16));
                return this;
            }
        };
        Color.prototype._getColorValue = function (color, index, num) {
            if (num === void 0) { num = 255; }
            return Math.min(num, parseInt(color[index], 10)) / num;
        };
        Color.prototype._setHex = function (hex) {
            hex = Math.floor(hex);
            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;
            this.a = 1;
            return this;
        };
        return Color;
    })();
    wd.Color = Color;
})(wd || (wd = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var Texture = (function () {
        function Texture() {
            this.material = null;
            this.width = null;
            this.height = null;
            this.variableData = null;
            this.wrapS = null;
            this.wrapT = null;
            this.magFilter = null;
            this.minFilter = null;
            this.glTexture = null;
            this.target = wd.TextureTarget.TEXTURE_2D;
        }
        Object.defineProperty(Texture.prototype, "geometry", {
            get: function () {
                return this.material.geometry;
            },
            enumerable: true,
            configurable: true
        });
        Texture.prototype.bindToUnit = function (unit) {
            var gl = wd.DeviceManager.getInstance().gl, maxUnit = wd.GPUDetector.getInstance().maxTextureUnit;
            if (unit >= maxUnit) {
                wd.Log.warn("trying to use %d texture units, but GPU only supports %d units", unit, maxUnit);
            }
            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl[this.target], this.glTexture);
            return this;
        };
        Texture.prototype.sendData = function (program, pos, unit) {
            program.sendUniformData(pos, this.getSamplerType(), unit);
            this.sendOtherData(program, unit);
        };
        Texture.prototype.dispose = function () {
            var gl = wd.DeviceManager.getInstance().gl;
            gl.deleteTexture(this.glTexture);
            delete this.glTexture;
        };
        Texture.prototype.filterFallback = function (filter) {
            if (filter === wd.TextureFilterMode.NEAREST || filter === wd.TextureFilterMode.NEAREST_MIPMAP_MEAREST || filter === wd.TextureFilterMode.NEAREST_MIPMAP_LINEAR) {
                return wd.TextureFilterMode.NEAREST;
            }
            return wd.TextureFilterMode.LINEAR;
        };
        Texture.prototype.sendOtherData = function (program, unit) {
        };
        Texture.prototype.getSamplerNameByVariableData = function (unit, type) {
            var samplerName = null;
            if (this.variableData) {
                if (this.variableData.samplerVariableName) {
                    samplerName = this.variableData.samplerVariableName;
                }
            }
            else {
                samplerName = type === wd.VariableType.SAMPLER_2D ? "u_sampler2D" + unit : "u_samplerCube" + unit;
            }
            return samplerName;
        };
        Texture.prototype.getSamplerType = function () {
            var type = null;
            switch (this.target) {
                case wd.TextureTarget.TEXTURE_2D:
                    type = wd.VariableType.SAMPLER_2D;
                    break;
                case wd.TextureTarget.TEXTURE_CUBE_MAP:
                    type = wd.VariableType.SAMPLER_CUBE;
                    break;
                default:
                    break;
            }
            return type;
        };
        Texture.prototype.isSourcePowerOfTwo = function () {
            return wd.TextureUtils.isPowerOfTwo(this.width, this.height);
        };
        Texture.prototype.setTextureParameters = function (textureType, isSourcePowerOfTwo) {
            var gl = wd.DeviceManager.getInstance().gl;
            if (isSourcePowerOfTwo) {
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl[this.wrapS]);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl[this.wrapT]);
                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.magFilter]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.minFilter]);
            }
            else {
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.filterFallback(this.magFilter)]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.filterFallback(this.minFilter)]);
            }
        };
        Object.defineProperty(Texture.prototype, "isSourcePowerOfTwo",
            __decorate([
                wd.virtual
            ], Texture.prototype, "isSourcePowerOfTwo", Object.getOwnPropertyDescriptor(Texture.prototype, "isSourcePowerOfTwo")));
        return Texture;
    })();
    wd.Texture = Texture;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var TextureUtils = (function () {
        function TextureUtils() {
        }
        TextureUtils.isPowerOfTwo = function (width, height) {
            return wd.JudgeUtils.isPowerOfTwo(width) && wd.JudgeUtils.isPowerOfTwo(height);
        };
        return TextureUtils;
    })();
    wd.TextureUtils = TextureUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd_1) {
    var BasicTextureUtils = (function (_super) {
        __extends(BasicTextureUtils, _super);
        function BasicTextureUtils() {
            _super.apply(this, arguments);
        }
        BasicTextureUtils.isDrawPartOfTexture = function (sourceRegion, sourceRegionMethod) {
            return sourceRegion && sourceRegion.isNotEmpty() && sourceRegionMethod === wd_1.TextureSourceRegionMethod.DRAW_IN_CANVAS;
        };
        BasicTextureUtils.drawPartOfTextureByCanvas = function (source, canvasWidth, canvasHeight, sx, sy, sWidth, sHeight, dx, wd, dWidth, dHeight) {
            var canvas = wdCb.DomQuery.create("<canvas></canvas>").get(0), ctx = null;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx = canvas.getContext("2d");
            ctx.drawImage(source, sx, sy, sWidth, sHeight, dx, wd, dWidth, dHeight);
            return canvas;
        };
        BasicTextureUtils.isSourcePowerOfTwo = function (sourceRegion, sourceRegionMethod, width, height) {
            if (this.isDrawPartOfTexture(sourceRegion, sourceRegionMethod)) {
                return this.isPowerOfTwo(sourceRegion.width, sourceRegion.height);
            }
            return this.isPowerOfTwo(width, height);
        };
        BasicTextureUtils.needClampMaxSize = function (maxSize, width, height) {
            return width > maxSize || height > maxSize;
        };
        BasicTextureUtils.clampToMaxSize = function (source, maxSize) {
            var maxDimension = null, newWidth = null, newHeight = null, canvas = null;
            maxDimension = Math.max(source.width, source.height);
            newWidth = Math.floor(source.width * maxSize / maxDimension);
            newHeight = Math.floor(source.height * maxSize / maxDimension);
            canvas = this.drawPartOfTextureByCanvas(source, newWidth, newHeight, 0, 0, source.width, source.height, 0, 0, newWidth, newHeight);
            wd_1.Log.log("source is too big (width:" + source.width + ", height:" + source.height + "), resize it to be width:" + canvas.width + ", height:" + canvas.height + ".");
            return canvas;
        };
        return BasicTextureUtils;
    })(wd_1.TextureUtils);
    wd_1.BasicTextureUtils = BasicTextureUtils;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var RenderTargetTexture = (function (_super) {
        __extends(RenderTargetTexture, _super);
        function RenderTargetTexture() {
            _super.apply(this, arguments);
        }
        RenderTargetTexture.prototype.init = function () {
            this.minFilter = wd.TextureFilterMode.LINEAR;
            this.magFilter = wd.TextureFilterMode.LINEAR;
            this.wrapS = wd.TextureWrapMode.CLAMP_TO_EDGE;
            this.wrapT = wd.TextureWrapMode.CLAMP_TO_EDGE;
            return this;
        };
        RenderTargetTexture.prototype.getPosition = function () {
            return this.geometry.gameObject.transform.position;
        };
        RenderTargetTexture.prototype.setEmptyTexture = function (texture) {
            var gl = wd.DeviceManager.getInstance().gl;
            wd.Log.error(!texture, "Failed to create texture object");
            gl.bindTexture(gl[this.target], texture);
            this.setTextureParameters(gl[this.target], this.isSourcePowerOfTwo());
        };
        return RenderTargetTexture;
    })(wd.Texture);
    wd.RenderTargetTexture = RenderTargetTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDRenderTargetTexture = (function (_super) {
        __extends(TwoDRenderTargetTexture, _super);
        function TwoDRenderTargetTexture() {
            _super.apply(this, arguments);
            this._renderList = null;
            this.width = 256;
            this.height = 256;
        }
        Object.defineProperty(TwoDRenderTargetTexture.prototype, "renderList", {
            get: function () {
                return this._renderList;
            },
            set: function (renderList) {
                if (wd.JudgeUtils.isArray(renderList)) {
                    this._renderList = wdCb.Collection.create(renderList);
                }
                else if (renderList instanceof wdCb.Collection) {
                    this._renderList = renderList;
                }
                else {
                    wd.Log.error(true, wd.Log.info.FUNC_MUST_BE("renderList", "array or wdCb.Collection"));
                }
            },
            enumerable: true,
            configurable: true
        });
        TwoDRenderTargetTexture.prototype.createEmptyTexture = function () {
            var gl = wd.DeviceManager.getInstance().gl, texture = gl.createTexture();
            this.setEmptyTexture(texture);
            gl.texImage2D(gl[this.target], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            this.glTexture = texture;
        };
        return TwoDRenderTargetTexture;
    })(wd.RenderTargetTexture);
    wd.TwoDRenderTargetTexture = TwoDRenderTargetTexture;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var ShadowMapTextureUtils = (function () {
        function ShadowMapTextureUtils() {
        }
        ShadowMapTextureUtils.setTextureParameters = function (textureType) {
            var gl = wd.DeviceManager.getInstance().gl, scene = wd.Director.getInstance().scene;
            if (scene.shadowMap.softType === wd.ShadowMapSoftType.PCF) {
                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            }
        };
        return ShadowMapTextureUtils;
    })();
    wd.ShadowMapTextureUtils = ShadowMapTextureUtils;
})(wd || (wd = {}));



var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var MirrorTexture = (function (_super) {
        __extends(MirrorTexture, _super);
        function MirrorTexture() {
            _super.apply(this, arguments);
            this._plane = null;
        }
        MirrorTexture.create = function () {
            var obj = new this();
            return obj;
        };
        MirrorTexture.prototype.init = function () {
            _super.prototype.init.call(this);
            wd.Director.getInstance().scene.addRenderTargetRenderer(wd.MirrorRenderTargetRenderer.create(this));
            return this;
        };
        MirrorTexture.prototype.getSamplerName = function (unit) {
            return this.getSamplerNameByVariableData(unit, wd.VariableType.SAMPLER_2D);
        };
        MirrorTexture.prototype.getPlane = function () {
            var normalData = null, normal = null, p = null;
            if (this._plane && !this.geometry.gameObject.transform.dirtyLocal) {
                return this._plane;
            }
            wd.Log.error(!(this.geometry instanceof wd.PlaneGeometry), wd.Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));
            normalData = this.geometry.geometryData.normals;
            normal = this.geometry.gameObject.transform.localRotation.multiplyVector3(wd.Vector3.create(normalData[0], normalData[1], normalData[2])).normalize();
            p = this.getPosition();
            this._plane = wd.Plane.create(normal.x, normal.y, normal.z, -p.dot(normal));
            return this._plane;
        };
        return MirrorTexture;
    })(wd.TwoDRenderTargetTexture);
    wd.MirrorTexture = MirrorTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDShadowMapTexture = (function (_super) {
        __extends(TwoDShadowMapTexture, _super);
        function TwoDShadowMapTexture() {
            _super.apply(this, arguments);
        }
        TwoDShadowMapTexture.create = function () {
            var obj = new this();
            return obj;
        };
        TwoDShadowMapTexture.prototype.getSamplerName = function (unit) {
            wd.Log.error(!wd.JudgeUtils.isNumber(this.variableData.samplerData), wd.Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));
            return "u_twoDShadowMapSampler[" + this.variableData.samplerData + "]";
        };
        TwoDShadowMapTexture.prototype.setTextureParameters = function (textureType, isSourcePowerOfTwo) {
            _super.prototype.setTextureParameters.call(this, textureType, isSourcePowerOfTwo);
            wd.ShadowMapTextureUtils.setTextureParameters(textureType);
        };
        return TwoDShadowMapTexture;
    })(wd.TwoDRenderTargetTexture);
    wd.TwoDShadowMapTexture = TwoDShadowMapTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapRenderTargetTexture = (function (_super) {
        __extends(CubemapRenderTargetTexture, _super);
        function CubemapRenderTargetTexture() {
            _super.apply(this, arguments);
            this.target = wd.TextureTarget.TEXTURE_CUBE_MAP;
        }
        CubemapRenderTargetTexture.prototype.createEmptyTexture = function () {
            var gl = wd.DeviceManager.getInstance().gl, texture = gl.createTexture(), i = null;
            this.setEmptyTexture(texture);
            for (i = 0; i < 6; i++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }
            this.glTexture = texture;
        };
        return CubemapRenderTargetTexture;
    })(wd.RenderTargetTexture);
    wd.CubemapRenderTargetTexture = CubemapRenderTargetTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapShadowMapTexture = (function (_super) {
        __extends(CubemapShadowMapTexture, _super);
        function CubemapShadowMapTexture() {
            _super.apply(this, arguments);
        }
        CubemapShadowMapTexture.create = function () {
            var obj = new this();
            return obj;
        };
        CubemapShadowMapTexture.prototype.getSamplerName = function (unit) {
            wd.Log.error(!wd.JudgeUtils.isNumber(this.variableData.samplerData), wd.Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));
            return "u_cubemapShadowMapSampler[" + this.variableData.samplerData + "]";
        };
        return CubemapShadowMapTexture;
    })(wd.CubemapRenderTargetTexture);
    wd.CubemapShadowMapTexture = CubemapShadowMapTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DynamicCubemapTexture = (function (_super) {
        __extends(DynamicCubemapTexture, _super);
        function DynamicCubemapTexture() {
            _super.apply(this, arguments);
            this._renderList = null;
            this.size = 256;
            this.near = 0.1;
            this.far = 100;
            this.mode = null;
        }
        DynamicCubemapTexture.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(DynamicCubemapTexture.prototype, "renderList", {
            get: function () {
                return this._renderList;
            },
            set: function (renderList) {
                if (wd.JudgeUtils.isDirectObject(renderList)) {
                    this._renderList = wdCb.Hash.create(renderList);
                }
                else if (renderList instanceof wdCb.Hash) {
                    this._renderList = renderList;
                }
                else {
                    wd.Log.error(true, wd.Log.info.FUNC_MUST_BE("renderList", "array or wdCb.Collection"));
                }
            },
            enumerable: true,
            configurable: true
        });
        DynamicCubemapTexture.prototype.init = function () {
            _super.prototype.init.call(this);
            this.width = this.size;
            this.height = this.size;
            wd.Director.getInstance().scene.addRenderTargetRenderer(wd.DynamicCubemapRenderTargetRenderer.create(this));
            return this;
        };
        DynamicCubemapTexture.prototype.getSamplerName = function (unit) {
            return this.getSamplerNameByVariableData(unit, wd.VariableType.SAMPLER_CUBE);
        };
        return DynamicCubemapTexture;
    })(wd.CubemapRenderTargetTexture);
    wd.DynamicCubemapTexture = DynamicCubemapTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var BasicTexture = (function (_super) {
        __extends(BasicTexture, _super);
        function BasicTexture() {
            _super.apply(this, arguments);
            this.p_sourceRegionMethod = null;
            this.generateMipmaps = null;
            this.format = null;
            this.source = null;
            this.repeatRegion = null;
            this.sourceRegion = null;
            this.sourceRegionMapping = null;
            this.flipY = null;
            this.premultiplyAlpha = null;
            this.unpackAlignment = null;
            this.type = null;
            this.mipmaps = null;
            this.anisotropy = null;
            this.needUpdate = null;
        }
        Object.defineProperty(BasicTexture.prototype, "sourceRegionMethod", {
            get: function () {
                return this.p_sourceRegionMethod;
            },
            set: function (sourceRegionMethod) {
                this.p_sourceRegionMethod = sourceRegionMethod;
            },
            enumerable: true,
            configurable: true
        });
        BasicTexture.prototype.initWhenCreate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var gl = wd.DeviceManager.getInstance().gl;
            this.glTexture = gl.createTexture();
        };
        BasicTexture.prototype.init = function () {
        };
        BasicTexture.prototype.update = function (index) {
            var gl = wd.DeviceManager.getInstance().gl, isSourcePowerOfTwo = this.isSourcePowerOfTwo();
            this.bindToUnit(index);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);
            if (this.needClampMaxSize()) {
                this.clampToMaxSize();
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();
                if (!isSourcePowerOfTwo) {
                    wd.Log.warn("texture size is not power of two after clampToMaxSize()");
                }
            }
            this.setTextureParameters(gl[this.target], isSourcePowerOfTwo);
            this.allocateSourceToTexture(isSourcePowerOfTwo);
            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }
            this.needUpdate = false;
            return this;
        };
        BasicTexture.prototype.getSamplerName = function (unit) {
            return this.getSamplerNameByVariableData(unit, wd.VariableType.SAMPLER_2D);
        };
        BasicTexture.prototype.sendOtherData = function (program, unit) {
            var sourceRegion = null;
            if (this.sourceRegion && this.sourceRegionMethod === wd.TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL) {
                sourceRegion = this._convertSourceRegionToUV();
            }
            else {
                sourceRegion = wd.RectRegion.create(0, 0, 1, 1);
            }
            program.sendUniformData("u_sourceRegion", wd.VariableType.FLOAT_4, sourceRegion);
            program.sendUniformData("u_repeatRegion", wd.VariableType.FLOAT_4, this.repeatRegion);
            return this;
        };
        BasicTexture.prototype.needClampMaxSize = function () {
            if (!this.source) {
                return false;
            }
            return wd.BasicTextureUtils.needClampMaxSize(wd.GPUDetector.getInstance().maxTextureSize, this.source.width, this.source.height);
        };
        BasicTexture.prototype.clampToMaxSize = function () {
            this.source = wd.BasicTextureUtils.clampToMaxSize(this.source, wd.GPUDetector.getInstance().maxTextureSize);
        };
        BasicTexture.prototype.setTextureParameters = function (textureType, isSourcePowerOfTwo) {
            _super.prototype.setTextureParameters.call(this, textureType, isSourcePowerOfTwo);
            this._setAnisotropy(textureType);
        };
        BasicTexture.prototype.isSourcePowerOfTwo = function () {
            return wd.BasicTextureUtils.isSourcePowerOfTwo(this.sourceRegion, this.sourceRegionMethod, this.width, this.height);
        };
        BasicTexture.prototype._setAnisotropy = function (textureType) {
            var gpu = wd.GPUDetector.getInstance(), gl = wd.DeviceManager.getInstance().gl;
            if (!gpu.extensionTextureFilterAnisotropic) {
                return;
            }
            if (this.anisotropy > 1) {
                gl.texParameterf(textureType, gpu.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(this.anisotropy, gpu.maxAnisotropy));
            }
        };
        BasicTexture.prototype._convertSourceRegionCanvasMapToUV = function (sourceRegion) {
            var width = this.width, height = this.height, region = null;
            region = wd.RectRegion.create(sourceRegion.x / width, sourceRegion.y / height, sourceRegion.width / width, sourceRegion.height / height);
            region.y = 1 - region.y - region.height;
            return region;
        };
        BasicTexture.prototype._convertSourceRegionToUV = function () {
            if (this.sourceRegionMapping === wd.TextureSourceRegionMapping.CANVAS) {
                return this._convertSourceRegionCanvasMapToUV(this.sourceRegion);
            }
            else if (this.sourceRegionMapping === wd.TextureSourceRegionMapping.UV) {
                return this.sourceRegion;
            }
        };
        Object.defineProperty(BasicTexture.prototype, "needClampMaxSize",
            __decorate([
                wd.virtual
            ], BasicTexture.prototype, "needClampMaxSize", Object.getOwnPropertyDescriptor(BasicTexture.prototype, "needClampMaxSize")));
        return BasicTexture;
    })(wd.Texture);
    wd.BasicTexture = BasicTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var TwoDTexture = (function (_super) {
        __extends(TwoDTexture, _super);
        function TwoDTexture() {
            _super.apply(this, arguments);
        }
        TwoDTexture.prototype.initWhenCreate = function (asset) {
            _super.prototype.initWhenCreate.call(this);
            asset.copyTo(this);
        };
        return TwoDTexture;
    })(wd.BasicTexture);
    wd.TwoDTexture = TwoDTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CommonTexture = (function (_super) {
        __extends(CommonTexture, _super);
        function CommonTexture() {
            _super.apply(this, arguments);
        }
        CommonTexture.prototype.allocateSourceToTexture = function (isSourcePowerOfTwo) {
            var mipmapCmd = null, noMipmapCmd = null, gl = wd.DeviceManager.getInstance().gl;
            if (isSourcePowerOfTwo && this.mipmaps.getCount() > 0) {
                mipmapCmd = wd.DrawMipmapTwoDTextureCommand.create();
                mipmapCmd.mipmaps = this.mipmaps;
                mipmapCmd.format = this.format;
                mipmapCmd.type = this.type;
                mipmapCmd.sourceRegion = this.sourceRegion;
                mipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
                mipmapCmd.glTarget = gl.TEXTURE_2D;
                mipmapCmd.execute();
                this.generateMipmaps = false;
            }
            else {
                noMipmapCmd = wd.DrawNoMipmapTwoDTextureCommand.create();
                noMipmapCmd.source = this.source;
                noMipmapCmd.format = this.format;
                noMipmapCmd.type = this.type;
                noMipmapCmd.sourceRegion = this.sourceRegion;
                noMipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
                noMipmapCmd.glTarget = gl.TEXTURE_2D;
                noMipmapCmd.execute();
            }
        };
        return CommonTexture;
    })(wd.TwoDTexture);
    wd.CommonTexture = CommonTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var ImageTexture = (function (_super) {
        __extends(ImageTexture, _super);
        function ImageTexture() {
            _super.apply(this, arguments);
        }
        ImageTexture.create = function (arg) {
            var obj = new this();
            obj.initWhenCreate(arg);
            return obj;
        };
        ImageTexture.prototype.initWhenCreate = function (arg) {
            if (arguments[0] instanceof wd.ImageTextureAsset) {
                var asset = arguments[0];
                _super.prototype.initWhenCreate.call(this, asset);
            }
            else {
                var canvas = arguments[0];
                _super.prototype.initWhenCreate.call(this, wd.ImageTextureAsset.create(canvas));
            }
        };
        return ImageTexture;
    })(wd.CommonTexture);
    wd.ImageTexture = ImageTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var VideoTexture = (function (_super) {
        __extends(VideoTexture, _super);
        function VideoTexture() {
            _super.apply(this, arguments);
            this._video = null;
            this._startLoopHandler = null;
        }
        VideoTexture.create = function (asset) {
            var obj = new this();
            obj.initWhenCreate(asset);
            return obj;
        };
        VideoTexture.prototype.initWhenCreate = function (asset) {
            _super.prototype.initWhenCreate.call(this, asset);
            this._video = asset.video;
        };
        VideoTexture.prototype.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            this._startLoopHandler = wdCb.FunctionUtils.bind(this, function () {
                if (self._video.isStop) {
                    self.needUpdate = false;
                }
                else {
                    self.needUpdate = true;
                }
            });
            wd.EventManager.on(wd.EngineEvent.STARTLOOP, this._startLoopHandler);
            return this;
        };
        VideoTexture.prototype.dispose = function () {
            wd.EventManager.off(wd.EngineEvent.STARTLOOP, this._startLoopHandler);
        };
        VideoTexture.prototype.needClampMaxSize = function () {
            return false;
        };
        return VideoTexture;
    })(wd.CommonTexture);
    wd.VideoTexture = VideoTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var CubemapTexture = (function (_super) {
        __extends(CubemapTexture, _super);
        function CubemapTexture(assets) {
            _super.call(this);
            this.assets = null;
            this.textures = wdCb.Collection.create();
            this.mode = null;
            this.target = wd.TextureTarget.TEXTURE_CUBE_MAP;
            this._areAllCompressedAsset = false;
            this.assets = assets;
        }
        CubemapTexture.create = function (assets) {
            var obj = new this(assets);
            obj.initWhenCreate(assets);
            return obj;
        };
        CubemapTexture.prototype.initWhenCreate = function (assets) {
            _super.prototype.initWhenCreate.call(this);
            if (this._areAssetsAllCompressedAsset(assets)) {
                this._areAllCompressedAsset = true;
            }
            else {
                this._areAllCompressedAsset = false;
            }
            this._createTextures(assets);
            this._getRepresentAsset(assets).copyToCubemapTexture(this);
            if (this._areAllCompressedAsset) {
                this.generateMipmaps = false;
                if (this._hasNoMipmapCompressedAsset()) {
                    this.minFilter = this.filterFallback(this.minFilter);
                }
            }
            else {
                this.generateMipmaps = true;
            }
            this.flipY = false;
        };
        CubemapTexture.prototype.getSamplerName = function (unit) {
            return this.getSamplerNameByVariableData(unit, wd.VariableType.SAMPLER_CUBE);
        };
        CubemapTexture.prototype.sendOtherData = function (program, unit) {
            program.sendUniformData("u_repeatRegion", wd.VariableType.FLOAT_4, this.repeatRegion);
            return this;
        };
        CubemapTexture.prototype.allocateSourceToTexture = function (isSourcePowerOfTwo) {
            if (this._areAllCompressedAsset) {
                this.textures.forEach(function (texture, i) {
                    texture.draw(i);
                });
            }
            else {
                this.textures.forEach(function (texture, i) {
                    texture.draw(i);
                });
            }
        };
        CubemapTexture.prototype.needClampMaxSize = function () {
            var needAllClampMaxSize = false;
            this.textures.forEach(function (texture) {
                if (texture.needClampMaxSize()) {
                    needAllClampMaxSize = true;
                    return wdCb.$BREAK;
                }
            });
            return needAllClampMaxSize;
        };
        CubemapTexture.prototype.isSourcePowerOfTwo = function () {
            var areAllSourcePowerOfTwo = true;
            this.textures.forEach(function (texture) {
                if (!texture.isSourcePowerOfTwo()) {
                    areAllSourcePowerOfTwo = false;
                    return wdCb.$BREAK;
                }
            });
            return areAllSourcePowerOfTwo;
        };
        CubemapTexture.prototype.clampToMaxSize = function () {
            this.textures.forEach(function (texture) {
                texture.clampToMaxSize();
            });
        };
        CubemapTexture.prototype._hasNoMipmapCompressedAsset = function () {
            var self = this;
            if (!this._areAllCompressedAsset) {
                return false;
            }
            return this.textures.filter(function (texture) {
                return !self._isMipmapFilter(texture.minFilter);
            }).getCount() > 0;
        };
        CubemapTexture.prototype._isMipmapFilter = function (filter) {
            return filter === wd.TextureFilterMode.LINEAR_MIPMAP_LINEAR || filter === wd.TextureFilterMode.LINEAR_MIPMAP_NEAREST || filter === wd.TextureFilterMode.NEAREST_MIPMAP_LINEAR || filter === wd.TextureFilterMode.NEAREST_MIPMAP_MEAREST;
        };
        CubemapTexture.prototype._getRepresentAsset = function (assets) {
            return assets[0].asset;
        };
        CubemapTexture.prototype._areAssetsAllImageAssets = function (assets) {
            var areImageAssets = [];
            for (var _i = 0; _i < assets.length; _i++) {
                var data = assets[_i];
                if (data.asset instanceof wd.ImageTextureAsset) {
                    areImageAssets.push(data);
                }
            }
            return areImageAssets.length === 6;
        };
        CubemapTexture.prototype._areAssetsAllCompressedAsset = function (assets) {
            var areCompressedAssets = [];
            for (var _i = 0; _i < assets.length; _i++) {
                var data = assets[_i];
                if (data.asset instanceof wd.CompressedTextureAsset) {
                    areCompressedAssets.push(data);
                }
            }
            return areCompressedAssets.length === 6;
        };
        CubemapTexture.prototype._createTextures = function (assets) {
            var self = this;
            for (var _i = 0; _i < assets.length; _i++) {
                var data = assets[_i];
                var face = data.asset.toCubemapFaceTexture();
                if (data.sourceRegion && face instanceof wd.CubemapFaceImageTexture) {
                    var twoDFace = face;
                    twoDFace.sourceRegion = data.sourceRegion;
                }
                if (data.type) {
                    face.type = data.type;
                }
                self.textures.addChild(face);
            }
        };
        CubemapTexture.prototype._areTextureSizOfAllFaceseEqual = function (assets) {
            var textureWidthSizeArr = [], textureHeightSizeArr = [];
            for (var _i = 0; _i < assets.length; _i++) {
                var data = assets[_i];
                if (data.sourceRegion) {
                    textureWidthSizeArr.push(data.sourceRegion.width);
                    textureHeightSizeArr.push(data.sourceRegion.height);
                }
                else {
                    textureWidthSizeArr.push(data.asset.width);
                    textureHeightSizeArr.push(data.asset.height);
                }
            }
            return this._areAllElementsEqual(textureWidthSizeArr) && this._areAllElementsEqual(textureHeightSizeArr);
        };
        CubemapTexture.prototype._hasSourceRegion = function (assets) {
            for (var _i = 0; _i < assets.length; _i++) {
                var data = assets[_i];
                if (data.sourceRegion) {
                    return true;
                }
            }
            return false;
        };
        CubemapTexture.prototype._areAllElementsEqual = function (arr) {
            var lastEle = arr[0];
            for (var _i = 0; _i < arr.length; _i++) {
                var ele = arr[_i];
                if (ele !== lastEle) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperty(CubemapTexture.prototype, "initWhenCreate",
            __decorate([
                wd.require(function (assets) {
                    wd.assert(assets.length === 6, wd.Log.info.FUNC_MUST("cubemap", "has 6 assets"));
                    wd.assert(this._areAssetsAllImageAssets(assets) || this._areAssetsAllCompressedAsset(assets), wd.Log.info.FUNC_MUST_BE("cubemap six face's assets", "all ImageTextureAsset or all CompressedTextureAsset"));
                    if (this._areAssetsAllCompressedAsset(assets)) {
                        wd.assert(!this._hasSourceRegion(assets), wd.Log.info.FUNC_SHOULD_NOT("compressed face", "contain sourceRegion data"));
                    }
                    wd.assert(this._areTextureSizOfAllFaceseEqual(assets), wd.Log.info.FUNC_MUST_BE("all cubemap faces' texture size", "equal"));
                })
            ], CubemapTexture.prototype, "initWhenCreate", Object.getOwnPropertyDescriptor(CubemapTexture.prototype, "initWhenCreate")));
        return CubemapTexture;
    })(wd.BasicTexture);
    wd.CubemapTexture = CubemapTexture;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var CubemapFaceTexture = (function () {
        function CubemapFaceTexture() {
            this.type = wd.TextureType.UNSIGNED_BYTE;
            this.format = null;
            this.width = null;
            this.height = null;
        }
        return CubemapFaceTexture;
    })();
    wd.CubemapFaceTexture = CubemapFaceTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};

var wd;
(function (wd) {
    var CubemapFaceImageTexture = (function (_super) {
        __extends(CubemapFaceImageTexture, _super);
        function CubemapFaceImageTexture() {
            _super.apply(this, arguments);
            this.sourceRegion = null;
            this.source = null;
        }
        CubemapFaceImageTexture.create = function (asset) {
            var obj = new this();
            obj.initWhenCreate(asset);
            return obj;
        };
        Object.defineProperty(CubemapFaceImageTexture.prototype, "sourceRegionMethod", {
            get: function () {
                return wd.TextureSourceRegionMethod.DRAW_IN_CANVAS;
            },
            set: function (sourceRegionMethod) {
                var a = sourceRegionMethod;
            },
            enumerable: true,
            configurable: true
        });
        CubemapFaceImageTexture.prototype.initWhenCreate = function (asset) {
            asset.copyToCubemapFaceTexture(this);
        };
        CubemapFaceImageTexture.prototype.isSourcePowerOfTwo = function () {
            return wd.BasicTextureUtils.isSourcePowerOfTwo(this.sourceRegion, this.sourceRegionMethod, this.width, this.height);
        };
        CubemapFaceImageTexture.prototype.needClampMaxSize = function () {
            if (!this.source) {
                return false;
            }
            return wd.BasicTextureUtils.needClampMaxSize(wd.GPUDetector.getInstance().maxCubemapTextureSize, this.source.width, this.source.height);
        };
        CubemapFaceImageTexture.prototype.clampToMaxSize = function () {
            var maxSize = wd.GPUDetector.getInstance().maxCubemapTextureSize;
            this.source = wd.BasicTextureUtils.clampToMaxSize(this.source, maxSize);
        };
        CubemapFaceImageTexture.prototype.draw = function (index) {
            var noMipmapCmd = wd.DrawNoMipmapTwoDTextureCommand.create(), gl = wd.DeviceManager.getInstance().gl;
            noMipmapCmd.source = this.source;
            noMipmapCmd.sourceRegion = this.sourceRegion;
            noMipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
            noMipmapCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + index;
            noMipmapCmd.format = this.format;
            noMipmapCmd.type = this.type;
            noMipmapCmd.execute();
        };
        Object.defineProperty(CubemapFaceImageTexture.prototype, "sourceRegionMethod",
            __decorate([
                wd.requireSetter(function (sourceRegionMethod) {
                    wd.assert(sourceRegionMethod === wd.TextureSourceRegionMethod.DRAW_IN_CANVAS, wd.Log.info.FUNC_SUPPORT("cubemap twoD face texture->sourceRegionMethod only", "DRAW_IN_CANVAS"));
                })
            ], CubemapFaceImageTexture.prototype, "sourceRegionMethod", Object.getOwnPropertyDescriptor(CubemapFaceImageTexture.prototype, "sourceRegionMethod")));
        return CubemapFaceImageTexture;
    })(wd.CubemapFaceTexture);
    wd.CubemapFaceImageTexture = CubemapFaceImageTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CubemapFaceCompressedTexture = (function (_super) {
        __extends(CubemapFaceCompressedTexture, _super);
        function CubemapFaceCompressedTexture() {
            _super.apply(this, arguments);
            this.mipmaps = null;
            this.minFilter = null;
        }
        CubemapFaceCompressedTexture.create = function (asset) {
            var obj = new this();
            obj.initWhenCreate(asset);
            return obj;
        };
        CubemapFaceCompressedTexture.prototype.initWhenCreate = function (asset) {
            asset.copyToCubemapFaceTexture(this);
        };
        CubemapFaceCompressedTexture.prototype.isSourcePowerOfTwo = function () {
            return wd.BasicTextureUtils.isSourcePowerOfTwo(null, null, this.width, this.height);
        };
        CubemapFaceCompressedTexture.prototype.needClampMaxSize = function () {
            return wd.BasicTextureUtils.needClampMaxSize(wd.GPUDetector.getInstance().maxCubemapTextureSize, this.width, this.height);
        };
        CubemapFaceCompressedTexture.prototype.clampToMaxSize = function () {
            wd.Log.warn("CubemapFaceCompressedTexture's texture size is over maxCubemapTextureSize");
        };
        CubemapFaceCompressedTexture.prototype.draw = function (index) {
            var compressedCmd = wd.DrawCompressedTextureCommand.create(), gl = wd.DeviceManager.getInstance().gl;
            compressedCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + index;
            compressedCmd.type = this.type;
            compressedCmd.format = this.format;
            compressedCmd.mipmaps = this.mipmaps;
            compressedCmd.execute();
        };
        return CubemapFaceCompressedTexture;
    })(wd.CubemapFaceTexture);
    wd.CubemapFaceCompressedTexture = CubemapFaceCompressedTexture;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CompressedTexture = (function (_super) {
        __extends(CompressedTexture, _super);
        function CompressedTexture() {
            _super.apply(this, arguments);
        }
        CompressedTexture.create = function (asset) {
            var obj = new this();
            obj.initWhenCreate(asset);
            return obj;
        };
        Object.defineProperty(CompressedTexture.prototype, "sourceRegionMethod", {
            get: function () {
                wd.Log.assert(this.p_sourceRegionMethod === wd.TextureSourceRegionMethod.DRAW_IN_CANVAS, "compressed texture not support TextureSourceRegionMethod.DRAW_IN_CANVAS, will use TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL instead");
                return wd.TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            },
            enumerable: true,
            configurable: true
        });
        CompressedTexture.prototype.allocateSourceToTexture = function (isSourcePowerOfTwo) {
            var gl = wd.DeviceManager.getInstance().gl, compressedCmd = wd.DrawCompressedTextureCommand.create();
            compressedCmd.glTarget = gl.TEXTURE_2D;
            compressedCmd.type = this.type;
            compressedCmd.format = this.format;
            compressedCmd.mipmaps = this.mipmaps;
            compressedCmd.sourceRegion = this.sourceRegion;
            compressedCmd.sourceRegionMethod = this.sourceRegionMethod;
            compressedCmd.execute();
            if (this.mipmaps.getCount() > 1) {
                this.generateMipmaps = false;
            }
        };
        CompressedTexture.prototype.needClampMaxSize = function () {
            return false;
        };
        return CompressedTexture;
    })(wd.TwoDTexture);
    wd.CompressedTexture = CompressedTexture;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var DrawTextureCommand = (function () {
        function DrawTextureCommand() {
            this.format = null;
            this.type = null;
            this.sourceRegion = null;
            this.sourceRegionMethod = wd.TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            this.glTarget = null;
        }
        DrawTextureCommand.prototype.getDrawTarget = function (source, sourceRegion) {
            if (sourceRegion === void 0) { sourceRegion = this.sourceRegion; }
            var result = null;
            if (wd.BasicTextureUtils.isDrawPartOfTexture(sourceRegion, this.sourceRegionMethod)) {
                result = wd.BasicTextureUtils.drawPartOfTextureByCanvas(source, sourceRegion.width, sourceRegion.height, sourceRegion.x, sourceRegion.y, sourceRegion.width, sourceRegion.height, 0, 0, sourceRegion.width, sourceRegion.height);
            }
            else {
                result = source;
            }
            return result;
        };
        return DrawTextureCommand;
    })();
    wd.DrawTextureCommand = DrawTextureCommand;
})(wd || (wd = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wd;
(function (wd) {
    var DrawCompressedTextureCommand = (function (_super) {
        __extends(DrawCompressedTextureCommand, _super);
        function DrawCompressedTextureCommand() {
            _super.apply(this, arguments);
            this.mipmaps = null;
        }
        DrawCompressedTextureCommand.create = function () {
            var obj = new this();
            return obj;
        };
        DrawCompressedTextureCommand.prototype.execute = function () {
            var gl = wd.DeviceManager.getInstance().gl, self = this;
            wd.Log.error(this.format === null, wd.Log.info.FUNC_NOT_SUPPORT(this.format));
            if (this.format !== wd.TextureFormat.RGBA) {
                this.mipmaps.forEach(function (mipmap, index) {
                    gl.compressedTexImage2D(self.glTarget, index, self.format, mipmap.width, mipmap.height, 0, self.getDrawTarget(mipmap.data));
                });
            }
            else {
                this.mipmaps.forEach(function (mipmap, index) {
                    gl.texImage2D(self.glTarget, index, gl[self.format], mipmap.width, mipmap.height, 0, gl[self.format], gl[self.type], self.getDrawTarget(mipmap.data));
                });
            }
        };
        return DrawCompressedTextureCommand;
    })(wd.DrawTextureCommand);
    wd.DrawCompressedTextureCommand = DrawCompressedTextureCommand;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DrawTwoDTextureCommand = (function (_super) {
        __extends(DrawTwoDTextureCommand, _super);
        function DrawTwoDTextureCommand() {
            _super.apply(this, arguments);
            this.source = null;
        }
        DrawTwoDTextureCommand.prototype.drawTexture = function (index, source) {
            var gl = wd.DeviceManager.getInstance().gl;
            gl.texImage2D(this.glTarget, index, gl[this.format], gl[this.format], gl[this.type], this.getDrawTarget(source));
        };
        return DrawTwoDTextureCommand;
    })(wd.DrawTextureCommand);
    wd.DrawTwoDTextureCommand = DrawTwoDTextureCommand;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DrawMipmapTwoDTextureCommand = (function (_super) {
        __extends(DrawMipmapTwoDTextureCommand, _super);
        function DrawMipmapTwoDTextureCommand() {
            _super.apply(this, arguments);
            this.mipmaps = null;
        }
        DrawMipmapTwoDTextureCommand.create = function () {
            var obj = new this();
            return obj;
        };
        DrawMipmapTwoDTextureCommand.prototype.execute = function () {
            var self = this;
            this.mipmaps.forEach(function (mipmap, index) {
                self.drawTexture(index, mipmap);
            });
        };
        return DrawMipmapTwoDTextureCommand;
    })(wd.DrawTwoDTextureCommand);
    wd.DrawMipmapTwoDTextureCommand = DrawMipmapTwoDTextureCommand;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var DrawNoMipmapTwoDTextureCommand = (function (_super) {
        __extends(DrawNoMipmapTwoDTextureCommand, _super);
        function DrawNoMipmapTwoDTextureCommand() {
            _super.apply(this, arguments);
        }
        DrawNoMipmapTwoDTextureCommand.create = function () {
            var obj = new this();
            return obj;
        };
        DrawNoMipmapTwoDTextureCommand.prototype.execute = function () {
            this.drawTexture(0, this.source);
        };
        return DrawNoMipmapTwoDTextureCommand;
    })(wd.DrawTwoDTextureCommand);
    wd.DrawNoMipmapTwoDTextureCommand = DrawNoMipmapTwoDTextureCommand;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var Video = (function () {
        function Video(_a) {
            var urlArr = _a.urlArr, _b = _a.onLoad, onLoad = _b === void 0 ? function (video) { } : _b, _c = _a.onError, onError = _c === void 0 ? function (err) { } : _c;
            this.url = null;
            this.source = null;
            this.isStop = false;
            this._urlArr = null;
            this._onLoad = null;
            this._onError = null;
            this._urlArr = wdCb.Collection.create(urlArr);
            this._onLoad = onLoad;
            this._onError = onError;
        }
        Video.create = function (data) {
            var obj = new this(data);
            obj.initWhenCreate();
            return obj;
        };
        Video.prototype.initWhenCreate = function () {
            this.url = this._getCanPlayUrl();
            this.source = document.createElement("video");
            this.source.src = this.url;
            this._bindEvent();
        };
        Video.prototype.play = function () {
            this.isStop = false;
            this.source.play();
        };
        Video.prototype._getCanPlayUrl = function () {
            var self = this, canPlayUrl = null, extnameArr = [];
            this._urlArr.forEach(function (url) {
                var extname = wdCb.PathUtils.extname(url);
                extnameArr.push(extname);
                if (self._canplay(extname)) {
                    canPlayUrl = url;
                    return wdCb.$BREAK;
                }
            });
            wd.Log.error(canPlayUrl === null, wd.Log.info.FUNC_NOT_SUPPORT("browser", extnameArr.join(",")));
            return canPlayUrl;
        };
        Video.prototype._canplay = function (extname) {
            var video = document.createElement("video"), mimeStr = null;
            switch (extname) {
                case '.mp4':
                    mimeStr = 'video/mp4; codecs="avc1.42e01e, mp4a.40.2"';
                    break;
                case ".ogv":
                    mimeStr = 'video/ogg; codecs="theora, vorbis"';
                    break;
                case ".webm":
                    mimeStr = 'video/webm; codecs="vp8, vorbis"';
                    break;
                default:
                    wd.Log.error(true, wd.Log.info.FUNC_UNEXPECT(extname));
                    break;
            }
            return !!video.canPlayType && video.canPlayType(mimeStr) !== "";
        };
        Video.prototype._bindEvent = function () {
            var self = this;
            this.source.addEventListener("canplaythrough", function () {
                self._onLoad(self);
            }, false);
            this.source.addEventListener("error", function () {
                self._onError("errorCode " + self.source.error.code);
            }, false);
            this.source.addEventListener("ended", function () {
                self.isStop = true;
            }, false);
        };
        return Video;
    })();
    wd.Video = Video;
})(wd || (wd = {}));


var wd;
(function (wd) {
    var VideoManager = (function () {
        function VideoManager() {
        }
        VideoManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        VideoManager.prototype.play = function (id) {
            var asset = wd.VideoLoader.getInstance().get(id), video = null;
            wd.Log.error(!asset, wd.Log.info.FUNC_NOT_EXIST("video asset which id is " + id));
            video = asset.video;
            video.play();
        };
        VideoManager._instance = null;
        return VideoManager;
    })();
    wd.VideoManager = VideoManager;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CustomMaterial = (function (_super) {
        __extends(CustomMaterial, _super);
        function CustomMaterial() {
            _super.apply(this, arguments);
        }
        CustomMaterial.create = function () {
            var obj = new this();
            return obj;
        };
        return CustomMaterial;
    })(wd.Material);
    wd.CustomMaterial = CustomMaterial;
})(wd || (wd = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var wd;
(function (wd) {
    var CustomGeometry = (function (_super) {
        __extends(CustomGeometry, _super);
        function CustomGeometry() {
            _super.apply(this, arguments);
            this.vertices = null;
            this.texCoords = null;
            this.colors = null;
            this.indices = null;
            this.normals = null;
        }
        CustomGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        CustomGeometry.prototype.computeData = function () {
            return {
                vertices: this.vertices,
                faces: wd.GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        };
        CustomGeometry.prototype.createBufferContainer = function () {
            return wd.CommonBufferContainer.create();
        };
        return CustomGeometry;
    })(wd.Geometry);
    wd.CustomGeometry = CustomGeometry;
})(wd || (wd = {}));


var wd;
(function (wd) {
    function script(scriptName) {
        return function (target) {
            wd.Script.addScript(scriptName, target);
        };
    }
    wd.script = script;
})(wd || (wd = {}));
