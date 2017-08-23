import { IWebGL2DrawDataMap, IWebGL2SendUniformDataPointLightDataMap } from "../../../worker/render_file/interface/IUtils";
import { Map } from "immutable";
export declare var drawPointLightPass: (gl: any, state: Map<any, any>, use: Function, drawDataMap: IWebGL2DrawDataMap, pointLightData: IWebGL2SendUniformDataPointLightDataMap, pointLightCount: number, vMatrix: Float32Array, pMatrix: Float32Array, DeferPointLightPassDataFromSystem: any, ShaderDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => void;
