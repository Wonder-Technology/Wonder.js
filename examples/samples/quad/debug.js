var _isShowLog = true;
export var hideLog = function () {
    _isShowLog = false;
};
export var log = function () {
    var msgArr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgArr[_i] = arguments[_i];
    }
    if (_isShowLog) {
        console.log(msgArr.join(""));
    }
};
//# sourceMappingURL=debug.js.map