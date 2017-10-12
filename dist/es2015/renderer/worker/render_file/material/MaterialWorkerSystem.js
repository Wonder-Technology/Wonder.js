import { getAlphaTest as getAlphaTestUtils, getOpacity as getOpacityUtils, isTestAlpha as isTestAlphaUtils, useShader as useShaderUtils } from "../../../utils/worker/render_file/material/materialUtils";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
export var initMaterial = function (index, state, className, MaterialWorkerData) {
};
export var initNewInitedMaterials = function (workerInitList, MaterialWorkerData) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        initMaterial(index, null, className, MaterialWorkerData);
    }
};
export var useShader = useShaderUtils;
export var getColorArr3 = getColorArr3Utils;
export var getOpacity = getOpacityUtils;
export var getAlphaTest = getAlphaTestUtils;
export var isTestAlpha = isTestAlphaUtils;
//# sourceMappingURL=MaterialWorkerSystem.js.map