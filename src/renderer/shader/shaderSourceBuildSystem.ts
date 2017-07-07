import {
    IShaderLibContentGenerator
} from "../data/shaderLib_generator";
import { IShaderLibItem, MaterialShaderLibConfig } from "../data/material_config";
import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../../component/material/MaterialSystem";
import { MaterialDataMap } from "../type/dataType";

export var buildGLSLSource = (materialIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, MaterialDataMap: MaterialDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibConfig, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialDataMap);
}
