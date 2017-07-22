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
var LightMaterialSystem_1 = require("./LightMaterialSystem");
var ShaderData_1 = require("../../renderer/shader/ShaderData");
var MaterialData_1 = require("./MaterialData");
var MaterialSystem_1 = require("./MaterialSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var LightMaterialData_1 = require("./LightMaterialData");
var LightMaterialSystem_2 = require("./LightMaterialSystem");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var MapManagerData_1 = require("../../renderer/texture/MapManagerData");
var TextureData_1 = require("../../renderer/texture/TextureData");
var LightMaterial = (function (_super) {
    __extends(LightMaterial, _super);
    function LightMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightMaterial = __decorate([
        registerClass_1.registerClass("LightMaterial")
    ], LightMaterial);
    return LightMaterial;
}(Material_1.Material));
exports.LightMaterial = LightMaterial;
exports.createLightMaterial = function () {
    return LightMaterialSystem_1.create(ShaderData_1.ShaderData, MaterialData_1.MaterialData, LightMaterialData_1.LightMaterialData);
};
exports.initLightMaterial = function (material) {
    LightMaterialSystem_1.initMaterial(material.index, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getLightMaterialColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getColor(material.index, MaterialData_1.MaterialData);
});
exports.setLightMaterialColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, color) {
    MaterialSystem_1.setColor(material.index, color, MaterialData_1.MaterialData);
});
exports.getLightMaterialOpacity = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getOpacity(material.index, MaterialData_1.MaterialData);
});
exports.setLightMaterialOpacity = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, opacity) {
    MaterialSystem_1.setOpacity(material.index, opacity, MaterialData_1.MaterialData);
});
exports.getLightMaterialAlphaTest = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return MaterialSystem_1.getAlphaTest(material.index, MaterialData_1.MaterialData);
});
exports.setLightMaterialAlphaTest = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, alphaTest) {
    MaterialSystem_1.setAlphaTest(material.index, alphaTest, MaterialData_1.MaterialData);
});
exports.getLightMaterialSpecularColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return LightMaterialSystem_2.getSpecularColor(material.index, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialSpecularColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, color) {
    LightMaterialSystem_2.setSpecularColor(material.index, color, LightMaterialData_1.LightMaterialData);
});
exports.getLightMaterialEmissionColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return LightMaterialSystem_2.getEmissionColor(material.index, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialEmissionColor = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, color) {
    LightMaterialSystem_2.setEmissionColor(material.index, color, LightMaterialData_1.LightMaterialData);
});
exports.getLightMaterialShininess = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return LightMaterialSystem_2.getShininess(material.index, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialShininess = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, shininess) {
    LightMaterialSystem_2.setShininess(material.index, shininess, LightMaterialData_1.LightMaterialData);
});
exports.getLightMaterialShading = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return LightMaterialSystem_2.getShading(material.index, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialShading = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, shading) {
    LightMaterialSystem_2.setShading(material.index, shading, LightMaterialData_1.LightMaterialData);
});
exports.getLightMaterialLightModel = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material) {
    return LightMaterialSystem_2.getLightModel(material.index, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialLightModel = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, lightModel) {
    LightMaterialSystem_2.setLightModel(material.index, lightModel, LightMaterialData_1.LightMaterialData);
});
exports.setLightMaterialDiffuseMap = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, map) {
    LightMaterialSystem_1.setDiffuseMap(material.index, map, MapManagerData_1.MapManagerData, TextureData_1.TextureData);
});
exports.setLightMaterialSpecularMap = contract_1.requireCheckFunc(function (material) {
    Material_1.checkShouldAlive(material);
}, function (material, map) {
    LightMaterialSystem_1.setSpecularMap(material.index, map, MapManagerData_1.MapManagerData, TextureData_1.TextureData);
});
//# sourceMappingURL=LightMaterial.js.map