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
import { TimeController } from "./TimeController";
import { Director } from "../../core/Director";
import { root } from "../../definition/Variable";
var CommonTimeController = (function (_super) {
    __extends(CommonTimeController, _super);
    function CommonTimeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonTimeController.create = function () {
        var obj = new this();
        return obj;
    };
    CommonTimeController.prototype.getNow = function () {
        if (Director.getInstance().isTimeChange) {
            return Director.getInstance().elapsed;
        }
        return root.performance.now();
    };
    return CommonTimeController;
}(TimeController));
CommonTimeController = __decorate([
    registerClass("CommonTimeController")
], CommonTimeController);
export { CommonTimeController };
//# sourceMappingURL=CommonTimeController.js.map