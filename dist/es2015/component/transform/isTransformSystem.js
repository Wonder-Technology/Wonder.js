import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
export var getIsTranslate = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.isTranslateMap[uid];
};
export var setIsTranslate = requireCheckFunc(function (uid, isTranslate, ThreeDTransformData) {
}, function (uid, isTranslate, ThreeDTransformData) {
    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
});
export var isTranslate = function (data) {
    return !!data.position || !!data.localPosition;
};
//# sourceMappingURL=isTransformSystem.js.map