"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../../../../../../utils/Log");
var deviceManagerUtils_1 = require("../../../../../utils/worker/both_file/device/deviceManagerUtils");
var uboManagerUtils_1 = require("../ubo/uboManagerUtils");
var gpuDetectUtils_1 = require("../device/gpuDetectUtils");
var deferShadingUtils_1 = require("./light/defer/deferShadingUtils");
var shaderUtils_1 = require("../../../../../utils/worker/render_file/shader/shaderUtils");
var shaderUtils_2 = require("../shader/shaderUtils");
exports.init = function (gl, render_config, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GPUDetectDataFromSystem) {
    if (!gpuDetectUtils_1.hasExtensionColorBufferFloat(GPUDetectDataFromSystem)) {
        Log_1.Log.warn("defer shading need support extensionColorBufferFloat extension");
    }
    else {
        deferShadingUtils_1.init(gl, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    uboManagerUtils_1.init(gl, render_config, GLSLSenderDataFromSystem);
};
exports.render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender, drawDataMap, deferDrawDataMap, initShaderDataMap, _a) {
    var cameraData = _a.cameraData, basicData = _a.basicData, lightData = _a.lightData;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem;
    deviceManagerUtils_1.clear(gl, DeviceManagerDataFromSystem);
    uboManagerUtils_1.bindFrameUboData(gl, render_config, cameraData, GLSLSenderDataFromSystem);
    if (basicData.count > 0) {
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }
    if (lightData.count > 0) {
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    }
};
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem) {
    _bindVao(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
};
exports.buildDrawDataMap = function (DeviceManagerDataFromSystem, TextureDataFromSystem, TextureCacheDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, BasicDrawRenderCommandBufferDataFromSystem, LightDrawRenderCommandBufferDataFromSystem) {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        TextureDataFromSystem: TextureDataFromSystem,
        TextureCacheDataFromSystem: TextureCacheDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        AmbientLightDataFromSystem: AmbientLightDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        GeometryDataFromSystem: GeometryDataFromSystem,
        BasicDrawRenderCommandBufferDataFromSystem: BasicDrawRenderCommandBufferDataFromSystem,
        LightDrawRenderCommandBufferDataFromSystem: LightDrawRenderCommandBufferDataFromSystem
    };
};
var _bindVao = function (gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    var vaoConfigData = GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex], vao = shaderUtils_1.getVao(geometryIndex, vaoMap);
    if (!shaderUtils_1.isVaoExist(vao)) {
        vao = shaderUtils_2.createAndInitVao(gl, geometryIndex, vaoMap, vboArrayMap, vaoConfigData, GeometryDataFromSystem);
    }
    shaderUtils_2.bindVao(gl, vao, ProgramDataFromSystem);
};
//# sourceMappingURL=renderUtils.js.map