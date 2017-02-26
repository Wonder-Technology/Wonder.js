var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { EntityObject } from "../core/entityObject/EntityObject";
import { requireCheck, it, assert } from "../definition/typescript/decorator/contract";
import { EventTable } from "./object/EventTable";
import expect from "wonder-expect.js";
import { EEventType } from "./object/EEventType";
import { JudgeUtils } from "../utils/JudgeUtils";
import { EventBinderFactory } from "./factory/EventBinderFactory";
import { CustomEventBinder } from "./binder/CustomEventBinder";
import { DomEventBinder } from "./binder/DomEventBinder";
import { Event } from "./object/Event";
import { CustomEvent } from "./object/CustomEvent";
import { Log } from "../utils/Log";
import { EventDispatcherFactory } from "./factory/EventDispatcherFactory";
import { EventUtils } from "./utils/EventUtils";
import { CustomEventDispatcher } from "./dispatcher/CustomEventDispatcher";
import { DomEventDispatcher } from "./dispatcher/DomEventDispatcher";
import { fromEventPattern } from "wonder-frp/dist/es2015/global/Operator";
import { CustomEventRegister } from "./binder/CustomEventRegister";
var EventManager = EventManager_1 = (function () {
    function EventManager() {
    }
    EventManager.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = 1, eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
        else if (args.length === 4 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 4 && JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
    };
    EventManager.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            var customEventBinder = CustomEventBinder.getInstance(), domEventBinder = DomEventBinder.getInstance();
            customEventBinder.off();
            domEventBinder.off();
        }
        else if (args.length === 1 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target = args[0], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target);
        }
        else if (args.length === 1 && JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom);
        }
        else if (args.length === 2 && JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName, handler);
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target, eventName);
        }
        else if (args.length === 2 && JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom, eventName);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target, eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom, eventName, handler);
        }
    };
    EventManager.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        if (length === 1) {
            var event_1 = args[0], eventDispatcher = EventDispatcherFactory.createEventDispatcher(event_1);
            eventDispatcher.trigger(event_1);
        }
        else if (length === 2 && EventUtils.isEvent(args[0])) {
            var event_2 = args[0], userData = args[1], eventDispatcher = CustomEventDispatcher.getInstance();
            eventDispatcher.trigger(event_2, userData);
        }
        else if (length === 2 && EventUtils.isEntityObject(args[0])) {
            var target = args[0], event_3 = args[1], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event_3);
        }
        else if (length === 2) {
            var dom = args[0], event_4 = args[1], eventDispatcher = DomEventDispatcher.getInstance();
            if (!dom) {
                return;
            }
            eventDispatcher.trigger(dom, event_4);
        }
        else if (length === 3) {
            var target = args[0], event_5 = args[1], userData = args[2], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event_5, userData);
        }
        else if (length === 4) {
            var target = args[0], event_6 = args[1], userData = args[2], notSetTarget = args[3], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event_6, userData, notSetTarget);
        }
    };
    EventManager.broadcast = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventDispatcher = CustomEventDispatcher.getInstance();
        eventDispatcher.broadcast.apply(eventDispatcher, args);
    };
    EventManager.emit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventDispatcher = CustomEventDispatcher.getInstance();
        eventDispatcher.emit.apply(eventDispatcher, args);
    };
    EventManager.fromEvent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var addHandler = null, removeHandler = null;
        if (args.length === 1) {
            var eventName_1 = args[0];
            addHandler = function (handler) {
                EventManager_1.on(eventName_1, handler);
            };
            removeHandler = function (handler) {
                EventManager_1.off(eventName_1, handler);
            };
        }
        else if (args.length === 2 && JudgeUtils.isNumber(args[1])) {
            var eventName_2 = args[0], priority_1 = args[1];
            addHandler = function (handler) {
                EventManager_1.on(eventName_2, handler, priority_1);
            };
            removeHandler = function (handler) {
                EventManager_1.off(eventName_2, handler);
            };
        }
        else if (args.length === 2) {
            var eventName_3 = args[1];
            addHandler = function (handler) {
                EventManager_1.on(args[0], eventName_3, handler);
            };
            removeHandler = function (handler) {
                EventManager_1.off(args[0], eventName_3, handler);
            };
        }
        else if (args.length === 3) {
            var eventName_4 = args[1], priority_2 = args[2];
            addHandler = function (handler) {
                EventManager_1.on(args[0], eventName_4, handler, priority_2);
            };
            removeHandler = function (handler) {
                EventManager_1.off(args[0], eventName_4, handler);
            };
        }
        return fromEventPattern(addHandler, removeHandler);
    };
    EventManager.setBubbleParent = function (target, parent) {
        CustomEventRegister.getInstance().setBubbleParent(target, parent);
    };
    return EventManager;
}());
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof EntityObject) {
            var eventName_5 = args[1];
            it("event must be custom event", function () {
                var eventType = EventTable.getEventType(eventName_5);
                expect(eventType === EEventType.CUSTOM || eventType === EEventType.POINT).true;
            });
        }
        else if (JudgeUtils.isDom(args[0])) {
            var eventName = args[1], eventType_1 = EventTable.getEventType(eventName);
            it("event must be dom event", function () {
                expect(eventType_1 === EEventType.TOUCH || eventType_1 === EEventType.MOUSE || eventType_1 === EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "on", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 2 && args[0] instanceof EntityObject) {
            var eventName = args[1], eventType_2 = EventTable.getEventType(eventName);
            it("event must be custom or point event", function () {
                expect(eventType_2 === EEventType.CUSTOM || eventType_2 === EEventType.POINT).true;
            });
        }
        else if (args.length > 2 && JudgeUtils.isDom(args[0])) {
            var eventName = args[1], eventType_3 = EventTable.getEventType(eventName);
            it("event must be keyboard event", function () {
                expect(eventType_3 === EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "off", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && args[0] instanceof Event) {
            var event_7 = args[0];
            assert(event_7 instanceof CustomEvent, Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
        }
        else if (args.length === 2) {
            if (args[0]) {
                assert(JudgeUtils.isDom(args[0]), Log.info.FUNC_MUST_BE("the first param", "dom"));
            }
        }
        else if (args[0] instanceof EntityObject) {
            var event_8 = args[1];
            assert(event_8 instanceof CustomEvent, Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
    })
], EventManager, "trigger", null);
__decorate([
    requireCheck(function (target, eventObject, userData) {
        assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "broadcast", null);
__decorate([
    requireCheck(function (target, eventObject, userData) {
        assert(eventObject instanceof CustomEvent, Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "emit", null);
__decorate([
    requireCheck(function (target, parent) {
        assert(target instanceof EntityObject, "only EntityObject can setBubleParent");
    })
], EventManager, "setBubbleParent", null);
EventManager = EventManager_1 = __decorate([
    registerClass("EventManager")
], EventManager);
export { EventManager };
var EventManager_1;
//# sourceMappingURL=EventManager.js.map