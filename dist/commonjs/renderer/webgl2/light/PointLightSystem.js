"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pointLightUtils_1 = require("../utils/worker/render_file/light/pointLightUtils");
var PointLightSystem_1 = require("../../../component/light/PointLightSystem");
exports.computeRadius = pointLightUtils_1.computeRadius;
exports.initData = function (PointLightData) {
    PointLightSystem_1.initDataHelper(PointLightData);
};
//# sourceMappingURL=PointLightSystem.js.map