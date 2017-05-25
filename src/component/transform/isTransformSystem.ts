import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData } from "./ThreeDTransform";

export var getIsTranslate = (uid:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.isTranslateMap[uid];
}

export var setIsTranslate = requireCheckFunc ((uid:number, isTranslate:boolean, ThreeDTransformData:any) => {
    // it("indexInArrayBuffer should be used", () => {
    //     expect(_isIndexUsed(indexInArrayBuffer)).true;
    // });
}, (uid:number, isTranslate:boolean, ThreeDTransformData:any) => {
    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
})

export var isTranslate = (data:BatchTransformData) => {
    return !!data.position || !!data.localPosition;
}

