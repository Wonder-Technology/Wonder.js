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
import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { common_vertex, common_fragment, common_define, common_function } from "../../chunk/ShaderChunk";
var CommonShaderLib = (function (_super) {
    __extends(CommonShaderLib, _super);
    function CommonShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = common_vertex;
        _this.fsChunk = common_fragment;
        return _this;
    }
    CommonShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    CommonShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this.sendUniformData(program, "u_vMatrix", cmd.vMatrix);
        this.sendUniformData(program, "u_pMatrix", cmd.pMatrix);
        this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
    };
    CommonShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addUniformVariable(["u_vMatrix", "u_pMatrix", "u_mMatrix"]);
        this.vsSourceDefine = common_define.define + common_vertex.define;
        this.vsSourceFuncDefine = common_function.funcDefine + common_vertex.funcDefine;
        this.fsSourceDefine = common_define.define + common_fragment.define;
        this.fsSourceFuncDefine = common_function.funcDefine + common_fragment.funcDefine;
    };
    return CommonShaderLib;
}(EngineShaderLib));
CommonShaderLib = __decorate([
    registerClass("CommonShaderLib")
], CommonShaderLib);
export { CommonShaderLib };
//# sourceMappingURL=CommonShaderLib.js.map