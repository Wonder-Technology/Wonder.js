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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var DomEvent_1 = require("./DomEvent");
var Point_1 = require("../../structure/Point");
var bowser_1 = require("bowser");
var DeviceManager_1 = require("../../device/DeviceManager");
var EMouseButton_1 = require("./EMouseButton");
var Log_1 = require("../../utils/Log");
var EEventType_1 = require("./EEventType");
var MouseEvent = MouseEvent_1 = (function (_super) {
    __extends(MouseEvent, _super);
    function MouseEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._location = null;
        _this._locationInView = null;
        _this._button = null;
        _this.type = EEventType_1.EEventType.MOUSE;
        _this.lastX = null;
        _this.lastY = null;
        return _this;
    }
    MouseEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(MouseEvent.prototype, "location", {
        get: function () {
            var point = null, e = this.event;
            if (this._location) {
                return this._location;
            }
            point = Point_1.Point.create();
            if (bowser_1.msie) {
                point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
            }
            else {
                point.x = e.pageX;
                point.y = e.pageY;
            }
            return point;
        },
        set: function (point) {
            this._location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "locationInView", {
        get: function () {
            var point = null, viewOffset = null;
            if (this._locationInView) {
                return this._locationInView;
            }
            point = this.location;
            viewOffset = DeviceManager_1.DeviceManager.getInstance().view.offset;
            return Point_1.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        },
        set: function (locationInView) {
            this._locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "button", {
        get: function () {
            var e = this.event, mouseButton = null;
            if (bowser_1.mobile) {
                return null;
            }
            if (this._button !== null) {
                return this._button;
            }
            if (bowser_1.msie) {
                switch (e.button) {
                    case 1:
                        mouseButton = EMouseButton_1.EMouseButton.LEFT;
                        break;
                    case 4:
                        mouseButton = EMouseButton_1.EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton_1.EMouseButton.CENTER;
                        break;
                    default:
                        Log_1.Log.error(true, Log_1.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }
            else {
                switch (e.button) {
                    case 0:
                        mouseButton = EMouseButton_1.EMouseButton.LEFT;
                        break;
                    case 1:
                        mouseButton = EMouseButton_1.EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton_1.EMouseButton.CENTER;
                        break;
                    default:
                        Log_1.Log.error(true, Log_1.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }
            return mouseButton;
        },
        set: function (button) {
            this._button = button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "wheel", {
        get: function () {
            var e = this.event;
            if (bowser_1.mobile) {
                return null;
            }
            if (e.detail) {
                return -1 * e.detail;
            }
            if (e.wheelDelta) {
                return e.wheelDelta / 120;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "movementDelta", {
        get: function () {
            var e = this.event, dx = null, dy = null;
            if (this._isPointerLocked()) {
                dx = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
                dy = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
            }
            else {
                var location_1 = this.location, lastX = this.lastX, lastY = this.lastY;
                if (lastX === null && lastY === null) {
                    dx = 0;
                    dy = 0;
                }
                else {
                    dx = location_1.x - lastX;
                    dy = location_1.y - lastY;
                }
            }
            return {
                x: dx,
                y: dy
            };
        },
        enumerable: true,
        configurable: true
    });
    MouseEvent.prototype.clone = function () {
        var eventObj = MouseEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    MouseEvent.prototype._isPointerLocked = function () {
        return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
    };
    return MouseEvent;
}(DomEvent_1.DomEvent));
MouseEvent = MouseEvent_1 = __decorate([
    registerClass_1.registerClass("MouseEvent")
], MouseEvent);
exports.MouseEvent = MouseEvent;
var MouseEvent_1;
//# sourceMappingURL=MouseEvent.js.map