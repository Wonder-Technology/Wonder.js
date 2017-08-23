"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderUtils_1 = require("../utils/worker/render_file/render/renderUtils");
var GeometrySystem_1 = require("../../../component/geometry/GeometrySystem");
var locationUtils_1 = require("../utils/worker/render_file/shader/location/locationUtils");
var GLSLSenderSystem_1 = require("../../shader/glslSender/GLSLSenderSystem");
var curry_1 = require("wonder-lodash/curry");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var FrontRenderSystem_1 = require("./light/front/FrontRenderSystem");
var BasicRenderSystem_1 = require("./basic/BasicRenderSystem");
exports.render = curry_1.default(function (state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, _a) {
    var cameraData = _a.cameraData, basicData = _a.basicData, lightData = _a.lightData;
    var DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, gl = DeviceManagerSystem_1.getGL(DeviceManagerDataFromSystem, state);
    DeviceManagerSystem_1.clear(gl, DeviceManagerDataFromSystem);
    if (basicData.count > 0) {
        BasicRenderSystem_1.render(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    }
    if (lightData.count > 0) {
        FrontRenderSystem_1.render(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, lightData, cameraData);
    }
    return state;
});
exports.sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, GPUDetectData, VaoData) { return renderUtils_1.sendAttributeData(gl, shaderIndex, program, geometryIndex, {
    getVertices: GeometrySystem_1.getVertices,
    getNormals: GeometrySystem_1.getNormals,
    getTexCoords: GeometrySystem_1.getTexCoords
}, locationUtils_1.getAttribLocation, locationUtils_1.isAttributeLocationNotExist, GLSLSenderSystem_1.sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, GPUDetectData, VaoData); };
//# sourceMappingURL=RenderSystem.js.map