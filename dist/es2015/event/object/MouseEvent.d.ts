import { DomEvent } from "./DomEvent";
import { IMouseEventData } from "../interface/IEventData";
import { EEventName } from "./EventNameHandler";
import { Point } from "../../structure/Point";
import { EEventType } from "./EEventType";
export declare class MouseEvent extends DomEvent {
    static create(event: IMouseEventData, eventName: EEventName): MouseEvent;
    event: IMouseEventData;
    private _location;
    location: Point;
    private _locationInView;
    locationInView: Point;
    private _button;
    button: number;
    readonly wheel: number;
    readonly movementDelta: {
        x: any;
        y: any;
    };
    readonly type: EEventType;
    lastX: number;
    lastY: number;
    clone(): MouseEvent;
    private _isPointerLocked();
}
