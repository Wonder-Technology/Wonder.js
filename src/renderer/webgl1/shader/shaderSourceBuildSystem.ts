import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { MaterialDataMap } from "../../type/dataType";
import { getAlphaTest, isTestAlpha } from "../../../component/material/MaterialSystem";
import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/shader/shaderSourceBuildUtils";

export var buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, MaterialDataMap: MaterialDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialDataMap);
}
