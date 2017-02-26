var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { EEventType } from "../object/EEventType";
import { MouseEventHandler } from "../handler/MouseEventHandler";
import { TouchEventHandler } from "../handler/TouchEventHandler";
import { KeyboardEventHandler } from "../handler/KeyboardEventHandler";
import { CustomEventHandler } from "../handler/CustomEventHandler";
import { Log } from "../../utils/Log";
var EventHandlerFactory = (function () {
    function EventHandlerFactory() {
    }
    EventHandlerFactory.createEventHandler = function (eventType) {
        var handler = null;
        switch (eventType) {
            case EEventType.MOUSE:
                handler = MouseEventHandler.getInstance();
                break;
            case EEventType.TOUCH:
                handler = TouchEventHandler.getInstance();
                break;
            case EEventType.KEYBOARD:
                handler = KeyboardEventHandler.getInstance();
                break;
            case EEventType.CUSTOM:
            case EEventType.POINT:
                handler = CustomEventHandler.getInstance();
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("eventType"));
                break;
        }
        return handler;
    };
    return EventHandlerFactory;
}());
EventHandlerFactory = __decorate([
    registerClass("EventHandlerFactory")
], EventHandlerFactory);
export { EventHandlerFactory };
//# sourceMappingURL=EventHandlerFactory.js.map