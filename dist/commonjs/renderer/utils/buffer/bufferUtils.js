"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayUtils_1 = require("../../../utils/arrayUtils");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.isBufferExist = function (buffer) { return arrayUtils_1.isValidVal(buffer); };
exports.disposeGeometryWorkerBuffers = contract_1.requireCheckFunc(function (disposedIndexArray, GeometryDataFromSystem) {
    contract_1.it("should not add data twice in one frame", function () {
        wonder_expect_js_1.expect(GeometryDataFromSystem.disposedGeometryIndexArray.length).equal(0);
    });
}, function (disposedIndexArray, GeometryDataFromSystem) {
    GeometryDataFromSystem.disposedGeometryIndexArray = disposedIndexArray;
});
//# sourceMappingURL=bufferUtils.js.map