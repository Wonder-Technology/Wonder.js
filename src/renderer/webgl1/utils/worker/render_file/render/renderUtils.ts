import { GetArrayBufferDataFuncMap } from "../../../../../../definition/type/geometryType";
import { getOrCreateBuffer } from "../../../../../utils/buffer/arrayBufferUtils";
import { Log } from "../../../../../../utils/Log";
import { getExtensionVao } from "../device/gpuDetectUtils";
import { bindVao, createAndInitVao } from "../shader/shaderUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getVao, isVaoExist } from "../../../../../utils/worker/render_file/shader/shaderUtils";

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, GPUDetectDataFromSystem:any, VaoDataFromSystem:any) => {
    var vaoExtension = getExtensionVao(GPUDetectDataFromSystem);

    if(hasExtension(vaoExtension)){
        _bindVao(gl, vaoExtension, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
    }
    else{
        _sendVbo(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);
    }
}

var _sendVbo = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
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
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffers, getVertices, GeometryDataFromSystem);
            break;
        case "normal":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem);
            break;
        case "texCoord":
            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`bufferName:${bufferName}`));
            break;
    }

    return buffer;
}

export var buildDrawDataMap = (DeviceManagerDataFromSystem: any, TextureDataFromSystem: any, TextureCacheDataFromSystem: any, MapManagerDataFromSystem: any, MaterialDataFromSystem: any, BasicMaterialDataFromSystem: any, LightMaterialDataFromSystem: any, AmbientLightDataFromSystem, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, BasicDrawRenderCommandBufferDataFromSystem:any, LightDrawRenderCommandBufferDataFromSystem:any) => {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        TextureDataFromSystem: TextureDataFromSystem,
        TextureCacheDataFromSystem: TextureCacheDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        AmbientLightDataFromSystem: AmbientLightDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        GeometryDataFromSystem: GeometryDataFromSystem,
        ArrayBufferDataFromSystem: ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem: IndexBufferDataFromSystem,
        BasicDrawRenderCommandBufferDataFromSystem: BasicDrawRenderCommandBufferDataFromSystem,
        LightDrawRenderCommandBufferDataFromSystem: LightDrawRenderCommandBufferDataFromSystem
    }
}

var _bindVao = (gl: WebGLRenderingContext, extension:any, shaderIndex:number, geometryIndex: number, ProgramDataFromSystem: any,  GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, VaoDataFromSystem: any) => {
    var vaoConfigData = GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex],
        vaos = VaoDataFromSystem.vaos,
        vao = getVao(geometryIndex, vaos);

    if(!isVaoExist(vao)){
        vao = createAndInitVao(gl, extension, geometryIndex, vaos, vaoConfigData, GeometryDataFromSystem);
    }

    bindVao(extension, vao, ProgramDataFromSystem);
}
