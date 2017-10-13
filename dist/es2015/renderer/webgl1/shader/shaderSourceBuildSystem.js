import { getAlphaTest, isTestAlpha } from "../../../component/material/MaterialSystem";
import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/worker/render_file/shader/shaderSourceBuildUtils";
export var buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, MaterialDataMap) {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialDataMap);
};
//# sourceMappingURL=ShaderSourceBuildSystem.js.map