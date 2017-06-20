"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disposeGeometryBuffers = function (disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer) {
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        disposeArrayBuffer(index, ArrayBufferDataFromSystem);
        disposeIndexBuffer(index, IndexBufferDataFromSystem);
    }
};
//# sourceMappingURL=BufferSystem.js.map