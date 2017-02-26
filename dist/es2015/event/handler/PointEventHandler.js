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
import { DomEventHandler } from "./DomEventHandler";
import { requireCheck, it } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { EventManager } from "../EventManager";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
var PointEventHandler = (function (_super) {
    __extends(PointEventHandler, _super);
    function PointEventHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dom = null, eventName = null, handler = null, priority = null;
        if (args.length === 3) {
            dom = this.getDefaultDom();
            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            dom = args[0];
            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }
        this.handler(dom, eventName, handler, priority);
    };
    PointEventHandler.prototype.getDefaultDom = function () {
        return document.body;
    };
    PointEventHandler.prototype.triggerDomEvent = function (dom, event, eventName) {
        var eventObj = this.createEventObject(dom, event, eventName);
        EventManager.trigger(dom, eventObj);
    };
    PointEventHandler.prototype.createEventData = function () {
        var eventData = Hash.create();
        eventData.addChild("lastX", null);
        eventData.addChild("lastY", null);
        return eventData;
    };
    PointEventHandler.prototype.handleMove = function (handler) {
        var self = this;
        return function (event, eventData) {
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
            self._saveLocation(event, eventData);
        };
    };
    PointEventHandler.prototype._copyEventDataToEventObject = function (event, eventData) {
        event.lastX = eventData.getChild("lastX");
        event.lastY = eventData.getChild("lastY");
    };
    PointEventHandler.prototype._saveLocation = function (event, eventData) {
        var location = event.location;
        eventData.setValue("lastX", location.x);
        eventData.setValue("lastY", location.y);
    };
    return PointEventHandler;
}(DomEventHandler));
export { PointEventHandler };
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 4) {
            var dom_1 = args[0];
            it("first param should be HTMLElement", function () {
                expect(JudgeUtils.isDom(dom_1)).true;
            });
        }
    })
], PointEventHandler.prototype, "on", null);
//# sourceMappingURL=PointEventHandler.js.map