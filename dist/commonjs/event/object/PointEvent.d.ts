import { DomEvent } from "./DomEvent";
import { IPointEventData } from "../interface/IEventData";
import { Point } from "../../structure/Point";
import { EEventType } from "./EEventType";
import { MouseEvent } from "./MouseEvent";
import { TouchEvent } from "./TouchEvent";
export declare abstract class PointEvent extends DomEvent {
    event: IPointEventData;
    abstract location: Point;
    abstract locationInView: Point;
    abstract button: number | null;
    readonly abstract wheel: number | null;
    readonly abstract movementDelta: Point;
    lastX: number;
    lastY: number;
    readonly type: EEventType;
    eventObj: MouseEvent | TouchEvent;
    abstract getDataFromEventObj(eventObj: TouchEvent | MouseEvent): void;
    protected cloneHelper(eventObj: PointEvent): PointEvent;
}
