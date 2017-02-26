import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { PointEventHandler } from "./PointEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { MouseEvent } from "../object/MouseEvent";
import { IMouseEventData } from "../interface/IEventData";
import { root } from "../../definition/Variable";

@singleton()
@registerClass("MouseEventHandler")
export class MouseEventHandler extends PointEventHandler {
    public static getInstance(): any { }

    private constructor() { super(); }

    protected addEngineHandler(eventName: EEventName, handler: (event: MouseEvent) => void) {
        var resultHandler = null;

        switch (eventName) {
            case EEventName.MOUSEMOVE:
                resultHandler = this.handleMove(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }

        return resultHandler;
    }

    protected createEventObject(dom: HTMLElement, event: IMouseEventData, eventName: EEventName) {
        var obj = MouseEvent.create(event ? event : root.event, eventName);

        obj.target = dom;

        return obj;
    }
}