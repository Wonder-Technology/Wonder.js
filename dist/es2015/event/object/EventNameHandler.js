var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { chrome, firefox } from "bowser";
var EBrowserIdentifier;
(function (EBrowserIdentifier) {
    EBrowserIdentifier[EBrowserIdentifier["FALLBACK"] = "fallback"] = "FALLBACK";
    EBrowserIdentifier[EBrowserIdentifier["FIREFOX"] = "firefox"] = "FIREFOX";
    EBrowserIdentifier[EBrowserIdentifier["CHROME"] = "chrome"] = "CHROME";
})(EBrowserIdentifier || (EBrowserIdentifier = {}));
export var EEventName;
(function (EEventName) {
    EEventName[EEventName["CLICK"] = "click"] = "CLICK";
    EEventName[EEventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
    EEventName[EEventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
    EEventName[EEventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
    EEventName[EEventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
    EEventName[EEventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
    EEventName[EEventName["MOUSEWHEEL"] = "mousewheel|DOMMouseScroll*" + EBrowserIdentifier.FIREFOX] = "MOUSEWHEEL";
    EEventName[EEventName["MOUSEDRAG"] = "mousedrag"] = "MOUSEDRAG";
    EEventName[EEventName["TOUCHUP"] = "touchend"] = "TOUCHUP";
    EEventName[EEventName["TOUCHMOVE"] = "touchmove"] = "TOUCHMOVE";
    EEventName[EEventName["TOUCHDOWN"] = "touchstart"] = "TOUCHDOWN";
    EEventName[EEventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
    EEventName[EEventName["KEYUP"] = "keyup"] = "KEYUP";
    EEventName[EEventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
})(EEventName || (EEventName = {}));
var EVENTNAME_SPLITTER = '|', BROWSER_IDENTIFIER = '*';
var EventNameHandler = (function () {
    function EventNameHandler() {
    }
    EventNameHandler.handleEventName = function (domEventName) {
        var eventName = domEventName, fallbackEventName = null, specifyBrowserEventNameArr = [], result = null;
        for (var _i = 0, _a = eventName.split(EVENTNAME_SPLITTER); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            if (this._isFallbackEventName(name_1)) {
                fallbackEventName = name_1;
            }
            else {
                specifyBrowserEventNameArr.push(name_1);
            }
        }
        result = this._getSpecifyBrowserEventName(specifyBrowserEventNameArr);
        return result !== null ? result : fallbackEventName;
    };
    EventNameHandler._isFallbackEventName = function (eventName) {
        return eventName.split(BROWSER_IDENTIFIER).length === 1;
    };
    EventNameHandler._getSpecifyBrowserEventName = function (specifyBrowserEventNameArr) {
        var result = null;
        for (var _i = 0, specifyBrowserEventNameArr_1 = specifyBrowserEventNameArr; _i < specifyBrowserEventNameArr_1.length; _i++) {
            var eventName = specifyBrowserEventNameArr_1[_i];
            var _a = eventName.split(BROWSER_IDENTIFIER), domEventName = _a[0], browserIdentifier = _a[1];
            switch (browserIdentifier) {
                case EBrowserIdentifier.CHROME:
                    if (chrome) {
                        result = domEventName;
                    }
                    break;
                case EBrowserIdentifier.FIREFOX:
                    if (firefox) {
                        result = domEventName;
                    }
                    break;
                default:
                    break;
            }
            if (result) {
                break;
            }
        }
        return result;
    };
    return EventNameHandler;
}());
EventNameHandler = __decorate([
    registerClass("EventNameHandler")
], EventNameHandler);
export { EventNameHandler };
//# sourceMappingURL=EventNameHandler.js.map