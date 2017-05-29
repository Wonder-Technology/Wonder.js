import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidMapValue } from "../../utils/objectUtils";
export var getUID = requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    it("indexInArrayBuffer should exist", function () {
        expect(indexInArrayBuffer).exist;
    });
    it("transform should exist", function () {
        expect(ThreeDTransformData.transformMap[indexInArrayBuffer]).exist;
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return ThreeDTransformData.transformMap[indexInArrayBuffer].uid;
});
export var isIndexUsed = ensureFunc(function (isExist, indexInArrayBuffer, ThreeDTransformData) {
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return isValidMapValue(ThreeDTransformData.transformMap[indexInArrayBuffer]);
});
export var getStartIndexInArrayBuffer = function () { return 1; };
//# sourceMappingURL=utils.js.map