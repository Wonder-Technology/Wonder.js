import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidMapValue } from "../../utils/objectUtils";
export var getUID = requireCheckFunc(function (index, ThreeDTransformData) {
    it("index should exist", function () {
        expect(index).exist;
    });
    it("transform should exist", function () {
        expect(ThreeDTransformData.transformMap[index]).exist;
    });
}, function (index, ThreeDTransformData) {
    return ThreeDTransformData.transformMap[index].uid;
});
export var isIndexUsed = ensureFunc(function (isExist, index, ThreeDTransformData) {
}, function (index, ThreeDTransformData) {
    return isValidMapValue(ThreeDTransformData.transformMap[index]);
});
export var getStartIndexInArrayBuffer = function () { return 1; };
//# sourceMappingURL=utils.js.map