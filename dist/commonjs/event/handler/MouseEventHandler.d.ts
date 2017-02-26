import { PointEventHandler } from "./PointEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { MouseEvent } from "../object/MouseEvent";
import { IMouseEventData } from "../interface/IEventData";
export declare class MouseEventHandler extends PointEventHandler {
    static getInstance(): any;
    private constructor();
    protected addEngineHandler(eventName: EEventName, handler: (event: MouseEvent) => void): any;
    protected createEventObject(dom: HTMLElement, event: IMouseEventData, eventName: EEventName): MouseEvent;
}
