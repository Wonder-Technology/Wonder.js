"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../utils/objectUtils");
exports.getUID = contract_1.requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    contract_1.it("indexInArrayBuffer should exist", function () {
        wonder_expect_js_1.expect(indexInArrayBuffer).exist;
    });
    contract_1.it("transform should exist", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.transformMap[indexInArrayBuffer]).exist;
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return ThreeDTransformData.transformMap[indexInArrayBuffer].uid;
});
exports.isIndexUsed = contract_1.ensureFunc(function (isExist, indexInArrayBuffer, ThreeDTransformData) {
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(ThreeDTransformData.transformMap[indexInArrayBuffer]);
});
exports.getStartIndexInArrayBuffer = function () { return 1; };
//# sourceMappingURL=utils.js.map