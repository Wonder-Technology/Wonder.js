import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { EEventType } from "../object/EEventType";
import { MouseEventHandler } from "../handler/MouseEventHandler";
import { TouchEventHandler } from "../handler/TouchEventHandler";
import { KeyboardEventHandler } from "../handler/KeyboardEventHandler";
import { CustomEventHandler } from "../handler/CustomEventHandler";
import { Log } from "../../utils/Log";

@registerClass("EventHandlerFactory")
export class EventHandlerFactory {
    public static createEventHandler(eventType: EEventType) {
        let handler = null;

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
    }
}