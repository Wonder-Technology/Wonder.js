import { getAlphaTest, isTestAlpha } from "../../../render_file/material/MaterialWorkerSystem";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../../../webgl2/utils/worker/render_file/shader/shaderSourceBuildUtils";

export const buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: any, initShaderDataMap: InitShaderDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
}
