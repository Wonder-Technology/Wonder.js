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
var singleton_1 = require("../../definition/typescript/decorator/singleton");
var EventRegister_1 = require("./EventRegister");
var CustomEventListenerMap_1 = require("../structure/CustomEventListenerMap");
var EntityObject_1 = require("../../core/entityObject/EntityObject");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var CustomEventRegister = (function (_super) {
    __extends(CustomEventRegister, _super);
    function CustomEventRegister() {
        var _this = _super.call(this) || this;
        _this.listenerMap = CustomEventListenerMap_1.CustomEventListenerMap.create();
        return _this;
    }
    CustomEventRegister.getInstance = function () { };
    CustomEventRegister.prototype.register = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 5) {
            var eventName = args[0], handler = args[1], originHandler = args[2], domHandler = args[3], priority = args[4];
            this.listenerMap.appendChild(eventName, {
                target: null,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
        else {
            var target = args[0], eventName = args[1], handler = args[2], originHandler = args[3], domHandler = args[4], priority = args[5];
            this.listenerMap.appendChild(target, eventName, {
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
    };
    CustomEventRegister.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = args[0];
        if (args.length === 1 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0];
            this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject_1.EntityObject) {
            this.listenerMap.removeChild(target);
            this._handleAfterAllEventHandlerRemoved(target);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isFunction(args[1])) {
            var eventName = args[0], handler = args[1];
            this.listenerMap.removeChild(eventName, handler);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isNumber(args[0])) {
            var uid = args[0], eventName = args[1];
            this.listenerMap.removeChild(uid, eventName);
        }
        else if ((args.length === 2 && args[0] instanceof EntityObject_1.EntityObject) || args.length === 3) {
            this.listenerMap.removeChild.apply(this.listenerMap, args);
            if (this._isAllEventHandlerRemoved(target)) {
                this._handleAfterAllEventHandlerRemoved(target);
            }
        }
    };
    CustomEventRegister.prototype.setBubbleParent = function (target, parent) {
        target.bubbleParent = parent;
    };
    CustomEventRegister.prototype._isAllEventHandlerRemoved = function (target) {
        return !this.listenerMap.hasChild(target);
    };
    CustomEventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
        this.setBubbleParent(target, null);
    };
    return CustomEventRegister;
}(EventRegister_1.EventRegister));
CustomEventRegister = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("CustomEventRegister")
], CustomEventRegister);
exports.CustomEventRegister = CustomEventRegister;
//# sourceMappingURL=CustomEventRegister.js.map