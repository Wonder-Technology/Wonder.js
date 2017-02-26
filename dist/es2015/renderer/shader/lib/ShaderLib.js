var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { virtual } from "../../../definition/typescript/decorator/virtual";
var ShaderLib = (function () {
    function ShaderLib() {
        this.shader = null;
    }
    ShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
    };
    ShaderLib.prototype.init = function () {
    };
    ShaderLib.prototype.dispose = function () {
    };
    return ShaderLib;
}());
export { ShaderLib };
__decorate([
    virtual
], ShaderLib.prototype, "sendShaderVariables", null);
__decorate([
    virtual
], ShaderLib.prototype, "init", null);
__decorate([
    virtual
], ShaderLib.prototype, "dispose", null);
//# sourceMappingURL=ShaderLib.js.map