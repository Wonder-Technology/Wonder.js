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
import { PointEvent } from "./PointEvent";
var MousePointEvent = MousePointEvent_1 = (function (_super) {
    __extends(MousePointEvent, _super);
    function MousePointEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MousePointEvent.create = function (eventName) {
        var obj = new this(null, eventName);
        return obj;
    };
    Object.defineProperty(MousePointEvent.prototype, "location", {
        get: function () {
            return this.eventObj.location;
        },
        set: function (point) {
            this.eventObj.location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "locationInView", {
        get: function () {
            return this.eventObj.locationInView;
        },
        set: function (locationInView) {
            this.eventObj.locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "button", {
        get: function () {
            return this.eventObj.button;
        },
        set: function (button) {
            this.eventObj.button = button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "wheel", {
        get: function () {
            return this.eventObj.wheel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "movementDelta", {
        get: function () {
            return this.eventObj.movementDelta;
        },
        enumerable: true,
        configurable: true
    });
    MousePointEvent.prototype.getDataFromEventObj = function (e) {
        this.eventObj = e;
        this.event = e.event;
    };
    MousePointEvent.prototype.clone = function () {
        return this.cloneHelper(MousePointEvent_1.create(this.name));
    };
    return MousePointEvent;
}(PointEvent));
MousePointEvent = MousePointEvent_1 = __decorate([
    registerClass("MousePointEvent")
], MousePointEvent);
export { MousePointEvent };
var MousePointEvent_1;
//# sourceMappingURL=MousePointEvent.js.map