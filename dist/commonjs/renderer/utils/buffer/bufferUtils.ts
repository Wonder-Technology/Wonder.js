import { isValidVal } from "../../../utils/arrayUtils";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var isBufferExist = (buffer: WebGLBuffer) => isValidVal(buffer);

export var disposeGeometryWorkerBuffers = requireCheckFunc((disposedIndexArray: Array<number>, GeometryDataFromSystem: any) => {
    it("should not add data twice in one frame", () => {
        expect(GeometryDataFromSystem.disposedGeometryIndexArray.length).equal(0);
    });
}, (disposedIndexArray: Array<number>, GeometryDataFromSystem: any) => {
    GeometryDataFromSystem.disposedGeometryIndexArray = disposedIndexArray;
})
