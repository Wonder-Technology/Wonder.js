import { DomEvent } from "./DomEvent";
import { ITouchEventData, ITouchData } from "../interface/IEventData";
import { EEventName } from "./EventNameHandler";
import { Point } from "../../structure/Point";
import { EEventType } from "./EEventType";
export declare class TouchEvent extends DomEvent {
    static create(event: ITouchEventData, eventName: EEventName): TouchEvent;
    event: ITouchEventData;
    private _location;
    location: Point;
    readonly touchData: ITouchData;
    private _locationInView;
    locationInView: Point;
    readonly movementDelta: {
        x: any;
        y: any;
    };
    readonly type: EEventType;
    lastX: number;
    lastY: number;
    clone(): TouchEvent;
}
