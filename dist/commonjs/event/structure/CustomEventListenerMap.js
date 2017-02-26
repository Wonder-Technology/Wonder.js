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
var EventListenerMap_1 = require("./EventListenerMap");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var EntityObject_1 = require("../../core/entityObject/EntityObject");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var CustomEventListenerMap = (function (_super) {
    __extends(CustomEventListenerMap, _super);
    function CustomEventListenerMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._globalListenerMap = Hash_1.Hash.create();
        _this._targetRecordMap = Hash_1.Hash.create();
        return _this;
    }
    CustomEventListenerMap.create = function () {
        var obj = new this();
        return obj;
    };
    CustomEventListenerMap.prototype.hasChild = function (target) {
        return target.customEventMap.getCount() > 0;
    };
    CustomEventListenerMap.prototype.appendChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var eventName = args[0], data = args[1];
            this._globalListenerMap.appendChild(eventName, data);
        }
        else {
            var target = args[0], eventName = args[1], data = args[2];
            this._targetRecordMap.addChild(this.buildFirstLevelKey(target), target);
            target.customEventMap.appendChild(this.buildSecondLevelKey(eventName), data);
        }
    };
    CustomEventListenerMap.prototype.forEachAll = function (func) {
        this._globalListenerMap.forEach(func);
        this._targetRecordMap.forEach(function (target) {
            target.customEventMap.forEach(func);
        });
    };
    CustomEventListenerMap.prototype.forEachEventName = function (func) {
        this._globalListenerMap.forEach(func);
    };
    CustomEventListenerMap.prototype.clear = function () {
        this._globalListenerMap.removeAllChildren();
        this._targetRecordMap.forEach(function (target) {
            target.customEventMap.removeAllChildren();
        });
        this._targetRecordMap.removeAllChildren();
    };
    CustomEventListenerMap.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0];
            return this._globalListenerMap.getChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0];
            return target.customEventMap;
        }
        else if (args.length === 2) {
            var target = args[0], eventName = args[1], secondMap = null;
            secondMap = target.customEventMap;
            if (!secondMap) {
                return null;
            }
            return secondMap.getChild(this.buildSecondLevelKey(eventName));
        }
    };
    CustomEventListenerMap.prototype.removeChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0];
            this._globalListenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0];
            target.customEventMap.removeAllChildren();
            this._targetRecordMap.removeChild(this.buildFirstLevelKey(target));
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName = args[0], handler_1 = args[1], list = null;
            list = this._globalListenerMap.getChild(eventName);
            if (!!list) {
                list.removeChild(function (val) {
                    return val.originHandler === handler_1;
                });
                if (list.getCount() === 0) {
                    this._globalListenerMap.removeChild(eventName);
                }
            }
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isNumber(args[0])) {
            var uid = args[0], eventName = args[1], secondMap = null;
            secondMap = (this._targetRecordMap.getChild(this.buildFirstLevelKey(uid)));
            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 2 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], secondMap = null;
            secondMap = target.customEventMap;
            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 3 && args[0] instanceof EntityObject_1.EntityObject) {
            var target = args[0], eventName = args[1], handler_2 = args[2], secondMap = null;
            secondMap = target.customEventMap;
            if (!!secondMap) {
                var secondList = secondMap.getChild(eventName);
                if (!!secondList) {
                    secondList.removeChild(function (val) {
                        return val.originHandler === handler_2;
                    });
                    if (secondList.getCount() === 0) {
                        secondMap.removeChild(eventName);
                    }
                }
            }
        }
    };
    CustomEventListenerMap.prototype.buildFirstLevelKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var v = args[0], uid = v.uid;
        if (uid) {
            return String(uid);
        }
        return v;
    };
    return CustomEventListenerMap;
}(EventListenerMap_1.EventListenerMap));
CustomEventListenerMap = __decorate([
    registerClass_1.registerClass("CustomEventListenerMap")
], CustomEventListenerMap);
exports.CustomEventListenerMap = CustomEventListenerMap;
//# sourceMappingURL=CustomEventListenerMap.js.map