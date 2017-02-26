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
import { EventRegister } from "./EventRegister";
import { DomEventListenerMap } from "../structure/DomEventListenerMap";
import { JudgeUtils } from "../../utils/JudgeUtils";
var DomEventRegister = (function (_super) {
    __extends(DomEventRegister, _super);
    function DomEventRegister() {
        var _this = _super.call(this) || this;
        _this.listenerMap = DomEventListenerMap.create();
        return _this;
    }
    DomEventRegister.getInstance = function () { };
    DomEventRegister.prototype.register = function (dom, eventName, eventData, handler, originHandler, domHandler, priority) {
        this.listenerMap.appendChild(dom, eventName, {
            dom: dom,
            eventName: eventName,
            eventData: eventData,
            handler: handler,
            originHandler: originHandler,
            domHandler: domHandler,
            priority: priority
        });
    };
    DomEventRegister.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (args.length === 1 && JudgeUtils.isString(args[0])) {
            var eventName = args[0];
            result = this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
            var eventName = args[0], handler = args[1];
            result = this.listenerMap.removeChild(eventName, handler);
        }
        else if ((args.length === 2 && JudgeUtils.isDom(args[0])) || args.length === 3) {
            result = this.listenerMap.removeChild.apply(this.listenerMap, args);
        }
        return result;
    };
    DomEventRegister.prototype.isBinded = function (dom, eventName) {
        return this.listenerMap.hasChild(dom, eventName);
    };
    DomEventRegister.prototype.getDomHandler = function (dom, eventName) {
        var list = this.getChild(dom, eventName);
        if (list && list.getCount() > 0) {
            return list.getChild(0).domHandler;
        }
    };
    return DomEventRegister;
}(EventRegister));
DomEventRegister = __decorate([
    singleton(),
    registerClass("DomEventRegister")
], DomEventRegister);
export { DomEventRegister };
//# sourceMappingURL=DomEventRegister.js.map