import { Map } from "immutable";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IWebGL2DrawFuncDataMap } from "../../../../webgl2/interface/Idraw";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { BasicRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { IWebGL2BasicSendUniformDataDataMap, IWebGL2DrawDataMap } from "../../worker/render_file/interface/IUtils";
export declare var draw: (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL2DrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, sendDataMap: IWebGL2BasicSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, {vMatrix, pMatrix}: {
    vMatrix: any;
    pMatrix: any;
}) => Map<any, any>;
