import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../utils/worker/render_file/interface/IUtils";
export declare var sendUniformData: (gl: any, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IWebGL2DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap: IWebGL2LightSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
