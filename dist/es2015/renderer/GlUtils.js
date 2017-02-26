var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { DeviceManager } from "../device/DeviceManager";
var GlUtils = (function () {
    function GlUtils() {
    }
    GlUtils.drawElements = function (mode, count, type, offset) {
        this._getGl().drawElements(mode, count, type, offset);
    };
    GlUtils.drawArrays = function (mode, first, count) {
        this._getGl().drawArrays(mode, first, count);
    };
    GlUtils._getGl = function () {
        return DeviceManager.getInstance().gl;
    };
    return GlUtils;
}());
GlUtils = __decorate([
    registerClass("GlUtils")
], GlUtils);
export { GlUtils };
//# sourceMappingURL=GlUtils.js.map