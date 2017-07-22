"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaterialWorkerData_1 = require("./MaterialWorkerData");
var material_config_1 = require("../../../data/material_config");
var shaderLib_generator_1 = require("../../../data/shaderLib_generator");
var ShaderWorkerSystem_1 = require("../shader/ShaderWorkerSystem");
var materialUtils_1 = require("../../../utils/material/materialUtils");
var ProgramWorkerData_1 = require("../shader/program/ProgramWorkerData");
var LocationWorkerData_1 = require("../shader/location/LocationWorkerData");
var GLSLSenderWorkerData_1 = require("../shader/glslSender/GLSLSenderWorkerData");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
var bufferUtils_1 = require("../../../utils/material/bufferUtils");
var basicMaterialUtils_1 = require("../../../utils/material/basicMaterialUtils");
var lightMaterialUtils_1 = require("../../../utils/material/lightMaterialUtils");
var BasicMaterialWorkerData_1 = require("./BasicMaterialWorkerData");
var LightMaterialWorkerData_1 = require("./LightMaterialWorkerData");
var operateBufferDataUtils_1 = require("../../../utils/common/operateBufferDataUtils");
var DirectionLightWorkerData_1 = require("../light/DirectionLightWorkerData");
var PointLightWorkerData_1 = require("../light/PointLightWorkerData");
var MapManagerWorkerSystem_1 = require("../texture/MapManagerWorkerSystem");
var MapManagerWorkerData_1 = require("../texture/MapManagerWorkerData");
var ShaderWorkerData_1 = require("../shader/ShaderWorkerData");
var LightMaterialWorkerSystem_1 = require("./LightMaterialWorkerSystem");
exports.initMaterials = function (basicMaterialData, lightMaterialData, gl, TextureWorkerData) {
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
    var shaderIndex = ShaderWorkerSystem_1.init(state, index, className, material_config_1.material_config, shaderLib_generator_1.shaderLib_generator, materialUtils_1.buildInitShaderDataMap(DeviceManagerWorkerData_1.DeviceManagerWorkerData, ProgramWorkerData_1.ProgramWorkerData, LocationWorkerData_1.LocationWorkerData, GLSLSenderWorkerData_1.GLSLSenderWorkerData, ShaderWorkerData_1.ShaderWorkerData, MapManagerWorkerData_1.MapManagerWorkerData, MaterialWorkerData_1.MaterialWorkerData, BasicMaterialWorkerData_1.BasicMaterialWorkerData, LightMaterialWorkerData_1.LightMaterialWorkerData, DirectionLightWorkerData_1.DirectionLightWorkerData, PointLightWorkerData_1.PointLightWorkerData));
    materialUtils_1.setShaderIndex(index, shaderIndex, MaterialWorkerData_1.MaterialWorkerData);
};
exports.initNewInitedMaterials = function (workerInitList) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        exports.initMaterial(index, null, className);
    }
};
exports.getColorArr3 = operateBufferDataUtils_1.getColorArr3;
exports.getOpacity = materialUtils_1.getOpacity;
exports.getAlphaTest = materialUtils_1.getAlphaTest;
exports.isTestAlpha = materialUtils_1.isTestAlpha;
exports.initData = function (materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    var lightMaterialData = materialData.lightMaterialData;
    LightMaterialWorkerSystem_1.setDiffuseMapIndex(lightMaterialData.diffuseMapIndex, LightMaterialWorkerData);
    LightMaterialWorkerSystem_1.setSpecularMapIndex(lightMaterialData.specularMapIndex, LightMaterialWorkerData);
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