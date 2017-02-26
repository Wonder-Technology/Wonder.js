import { PointEventHandler } from "./PointEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { TouchEvent } from "../object/TouchEvent";
import { ITouchEventData } from "../interface/IEventData";
export declare class TouchEventHandler extends PointEventHandler {
    static getInstance(): any;
    private constructor();
    protected addEngineHandler(eventName: EEventName, handler: (event: TouchEvent) => void): any;
    protected createEventObject(dom: HTMLElement, event: ITouchEventData, eventName: EEventName): TouchEvent;
}
