"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaoUtils_1 = require("../../../../vao/vaoUtils");
var shaderUtils_1 = require("../../../../../../../../utils/worker/render_file/shader/shaderUtils");
var glslSenderUtils_1 = require("../../../../shader/glslSender/glslSenderUtils");
var contract_1 = require("../../../../../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../../../../../../../../utils/objectUtils");
exports.init = function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    _setFullScreenQuadVaoData(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);
};
var _setFullScreenQuadVaoData = contract_1.requireCheckFunc(function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    contract_1.it("positionLocation, texCoordLocation should be defined in vaoConfig data", function () {
        var vaoConfig = glslSenderUtils_1.getVaoConfig(shaderIndex, GLSLSenderDataFromSystem);
        wonder_expect_js_1.expect(vaoConfig.positionLocation).be.a("number");
        wonder_expect_js_1.expect(vaoConfig.texCoordLocation).be.a("number");
    });
}, function (gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem) {
    var fullScreenQuadVertexArray = vaoUtils_1.createVao(gl), fullScreenQuadData = _createFullScreenQuadData(), _a = glslSenderUtils_1.getVaoConfig(shaderIndex, GLSLSenderDataFromSystem), positionLocation = _a.positionLocation, texCoordLocation = _a.texCoordLocation;
    vaoUtils_1.bindVao(gl, fullScreenQuadVertexArray);
    shaderUtils_1.createAndInitArrayBuffer(gl, fullScreenQuadData.positions, positionLocation, _getPositionSize());
    shaderUtils_1.createAndInitArrayBuffer(gl, fullScreenQuadData.texCoords, texCoordLocation, _getTexCoordSize());
    shaderUtils_1.createAndInitIndexBuffer(gl, fullScreenQuadData.indices);
    vaoUtils_1.unbindVao(gl);
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
exports.initData = function (DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem) {
    DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap = objectUtils_1.createMap();
};
//# sourceMappingURL=deferLightPassUtils.js.map