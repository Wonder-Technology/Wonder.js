"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var ThreeDTransformData = (function () {
    function ThreeDTransformData() {
    }
    Object.defineProperty(ThreeDTransformData, "count", {
        get: function () {
            return DataBufferConfig_1.DataBufferConfig.transformDataBufferCount;
        },
        enumerable: true,
        configurable: true
    });
    return ThreeDTransformData;
}());
ThreeDTransformData.transforms = null;
ThreeDTransformData.transformIndexInArrayBufferTable = null;
ThreeDTransformData.localToWorldMatrices = null;
ThreeDTransformData.localPositions = null;
ThreeDTransformData.localRotations = null;
ThreeDTransformData.localScales = null;
ThreeDTransformData.relations = null;
ThreeDTransformData.size = null;
ThreeDTransformData.firstDirtyIndex = null;
ThreeDTransformData.indexInArrayBuffer = null;
ThreeDTransformData.notUsedIndexArray = null;
ThreeDTransformData.buffer = null;
exports.ThreeDTransformData = ThreeDTransformData;
var ThreeDTransformRelationData = (function () {
    function ThreeDTransformRelationData() {
        this.indexInArrayBuffer = null;
        this.parent = null;
        this.children = null;
    }
    ThreeDTransformRelationData.create = function () {
        var obj = new this();
        return obj;
    };
    return ThreeDTransformRelationData;
}());
exports.ThreeDTransformRelationData = ThreeDTransformRelationData;
//# sourceMappingURL=ThreeDTransformData.js.map