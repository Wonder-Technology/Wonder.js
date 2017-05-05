import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { DomEvent } from "./DomEvent";
import { ITouchEventData, ITouchData } from "../interface/IEventData";
import { EEventName } from "./EventNameHandler";
import { Point } from "../../structure/Point";
import { ensureGetter, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DeviceManager } from "../../device/DeviceManager";
import { EEventType } from "./EEventType";

@registerClass("TouchEvent")
export class TouchEvent extends DomEvent {
    public static create(event: ITouchEventData, eventName: EEventName) {
        var obj = new this(event, eventName);

        return obj;
    }

    public event: ITouchEventData;

    private _location: Point = null;
    get location(): Point {
        var point: Point = null;

        if (this._location) {
            return this._location;
        }

        let touchData = this.touchData;

        point = Point.create();

        point.x = touchData.pageX;
        point.y = touchData.pageY;

        return point;
    }
    set location(point: Point) {
        this._location = point;
    }

    @ensureGetter(function(touchData: ITouchData) {
        it("should exist touch data", () => {
            expect(touchData).exist;
        }, this);
    })
    get touchData(): ITouchData {
        var touches = this.event.changedTouches;

        return touches[0];
    }

    private _locationInView: Point = null;
    get locationInView(): Point {
        var point: Point = null,
            viewOffset: any = null;

        if (this._locationInView) {
            return this._locationInView;
        }

        point = this.location;


        viewOffset = DeviceManager.getInstance().view.offset;

        return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
    }
    set locationInView(locationInView: Point) {
        this._locationInView = locationInView;
    }

    get movementDelta() {
        var dx = null,
            dy = null,
            location = this.location,
            lastX = this.lastX,
            lastY = this.lastY;

        if (lastX === null && lastY === null) {
            dx = 0;
            dy = 0;
        }
        else {
            dx = location.x - lastX;
            dy = location.y - lastY;
        }

        return {
            x: dx,
            y: dy
        }
    }

    public readonly type: EEventType = EEventType.TOUCH;

    public lastX: number = null;
    public lastY: number = null;

    public clone(): TouchEvent {
        var eventObj = TouchEvent.create(this.event, <EEventName>this.name);

        return <TouchEvent>this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    }
}