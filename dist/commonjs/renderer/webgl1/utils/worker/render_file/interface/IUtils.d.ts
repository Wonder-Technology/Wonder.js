import { IBasicSendUniformDataDataMap, IDrawDataMap, ILightSendUniformDataDataMap } from "../../../../../utils/worker/render_file/interface/IUtils";
import { WebGL1SendUniformDataAmbientLightDataMap, WebGL1SendUniformDataDirectionLightDataMap, WebGL1SendUniformDataPointLightDataMap } from "../../../../type/utilsType";
export interface IWebGL1BasicSendUniformDataDataMap extends IBasicSendUniformDataDataMap {
}
export interface IWebGL1LightSendUniformDataDataMap extends ILightSendUniformDataDataMap {
    ambientLightData: WebGL1SendUniformDataAmbientLightDataMap;
    directionLightData: WebGL1SendUniformDataDirectionLightDataMap;
    pointLightData: WebGL1SendUniformDataPointLightDataMap;
}
export interface IWebGL1DrawDataMap extends IDrawDataMap {
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
}
