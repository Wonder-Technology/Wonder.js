import { bindVao, createVao, unbindVao } from "../../../../vao/vaoUtils";
import { createAndInitArrayBuffer, createAndInitIndexBuffer } from "../../../../../../../../utils/worker/render_file/shader/shaderUtils";
import { getVaoConfig } from "../../../../shader/glslSender/glslSenderUtils";
import { it, requireCheckFunc } from "../../../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap } from "../../../../../../../../../utils/objectUtils";
export var init = function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    _setFullScreenQuadVaoData(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);
};
var _setFullScreenQuadVaoData = requireCheckFunc(function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    it("positionLocation, texCoordLocation should be defined in vaoConfig data", function () {
        var vaoConfig = getVaoConfig(shaderIndex, GLSLSenderDataFromSystem);
        expect(vaoConfig.positionLocation).be.a("number");
        expect(vaoConfig.texCoordLocation).be.a("number");
    });
}, function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    var fullScreenQuadVertexArray = createVao(gl), fullScreenQuadData = _createFullScreenQuadData(), _a = getVaoConfig(shaderIndex, GLSLSenderDataFromSystem), positionLocation = _a.positionLocation, texCoordLocation = _a.texCoordLocation;
    bindVao(gl, fullScreenQuadVertexArray);
    createAndInitArrayBuffer(gl, fullScreenQuadData.positions, positionLocation, _getPositionSize());
    createAndInitArrayBuffer(gl, fullScreenQuadData.texCoords, texCoordLocation, _getTexCoordSize());
    createAndInitIndexBuffer(gl, fullScreenQuadData.indices);
    unbindVao(gl);
    DeferLightPassDataFromSystem.fullScreenQuadVertexArray = fullScreenQuadVertexArray;
    DeferLightPassDataFromSystem.fullScreenQuadIndicesCount = fullScreenQuadData.indices.length;
});
var _getPositionSize = function () { return 3; };
var _getTexCoordSize = function () { return 2; };
var _createFullScreenQuadData = function () {
    var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]), indices = new Uint16Array([0, 1, 2, 0, 2, 3]), texCoords = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);
    return {
        positions: positions,
        texCoords: texCoords,
        indices: indices
    };
};
export var initData = function (DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem) {
    DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap = createMap();
};
//# sourceMappingURL=deferLightPassUtils.js.map