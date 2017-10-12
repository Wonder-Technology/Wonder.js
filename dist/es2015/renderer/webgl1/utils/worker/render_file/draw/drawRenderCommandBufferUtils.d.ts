import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { BasicRenderUniformData, LightRenderUniformData } from "../../../../../type/dataType";
import { Map } from "immutable";
import { IWebGL1BasicSendUniformDataDataMap, IWebGL1DrawDataMap, IWebGL1LightSendUniformDataDataMap } from "../interface/IUtils";
export declare const buildDrawFuncDataMap: (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, getStartTextureIndex: Function, useShader: Function) => {
    bindIndexBuffer: Function;
    sendAttributeData: Function;
    sendUniformData: Function;
    directlySendUniformData: Function;
    use: Function;
    hasIndices: Function;
    getIndicesCount: Function;
    getIndexType: Function;
    getIndexTypeSize: Function;
    getVerticesCount: Function;
    bindAndUpdate: Function;
    getMapCount: Function;
    getStartTextureIndex: Function;
    useShader: Function;
};
export declare const drawGameObjects: (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, definedStartTextureUnitIndex: number, useShaderName: string, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL1BasicSendUniformDataDataMap | IWebGL1LightSendUniformDataDataMap, renderCommandUniformData: BasicRenderUniformData | LightRenderUniformData, {renderCommandBufferData: {mMatrices, materialIndices, geometryIndices}, count}: {
    renderCommandBufferData: {
        mMatrices: any;
        materialIndices: any;
        geometryIndices: any;
    };
    count: any;
}) => void;
