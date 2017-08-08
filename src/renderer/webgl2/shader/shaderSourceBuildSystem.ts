import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
import { MaterialDataMap } from "../../type/dataType";
import { getAlphaTest, isTestAlpha } from "../../../component/material/MaterialSystem";
import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/shader/shaderSourceBuildUtils";

export var buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, MaterialDataMap: MaterialDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialDataMap);
}
