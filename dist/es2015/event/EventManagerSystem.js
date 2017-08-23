import { forEach } from "../utils/arrayUtils";
var _data = {};
export var registerEvent = function (eventName, func) {
    if (!_data[eventName]) {
        _data[eventName] = [];
    }
    _data[eventName].push(func);
};
export var triggerEvent = function (eventName) {
    if (!_data[eventName]) {
        return;
    }
    forEach(_data[eventName], function (func) {
        func();
    });
};
//# sourceMappingURL=EventManagerSystem.js.map