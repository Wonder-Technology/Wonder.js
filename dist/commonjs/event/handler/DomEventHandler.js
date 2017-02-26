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
var EventHandler_1 = require("./EventHandler");
var EventNameHandler_1 = require("../object/EventNameHandler");
var DomEventRegister_1 = require("../binder/DomEventRegister");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var virtual_1 = require("../../definition/typescript/decorator/virtual");
var Variable_1 = require("../../definition/Variable");
var EventUtils_1 = require("wonder-commonlib/dist/commonjs/utils/EventUtils");
var DomEventHandler = (function (_super) {
    __extends(DomEventHandler, _super);
    function DomEventHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DomEventHandler.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this, eventName = null, dom = null, eventRegister = DomEventRegister_1.DomEventRegister.getInstance(), eventOffDataList = null;
        if (args.length === 1) {
            eventName = args[0];
            dom = this.getDefaultDom();
            eventOffDataList = eventRegister.remove(eventName);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            dom = args[0];
            eventName = args[1];
            eventOffDataList = eventRegister.remove(dom, eventName);
        }
        else if (args.length === 2) {
            var handler = args[1];
            eventName = args[0];
            dom = this.getDefaultDom();
            eventOffDataList = eventRegister.remove(eventName, handler);
        }
        else {
            var handler = args[2];
            dom = args[0];
            eventName = args[1];
            eventOffDataList = eventRegister.remove(dom, eventName, handler);
        }
        if (eventOffDataList && !eventRegister.isBinded(dom, eventName)) {
            eventOffDataList.forEach(function (eventOffData) {
                self._unBind(eventOffData.dom, eventOffData.eventName, eventOffData.domHandler);
            });
        }
    };
    DomEventHandler.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dom = null, event = null, eventName = null, registerDataList = null;
        if (args.length === 1) {
            event = args[0];
            dom = this.getDefaultDom();
        }
        else {
            dom = args[0];
            event = args[1];
        }
        eventName = event.name;
        registerDataList = DomEventRegister_1.DomEventRegister.getInstance().getEventRegisterDataList(dom, eventName);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return;
        }
        registerDataList.forEach(function (registerData) {
            var eventCopy = event.clone();
            registerData.handler(eventCopy, registerData.eventData);
        });
    };
    DomEventHandler.prototype.clearHandler = function () {
    };
    DomEventHandler.prototype.buildDomHandler = function (dom, eventName) {
        var self = this, context = Variable_1.root;
        return EventUtils_1.EventUtils.bindEvent(context, function (event) {
            self.triggerDomEvent(dom, event, eventName);
        });
    };
    DomEventHandler.prototype.handler = function (dom, eventName, handler, priority) {
        var domHandler = null, originHandler = handler;
        handler = this.addEngineHandler(eventName, handler);
        if (!DomEventRegister_1.DomEventRegister.getInstance().isBinded(dom, eventName)) {
            domHandler = this._bind(dom, eventName);
        }
        else {
            domHandler = DomEventRegister_1.DomEventRegister.getInstance().getDomHandler(dom, eventName);
        }
        DomEventRegister_1.DomEventRegister.getInstance().register(dom, eventName, this.createEventData(), handler, originHandler, domHandler, priority);
    };
    DomEventHandler.prototype._bind = function (dom, eventName) {
        var domHandler = null;
        domHandler = this.buildDomHandler(dom, eventName);
        EventUtils_1.EventUtils.addEvent(dom, EventNameHandler_1.EventNameHandler.handleEventName(eventName), domHandler);
        return domHandler;
    };
    DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
        EventUtils_1.EventUtils.removeEvent(dom, EventNameHandler_1.EventNameHandler.handleEventName(eventName), handler);
    };
    return DomEventHandler;
}(EventHandler_1.EventHandler));
__decorate([
    virtual_1.virtual
], DomEventHandler.prototype, "clearHandler", null);
exports.DomEventHandler = DomEventHandler;
//# sourceMappingURL=DomEventHandler.js.map