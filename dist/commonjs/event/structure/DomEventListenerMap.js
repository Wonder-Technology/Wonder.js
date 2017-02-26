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
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var DomEventListenerMap = (function (_super) {
    __extends(DomEventListenerMap, _super);
    function DomEventListenerMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._targetListenerMap = Hash_1.Hash.create();
        return _this;
    }
    DomEventListenerMap.create = function () {
        var obj = new this();
        return obj;
    };
    DomEventListenerMap.prototype.hasChild = function (dom, eventName) {
        var list = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
        if (!list) {
            return false;
        }
        list = list.getChild(eventName);
        return list && list.getCount() > 0;
    };
    DomEventListenerMap.prototype.appendChild = function (dom, eventName, data) {
        var firstLevelKey = this.buildFirstLevelKey(dom);
        if (!this._targetListenerMap.hasChild(firstLevelKey)) {
            var secondMap = Hash_1.Hash.create();
            secondMap.addChild(this.buildSecondLevelKey(eventName), Collection_1.Collection.create([data]));
            this._targetListenerMap.addChild(firstLevelKey, secondMap);
            return;
        }
        this._targetListenerMap.getChild(firstLevelKey).appendChild(this.buildSecondLevelKey(eventName), data);
    };
    DomEventListenerMap.prototype.forEachAll = function (func) {
        this._targetListenerMap.forEach(function (secondMap) {
            secondMap.forEach(func);
        });
    };
    DomEventListenerMap.prototype.forEachEventName = function (func) {
        this.forEachAll(func);
    };
    DomEventListenerMap.prototype.clear = function () {
        this._targetListenerMap.removeAllChildren();
    };
    DomEventListenerMap.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var dom = args[0];
            return this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
        }
        else if (args.length === 2) {
            var dom = args[0], eventName = args[1], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                return null;
            }
            return secondMap.getChild(this.buildSecondLevelKey(eventName));
        }
    };
    DomEventListenerMap.prototype.removeChild = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (args.length === 1 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName_1 = args[0], arr_1 = [];
            this._targetListenerMap.forEach(function (secondMap, firstLevelKey) {
                var secondLevelKey = _this.buildSecondLevelKey(eventName_1);
                if (secondMap.hasChild(secondLevelKey)) {
                    arr_1.push(secondMap.removeChild(secondLevelKey).getChild(0));
                }
            });
            var l = Collection_1.Collection.create();
            for (var _a = 0, arr_2 = arr_1; _a < arr_2.length; _a++) {
                var list = arr_2[_a];
                l.addChildren(list);
            }
            result = this._getEventDataOffDataList(eventName_1, l);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isString(args[0])) {
            var eventName_2 = args[0], handler_1 = args[1], arr_3 = [];
            this._targetListenerMap.forEach(function (secondMap, firstLevelKey) {
                var list = secondMap.getChild(_this.buildSecondLevelKey(eventName_2));
                if (list) {
                    arr_3.push(list.removeChild(function (data) {
                        return data.originHandler === handler_1;
                    }));
                }
            });
            var l = Collection_1.Collection.create();
            for (var _b = 0, arr_4 = arr_3; _b < arr_4.length; _b++) {
                var list = arr_4[_b];
                l.addChildren(list);
            }
            result = this._getEventDataOffDataList(eventName_2, l);
        }
        else if (args.length === 2 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                result = Collection_1.Collection.create();
            }
            else {
                result = this._getEventDataOffDataList(eventName, secondMap.removeChild(this.buildSecondLevelKey(eventName)).getChild(0));
            }
        }
        else if (args.length === 3 && JudgeUtils_1.JudgeUtils.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler_2 = args[2], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                result = Collection_1.Collection.create();
            }
            else {
                var list = secondMap.getChild(this.buildSecondLevelKey(eventName));
                if (!list) {
                    result = Collection_1.Collection.create();
                }
                else {
                    result = this._getEventDataOffDataList(eventName, list.removeChild(function (val) {
                        return val.originHandler === handler_2;
                    }));
                }
            }
        }
        return result;
    };
    DomEventListenerMap.prototype.buildFirstLevelKey = function (dom) {
        if (dom.id) {
            return "" + dom.tagName + dom.id;
        }
        if (dom.nodeName) {
            return "" + dom.nodeName;
        }
        return "" + dom.tagName;
    };
    DomEventListenerMap.prototype._getEventDataOffDataList = function (eventName, result) {
        if (!result) {
            return Collection_1.Collection.create();
        }
        return result.map(function (data) {
            return {
                dom: data.dom,
                eventName: eventName,
                domHandler: data.domHandler
            };
        });
    };
    return DomEventListenerMap;
}(EventListenerMap_1.EventListenerMap));
DomEventListenerMap = __decorate([
    registerClass_1.registerClass("DomEventListenerMap")
], DomEventListenerMap);
exports.DomEventListenerMap = DomEventListenerMap;
//# sourceMappingURL=DomEventListenerMap.js.map