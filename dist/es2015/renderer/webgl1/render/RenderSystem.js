import { sendAttributeData as sendAttributeDataUtils } from "../utils/worker/render_file/render/renderUtils";
import { getVertices, getNormals, getTexCoords } from "../../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../utils/worker/render_file/shader/location/locationUtils";
import { sendBuffer } from "../../shader/glslSender/GLSLSenderSystem";
import curry from "wonder-lodash/curry";
import { clear, getGL } from "../../device/DeviceManagerSystem";
import { render as frontRender } from "./light/front/FrontRenderSystem";
import { render as basicRender } from "./basic/BasicRenderSystem";
export var render = curry(function (state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, _a) {
    var cameraData = _a.cameraData, basicData = _a.basicData, lightData = _a.lightData;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, gl = getGL(DeviceManagerDataFromSystem, state);
    clear(gl, DeviceManagerDataFromSystem);
    if (basicData.count > 0) {
        basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }
    if (lightData.count > 0) {
        frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData, cameraData);
    }
    return state;
});
export var sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, GPUDetectData, VaoData) { return sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, GPUDetectData, VaoData); };
//# sourceMappingURL=RenderSystem.js.map