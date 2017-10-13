"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var materialUtils_1 = require("../../../utils/worker/render_file/material/materialUtils");
var operateBufferDataUtils_1 = require("../../../utils/common/operateBufferDataUtils");
exports.initMaterial = function (index, state, className, MaterialWorkerData) {
};
exports.initNewInitedMaterials = function (workerInitList, MaterialWorkerData) {
    for (var _i = 0, workerInitList_1 = workerInitList; _i < workerInitList_1.length; _i++) {
        var _a = workerInitList_1[_i], index = _a.index, className = _a.className;
        exports.initMaterial(index, null, className, MaterialWorkerData);
    }
};
exports.useShader = materialUtils_1.useShader;
exports.getColorArr3 = operateBufferDataUtils_1.getColorArr3;
exports.getOpacity = materialUtils_1.getOpacity;
exports.getAlphaTest = materialUtils_1.getAlphaTest;
exports.isTestAlpha = materialUtils_1.isTestAlpha;
//# sourceMappingURL=MaterialWorkerSystem.js.map