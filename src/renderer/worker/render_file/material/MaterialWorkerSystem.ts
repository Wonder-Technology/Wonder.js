import { Map } from "immutable";
import {
    BasicMaterialInitWorkerData, LightMaterialInitWorkerData, MaterialInitWorkerData,
    MaterialWorkerData
} from "./MaterialWorkerData";
import { material_config } from "../../../data/material_config";
import { shaderLib_generator } from "../../../data/shaderLib_generator";
import { init as initShader } from "../shader/ShaderWorkerSystem";
import {
    createTypeArrays as createTypeArraysUtils,
    getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils,
    isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, setShaderIndex
} from "../../../utils/material/materialUtils";
import { ProgramWorkerData } from "../shader/program/ProgramWorkerData";
import { LocationWorkerData } from "../shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "../shader/glslSender/GLSLSenderWorkerData";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import {
    getBasicMaterialBufferCount, getBufferTotalCount,
    getLightMaterialBufferCount
} from "../../../utils/material/bufferUtils";
import {
    createTypeArrays as createBasicMaterialTypeArraysUtils,
    getClassName as getBasicMaterialClassName
} from "../../../utils/material/basicMaterialUtils";
import {
    createTypeArrays as createLightMaterialTypeArraysUtils,
    getClassName as getLightMaterialClassName
} from "../../../utils/material/lightMaterialUtils";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { DirectionLightWorkerData } from "../light/DirectionLightWorkerData";
import { PointLightWorkerData } from "../light/PointLightWorkerData";
import { initData as initMapManagerData, initMapManagers } from "../texture/MapManagerWorkerSystem";
import { TextureInitWorkerData } from "../../../type/messageDataType";
import { MaterialWorkerInitDataList } from "../../../type/dataType";
import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
import { ShaderWorkerData } from "../shader/ShaderWorkerData";
import { setDiffuseMapIndex, setSpecularMapIndex } from "./LightMaterialWorkerSystem";

export var initMaterials = (basicMaterialData: BasicMaterialInitWorkerData, lightMaterialData: LightMaterialInitWorkerData, gl: WebGLRenderingContext, TextureWorkerData: any) => {
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
    //todo fix
    // var shaderIndex = initShader(state, index, className, material_config, shaderLib_generator as any, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData));
    //
    // setShaderIndex(index, shaderIndex, MaterialWorkerData);
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

export var getColorArr3 = getColorArr3Utils;

export var getOpacity = getOpacityUtils;

export var getAlphaTest = getAlphaTestUtils;

export var isTestAlpha = isTestAlphaUtils;

export var initData = (materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData | null, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

    let lightMaterialData = materialData.lightMaterialData;

    setDiffuseMapIndex(lightMaterialData.diffuseMapIndex, LightMaterialWorkerData);
    setSpecularMapIndex(lightMaterialData.specularMapIndex, LightMaterialWorkerData);

    if (textureData !== null) {
        initMapManagerData(textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData);
    }
}

var _initBufferData = (buffer: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    var offset = createTypeArraysUtils(buffer, getBufferTotalCount(), MaterialWorkerData);

    offset = createBasicMaterialTypeArraysUtils(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = createLightMaterialTypeArraysUtils(buffer, offset, getLightMaterialBufferCount(), LightMaterialWorkerData);
}
