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
var EngineMaterial_1 = require("./EngineMaterial");
var clone_1 = require("../definition/typescript/decorator/clone");
var virtual_1 = require("../definition/typescript/decorator/virtual");
var BasicMaterialColorShaderLib_1 = require("../renderer/shader/lib/basic/BasicMaterialColorShaderLib");
var BasicShaderLib_1 = require("../renderer/shader/lib/basic/BasicShaderLib");
var EndBasicShaderLib_1 = require("../renderer/shader/lib/basic/EndBasicShaderLib");
var StandardBasicMaterial = (function (_super) {
    __extends(StandardBasicMaterial, _super);
    function StandardBasicMaterial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opacity = 1.0;
        _this.alphaTest = null;
        return _this;
    }
    StandardBasicMaterial.prototype.addExtendShaderLib = function () {
    };
    StandardBasicMaterial.prototype.addShaderLib = function () {
        var envMap = null;
        this.shader.addLib(BasicMaterialColorShaderLib_1.BasicMaterialColorShaderLib.create());
        this.shader.addLib(BasicShaderLib_1.BasicShaderLib.create());
        this.addExtendShaderLib();
        this.shader.addLib(EndBasicShaderLib_1.EndBasicShaderLib.create());
    };
    return StandardBasicMaterial;
}(EngineMaterial_1.EngineMaterial));
__decorate([
    clone_1.cloneAttributeAsBasicType()
], StandardBasicMaterial.prototype, "opacity", void 0);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], StandardBasicMaterial.prototype, "alphaTest", void 0);
__decorate([
    virtual_1.virtual
], StandardBasicMaterial.prototype, "addExtendShaderLib", null);
exports.StandardBasicMaterial = StandardBasicMaterial;
//# sourceMappingURL=StandardBasicMaterial.js.map