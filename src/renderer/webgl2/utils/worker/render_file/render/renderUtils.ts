import { Log } from "../../../../../../utils/Log";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { clear } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindFrameUboData, init as initUbo } from "../ubo/uboManagerUtils";
import { Map } from "immutable";
import { hasExtensionColorBufferFloat } from "../device/gpuDetectUtils";
import { init as initDefer } from "./light/defer/deferShadingUtils";
import { bindVao, createAndInitVao, getVao, isVaoExist } from "../shader/shaderUtils";
import { WebGL2DrawDataMap } from "../../../../type/utilsType";

export var init = (gl:any, render_config:IRenderConfig, DataBufferConfig:any, GBufferDataFromSystem:any, DeferLightPassDataFromSystem: any, ShaderDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    if(!hasExtensionColorBufferFloat(GPUDetectDataFromSystem)){
        Log.warn("defer shading need support extensionColorBufferFloat extension");
    }
    else{
        initDefer(gl, DataBufferConfig, GBufferDataFromSystem, DeferLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    initUbo(gl, render_config, GLSLSenderDataFromSystem);
}

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, basicRender:Function, deferRender:Function, drawDataMap: WebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, {
    cameraData,
    basicData,
    lightData
}) => {
    var {
            DeviceManagerDataFromSystem,
            GLSLSenderDataFromSystem
        } = drawDataMap;

    clear(gl, DeviceManagerDataFromSystem);

    bindFrameUboData(gl, render_config, cameraData, GLSLSenderDataFromSystem);

    if(basicData.count > 0){
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }

    if(lightData.count > 0){
        deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex:number, geometryIndex: number, ProgramDataFromSystem: any,  GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, VaoDataFromSystem: any) => {
    var vaoConfigData = GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex],
        vaos = VaoDataFromSystem.vaos,
        vao = getVao(geometryIndex, vaos);

    if(!isVaoExist(vao)){
        vao = createAndInitVao(gl, geometryIndex, vaos, vaoConfigData, GeometryDataFromSystem);
    }

    bindVao(gl, vao, ProgramDataFromSystem);
}

export var buildDrawDataMap = (DeviceManagerDataFromSystem: any, TextureDataFromSystem: any, TextureCacheDataFromSystem: any, MapManagerDataFromSystem: any, MaterialDataFromSystem: any, BasicMaterialDataFromSystem: any, LightMaterialDataFromSystem: any, AmbientLightDataFromSystem, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any,  BasicDrawRenderCommandBufferDataFromSystem:any, LightDrawRenderCommandBufferDataFromSystem:any, VaoDataFromSystem:any) => {
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
        VaoDataFromSystem: VaoDataFromSystem,
        BasicDrawRenderCommandBufferDataFromSystem: BasicDrawRenderCommandBufferDataFromSystem,
        LightDrawRenderCommandBufferDataFromSystem: LightDrawRenderCommandBufferDataFromSystem
    }
}

