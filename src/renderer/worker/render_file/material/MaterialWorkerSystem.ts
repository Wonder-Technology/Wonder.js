import { Map } from "immutable";
// import { material_config } from "../../../webgl1/data/material_config";
// import { shaderLib_generator } from "../../../data/shaderLib_generator";
// import { init as initShader } from "../shader/ShaderWorkerSystem";
import {
    getAlphaTest as getAlphaTestUtils,
    getOpacity as getOpacityUtils,
    isTestAlpha as isTestAlphaUtils,
    useShader as useShaderUtils
} from "../../../utils/worker/render_file/material/materialUtils";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { MaterialWorkerInitDataList } from "../../../type/dataType";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";

export const initMaterial = (index: number, state: Map<any, any>, className: string, MaterialWorkerData: any) => {
}

// export const getShaderIndex = (materialIndex: number, MaterialWorkerData: any) => {
//     return MaterialWorkerData.shaderIndices[materialIndex];
// }

// export const getShaderIndexFromTable = getShaderIndexFromTableUtils;

export const initNewInitedMaterials = (workerInitList: MaterialWorkerInitDataList, MaterialWorkerData: any) => {
    for (let { index, className } of workerInitList) {
        initMaterial(index, null, className, MaterialWorkerData);
    }
}

export const useShader = useShaderUtils;

export const getColorArr3 = getColorArr3Utils;

export const getOpacity = getOpacityUtils;

export const getAlphaTest = getAlphaTestUtils;

export const isTestAlpha = isTestAlphaUtils;

