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
var EventHandler_1 = require("./EventHandler");
var CustomEventRegister_1 = require("../binder/CustomEventRegister");
var CustomEventHandler = (function (_super) {
    __extends(CustomEventHandler, _super);
    function CustomEventHandler() {
        return _super.call(this) || this;
    }
    CustomEventHandler.getInstance = function () { };
    CustomEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 3) {
            var eventName = args[0], handler = args[1], originHandler = handler, priority = args[2];
            CustomEventRegister_1.CustomEventRegister.getInstance().register(eventName, handler, originHandler, null, priority);
        }
        else if (args.length === 4) {
            var target = args[0], eventName = args[1], handler = args[2], originHandler = handler, priority = args[3];
            CustomEventRegister_1.CustomEventRegister.getInstance().register(target, eventName, handler, originHandler, null, priority);
        }
    };
    CustomEventHandler.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventRegister = CustomEventRegister_1.CustomEventRegister.getInstance();
        eventRegister.remove.apply(eventRegister, args);
    };
    CustomEventHandler.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var event = null;
        if (args.length === 1 || args.length === 2) {
            var userData = null;
            if (args.length === 1) {
                event = args[0];
            }
            else {
                event = args[0];
                userData = args[1];
            }
            return this._triggerEventHandler(event, userData);
        }
        else if (args.length === 3 || args.length === 4) {
            var target = null, userData = null, notSetTarget = null;
            if (args.length === 3) {
                target = args[0];
                event = args[1];
                notSetTarget = args[2];
            }
            else {
                target = args[0];
                event = args[1];
                userData = args[2];
                notSetTarget = args[3];
            }
            return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
        }
    };
    CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
        var registerDataList = null, self = this;
        registerDataList = CustomEventRegister_1.CustomEventRegister.getInstance().getEventRegisterDataList(event.name);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }
        registerDataList.forEach(function (registerData) {
            event.currentTarget = registerData.target;
            event.target = registerData.target;
            self._setUserData(event, userData);
            registerData.handler(event);
        });
        return true;
    };
    CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
        var registerDataList = null, isStopPropagation = false, self = this;
        if (!notSetTarget) {
            event.target = target;
        }
        registerDataList = CustomEventRegister_1.CustomEventRegister.getInstance().getEventRegisterDataList(target, event.name);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }
        registerDataList.forEach(function (registerData) {
            event.currentTarget = registerData.target;
            self._setUserData(event, userData);
            registerData.handler(event);
            if (event.isStopPropagation) {
                isStopPropagation = true;
            }
        });
        return isStopPropagation;
    };
    CustomEventHandler.prototype._setUserData = function (event, userData) {
        if (userData) {
            event.userData = userData;
        }
    };
    return CustomEventHandler;
}(EventHandler_1.EventHandler));
CustomEventHandler = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("CustomEventHandler")
], CustomEventHandler);
exports.CustomEventHandler = CustomEventHandler;
//# sourceMappingURL=CustomEventHandler.js.map