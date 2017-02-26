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
var TouchPointEvent = TouchPointEvent_1 = (function (_super) {
    __extends(TouchPointEvent, _super);
    function TouchPointEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        return _this;
    }
    TouchPointEvent.create = function (eventName) {
        var obj = new this(null, eventName);
        return obj;
    };
    Object.defineProperty(TouchPointEvent.prototype, "location", {
        get: function () {
            return this.eventObj.location;
        },
        set: function (point) {
            this.eventObj.location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "locationInView", {
        get: function () {
            return this.eventObj.locationInView;
        },
        set: function (locationInView) {
            this.eventObj.locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "wheel", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "movementDelta", {
        get: function () {
            return this.eventObj.movementDelta;
        },
        enumerable: true,
        configurable: true
    });
    TouchPointEvent.prototype.getDataFromEventObj = function (e) {
        var touchData = e.touchData;
        this.eventObj = e;
        this.event = {
            clientX: touchData.clientX,
            clientY: touchData.clientY,
            pageX: touchData.pageX,
            pageY: touchData.pageY,
            target: touchData.target,
            currentTarget: e.currentTarget
        };
    };
    TouchPointEvent.prototype.clone = function () {
        return this.cloneHelper(TouchPointEvent_1.create(this.name));
    };
    return TouchPointEvent;
}(PointEvent));
TouchPointEvent = TouchPointEvent_1 = __decorate([
    registerClass("TouchPointEvent")
], TouchPointEvent);
export { TouchPointEvent };
var TouchPointEvent_1;
//# sourceMappingURL=TouchPointEvent.js.map