import { IBasicSendUniformDataDataMap, IDrawDataMap } from "../../interface/IUtils";
import { BasicRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import { BasicMaterialForGetUniformDataDataMap, MaterialForGetUniformDataDataMap } from "../../../../../type/utilsType";
export declare var sendUniformData: (gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IDrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap: IBasicSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, materialData: MaterialForGetUniformDataDataMap, basicMaterialData: BasicMaterialForGetUniformDataDataMap) => void;
export declare var buildSendUniformDataDataMap: (sendFloat1: any, sendFloat3: any, sendMatrix4: any, sendVector3: any, sendInt: any, sendMatrix3: any, drawDataMap: IDrawDataMap) => {
    glslSenderData: {
        sendMatrix3: any;
        sendMatrix4: any;
        sendVector3: any;
        sendInt: any;
        sendFloat1: any;
        sendFloat3: any;
        GLSLSenderDataFromSystem: any;
    };
};
export declare var buildMaterialDataForGetUniformData: (getColorArr3: Function, getOpacity: Function, MaterialDataFromSystem: any) => {
    getColorArr3: Function;
    getOpacity: Function;
    MaterialDataFromSystem: any;
};
export declare var buildBasicMaterialDataForGetUniformData: (BasicMaterialDataFromSystem: any) => {
    BasicMaterialDataFromSystem: any;
};
