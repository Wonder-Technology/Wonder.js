"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../common/operateBufferDataUtils");
var typeArrayUtils_1 = require("../../../utils/typeArrayUtils");
exports.setShaderIndex = function (materialIndex, shaderIndex, MaterialDataFromSystem) {
    typeArrayUtils_1.setTypeArrayValue(MaterialDataFromSystem.shaderIndices, materialIndex, shaderIndex);
};
exports.getOpacity = function (materialIndex, MaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(materialIndex, MaterialDataFromSystem.opacities);
};
exports.getAlphaTest = function (materialIndex, MaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(materialIndex, MaterialDataFromSystem.alphaTests);
};
exports.isTestAlpha = function (alphaTest) {
    return alphaTest >= 0;
};
exports.getShaderIndexDataSize = function () { return 1; };
exports.getColorDataSize = function () { return 3; };
exports.getOpacityDataSize = function () { return 1; };
exports.getAlphaTestDataSize = function () { return 1; };
exports.createTypeArrays = function (buffer, count, MaterialDataFromSystem) {
    var offset = 0;
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count * exports.getShaderIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * exports.getShaderIndexDataSize();
    MaterialDataFromSystem.colors = new Float32Array(buffer, offset, count * exports.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getColorDataSize();
    MaterialDataFromSystem.opacities = new Float32Array(buffer, offset, count * exports.getOpacityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getOpacityDataSize();
    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, offset, count * exports.getAlphaTestDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getAlphaTestDataSize();
    return offset;
};
exports.buildInitShaderDataMap = function (DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, ShaderDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        ShaderDataFromSystem: ShaderDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem
    };
};
//# sourceMappingURL=materialUtils.js.map