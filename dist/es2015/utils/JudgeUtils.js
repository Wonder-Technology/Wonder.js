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
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/es2015/utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
var JudgeUtils = (function (_super) {
    __extends(JudgeUtils, _super);
    function JudgeUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JudgeUtils.isView = function (obj) {
        return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
    };
    JudgeUtils.isEqual = function (target1, target2) {
        if ((!target1 && target2) || (target1 && !target2)) {
            return false;
        }
        if (target1.uid && target2.uid) {
            return target1.uid === target2.uid;
        }
        return target1 === target2;
    };
    JudgeUtils.isPowerOfTwo = function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    };
    JudgeUtils.isFloatArray = function (data) {
        return Object.prototype.toString.call(data) === "[object Float32Array]" || Object.prototype.toString.call(data) === "[object Float16Array]";
    };
    JudgeUtils.isInterface = function (target, memberOfInterface) {
        return !!target[memberOfInterface];
    };
    JudgeUtils.isSelf = function (self, entityObject) {
        return self.uid === entityObject.uid;
    };
    JudgeUtils.isComponenet = function (component) {
        return component.entityObject !== void 0;
    };
    JudgeUtils.isDom = function (obj) {
        return Object.prototype.toString.call(obj).match(/\[object HTML\w+/) !== null;
    };
    JudgeUtils.isCollection = function (list) {
        return list instanceof Collection;
    };
    JudgeUtils.isClass = function (objInstance, className) {
        return objInstance.constructor.name === className;
    };
    return JudgeUtils;
}(JudgeUtils$));
JudgeUtils = __decorate([
    registerClass("JudgeUtils")
], JudgeUtils);
export { JudgeUtils };
//# sourceMappingURL=JudgeUtils.js.map