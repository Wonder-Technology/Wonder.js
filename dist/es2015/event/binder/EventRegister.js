var EventRegister = (function () {
    function EventRegister() {
    }
    EventRegister.prototype.getEventRegisterDataList = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = this.listenerMap.getChild.apply(this.listenerMap, args);
        if (!result) {
            return null;
        }
        return result.sort(function (dataA, dataB) {
            return dataB.priority - dataA.priority;
        }, true);
    };
    EventRegister.prototype.forEachAll = function (func) {
        return this.listenerMap.forEachAll(func);
    };
    EventRegister.prototype.forEachEventName = function (func) {
        this.listenerMap.forEachEventName(func);
    };
    EventRegister.prototype.clear = function () {
        return this.listenerMap.clear();
    };
    EventRegister.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.listenerMap.getChild.apply(this.listenerMap, Array.prototype.slice.call(arguments, 0));
    };
    return EventRegister;
}());
export { EventRegister };
//# sourceMappingURL=EventRegister.js.map