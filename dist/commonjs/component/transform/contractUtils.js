"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentSystem_1 = require("../ComponentSystem");
var ThreeDTransformSystem_1 = require("./ThreeDTransformSystem");
exports.checkTransformShouldAlive = function (transform, ThreeDTransformData) {
    ComponentSystem_1.checkComponentShouldAlive(transform, ThreeDTransformData, function (transform, ThreeDTransformData) {
        return ThreeDTransformSystem_1.isAlive(transform, ThreeDTransformData);
    });
};
//# sourceMappingURL=contractUtils.js.map