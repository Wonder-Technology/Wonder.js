import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { IWebGL1DrawDataMap, IWebGL1LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
export declare const draw: (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, sendDataMap: IWebGL1LightSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, {vMatrix, pMatrix, cameraPosition, normalMatrix}: {
    vMatrix: any;
    pMatrix: any;
    cameraPosition: any;
    normalMatrix: any;
}) => Map<any, any>;
