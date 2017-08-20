import { IBasicSendUniformDataDataMap, IDrawDataMap } from "../../../../../utils/worker/render_file/interface/IUtils";

export interface IWebGL1BasicSendUniformDataDataMap extends IBasicSendUniformDataDataMap{
}

export interface IWebGL1DrawDataMap extends IDrawDataMap{
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
}
