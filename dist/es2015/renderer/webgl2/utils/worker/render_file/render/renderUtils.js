import { Log } from "../../../../../../utils/Log";
import { clear } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindFrameUboData, init as initUbo } from "../ubo/uboManagerUtils";
import { hasExtensionColorBufferFloat } from "../device/gpuDetectUtils";
import { init as initDefer } from "./light/defer/deferShadingUtils";
import { getVao, isVaoExist } from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { bindVao, createAndInitVao } from "../shader/shaderUtils";
export var init = function (gl, render_config, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GPUDetectDataFromSystem) {
    if (!hasExtensionColorBufferFloat(GPUDetectDataFromSystem)) {
        Log.warn("defer shading need support extensionColorBufferFloat extension");
    }
    else {
        initDefer(gl, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    initUbo(gl, render_config, GLSLSenderDataFromSystem);
};
export var render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender, drawDataMap, deferDrawDataMap, initShaderDataMap, _a) {
    var cameraData = _a.cameraData, basicData = _a.basicData, lightData = _a.lightData;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem;
    clear(gl, DeviceManagerDataFromSystem);
    bindFrameUboData(gl, render_config, cameraData, GLSLSenderDataFromSystem);
    if (basicData.count > 0) {
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }
    if (lightData.count > 0) {
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    }
};
export var sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem) {
    _bindVao(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
};
export var buildDrawDataMap = function (DeviceManagerDataFromSystem, TextureDataFromSystem, TextureCacheDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, BasicDrawRenderCommandBufferDataFromSystem, LightDrawRenderCommandBufferDataFromSystem) {
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
    var vaoConfigData = GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex], vao = getVao(geometryIndex, vaoMap);
    if (!isVaoExist(vao)) {
        vao = createAndInitVao(gl, geometryIndex, vaoMap, vboArrayMap, vaoConfigData, GeometryDataFromSystem);
    }
    bindVao(gl, vao, ProgramDataFromSystem);
};
//# sourceMappingURL=renderUtils.js.map