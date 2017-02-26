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
var Material_1 = require("./Material");
var virtual_1 = require("../definition/typescript/decorator/virtual");
var CommonShader_1 = require("../renderer/shader/shader/CommonShader");
var CommonShaderLib_1 = require("../renderer/shader/lib/common/CommonShaderLib");
var ShaderLibUtils_1 = require("../utils/ShaderLibUtils");
var EndShaderLib_1 = require("../renderer/shader/lib/common/EndShaderLib");
var EngineMaterial = (function (_super) {
    __extends(EngineMaterial, _super);
    function EngineMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineMaterial.prototype.init = function () {
        this._addTopShaderLib();
        this.addShaderLib();
        this._addEndShaderLib();
        _super.prototype.init.call(this);
    };
    EngineMaterial.prototype.addShaderLib = function () {
    };
    EngineMaterial.prototype.createShader = function () {
        return CommonShader_1.CommonShader.create();
    };
    EngineMaterial.prototype._addTopShaderLib = function () {
        this.shader.addLib(CommonShaderLib_1.CommonShaderLib.create());
        ShaderLibUtils_1.ShaderLibUtils.addVerticeShaderLib(this.geometry, this.shader);
    };
    EngineMaterial.prototype._addShaderLibToTop = function (lib) {
        this.shader.addShaderLibToTop(lib);
    };
    EngineMaterial.prototype._addEndShaderLib = function () {
        this.shader.addLib(EndShaderLib_1.EndShaderLib.create());
    };
    return EngineMaterial;
}(Material_1.Material));
__decorate([
    virtual_1.virtual
], EngineMaterial.prototype, "addShaderLib", null);
exports.EngineMaterial = EngineMaterial;
//# sourceMappingURL=EngineMaterial.js.map