"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var typeArrayUtils_1 = require("../../../../../utils/typeArrayUtils");
exports.initNoMaterialShaders = function (state, material_config, shaderLib_generator, initNoMaterialShader, initShaderDataMap) {
    var shaders = material_config.shaders.noMaterialShaders;
    for (var shaderName in shaders) {
        if (shaders.hasOwnProperty(shaderName)) {
            initNoMaterialShader(state, shaderName, shaders[shaderName], material_config, shaderLib_generator, initShaderDataMap);
        }
    }
};
exports.setShaderIndex = function (materialIndex, shaderIndex, MaterialDataFromSystem) {
    typeArrayUtils_1.setTypeArrayValue(MaterialDataFromSystem.shaderIndices, materialIndex, shaderIndex);
};
exports.useShader = function (index, shaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap) {
    var shaderIndex = initMaterialShader(state, index, shaderName, material_config, shaderLib_generator, initShaderDataMap);
    exports.setShaderIndex(index, shaderIndex, initShaderDataMap.MaterialDataFromSystem);
    return shaderIndex;
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
exports.buildInitShaderDataMap = function (DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, ShaderDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, GPUDetectDataFromSystem, VaoDataFromSystem) {
    return {
        GPUDetectDataFromSystem: GPUDetectDataFromSystem,
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        ShaderDataFromSystem: ShaderDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        AmbientLightDataFromSystem: AmbientLightDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem,
        VaoDataFromSystem: VaoDataFromSystem
    };
};
//# sourceMappingURL=materialUtils.js.map