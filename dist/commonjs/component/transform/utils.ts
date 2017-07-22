import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidMapValue } from "../../utils/objectUtils";

export var getUID = requireCheckFunc((index: number, ThreeDTransformData: any) => {
    it("index should exist", () => {
        expect(index).exist;
    });
    it("transform should exist", () => {
        expect(ThreeDTransformData.transformMap[index]).exist;
    });
}, (index: number, ThreeDTransformData: any) => {
    return ThreeDTransformData.transformMap[index].uid;
})

export var isIndexUsed = ensureFunc((isExist: boolean, index: number, ThreeDTransformData: any) => {
    // it("if(or not) exist data, the transform and its index should be(or not) setted to data container;relation item should(or not) exist", () => {
    //     if (isExist) {
    // expect(_isValidArrayValue(ThreeDTransformData.transforms[index])).true;
    // expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index], ThreeDTransformData)).equal(index);
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[index])).true;
    //     }
    //     else {
    //         // expect(_isValidArrayValue(ThreeDTransformData.transforms[index])).false;
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[index])).false;
    //     }
    // });
}, (index: number, ThreeDTransformData: any) => {
    return isValidMapValue(ThreeDTransformData.transformMap[index]);
    // return _isValidArrayValue(ThreeDTransformData.transforms[index]);
})

/*!
 regard 0 as the default index, so that _isValidIndex can judge whether the index is not the default index or not!
 */
export var getStartIndexInArrayBuffer = () => 1;
