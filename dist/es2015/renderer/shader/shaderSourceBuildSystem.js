import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../../component/material/MaterialSystem";
export var buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, MaterialDataMap) {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialDataMap);
};
//# sourceMappingURL=shaderSourceBuildSystem.js.map