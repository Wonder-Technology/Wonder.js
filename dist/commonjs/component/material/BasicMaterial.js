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
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Material_1 = require("./Material");
var BasicMaterialSystem_1 = require("./BasicMaterialSystem");
var MaterialData_1 = require("./MaterialData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var BasicMaterialData_1 = require("./BasicMaterialData");
var MaterialSystem_1 = require("./MaterialSystem");
var MapManagerData_1 = require("../../renderer/texture/MapManagerData");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var TextureData_1 = require("../../renderer/texture/TextureData");
var WebGLDetectSystem_1 = require("../../renderer/device/WebGLDetectSystem");
var ShaderData_1 = require("../../renderer/webgl1/shader/ShaderData");
var ShaderData_2 = require("../../renderer/webgl2/shader/ShaderData");
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial = __decorate([
        registerClass_1.registerClass("BasicMaterial")
    ], BasicMaterial);
    return BasicMaterial;
}(Material_1.Material));
exports.BasicMaterial = BasicMaterial;
exports.createBasicMaterial = null;
if (WebGLDetectSystem_1.isWebgl1()) {
    exports.createBasicMaterial = function () {
        return BasicMaterialSystem_1.create(ShaderData_1.WebGL1ShaderData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData);
    };
}
else {
    exports.createBasicMaterial = function () {
        return BasicMaterialSystem_1.create(ShaderData_2.WebGL2ShaderData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData);
    };
}
exports.initBasicMaterial = function (material) {
    BasicMaterialSystem_1.initMaterial(material.index, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getBasicMaterialColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getColor(material.index, MaterialData_1.MaterialData);
});
exports.setBasicMaterialColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, color) {
    MaterialSystem_1.setColor(material.index, color, MaterialData_1.MaterialData);
});
exports.getBasicMaterialOpacity = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getOpacity(material.index, MaterialData_1.MaterialData);
});
exports.setBasicMaterialOpacity = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, opacity) {
    MaterialSystem_1.setOpacity(material.index, opacity, MaterialData_1.MaterialData);
});
exports.getBasicMaterialAlphaTest = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getAlphaTest(material.index, MaterialData_1.MaterialData);
});
exports.setBasicMaterialAlphaTest = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, alphaTest) {
    MaterialSystem_1.setAlphaTest(material.index, alphaTest, MaterialData_1.MaterialData);
});
exports.setBasicMaterialMap = contract_1.requireCheckFunc(function (material, map) {
    Material_1.checkShouldAlive(material);
}, function (material, map) {
    BasicMaterialSystem_1.setMap(material.index, map, MapManagerData_1.MapManagerData, TextureData_1.TextureData);
});
//# sourceMappingURL=BasicMaterial.js.map