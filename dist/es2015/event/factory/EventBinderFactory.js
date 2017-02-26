var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { EventTable } from "../object/EventTable";
import { EEventType } from "../object/EEventType";
import { DomEventBinder } from "../binder/DomEventBinder";
import { CustomEventBinder } from "../binder/CustomEventBinder";
import { Log } from "../../utils/Log";
var EventBinderFactory = (function () {
    function EventBinderFactory() {
    }
    EventBinderFactory.createEventBinder = function (eventName) {
        var binder = null, eventType = EventTable.getEventType(eventName);
        switch (eventType) {
            case EEventType.MOUSE:
            case EEventType.TOUCH:
            case EEventType.KEYBOARD:
                binder = DomEventBinder.getInstance();
                break;
            case EEventType.CUSTOM:
            case EEventType.POINT:
                binder = CustomEventBinder.getInstance();
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("eventName:" + eventName));
                break;
        }
        return binder;
    };
    return EventBinderFactory;
}());
EventBinderFactory = __decorate([
    registerClass("EventBinderFactory")
], EventBinderFactory);
export { EventBinderFactory };
//# sourceMappingURL=EventBinderFactory.js.map