import { sendAttributeData as sendAttributeDataUtils } from "../utils/render/renderUtils";
import { getVertices, getNormals, getTexCoords } from "../../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../utils/shader/location/locationUtils";
import { sendBuffer } from "../../shader/glslSender/GLSLSenderSystem";

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);


