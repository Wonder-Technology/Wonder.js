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

export interface IWebGL2PointLightValueDataMap{
    position: Float32Array;
    colorArr3: Array<number>;
    intensity: number;
    constant: number;
    linear: number;
    quadratic: number;
    radius: number;

    // isValueDirty:(value:any) => boolean;
    isIntensityDirty:boolean;
    isOtherValueDirty:boolean;
}
