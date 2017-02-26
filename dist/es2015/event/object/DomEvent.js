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
import { Event } from "./Event";
import { root } from "../../definition/Variable";
import { msie, version } from "bowser";
var DomEvent = (function (_super) {
    __extends(DomEvent, _super);
    function DomEvent(event, eventName) {
        var _this = _super.call(this, eventName) || this;
        _this._event = null;
        _this.event = event;
        return _this;
    }
    Object.defineProperty(DomEvent.prototype, "event", {
        get: function () {
            return this._event;
        },
        set: function (event) {
            this._event = event || root.event;
        },
        enumerable: true,
        configurable: true
    });
    DomEvent.prototype.preventDefault = function () {
        var e = this._event;
        if (msie && Number(version) <= 8) {
            e.returnValue = false;
        }
        else {
            e.preventDefault();
        }
    };
    DomEvent.prototype.getDataFromCustomEvent = function (event) {
        this.target = event.target;
        this.currentTarget = event.currentTarget;
        this.isStopPropagation = event.isStopPropagation;
    };
    return DomEvent;
}(Event));
export { DomEvent };
//# sourceMappingURL=DomEvent.js.map