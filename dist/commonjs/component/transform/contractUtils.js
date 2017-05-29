"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentSystem_1 = require("../ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
exports.checkTransformShouldAlive = function (transform, ThreeTransformData) {
    ComponentSystem_1.checkComponentShouldAlive(transform, ThreeTransformData, function (transform, ThreeTransformData) {
        return objectUtils_1.isValidMapValue(ThreeTransformData.transformMap[transform.index]);
    });
};
//# sourceMappingURL=contractUtils.js.map