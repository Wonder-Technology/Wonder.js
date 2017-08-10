import {
    bindIndexBuffer as bindIndexBufferUtils,
    // init as initUtils,
    sendAttributeData as sendAttributeDataUtils,
    use as useUtils
} from "../../../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationWorkerSystem";
import { MaterialDataMap, RenderCommandUniformData } from "../../../type/dataType";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { Map } from "immutable";
import { buildGLSLSource } from "../../webgl1/render_file/shader/shaderSourceBuildWorkerSystem";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import {
    sendBuffer
    // getUniformData,  sendFloat1, sendFloat3, sendInt, sendMatrix3, sendMatrix4,
    // sendVector3
} from "./glslSender/GLSLSenderWorkerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../light/AmbientLightWorkerSystem";
// import { getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity } from "../light/DirectionLightWorkerSystem";
// import {
//     getColorArr3 as getPointLightColorArr3,
//     getIntensity as getPointLightIntensity,
//     getConstant as getPointLightConstant,
//     getLinear as getPointLightLinear,
//     getQuadratic as getPointLightQuadratic,
//     getRange as getPointLightRange,
// } from "../light/PointLightWorkerSystem";
// import { getMapCount } from "../texture/MapManagerWorkerSystem";
import { createMap } from "../../../../utils/objectUtils";
import { hasDiffuseMap, hasSpecularMap } from "../../../utils/material/lightMaterialUtils";
import { IMaterialConfig } from "../../../data/material_config";

// export var init = (state: Map<any, any>, materialIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initShaderDataMap: InitShaderDataMap) => {
    //todo fix
    // return initUtils(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
// };

// var _buildInitShaderFuncDataMap = () => {
//     return {
//         buildGLSLSource: buildGLSLSource,
//         getGL: getGL,
//         getMapCount: getMapCount,
//         hasSpecularMap: hasSpecularMap,
//         hasDiffuseMap: hasDiffuseMap
//     }
// }

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, ArrayBufferWorkerData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData);

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export var use = useUtils;

export var getDirectionLightPosition = (index: number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
}

export var getPointLightPosition = (index: number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
}

var _getLightPosition = (index: number, LightDataFromSystem: any) => {
    return LightDataFromSystem.positionArr[index];
}

export var initData = (ShaderWorkerData: any) => {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;

    ShaderWorkerData.shaderIndexByMaterialIndexAndShaderNameMap = createMap();
}
