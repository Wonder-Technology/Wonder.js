import { getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { setTypeArrayValue } from "../../../../../utils/typeArrayUtils";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { Map } from "immutable";

export const initNoMaterialShaders = (state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, initShaderDataMap: InitShaderDataMap) => {
    var shaders = material_config.shaders.noMaterialShaders;

    for (let shaderName in shaders) {
        if (shaders.hasOwnProperty(shaderName)) {
            initNoMaterialShader(state, shaderName, shaders[shaderName], material_config, shaderLib_generator, initShaderDataMap);
        }
    }
}

export const setShaderIndex = (materialIndex: number, shaderIndex: number, MaterialDataFromSystem: any) => {
    setTypeArrayValue(MaterialDataFromSystem.shaderIndices, materialIndex, shaderIndex);
}

export const useShader = (index: number, shaderName: string, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initMaterialShader: Function, initShaderDataMap: InitShaderDataMap) => {
    var shaderIndex = initMaterialShader(state, index, shaderName, material_config, shaderLib_generator, initShaderDataMap);

    setShaderIndex(index, shaderIndex, initShaderDataMap.MaterialDataFromSystem);

    return shaderIndex;
}

// export const getColorArr3 = getColorArr3Utils;

export const getOpacity = (materialIndex: number, MaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.opacities);
}

export const getAlphaTest = (materialIndex: number, MaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.alphaTests);
}

export const isTestAlpha = (alphaTest: number) => {
    return alphaTest >= 0;
}

export const getShaderIndexDataSize = () => 1;

export const getColorDataSize = () => 3;

export const getOpacityDataSize = () => 1;

export const getAlphaTestDataSize = () => 1;

export const createTypeArrays = (buffer: any, count: number, MaterialDataFromSystem: any) => {
    var offset = 0;

    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count * getShaderIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getShaderIndexDataSize();

    MaterialDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    MaterialDataFromSystem.opacities = new Float32Array(buffer, offset, count * getOpacityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getOpacityDataSize();

    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, offset, count * getAlphaTestDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getAlphaTestDataSize();

    return offset;
}

export const buildInitShaderDataMap = (DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, ShaderDataFromSystem: any, MapManagerDataFromSystem: any, MaterialDataFromSystem: any, BasicMaterialDataFromSystem: any, LightMaterialDataFromSystem: any, AmbientLightDataFromSystem: any, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any, GPUDetectDataFromSystem: any, VaoDataFromSystem: any) => {
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
    }
}
