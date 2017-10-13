import {
    // disableVertexAttribArray as disableVertexAttribArrayUtils,
    // getMaterialShaderLibConfig as getMaterialShaderLibConfigUtils, getProgram as getProgramUtils,
    initData as initDataUtils
    // initShader as initShaderUtils, isProgramExist as isProgramExistUtils, registerProgram as registerProgramUtils,
    // sendAttributeData as sendAttributeDataUtils,
    // sendUniformData as sendUniformDataUtils,
    // use as useUtils
} from "../../utils/worker/render_file/shader/program/programUtils";
// import { getVertices } from "../../../component/geometry/GeometrySystem";

// export const use = useUtils;

// export const disableVertexAttribArray = disableVertexAttribArrayUtils;

// export const getMaterialShaderLibConfig = getMaterialShaderLibConfigUtils;

// export const registerProgram = registerProgramUtils;

// export const getProgram = getProgramUtils;

// export const isProgramExist = isProgramExistUtils;

// export const initShader = initShaderUtils;

// export const sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData:any, LocationData: any, GLSLSenderData:any, GeometryData: any, ArrayBufferData: any) => {
//     sendAttributeDataUtils(gl, shaderIndex, geometryIndex, getVertices, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
// }

// export const sendUniformData = sendUniformDataUtils;

export const initData = initDataUtils;
