import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { IWebGL1DrawDataMap, IWebGL1LightSendUniformDataDataMap } from "../../utils/worker/render_file/interface/IUtils";
export declare const sendUniformData: (gl: any, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IWebGL1DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap: IWebGL1LightSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
