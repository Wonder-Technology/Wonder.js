import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidMapValue } from "../../utils/objectUtils";

export var getUID = requireCheckFunc ((indexInArrayBuffer:number, ThreeDTransformData:any) => {
    it("indexInArrayBuffer should exist", () => {
        expect(indexInArrayBuffer).exist;
    });
    it("transform should exist", () => {
        expect(ThreeDTransformData.transformMap[indexInArrayBuffer]).exist;
    });
}, (indexInArrayBuffer:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.transformMap[indexInArrayBuffer].uid;
})

export var isIndexUsed = ensureFunc((isExist: boolean, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    // it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", () => {
    //     if (isExist) {
    // expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
    // expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[indexInArrayBuffer])).true;
    //     }
    //     else {
    //         // expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).false;
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[indexInArrayBuffer])).false;
    //     }
    // });
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return isValidMapValue(ThreeDTransformData.transformMap[indexInArrayBuffer]);
    // return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
})

/*!
 regard 0 as the default index, so that _isValidIndex can judge whether the index is not the default index or not!
 */
export var getStartIndexInArrayBuffer = () => 1;
