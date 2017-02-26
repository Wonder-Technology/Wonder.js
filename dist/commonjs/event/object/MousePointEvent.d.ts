import { PointEvent } from "./PointEvent";
import { EEventName } from "./EventNameHandler";
import { MouseEvent } from "./MouseEvent";
import { Point } from "../../structure/Point";
export declare class MousePointEvent extends PointEvent {
    static create(eventName: EEventName): MousePointEvent;
    eventObj: MouseEvent;
    location: Point;
    locationInView: Point;
    button: number;
    readonly wheel: number;
    readonly movementDelta: {
        x: any;
        y: any;
    };
    getDataFromEventObj(e: MouseEvent): void;
    clone(): any;
}
