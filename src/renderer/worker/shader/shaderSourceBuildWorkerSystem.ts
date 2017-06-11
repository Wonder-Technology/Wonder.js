import {
    IShaderLibContentGenerator
} from "../../data/shaderLib_generator";
import { MaterialShaderLibConfig } from "../../data/material_config";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../material/MaterialWorkerSystem";

export var buildGLSLSource = (materialIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, MaterialWorkerData:any) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibConfig, shaderLibData, {
        getAlphaTest:getAlphaTest,
        isTestAlpha:isTestAlpha
    }, MaterialWorkerData);
}
