"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaterialWorkerData_1 = require("./MaterialWorkerData");
var materialUtils_1 = require("../../../utils/worker/render_file/material/materialUtils");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
var bufferUtils_1 = require("../../../utils/worker/render_file/material/bufferUtils");
var basicMaterialUtils_1 = require("../../../utils/worker/render_file/material/basicMaterialUtils");
var lightMaterialUtils_1 = require("../../../utils/worker/render_file/material/lightMaterialUtils");
var BasicMaterialWorkerData_1 = require("./BasicMaterialWorkerData");
var LightMaterialWorkerData_1 = require("./LightMaterialWorkerData");
var operateBufferDataUtils_1 = require("../../../utils/common/operateBufferDataUtils");
var MapManagerWorkerSystem_1 = require("../texture/MapManagerWorkerSystem");
var MapManagerWorkerData_1 = require("../texture/MapManagerWorkerData");
var LightMaterialWorkerSystem_1 = require("./LightMaterialWorkerSystem");
exports.initMaterials = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, basicMaterialData, lightMaterialData, TextureWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, GLSLSenderWorkerData, ProgramWorkerData, VaoWorkerData, LocationWorkerData, ShaderWorkerData) {
    materialUtils_1.initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, materialUtils_1.buildInitShaderDataMap(DeviceManagerWorkerData_1.DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData_1.MapManagerWorkerData, MaterialWorkerData_1.MaterialWorkerData, BasicMaterialWorkerData_1.BasicMaterialWorkerData, LightMaterialWorkerData_1.LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData));
    _initSpecifyMaterials(basicMaterialData.startIndex, basicMaterialData.index, basicMaterialUtils_1.getClassName());
    _initSpecifyMaterials(lightMaterialData.startIndex, lightMaterialData.index, lightMaterialUtils_1.getClassName());
    MapManagerWorkerSystem_1.initMapManagers(gl, TextureWorkerData);
};
var _initSpecifyMaterials = function (startIndex, index, className) {
    for (var i = startIndex; i < index; i++) {
        exports.initMaterial(i, null, className);
    }
};
exports.initMaterial = function (index, state, className) {
};
exports.initNewInitedMaterials = function (workerInitList) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        exports.initMaterial(index, null, className);
    }
};
exports.useShader = materialUtils_1.useShader;
exports.getColorArr3 = operateBufferDataUtils_1.getColorArr3;
exports.getOpacity = materialUtils_1.getOpacity;
exports.getAlphaTest = materialUtils_1.getAlphaTest;
exports.isTestAlpha = materialUtils_1.isTestAlpha;
exports.initData = function (materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    LightMaterialWorkerSystem_1.initData(LightMaterialWorkerData);
    var lightMaterialData = materialData.lightMaterialData;
    if (textureData !== null) {
        MapManagerWorkerSystem_1.initData(textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData);
    }
};
var _initBufferData = function (buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    var offset = materialUtils_1.createTypeArrays(buffer, bufferUtils_1.getBufferTotalCount(), MaterialWorkerData);
    offset = basicMaterialUtils_1.createTypeArrays(buffer, offset, bufferUtils_1.getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = lightMaterialUtils_1.createTypeArrays(buffer, offset, bufferUtils_1.getLightMaterialBufferCount(), LightMaterialWorkerData);
};
//# sourceMappingURL=MaterialWorkerSystem.js.map