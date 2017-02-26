var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { DomEvent } from "./DomEvent";
import { Point } from "../../structure/Point";
import { ensureGetter, it } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { DeviceManager } from "../../device/DeviceManager";
import { EEventType } from "./EEventType";
var TouchEvent = TouchEvent_1 = (function (_super) {
    __extends(TouchEvent, _super);
    function TouchEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._location = null;
        _this._locationInView = null;
        _this.type = EEventType.TOUCH;
        _this.lastX = null;
        _this.lastY = null;
        return _this;
    }
    TouchEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(TouchEvent.prototype, "location", {
        get: function () {
            var point = null;
            if (this._location) {
                return this._location;
            }
            var touchData = this.touchData;
            point = Point.create();
            point.x = touchData.pageX;
            point.y = touchData.pageY;
            return point;
        },
        set: function (point) {
            this._location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "touchData", {
        get: function () {
            var touches = this.event.changedTouches;
            return touches[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "locationInView", {
        get: function () {
            var point = null, viewOffset = null;
            if (this._locationInView) {
                return this._locationInView;
            }
            point = this.location;
            viewOffset = DeviceManager.getInstance().view.offset;
            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        },
        set: function (locationInView) {
            this._locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "movementDelta", {
        get: function () {
            var dx = null, dy = null, location = this.location, lastX = this.lastX, lastY = this.lastY;
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
            };
        },
        enumerable: true,
        configurable: true
    });
    TouchEvent.prototype.clone = function () {
        var eventObj = TouchEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    return TouchEvent;
}(DomEvent));
__decorate([
    ensureGetter(function (touchData) {
        it("should exist touch data", function () {
            expect(touchData).exist;
        }, this);
    })
], TouchEvent.prototype, "touchData", null);
TouchEvent = TouchEvent_1 = __decorate([
    registerClass("TouchEvent")
], TouchEvent);
export { TouchEvent };
var TouchEvent_1;
//# sourceMappingURL=TouchEvent.js.map