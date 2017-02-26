"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var EntityObject_1 = require("../core/entityObject/EntityObject");
var contract_1 = require("../definition/typescript/decorator/contract");
var EventTable_1 = require("./object/EventTable");
var wonder_expect_js_1 = require("wonder-expect.js");
var EEventType_1 = require("./object/EEventType");
var JudgeUtils_1 = require("../utils/JudgeUtils");
var EventBinderFactory_1 = require("./factory/EventBinderFactory");
var CustomEventBinder_1 = require("./binder/CustomEventBinder");
var DomEventBinder_1 = require("./binder/DomEventBinder");
var Event_1 = require("./object/Event");
var CustomEvent_1 = require("./object/CustomEvent");
var Log_1 = require("../utils/Log");
var EventDispatcherFactory_1 = require("./factory/EventDispatcherFactory");
var EventUtils_1 = require("./utils/EventUtils");
var CustomEventDispatcher_1 = require("./dispatcher/CustomEventDispatcher");
var DomEventDispatcher_1 = require("./dispatcher/DomEventDispatcher");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var CustomEventRegister_1 = require("./binder/CustomEventRegister");
var EventManager = EventManager_1 = (function () {
    function EventManager() {
    }
    EventManager.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = 1, eventBinder = EventBinderFactory_1.EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2], eventBinder = EventBinderFactory_1.EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = CustomEventBinder_1.CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = DomEventBinder_1.DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
        else if (args.length === 4 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = CustomEventBinder_1.CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 4 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = DomEventBinder_1.DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
    };
    EventManager.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            var customEventBinder = CustomEventBinder_1.CustomEventBinder.getInstance(), domEventBinder = DomEventBinder_1.DomEventBinder.getInstance();
            customEventBinder.off();
            domEventBinder.off();
        }
        else if (args.length === 1 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0], eventBinder = EventBinderFactory_1.EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventBinder = CustomEventBinder_1.CustomEventBinder.getInstance();
            eventBinder.off(target);
        }
        else if (args.length === 1 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventBinder = DomEventBinder_1.DomEventBinder.getInstance();
            eventBinder.off(dom);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler = args[1], eventBinder = EventBinderFactory_1.EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName, handler);
        }
        else if (args.length === 2 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], eventBinder = CustomEventBinder_1.CustomEventBinder.getInstance();
            eventBinder.off(target, eventName);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], eventBinder = DomEventBinder_1.DomEventBinder.getInstance();
            eventBinder.off(dom, eventName);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], eventBinder = CustomEventBinder_1.CustomEventBinder.getInstance();
            eventBinder.off(target, eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], eventBinder = DomEventBinder_1.DomEventBinder.getInstance();
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
            var event_1 = args[0], eventDispatcher = EventDispatcherFactory_1.EventDispatcherFactory.createEventDispatcher(event_1);
            eventDispatcher.trigger(event_1);
        }
        else if (length === 2 && EventUtils_1.EventUtils.isEvent(args[0])) {
            var event_2 = args[0], userData = args[1], eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
            eventDispatcher.trigger(event_2, userData);
        }
        else if (length === 2 && EventUtils_1.EventUtils.isEntityObject(args[0])) {
            var target = args[0], event_3 = args[1], eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event_3);
        }
        else if (length === 2) {
            var dom = args[0], event_4 = args[1], eventDispatcher = DomEventDispatcher_1.DomEventDispatcher.getInstance();
            if (!dom) {
                return;
            }
            eventDispatcher.trigger(dom, event_4);
        }
        else if (length === 3) {
            var target = args[0], event_5 = args[1], userData = args[2], eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event_5, userData);
        }
        else if (length === 4) {
            var target = args[0], event_6 = args[1], userData = args[2], notSetTarget = args[3], eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
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
        var eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
        eventDispatcher.broadcast.apply(eventDispatcher, args);
    };
    EventManager.emit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventDispatcher = CustomEventDispatcher_1.CustomEventDispatcher.getInstance();
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
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isNumber(args[1])) {
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
        return Operator_1.fromEventPattern(addHandler, removeHandler);
    };
    EventManager.setBubbleParent = function (target, parent) {
        CustomEventRegister_1.CustomEventRegister.getInstance().setBubbleParent(target, parent);
    };
    return EventManager;
}());
__decorate([
    contract_1.requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof EntityObject_1.EntityObject) {
            var eventName_5 = args[1];
            contract_1.it("event must be custom event", function () {
                var eventType = EventTable_1.EventTable.getEventType(eventName_5);
                wonder_expect_js_1.default(eventType === EEventType_1.EEventType.CUSTOM || eventType === EEventType_1.EEventType.POINT).true;
            });
        }
        else if (JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var eventName = args[1], eventType_1 = EventTable_1.EventTable.getEventType(eventName);
            contract_1.it("event must be dom event", function () {
                wonder_expect_js_1.default(eventType_1 === EEventType_1.EEventType.TOUCH || eventType_1 === EEventType_1.EEventType.MOUSE || eventType_1 === EEventType_1.EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "on", null);
__decorate([
    contract_1.requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 2 && args[0] instanceof EntityObject_1.EntityObject) {
            var eventName = args[1], eventType_2 = EventTable_1.EventTable.getEventType(eventName);
            contract_1.it("event must be custom or point event", function () {
                wonder_expect_js_1.default(eventType_2 === EEventType_1.EEventType.CUSTOM || eventType_2 === EEventType_1.EEventType.POINT).true;
            });
        }
        else if (args.length > 2 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var eventName = args[1], eventType_3 = EventTable_1.EventTable.getEventType(eventName);
            contract_1.it("event must be keyboard event", function () {
                wonder_expect_js_1.default(eventType_3 === EEventType_1.EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "off", null);
__decorate([
    contract_1.requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && args[0] instanceof Event_1.Event) {
            var event_7 = args[0];
            contract_1.assert(event_7 instanceof CustomEvent_1.CustomEvent, Log_1.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
        else if (args.length === 2 && args[0] instanceof EntityObject_1.EntityObject) {
        }
        else if (args.length === 2) {
            if (args[0]) {
                contract_1.assert(JudgeUtils_1.JudgeUtils.isDom(args[0]), Log_1.Log.info.FUNC_MUST_BE("the first param", "dom"));
            }
        }
        else if (args[0] instanceof EntityObject_1.EntityObject) {
            var event_8 = args[1];
            contract_1.assert(event_8 instanceof CustomEvent_1.CustomEvent, Log_1.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
    })
], EventManager, "trigger", null);
__decorate([
    contract_1.requireCheck(function (target, eventObject, userData) {
        contract_1.assert(eventObject instanceof CustomEvent_1.CustomEvent, Log_1.Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "broadcast", null);
__decorate([
    contract_1.requireCheck(function (target, eventObject, userData) {
        contract_1.assert(eventObject instanceof CustomEvent_1.CustomEvent, Log_1.Log.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "emit", null);
__decorate([
    contract_1.requireCheck(function (target, parent) {
        contract_1.assert(target instanceof EntityObject_1.EntityObject, "only EntityObject can setBubleParent");
    })
], EventManager, "setBubbleParent", null);
EventManager = EventManager_1 = __decorate([
    registerClass_1.registerClass("EventManager")
], EventManager);
exports.EventManager = EventManager;
var EventManager_1;
//# sourceMappingURL=EventManager.js.map