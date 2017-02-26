"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var EEventType_1 = require("../object/EEventType");
var DomEventDispatcher_1 = require("../dispatcher/DomEventDispatcher");
var CustomEventDispatcher_1 = require("../dispatcher/CustomEventDispatcher");
var Log_1 = require("../../utils/Log");
var EventDispatcherFactory = (function () {
    function EventDispatcherFactory() {
    }
    EventDispatcherFactory.createEventDispatcher = function (event) {
        var dispatcher = null, eventType = event.type;
        switch (eventType) {
            case EEventType_1.EEventType.MOUSE:
            case EEventType_1.EEventType.TOUCH:
            case EEventType_1.EEventType.KEYBOARD:
                dispatcher = DomEventDispatcher_1.DomEventDispatcher.getInstance();
                break;
            case EEventType_1.EEventType.CUSTOM:
            case EEventType_1.EEventType.POINT:
                dispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("event:" + event));
                break;
        }
        return dispatcher;
    };
    return EventDispatcherFactory;
}());
EventDispatcherFactory = __decorate([
    registerClass_1.registerClass("EventDispatcherFactory")
], EventDispatcherFactory);
exports.EventDispatcherFactory = EventDispatcherFactory;
//# sourceMappingURL=EventDispatcherFactory.js.map