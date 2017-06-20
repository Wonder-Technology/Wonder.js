import { Shader } from "./Shader";
import { createMap, isValidMapValue } from "../../utils/objectUtils";
import { getShaderIndexFromTable } from "../../component/material/MaterialSystem";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils, use as useUtils } from "../utils/shader/shaderUtils";
import { getIndices, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { getUniformData, sendBuffer, sendFloat1, sendMatrix4, sendVector3 } from "./glslSender/GLSLSenderSystem";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { getGL } from "../device/DeviceManagerSystem";
export var create = function (materialClassName, MaterialData, ShaderData) {
    var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable), shader = ShaderData.shaderMap[index];
    if (_isShaderExist(shader)) {
        return shader;
    }
    shader = new Shader();
    shader.index = index;
    ShaderData.count += 1;
    return shader;
};
var _isShaderExist = function (shader) { return isValidMapValue(shader); };
export var init = null;
export var sendAttributeData = null;
export var sendUniformData = null;
export var bindIndexBuffer = null;
export var use = null;
if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData) {
        initUtils(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData);
    };
    sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData) { return sendAttributeDataUtils(gl, shaderIndex, geometryIndex, getVertices, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData); };
    sendUniformData = function (gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData) {
        sendUniformDataUtils(gl, shaderIndex, {
            getUniformData: getUniformData,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendFloat1: sendFloat1
        }, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData);
    };
    bindIndexBuffer = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
        bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
    };
    use = useUtils;
}
export var initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.shaderMap = createMap();
};
//# sourceMappingURL=ShaderSystem.js.map