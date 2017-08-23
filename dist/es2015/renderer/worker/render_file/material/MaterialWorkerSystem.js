import { MaterialWorkerData } from "./MaterialWorkerData";
import { createTypeArrays as createTypeArraysUtils, getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils, isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, initNoMaterialShaders, useShader as useShaderUtils } from "../../../utils/worker/render_file/material/materialUtils";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { getBasicMaterialBufferCount, getBufferTotalCount, getLightMaterialBufferCount } from "../../../utils/worker/render_file/material/bufferUtils";
import { createTypeArrays as createBasicMaterialTypeArraysUtils, getClassName as getBasicMaterialClassName } from "../../../utils/worker/render_file/material/basicMaterialUtils";
import { createTypeArrays as createLightMaterialTypeArraysUtils, getClassName as getLightMaterialClassName } from "../../../utils/worker/render_file/material/lightMaterialUtils";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { initData as initMapManagerData, initMapManagers } from "../texture/MapManagerWorkerSystem";
import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
import { initData as initLightMaterialData } from "./LightMaterialWorkerSystem";
export var initMaterials = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, basicMaterialData, lightMaterialData, TextureWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, GLSLSenderWorkerData, ProgramWorkerData, VaoWorkerData, LocationWorkerData, ShaderWorkerData) {
    initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData));
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
};
export var initNewInitedMaterials = function (workerInitList) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        initMaterial(index, null, className);
    }
};
export var useShader = useShaderUtils;
export var getColorArr3 = getColorArr3Utils;
export var getOpacity = getOpacityUtils;
export var getAlphaTest = getAlphaTestUtils;
export var isTestAlpha = isTestAlphaUtils;
export var initData = function (materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    initLightMaterialData(LightMaterialWorkerData);
    var lightMaterialData = materialData.lightMaterialData;
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