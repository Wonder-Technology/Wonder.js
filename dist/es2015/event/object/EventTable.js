var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { EEventType } from "./EEventType";
import { EEventName } from "./EventNameHandler";
import { EEngineEvent } from "../EEngineEvent";
var _table = Hash.create();
_table.addChild(EEventName.CLICK, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEMOVE, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEDOWN, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEDRAG, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEOUT, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEOVER, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEUP, EEventType.MOUSE);
_table.addChild(EEventName.MOUSEWHEEL, EEventType.MOUSE);
_table.addChild(EEventName.TOUCHMOVE, EEventType.TOUCH);
_table.addChild(EEventName.TOUCHDOWN, EEventType.TOUCH);
_table.addChild(EEventName.TOUCHUP, EEventType.TOUCH);
_table.addChild(EEngineEvent.POINT_TAP, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_OVER, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_OUT, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_MOVE, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_DOWN, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_UP, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_SCALE, EEventType.POINT);
_table.addChild(EEngineEvent.POINT_DRAG, EEventType.POINT);
_table.addChild(EEventName.KEYDOWN, EEventType.KEYBOARD);
_table.addChild(EEventName.KEYPRESS, EEventType.KEYBOARD);
_table.addChild(EEventName.KEYUP, EEventType.KEYBOARD);
var EventTable = (function () {
    function EventTable() {
    }
    EventTable.getEventType = function (eventName) {
        var result = _table.getChild(eventName);
        if (result === void 0) {
            result = EEventType.CUSTOM;
        }
        return result;
    };
    return EventTable;
}());
EventTable = __decorate([
    registerClass("EventTable")
], EventTable);
export { EventTable };
//# sourceMappingURL=EventTable.js.map