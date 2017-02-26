"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var DomEvent_1 = require("./DomEvent");
var EEventType_1 = require("./EEventType");
var PointEvent = (function (_super) {
    __extends(PointEvent, _super);
    function PointEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = EEventType_1.EEventType.POINT;
        _this.eventObj = null;
        return _this;
    }
    Object.defineProperty(PointEvent.prototype, "lastX", {
        get: function () {
            return this.eventObj.lastX;
        },
        set: function (x) {
            this.eventObj.lastX = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointEvent.prototype, "lastY", {
        get: function () {
            return this.eventObj.lastY;
        },
        set: function (y) {
            this.eventObj.lastY = y;
        },
        enumerable: true,
        configurable: true
    });
    PointEvent.prototype.cloneHelper = function (eventObj) {
        eventObj.event = this.event;
        return this.copyMember(eventObj, this, ["eventObj", "target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    return PointEvent;
}(DomEvent_1.DomEvent));
exports.PointEvent = PointEvent;
//# sourceMappingURL=PointEvent.js.map