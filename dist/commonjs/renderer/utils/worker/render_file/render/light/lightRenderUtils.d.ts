import { IDrawDataMap, ILightSendUniformDataDataMap } from "../../interface/IUtils";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import { LightMaterialForGetUniformDataDataMap, MaterialForGetUniformDataDataMap } from "../../../../../type/utilsType";
export declare const sendUniformData: (gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IDrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap: ILightSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, materialData: MaterialForGetUniformDataDataMap, lightMaterialData: LightMaterialForGetUniformDataDataMap) => void;
export declare const buildMaterialDataForGetUniformData: (getColorArr3: Function, getOpacity: Function, MaterialDataFromSystem: any) => {
    getColorArr3: Function;
    getOpacity: Function;
    MaterialDataFromSystem: any;
};
export declare const buildLightMaterialDataForGetUniformData: (getEmissionColorArr3: Function, getSpecularColorArr3: Function, getLightModel: Function, getShininess: Function, LightMaterialDataFromSystem: any) => {
    getEmissionColorArr3: Function;
    getSpecularColorArr3: Function;
    getLightModel: Function;
    getShininess: Function;
    LightMaterialDataFromSystem: any;
};
