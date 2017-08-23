"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var shaderUtils_1 = require("../../../../worker/render_file/shader/shaderUtils");
exports.sendAttributeData = function (gl, ProgramDataFromSystem, _a) {
    var fullScreenQuadVertexArray = _a.fullScreenQuadVertexArray;
    shaderUtils_1.bindVao(gl, fullScreenQuadVertexArray, ProgramDataFromSystem);
};
exports.drawFullScreenQuad = function (gl, _a) {
    var fullScreenQuadIndicesCount = _a.fullScreenQuadIndicesCount;
    gl.drawElements(gl.TRIANGLES, fullScreenQuadIndicesCount, gl.UNSIGNED_SHORT, 0);
};
exports.getScissorRegionArrayCache = contract_1.ensureFunc(function (scissorRegionArray) {
    contract_1.it("scissorRegionArray shouldn't be undefined", function () {
        wonder_expect_js_1.expect(scissorRegionArray !== void 0).true;
    });
}, function (pointLightIndex, DeferPointLightPassDataFromSystem) { return DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex]; });
exports.setScissorRegionArrayCache = function (pointLightIndex, DeferPointLightPassDataFromSystem, scissorRegionArrayCache) { return DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap[pointLightIndex] = scissorRegionArrayCache; };
//# sourceMappingURL=deferLightPassUtils.js.map