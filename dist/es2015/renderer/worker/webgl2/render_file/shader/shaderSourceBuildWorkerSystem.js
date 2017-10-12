import { getAlphaTest, isTestAlpha } from "../../../render_file/material/MaterialWorkerSystem";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../../../webgl2/utils/worker/render_file/shader/shaderSourceBuildUtils";
export var buildGLSLSource = function (materialIndex, materialShaderLibNameArr, shaderLibData, initShaderDataMap) {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
};
//# sourceMappingURL=ShaderSourceBuildWorkerSystem.js.map