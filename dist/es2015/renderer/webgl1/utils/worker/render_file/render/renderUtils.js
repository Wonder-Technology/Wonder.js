import { getOrCreateBuffer } from "../../../../../utils/buffer/arrayBufferUtils";
import { Log } from "../../../../../../utils/Log";
import { getExtensionVao } from "../device/gpuDetectUtils";
import { bindVao, createAndInitVao } from "../shader/shaderUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getVao, isVaoExist } from "../../../../../utils/worker/render_file/shader/shaderUtils";
export var sendAttributeData = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, GPUDetectDataFromSystem, VaoDataFromSystem) {
    var vaoExtension = getExtensionVao(GPUDetectDataFromSystem);
    if (hasExtension(vaoExtension)) {
        _bindVao(gl, vaoExtension, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
    }
    else {
        _sendVbo(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);
    }
};
var _sendVbo = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex], attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var bufferName = sendData.buffer, buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem), pos = null;
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
};
var _getOrCreateArrayBuffer = function (gl, geometryIndex, bufferName, _a, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords;
    var buffer = null;
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
            Log.error(true, Log.info.FUNC_INVALID("bufferName:" + bufferName));
            break;
    }
    return buffer;
};
export var buildDrawDataMap = function (DeviceManagerDataFromSystem, TextureDataFromSystem, TextureCacheDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, BasicDrawRenderCommandBufferDataFromSystem, LightDrawRenderCommandBufferDataFromSystem) {
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
    };
};
var _bindVao = function (gl, extension, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    var vaoConfigData = GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex], vao = getVao(geometryIndex, vaoMap);
    if (!isVaoExist(vao)) {
        vao = createAndInitVao(gl, extension, geometryIndex, vaoMap, vboArrayMap, vaoConfigData, GeometryDataFromSystem);
    }
    bindVao(extension, vao, ProgramDataFromSystem);
};
//# sourceMappingURL=renderUtils.js.map