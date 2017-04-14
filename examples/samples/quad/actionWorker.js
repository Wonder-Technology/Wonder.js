var _this = this;
onmessage = function (e) {
    var time = e.data.time;
    _this.postMessage({
        position: _getNewPosition(time)
    });
};
var _getNewPosition = function (time) {
    var delta = (time % 1000 - 500) / 1000;
    return delta;
};
//# sourceMappingURL=actionWorker.js.map