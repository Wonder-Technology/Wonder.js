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
import { ArrayUtils as ArrayUtils$ } from "wonder-commonlib/dist/es2015/utils/ArrayUtils";
var ArrayUtils = (function (_super) {
    __extends(ArrayUtils, _super);
    function ArrayUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayUtils.hasRepeatItems = function (arr) {
        var noRepeatArr = [], hasRepeat = false;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (!item) {
                continue;
            }
            if (this.contain(noRepeatArr, item)) {
                hasRepeat = true;
                break;
            }
            noRepeatArr.push(item);
        }
        return hasRepeat;
    };
    ArrayUtils.contain = function (arr, item) {
        var c = null;
        for (var i = 0, len = arr.length; i < len; i++) {
            c = arr[i];
            if (item.uid && c.uid && item.uid == c.uid) {
                return true;
            }
            else if (item === c) {
                return true;
            }
        }
        return false;
    };
    return ArrayUtils;
}(ArrayUtils$));
ArrayUtils = __decorate([
    registerClass("ArrayUtils")
], ArrayUtils);
export { ArrayUtils };
//# sourceMappingURL=ArrayUtils.js.map