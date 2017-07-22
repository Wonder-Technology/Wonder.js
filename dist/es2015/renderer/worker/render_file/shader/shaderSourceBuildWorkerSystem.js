import { buildGLSLSource as buildGLSLSourceUtils } from "../../../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../material/MaterialWorkerSystem";
export var buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, initShaderDataMap) {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
};
//# sourceMappingURL=shaderSourceBuildWorkerSystem.js.map