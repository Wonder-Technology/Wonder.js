import { DataBufferConfig } from "../../config/DataBufferConfig";
var ThreeDTransformData = (function () {
    function ThreeDTransformData() {
    }
    Object.defineProperty(ThreeDTransformData, "maxCount", {
        get: function () {
            return DataBufferConfig.transformDataBufferCount;
        },
        enumerable: true,
        configurable: true
    });
    ThreeDTransformData.localToWorldMatrices = null;
    ThreeDTransformData.localPositions = null;
    ThreeDTransformData.localRotations = null;
    ThreeDTransformData.localScales = null;
    ThreeDTransformData.defaultPosition = null;
    ThreeDTransformData.defaultRotation = null;
    ThreeDTransformData.defaultScale = null;
    ThreeDTransformData.defaultLocalToWorldMatrice = null;
    ThreeDTransformData.firstDirtyIndex = null;
    ThreeDTransformData.index = null;
    ThreeDTransformData.notUsedIndexLinkList = null;
    ThreeDTransformData.isTranslateMap = null;
    ThreeDTransformData.parentMap = null;
    ThreeDTransformData.childrenMap = null;
    ThreeDTransformData.cacheMap = null;
    ThreeDTransformData.tempMap = null;
    ThreeDTransformData.transformMap = null;
    ThreeDTransformData.count = null;
    ThreeDTransformData.uid = null;
    ThreeDTransformData.disposeCount = null;
    ThreeDTransformData.isClearCacheMap = null;
    ThreeDTransformData.gameObjectMap = null;
    ThreeDTransformData.aliveUIdArray = null;
    ThreeDTransformData.buffer = null;
    return ThreeDTransformData;
}());
export { ThreeDTransformData };
var ThreeDTransformRelationData = (function () {
    function ThreeDTransformRelationData() {
        this.index = null;
        this.parent = null;
        this.children = null;
    }
    ThreeDTransformRelationData.create = function () {
        var obj = new this();
        return obj;
    };
    return ThreeDTransformRelationData;
}());
export { ThreeDTransformRelationData };
//# sourceMappingURL=ThreeDTransformData.js.map