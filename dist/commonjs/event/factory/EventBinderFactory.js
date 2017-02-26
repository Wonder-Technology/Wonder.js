"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var EventTable_1 = require("../object/EventTable");
var EEventType_1 = require("../object/EEventType");
var DomEventBinder_1 = require("../binder/DomEventBinder");
var CustomEventBinder_1 = require("../binder/CustomEventBinder");
var Log_1 = require("../../utils/Log");
var EventBinderFactory = (function () {
    function EventBinderFactory() {
    }
    EventBinderFactory.createEventBinder = function (eventName) {
        var binder = null, eventType = EventTable_1.EventTable.getEventType(eventName);
        switch (eventType) {
            case EEventType_1.EEventType.MOUSE:
            case EEventType_1.EEventType.TOUCH:
            case EEventType_1.EEventType.KEYBOARD:
                binder = DomEventBinder_1.DomEventBinder.getInstance();
                break;
            case EEventType_1.EEventType.CUSTOM:
            case EEventType_1.EEventType.POINT:
                binder = CustomEventBinder_1.CustomEventBinder.getInstance();
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("eventName:" + eventName));
                break;
        }
        return binder;
    };
    return EventBinderFactory;
}());
EventBinderFactory = __decorate([
    registerClass_1.registerClass("EventBinderFactory")
], EventBinderFactory);
exports.EventBinderFactory = EventBinderFactory;
//# sourceMappingURL=EventBinderFactory.js.map