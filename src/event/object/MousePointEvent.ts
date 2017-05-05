import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { PointEvent } from "./PointEvent";
import { EEventName } from "./EventNameHandler";
import { MouseEvent } from "./MouseEvent";
import { Point } from "../../structure/Point";
import { IPointEventData } from "../interface/IEventData";

@registerClass("MousePointEvent")
export class MousePointEvent extends PointEvent {
    public static create(eventName: EEventName) {
        var obj = new this(null, eventName);

        return obj;
    }

    public eventObj: MouseEvent;

    get location(): Point {
        return this.eventObj.location;
    }
    set location(point: Point) {
        this.eventObj.location = point;
    }

    get locationInView(): Point {
        return this.eventObj.locationInView;
    }
    set locationInView(locationInView: Point) {
        this.eventObj.locationInView = locationInView;
    }

    get button() {
        return this.eventObj.button;
    }
    set button(button: number) {
        this.eventObj.button = button;
    }

    get wheel() {
        return this.eventObj.wheel;
    }

    get movementDelta() {
        return this.eventObj.movementDelta;
    }

    public getDataFromEventObj(e: MouseEvent) {
        this.eventObj = e;

        this.event = <IPointEventData>e.event;
    }

    public clone() {
        return this.cloneHelper(MousePointEvent.create(<EEventName>this.name));
    }
}