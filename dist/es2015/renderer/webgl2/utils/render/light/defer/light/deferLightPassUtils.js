import { ensureFunc, it } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { bindVao } from "../../../../worker/render_file/shader/shaderUtils";
export var sendAttributeData = function (gl, ProgramDataFromSystem, _a) {
    var fullScreenQuadVertexArray = _a.fullScreenQuadVertexArray;
    bindVao(gl, fullScreenQuadVertexArray, ProgramDataFromSystem);
};
export var drawFullScreenQuad = function (gl, _a) {
    var fullScreenQuadIndicesCount = _a.fullScreenQuadIndicesCount;
    gl.drawElements(gl.TRIANGLES, fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
};
export var getScissorRegionArrayCache = ensureFunc(function (scissorRegionArray) {
    it("scissorRegionArray shouldn't be undefined", function () {
        expect(scissorRegionArray !== void 0).true;
    });
}, function (pointLightIndex, DeferPointLightPassDataFromSystem) { return DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]; });
export var setScissorRegionArrayCache = function (pointLightIndex, DeferPointLightPassDataFromSystem, scissorRegionArrayCache) { return DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache; };
//# sourceMappingURL=deferLightPassUtils.js.map