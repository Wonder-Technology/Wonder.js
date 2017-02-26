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
import { EventBinder } from "./EventBinder";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { EventHandlerFactory } from "../factory/EventHandlerFactory";
import { EventTable } from "../object/EventTable";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { CustomEventRegister } from "./CustomEventRegister";
var CustomEventBinder = (function (_super) {
    __extends(CustomEventBinder, _super);
    function CustomEventBinder() {
        return _super.call(this) || this;
    }
    CustomEventBinder.getInstance = function () { };
    CustomEventBinder.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler, priority);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(target, eventName, handler);
        }
        else if (args.length === 4) {
            var target = args[0], eventName = args[1], handler = args[2], priority = args[3];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(target, eventName, handler, priority);
        }
    };
    CustomEventBinder.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventRegister = CustomEventRegister.getInstance();
        if (args.length === 0) {
            eventRegister.forEachAll(function (list, eventName) {
                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            });
            eventRegister.clear();
        }
        else if (args.length === 1 && JudgeUtils.isString(args[0])) {
            var eventName_1 = args[0];
            eventRegister.forEachEventName(function (list, registeredEventName) {
                if (registeredEventName === eventName_1) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName_1))
                        .off(eventName_1);
                }
            });
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target_1 = args[0], secondMap = null;
            secondMap = eventRegister.getChild(target_1);
            if (!!secondMap) {
                secondMap.forEach(function (list, eventName) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(target_1, eventName);
                });
            }
        }
        else if (args.length === 2 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(eventName, handler);
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(target, eventName);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(target, eventName, handler);
        }
    };
    return CustomEventBinder;
}(EventBinder));
CustomEventBinder = __decorate([
    singleton(),
    registerClass("CustomEventBinder")
], CustomEventBinder);
export { CustomEventBinder };
//# sourceMappingURL=CustomEventBinder.js.map