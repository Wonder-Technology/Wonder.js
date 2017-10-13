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
import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/es2015/utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
var JudgeUtils = (function (_super) {
    __extends(JudgeUtils, _super);
    function JudgeUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JudgeUtils.isCollection = function (list) {
        return list instanceof Collection;
    };
    return JudgeUtils;
}(JudgeUtils$));
export { JudgeUtils };
export var isString = JudgeUtils.isString;
export var isArray = JudgeUtils.isArray;
export var isUndefined = function (v) { return v === void 0; };
export var isNotUndefined = function (v) { return v !== void 0; };
//# sourceMappingURL=JudgeUtils.js.map