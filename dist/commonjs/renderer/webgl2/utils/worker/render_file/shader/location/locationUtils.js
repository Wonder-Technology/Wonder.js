"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../../../../../utils/objectUtils");
exports.setEmptyLocationMap = function (shaderIndex, LocationDataFromSystem) {
    LocationDataFromSystem.uniformLocationMap[shaderIndex] = objectUtils_1.createMap();
};
exports.initData = function (LocationDataFromSystem) {
    LocationDataFromSystem.uniformLocationMap = objectUtils_1.createMap();
};
//# sourceMappingURL=locationUtils.js.map