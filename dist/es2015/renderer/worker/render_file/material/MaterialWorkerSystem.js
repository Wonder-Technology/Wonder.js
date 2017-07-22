import { MaterialWorkerData } from "./MaterialWorkerData";
import { material_config } from "../../../data/material_config";
import { shaderLib_generator } from "../../../data/shaderLib_generator";
import { init as initShader } from "../shader/ShaderWorkerSystem";
import { createTypeArrays as createTypeArraysUtils, getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils, isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, setShaderIndex } from "../../../utils/material/materialUtils";
import { ProgramWorkerData } from "../shader/program/ProgramWorkerData";
import { LocationWorkerData } from "../shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "../shader/glslSender/GLSLSenderWorkerData";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { getBasicMaterialBufferCount, getBufferTotalCount, getLightMaterialBufferCount } from "../../../utils/material/bufferUtils";
import { createTypeArrays as createBasicMaterialTypeArraysUtils, getClassName as getBasicMaterialClassName } from "../../../utils/material/basicMaterialUtils";
import { createTypeArrays as createLightMaterialTypeArraysUtils, getClassName as getLightMaterialClassName } from "../../../utils/material/lightMaterialUtils";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { DirectionLightWorkerData } from "../light/DirectionLightWorkerData";
import { PointLightWorkerData } from "../light/PointLightWorkerData";
import { initData as initMapManagerData, initMapManagers } from "../texture/MapManagerWorkerSystem";
import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
import { ShaderWorkerData } from "../shader/ShaderWorkerData";
import { setDiffuseMapIndex, setSpecularMapIndex } from "./LightMaterialWorkerSystem";
export var initMaterials = function (basicMaterialData, lightMaterialData, gl, TextureWorkerData) {
    _initSpecifyMaterials(basicMaterialData.startIndex, basicMaterialData.index, getBasicMaterialClassName());
    _initSpecifyMaterials(lightMaterialData.startIndex, lightMaterialData.index, getLightMaterialClassName());
    initMapManagers(gl, TextureWorkerData);
};
var _initSpecifyMaterials = function (startIndex, index, className) {
    for (var i = startIndex; i < index; i++) {
        initMaterial(i, null, className);
    }
};
export var initMaterial = function (index, state, className) {
    var shaderIndex = initShader(state, index, className, material_config, shaderLib_generator, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData));
    setShaderIndex(index, shaderIndex, MaterialWorkerData);
};
export var initNewInitedMaterials = function (workerInitList) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        initMaterial(index, null, className);
    }
};
export var getColorArr3 = getColorArr3Utils;
export var getOpacity = getOpacityUtils;
export var getAlphaTest = getAlphaTestUtils;
export var isTestAlpha = isTestAlphaUtils;
export var initData = function (materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    var lightMaterialData = materialData.lightMaterialData;
    setDiffuseMapIndex(lightMaterialData.diffuseMapIndex, LightMaterialWorkerData);
    setSpecularMapIndex(lightMaterialData.specularMapIndex, LightMaterialWorkerData);
    if (textureData !== null) {
        initMapManagerData(textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData);
    }
};
var _initBufferData = function (buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    var offset = createTypeArraysUtils(buffer, getBufferTotalCount(), MaterialWorkerData);
    offset = createBasicMaterialTypeArraysUtils(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = createLightMaterialTypeArraysUtils(buffer, offset, getLightMaterialBufferCount(), LightMaterialWorkerData);
};
//# sourceMappingURL=MaterialWorkerSystem.js.map