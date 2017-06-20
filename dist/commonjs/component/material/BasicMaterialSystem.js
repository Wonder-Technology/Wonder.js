"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMaterial_1 = require("./BasicMaterial");
var MaterialSystem_1 = require("./MaterialSystem");
var ShaderSystem_1 = require("../../renderer/shader/ShaderSystem");
exports.create = function (ShaderData, MaterialData) {
    var material = new BasicMaterial_1.BasicMaterial(), materialClassName = "BasicMaterial";
    material = MaterialSystem_1.create(material, materialClassName, MaterialData);
    MaterialSystem_1.setShaderIndex(material.index, ShaderSystem_1.create(materialClassName, MaterialData, ShaderData), MaterialData);
    return material;
};
//# sourceMappingURL=BasicMaterialSystem.js.map