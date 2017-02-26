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
var registerClass_1 = require("../../../../definition/typescript/decorator/registerClass");
var EngineShaderLib_1 = require("../EngineShaderLib");
var ShaderChunk_1 = require("../../chunk/ShaderChunk");
var CommonShaderLib = (function (_super) {
    __extends(CommonShaderLib, _super);
    function CommonShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = ShaderChunk_1.common_vertex;
        _this.fsChunk = ShaderChunk_1.common_fragment;
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
        this.vsSourceDefine = ShaderChunk_1.common_define.define + ShaderChunk_1.common_vertex.define;
        this.vsSourceFuncDefine = ShaderChunk_1.common_function.funcDefine + ShaderChunk_1.common_vertex.funcDefine;
        this.fsSourceDefine = ShaderChunk_1.common_define.define + ShaderChunk_1.common_fragment.define;
        this.fsSourceFuncDefine = ShaderChunk_1.common_function.funcDefine + ShaderChunk_1.common_fragment.funcDefine;
    };
    return CommonShaderLib;
}(EngineShaderLib_1.EngineShaderLib));
CommonShaderLib = __decorate([
    registerClass_1.registerClass("CommonShaderLib")
], CommonShaderLib);
exports.CommonShaderLib = CommonShaderLib;
//# sourceMappingURL=CommonShaderLib.js.map