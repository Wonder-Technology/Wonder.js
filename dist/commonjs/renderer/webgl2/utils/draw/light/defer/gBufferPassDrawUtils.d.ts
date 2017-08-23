import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/IDraw";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { LightRenderUniformData } from "../../../../../type/dataType";
import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
export declare var drawGBufferPass: (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL2DeferDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, {GBufferDataFromSystem}: {
    GBufferDataFromSystem: any;
}, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL2LightSendUniformDataDataMap, renderCommandUniformData: LightRenderUniformData, bufferData: LightRenderCommandBufferForDrawData) => void;
