import { getAlphaTest, isTestAlpha } from "../../../render_file/material/MaterialWorkerSystem";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../../../webgl2/utils/shader/shaderSourceBuildUtils";

export var buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: any, initShaderDataMap: InitShaderDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
}
