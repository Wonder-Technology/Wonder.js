import { isValidVal } from "../../../utils/arrayUtils";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var isBufferExist = function (buffer) { return isValidVal(buffer); };
export var disposeGeometryWorkerBuffers = requireCheckFunc(function (disposedIndexArray, GeometryDataFromSystem) {
    it("should not add data twice in one frame", function () {
        expect(GeometryDataFromSystem.disposedGeometryIndexArray.length).equal(0);
    });
}, function (disposedIndexArray, GeometryDataFromSystem) {
    GeometryDataFromSystem.disposedGeometryIndexArray = disposedIndexArray;
});
//# sourceMappingURL=bufferUtils.js.map