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
var MouseEventHandler_1 = require("../handler/MouseEventHandler");
var TouchEventHandler_1 = require("../handler/TouchEventHandler");
var KeyboardEventHandler_1 = require("../handler/KeyboardEventHandler");
var CustomEventHandler_1 = require("../handler/CustomEventHandler");
var Log_1 = require("../../utils/Log");
var EventHandlerFactory = (function () {
    function EventHandlerFactory() {
    }
    EventHandlerFactory.createEventHandler = function (eventType) {
        var handler = null;
        switch (eventType) {
            case EEventType_1.EEventType.MOUSE:
                handler = MouseEventHandler_1.MouseEventHandler.getInstance();
                break;
            case EEventType_1.EEventType.TOUCH:
                handler = TouchEventHandler_1.TouchEventHandler.getInstance();
                break;
            case EEventType_1.EEventType.KEYBOARD:
                handler = KeyboardEventHandler_1.KeyboardEventHandler.getInstance();
                break;
            case EEventType_1.EEventType.CUSTOM:
            case EEventType_1.EEventType.POINT:
                handler = CustomEventHandler_1.CustomEventHandler.getInstance();
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("eventType"));
                break;
        }
        return handler;
    };
    return EventHandlerFactory;
}());
EventHandlerFactory = __decorate([
    registerClass_1.registerClass("EventHandlerFactory")
], EventHandlerFactory);
exports.EventHandlerFactory = EventHandlerFactory;
//# sourceMappingURL=EventHandlerFactory.js.map