import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { PointEventHandler } from "./PointEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { TouchEvent } from "../object/TouchEvent";
import { ITouchEventData } from "../interface/IEventData";
import { root } from "../../definition/Variable";

@singleton()
@registerClass("TouchEventHandler")
export class TouchEventHandler extends PointEventHandler {
    public static getInstance(): any { }

    private constructor() { super(); }

    protected addEngineHandler(eventName: EEventName, handler: (event: TouchEvent) => void) {
        var resultHandler = null;

        switch (eventName) {
            case EEventName.TOUCHMOVE:
                resultHandler = this.handleMove(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }

        return resultHandler;
    }

    protected createEventObject(dom: HTMLElement, event: ITouchEventData, eventName: EEventName) {
        var obj = TouchEvent.create(event ? event : root.event, eventName);

        obj.target = dom;

        return obj;
    }
}