import { getAlphaTest, isTestAlpha } from "../../../render_file/material/MaterialWorkerSystem";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../../../webgl1/utils/worker/render_file/shader/shaderSourceBuildUtils";

export var buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: any, initShaderDataMap: InitShaderDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
}
