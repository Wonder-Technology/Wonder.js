"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var EEventType_1 = require("./EEventType");
var EventNameHandler_1 = require("./EventNameHandler");
var EEngineEvent_1 = require("../EEngineEvent");
var _table = Hash_1.Hash.create();
_table.addChild(EventNameHandler_1.EEventName.CLICK, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEMOVE, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEDOWN, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEDRAG, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEOUT, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEOVER, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEUP, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.MOUSEWHEEL, EEventType_1.EEventType.MOUSE);
_table.addChild(EventNameHandler_1.EEventName.TOUCHMOVE, EEventType_1.EEventType.TOUCH);
_table.addChild(EventNameHandler_1.EEventName.TOUCHDOWN, EEventType_1.EEventType.TOUCH);
_table.addChild(EventNameHandler_1.EEventName.TOUCHUP, EEventType_1.EEventType.TOUCH);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_TAP, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_OVER, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_OUT, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_MOVE, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_DOWN, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_UP, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_SCALE, EEventType_1.EEventType.POINT);
_table.addChild(EEngineEvent_1.EEngineEvent.POINT_DRAG, EEventType_1.EEventType.POINT);
_table.addChild(EventNameHandler_1.EEventName.KEYDOWN, EEventType_1.EEventType.KEYBOARD);
_table.addChild(EventNameHandler_1.EEventName.KEYPRESS, EEventType_1.EEventType.KEYBOARD);
_table.addChild(EventNameHandler_1.EEventName.KEYUP, EEventType_1.EEventType.KEYBOARD);
var EventTable = (function () {
    function EventTable() {
    }
    EventTable.getEventType = function (eventName) {
        var result = _table.getChild(eventName);
        if (result === void 0) {
            result = EEventType_1.EEventType.CUSTOM;
        }
        return result;
    };
    return EventTable;
}());
EventTable = __decorate([
    registerClass_1.registerClass("EventTable")
], EventTable);
exports.EventTable = EventTable;
//# sourceMappingURL=EventTable.js.map