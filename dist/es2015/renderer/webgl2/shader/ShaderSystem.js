import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { getGL } from "../../device/DeviceManagerSystem";
import { getMapCount } from "../../texture/MapManagerSystem";
import { initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils, initData as initDataUtils } from "../utils/worker/render_file/shader/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../../component/material/LightMaterialSystem";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../../component/geometry/GeometrySystem";
export var initNoMaterialShader = null;
export var initMaterialShader = null;
if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderDataMap) {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };
    initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderDataMap) {
        return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };
    var _buildInitShaderFuncDataMap = function () {
        return {
            buildGLSLSource: buildGLSLSource,
            getGL: getGL,
            getMapCount: getMapCount,
            hasSpecularMap: hasSpecularMap,
            hasDiffuseMap: hasDiffuseMap,
            getVertices: getVertices,
            getNormals: getNormals,
            getTexCoords: getTexCoords,
            getIndices: getIndices
        };
    };
}
export var initData = initDataUtils;
//# sourceMappingURL=ShaderSystem.js.map