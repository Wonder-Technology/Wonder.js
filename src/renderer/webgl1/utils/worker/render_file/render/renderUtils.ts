import { GetArrayBufferDataFuncMap } from "../../../../../../definition/type/geometryType";
import { getOrCreateBuffer } from "../../../../../utils/buffer/arrayBufferUtils";
import { Log } from "../../../../../../utils/Log";

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex],
        attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex],
        lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;

    for (let sendData of sendDataArr) {
        let bufferName = sendData.buffer,
            buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem),
            pos: number = null;

        if (lastBindedArrayBuffer === buffer) {
            continue;
        }

        pos = getAttribLocation(gl, program, sendData.name, attributeLocationMap);

        if (isAttributeLocationNotExist(pos)) {
            continue;
        }

        lastBindedArrayBuffer = buffer;

        sendBuffer(gl, sendData.type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferDataFromSystem);
    }

    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
}

var _getOrCreateArrayBuffer = (gl: WebGLRenderingContext, geometryIndex: number, bufferName: string, {
    getVertices,
    getNormals,
    getTexCoords
}, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var buffer: WebGLBuffer = null;

    switch (bufferName) {
        case "vertex":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "normal":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "texCoord":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`bufferName:${bufferName}`));
            break;
    }

    return buffer;
}
