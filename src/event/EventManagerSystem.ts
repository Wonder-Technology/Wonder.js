//todo refactor: import event manager project!

import { forEach } from "../utils/arrayUtils";

var _data = {};

export var registerEvent = (eventName: string, func: Function) => {
    if (!_data[eventName]) {
        _data[eventName] = [];
    }

    _data[eventName].push(func);
}

export var triggerEvent = (eventName: string) => {
    if (!_data[eventName]) {
        return;
    }

    forEach(_data[eventName], (func: Function) => {
        func();
    })
}
