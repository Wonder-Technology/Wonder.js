"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMaterial_1 = require("./BasicMaterial");
var MaterialSystem_1 = require("./MaterialSystem");
var ShaderSystem_1 = require("../../renderer/shader/ShaderSystem");
var objectUtils_1 = require("../../utils/objectUtils");
exports.create = function (ShaderData, MaterialData) {
    var material = new BasicMaterial_1.BasicMaterial(), materialClassName = "BasicMaterial";
    material = MaterialSystem_1.create(material, materialClassName, MaterialData);
    MaterialSystem_1.setShader(material.index, _createShader(materialClassName, ShaderData), MaterialData);
    return material;
};
var _createShader = function (materialClassName, ShaderData) {
    var shaderMap = ShaderData.shaderMap, shader = shaderMap[materialClassName];
    if (objectUtils_1.isValidMapValue(shader)) {
        return shader;
    }
    shader = ShaderSystem_1.create(ShaderData);
    shaderMap[materialClassName] = shader;
    return shader;
};
//# sourceMappingURL=BasicMaterialSystem.js.map