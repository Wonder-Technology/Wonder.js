import {
    IShaderLibContentGenerator
} from "../../../data/shaderLib_generator";
import { buildGLSLSource as buildGLSLSourceUtils } from "../../../utils/shader/shaderSourceBuildUtils";
import { getAlphaTest, isTestAlpha } from "../material/MaterialWorkerSystem";
import { MaterialDataMap } from "../../../type/dataType";
import { InitShaderDataMap } from "../../../type/utilsType";

export var buildGLSLSource = (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IShaderLibContentGenerator, initShaderDataMap:InitShaderDataMap) => {
    return buildGLSLSourceUtils(materialIndex, materialShaderLibNameArr, shaderLibData, {
        getAlphaTest: getAlphaTest,
        isTestAlpha: isTestAlpha
    }, initShaderDataMap);
}
