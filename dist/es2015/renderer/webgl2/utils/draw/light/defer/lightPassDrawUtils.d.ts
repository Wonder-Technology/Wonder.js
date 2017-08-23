import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
export declare var drawLightPass: (gl: any, render_config: IRenderConfig, {use, unbindGBuffer}: {
    use: any;
    unbindGBuffer: any;
}, drawDataMap: IWebGL2DrawDataMap, {DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem}: {
    DeferAmbientLightPassDataFromSystem: any;
    DeferDirectionLightPassDataFromSystem: any;
    DeferPointLightPassDataFromSystem: any;
}, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL2LightSendUniformDataDataMap, vMatrix: Float32Array, pMatrix: Float32Array, state: Map<any, any>) => void;
