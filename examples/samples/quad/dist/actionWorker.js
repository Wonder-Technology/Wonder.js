(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	onmessage = function (e) {
	    var time = e.data.time;
	    self.postMessage({
	        position: _getNewPosition(time)
	    });
	};
	var _getNewPosition = function (time) {
	    var delta = (time % 1000 - 500) / 1000;
	    return delta;
	};

})));
//# sourceMappingURL=actionWorker.js.map
