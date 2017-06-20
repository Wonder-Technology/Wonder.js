import { buildGLSLSource as buildGLSLSourceUtils } from "../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../../component/material/MaterialSystem";
export var buildGLSLSource = function (materialIndex, materialShaderLibConfig, shaderLibData, MaterialData) {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibConfig, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, MaterialData);
};
//# sourceMappingURL=shaderSourceBuildSystem.js.map