import { InitShaderDataMap } from "../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../interface/Idraw";
import { BasicRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { IWebGL1BasicSendUniformDataDataMap, IWebGL1DrawDataMap } from "../../worker/render_file/interface/IUtils";
export declare var draw: (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, sendDataMap: IWebGL1BasicSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, {vMatrix, pMatrix}: {
    vMatrix: any;
    pMatrix: any;
}) => Map<any, any>;
