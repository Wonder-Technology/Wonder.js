import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { BasicRenderUniformData, LightRenderUniformData } from "../../../../../type/dataType";
import { IWebGL2DrawFuncDataMap } from "../../../../interface/IDraw";
import { IWebGL2BasicSendUniformDataDataMap, IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../interface/IUtils";
export declare const drawGameObjects: (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, definedStartTextureUnitIndex: number, useShaderName: string, initMaterialShader: Function, drawFuncDataMap: IWebGL2DrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL2BasicSendUniformDataDataMap | IWebGL2LightSendUniformDataDataMap, renderCommandUniformData: BasicRenderUniformData | LightRenderUniformData, {renderCommandBufferData: {mMatrices, materialIndices, geometryIndices}, count}: {
    renderCommandBufferData: {
        mMatrices: any;
        materialIndices: any;
        geometryIndices: any;
    };
    count: any;
}) => void;
