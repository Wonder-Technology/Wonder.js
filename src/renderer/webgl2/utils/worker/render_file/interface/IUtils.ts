import {
    IBasicSendUniformDataDataMap, IDrawDataMap,
    ILightSendUniformDataDataMap
} from "../../../../../utils/worker/render_file/interface/IUtils";
import { WebGL2SendUniformDataPointLightDataMap } from "../../../../type/utilsType";

export interface IWebGL2BasicSendUniformDataDataMap extends IBasicSendUniformDataDataMap{
}

export interface IWebGL2LightSendUniformDataDataMap extends ILightSendUniformDataDataMap{
    // glslSenderData: SendUniformDataGLSLSenderDataMap;
    pointLightData: WebGL2SendUniformDataPointLightDataMap;
}

export interface IWebGL2DrawDataMap extends IDrawDataMap{
}
