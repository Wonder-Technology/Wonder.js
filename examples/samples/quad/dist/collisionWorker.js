(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	onmessage = function (e) {
	    var position = e.data.position;
	    var isCollide = false;
	    var newPosition = null;
	    console.log("receive collision in worker: ", position);
	    if (_isCollide(position)) {
	        isCollide = true;
	        newPosition = 0.2;
	    }
	    else {
	        isCollide = false;
	        newPosition = position;
	    }
	    self.postMessage({
	        isCollide: isCollide,
	        position: newPosition
	    });
	};
	var _isCollide = function (position) {
	    return position > 0.2;
	};

})));
//# sourceMappingURL=collisionWorker.js.map
