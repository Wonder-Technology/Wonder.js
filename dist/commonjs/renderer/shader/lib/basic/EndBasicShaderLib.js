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
var EndBasicShaderLib = (function (_super) {
    __extends(EndBasicShaderLib, _super);
    function EndBasicShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = ShaderChunk_1.end_basic_fragment;
        return _this;
    }
    EndBasicShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    EndBasicShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        if (material.alphaTest !== null) {
            this.fsSourceBody += "if (gl_FragColor.a < " + material.alphaTest + "){\n    discard;\n}\n";
        }
    };
    return EndBasicShaderLib;
}(EngineShaderLib_1.EngineShaderLib));
EndBasicShaderLib = __decorate([
    registerClass_1.registerClass("EndBasicShaderLib")
], EndBasicShaderLib);
exports.EndBasicShaderLib = EndBasicShaderLib;
//# sourceMappingURL=EndBasicShaderLib.js.map