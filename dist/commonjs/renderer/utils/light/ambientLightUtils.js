"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../component/utils/operateBufferDataUtils");
exports.getColor = function (index, AmbientLightDataFromSystem) {
    return operateBufferDataUtils_1.getColor3Data(index, AmbientLightDataFromSystem.colors);
};
//# sourceMappingURL=ambientLightUtils.js.map