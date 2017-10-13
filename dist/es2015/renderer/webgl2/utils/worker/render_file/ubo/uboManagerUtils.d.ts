import { IWebGL2ShaderLibConfig } from "../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { CameraRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import { IWebGL2AmbientLightValueDataMap, IWebGL2DirectionLightValueDataMap, IWebGL2SendUniformDataAmbientLightDataMap, IWebGL2SendUniformDataDirectionLightDataMap, IWebGL2SendUniformDataPointLightDataMap } from "../interface/IUtils";
import { IWebGL2DrawDataMap, IWebGL2PointLightValueDataMap } from "../interface/IUtils";
export declare const init: (gl: any, render_config: IRenderConfig, {oneUboDataList, uboBindingPointMap}: {
    oneUboDataList: any;
    uboBindingPointMap: any;
}) => void;
export declare const bindFrameUboData: (gl: any, render_config: IRenderConfig, cameraData: CameraRenderCommandBufferForDrawData, {frameUboDataList, uboBindingPointMap}: {
    frameUboDataList: any;
    uboBindingPointMap: any;
}) => void;
export declare const bindAmbientLightUboData: (gl: any, ambientLightIndex: number, sendUniformDataAmbientLightDataMap: IWebGL2SendUniformDataAmbientLightDataMap, ambientLightValueMap: IWebGL2AmbientLightValueDataMap, drawDataMap: IWebGL2DrawDataMap, {ambientLightUboDataList, uboBindingPointMap}: {
    ambientLightUboDataList: any;
    uboBindingPointMap: any;
}) => void;
export declare const bindDirectionLightUboData: (gl: any, directionLightIndex: number, sendUniformDataDirectionLightDataMap: IWebGL2SendUniformDataDirectionLightDataMap, directionLightValueMap: IWebGL2DirectionLightValueDataMap, drawDataMap: IWebGL2DrawDataMap, {directionLightUboDataList, uboBindingPointMap}: {
    directionLightUboDataList: any;
    uboBindingPointMap: any;
}) => void;
export declare const bindPointLightUboData: (gl: any, pointLightIndex: number, sendUniformDataPointLightDataMap: IWebGL2SendUniformDataPointLightDataMap, pointLightValueMap: IWebGL2PointLightValueDataMap, drawDataMap: IWebGL2DrawDataMap, {pointLightUboDataList, uboBindingPointMap}: {
    pointLightUboDataList: any;
    uboBindingPointMap: any;
}) => void;
export declare const handleUboConfig: (gl: any, shaderIndex: number, program: WebGLProgram, materialShaderLibNameArr: string[], shaderLibData: IWebGL2ShaderLibConfig, initShaderDataMap: InitShaderDataMap, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem: any) => void;
