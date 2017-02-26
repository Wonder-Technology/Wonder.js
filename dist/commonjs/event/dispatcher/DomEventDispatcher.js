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
var EventDispatcher_1 = require("./EventDispatcher");
var EventHandlerFactory_1 = require("../factory/EventHandlerFactory");
var DomEventDispatcher = (function (_super) {
    __extends(DomEventDispatcher, _super);
    function DomEventDispatcher() {
        return _super.call(this) || this;
    }
    DomEventDispatcher.getInstance = function () { };
    DomEventDispatcher.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var event_1 = args[0], eventType = event_1.type;
            EventHandlerFactory_1.EventHandlerFactory.createEventHandler(eventType)
                .trigger(event_1);
        }
        else if (args.length === 2) {
            var dom = args[0], event_2 = args[1], eventType = event_2.type;
            EventHandlerFactory_1.EventHandlerFactory.createEventHandler(eventType)
                .trigger(dom, event_2);
        }
    };
    return DomEventDispatcher;
}(EventDispatcher_1.EventDispatcher));
DomEventDispatcher = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("DomEventDispatcher")
], DomEventDispatcher);
exports.DomEventDispatcher = DomEventDispatcher;
//# sourceMappingURL=DomEventDispatcher.js.map