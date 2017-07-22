"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../utils/objectUtils");
exports.getUID = contract_1.requireCheckFunc(function (index, ThreeDTransformData) {
    contract_1.it("index should exist", function () {
        wonder_expect_js_1.expect(index).exist;
    });
    contract_1.it("transform should exist", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.transformMap[index]).exist;
    });
}, function (index, ThreeDTransformData) {
    return ThreeDTransformData.transformMap[index].uid;
});
exports.isIndexUsed = contract_1.ensureFunc(function (isExist, index, ThreeDTransformData) {
}, function (index, ThreeDTransformData) {
    return objectUtils_1.isValidMapValue(ThreeDTransformData.transformMap[index]);
});
exports.getStartIndexInArrayBuffer = function () { return 1; };
//# sourceMappingURL=utils.js.map