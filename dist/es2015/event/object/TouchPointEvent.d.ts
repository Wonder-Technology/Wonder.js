import { PointEvent } from "./PointEvent";
import { EEventName } from "./EventNameHandler";
import { TouchEvent } from "./TouchEvent";
import { Point } from "../../structure/Point";
export declare class TouchPointEvent extends PointEvent {
    static create(eventName: EEventName): TouchPointEvent;
    eventObj: TouchEvent;
    location: Point;
    locationInView: Point;
    readonly wheel: any;
    readonly movementDelta: {
        x: any;
        y: any;
    };
    button: number;
    getDataFromEventObj(e: TouchEvent): void;
    clone(): any;
}
