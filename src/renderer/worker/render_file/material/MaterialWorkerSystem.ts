import { Map } from "immutable";
import {
    BasicMaterialInitWorkerData, LightMaterialInitWorkerData, MaterialInitWorkerData,
    MaterialWorkerData
} from "./MaterialWorkerData";
// import { material_config } from "../../../webgl1/data/material_config";
// import { shaderLib_generator } from "../../../data/shaderLib_generator";
// import { init as initShader } from "../shader/ShaderWorkerSystem";
import {
    createTypeArrays as createTypeArraysUtils,
    getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils,
    isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, initNoMaterialShaders, useShader as useShaderUtils
} from "../../../utils/worker/render_file/material/materialUtils";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import {
    getBasicMaterialBufferCount, getBufferTotalCount,
    getLightMaterialBufferCount
} from "../../../utils/worker/render_file/material/bufferUtils";
import {
    createTypeArrays as createBasicMaterialTypeArraysUtils,
    getClassName as getBasicMaterialClassName
} from "../../../utils/worker/render_file/material/basicMaterialUtils";
import {
    createTypeArrays as createLightMaterialTypeArraysUtils,
    getClassName as getLightMaterialClassName
} from "../../../utils/worker/render_file/material/lightMaterialUtils";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { initData as initMapManagerData, initMapManagers } from "../texture/MapManagerWorkerSystem";
import { TextureInitWorkerData } from "../../../type/messageDataType";
import { MaterialWorkerInitDataList } from "../../../type/dataType";
import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
import { initData as initLightMaterialData } from "./LightMaterialWorkerSystem";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";

export var initMaterials = (state: Map<any, any>, gl: WebGLRenderingContext, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, initNoMaterialShader:Function, basicMaterialData: BasicMaterialInitWorkerData, lightMaterialData: LightMaterialInitWorkerData,  TextureWorkerData: any, DirectionLightWorkerData:any, PointLightWorkerData:any, GPUDetectWorkerData:any, GLSLSenderWorkerData:any, ProgramWorkerData:any, VaoWorkerData:any, LocationWorkerData:any, ShaderWorkerData:any) => {
    //todo fix
    // initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData));

    _initSpecifyMaterials(basicMaterialData.startIndex, basicMaterialData.index, getBasicMaterialClassName());
    _initSpecifyMaterials(lightMaterialData.startIndex, lightMaterialData.index, getLightMaterialClassName());

    initMapManagers(gl, TextureWorkerData);
}

var _initSpecifyMaterials = (startIndex: number, index: number, className: string) => {
    for (let i = startIndex; i < index; i++) {
        initMaterial(i, null, className);
    }
}

export var initMaterial = (index: number, state: Map<any, any>, className: string) => {
}

// export var getShaderIndex = (materialIndex: number, MaterialWorkerData: any) => {
//     return MaterialWorkerData.shaderIndices[materialIndex];
// }

// export var getShaderIndexFromTable = getShaderIndexFromTableUtils;

export var initNewInitedMaterials = (workerInitList: MaterialWorkerInitDataList) => {
    for (let { index, className } of workerInitList) {
        initMaterial(index, null, className);
    }
}

export var useShader = useShaderUtils;

export var getColorArr3 = getColorArr3Utils;

export var getOpacity = getOpacityUtils;

export var getAlphaTest = getAlphaTestUtils;

export var isTestAlpha = isTestAlphaUtils;

export var initData = (materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData | null, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

    initLightMaterialData(LightMaterialWorkerData);

    let lightMaterialData = materialData.lightMaterialData;

    if (textureData !== null) {
        initMapManagerData(textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData);
    }
}

var _initBufferData = (buffer: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    var offset = createTypeArraysUtils(buffer, getBufferTotalCount(), MaterialWorkerData);

    offset = createBasicMaterialTypeArraysUtils(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = createLightMaterialTypeArraysUtils(buffer, offset, getLightMaterialBufferCount(), LightMaterialWorkerData);
}
