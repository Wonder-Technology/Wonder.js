"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayUtils_1 = require("../utils/arrayUtils");
var _data = {};
exports.registerEvent = function (eventName, func) {
    if (!_data[eventName]) {
        _data[eventName] = [];
    }
    _data[eventName].push(func);
};
exports.triggerEvent = function (eventName) {
    if (!_data[eventName]) {
        return;
    }
    arrayUtils_1.forEach(_data[eventName], function (func) {
        func();
    });
};
//# sourceMappingURL=EventManagerSystem.js.map