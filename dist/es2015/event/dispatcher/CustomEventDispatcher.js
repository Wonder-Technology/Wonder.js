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
import { singleton } from "../../definition/typescript/decorator/singleton";
import { EventDispatcher } from "./EventDispatcher";
import { EventHandlerFactory } from "../factory/EventHandlerFactory";
import { EventUtils } from "../utils/EventUtils";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { EEventPhase } from "../object/EEventPhase";
var CustomEventDispatcher = (function (_super) {
    __extends(CustomEventDispatcher, _super);
    function CustomEventDispatcher() {
        return _super.call(this) || this;
    }
    CustomEventDispatcher.getInstance = function () { };
    CustomEventDispatcher.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        if (length === 1) {
            var event_1 = args[0], eventType = event_1.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event_1);
        }
        else if (length === 2 && EventUtils.isEvent(args[0])) {
            var event_2 = args[0], userData = args[1], eventType = event_2.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event_2, userData);
        }
        else if ((length === 2 && EventUtils.isEntityObject(args[0])) || (length === 3 && JudgeUtils.isBoolean(args[2]))) {
            var target = args[0], event_3 = args[1], notSetTarget = args[2] === void 0 ? false : args[2], eventType = event_3.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event_3, notSetTarget);
        }
        else if (length === 3 || length === 4) {
            var target = args[0], event_4 = args[1], userData = args[2], notSetTarget = args[3] === void 0 ? false : args[3], eventType = event_4.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event_4, userData, notSetTarget);
        }
    };
    CustomEventDispatcher.prototype.emit = function (target, eventObject, userData) {
        var isStopPropagation = false;
        if (!target) {
            return;
        }
        eventObject.phase = EEventPhase.EMIT;
        eventObject.target = target;
        do {
            isStopPropagation = this._triggerWithUserData(target, eventObject, userData, true);
            if (isStopPropagation) {
                break;
            }
            target = target.bubbleParent;
        } while (target);
    };
    CustomEventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
        var self = this;
        var iterator = function (obj) {
            var children = obj.getChildren();
            if (children.getCount() === 0) {
                return;
            }
            children.forEach(function (child) {
                self._triggerWithUserData(child, eventObject, userData, true);
                iterator(child);
            });
        };
        if (!target) {
            return;
        }
        eventObject.phase = EEventPhase.BROADCAST;
        eventObject.target = target;
        this._triggerWithUserData(target, eventObject, userData, true);
        iterator(target);
    };
    CustomEventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
        return userData ? this.trigger(target, event, userData, notSetTarget)
            : this.trigger(target, event, notSetTarget);
    };
    return CustomEventDispatcher;
}(EventDispatcher));
CustomEventDispatcher = __decorate([
    singleton(),
    registerClass("CustomEventDispatcher")
], CustomEventDispatcher);
export { CustomEventDispatcher };
//# sourceMappingURL=CustomEventDispatcher.js.map