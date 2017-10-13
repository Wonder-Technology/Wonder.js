import { bindVao, createVao, unbindVao } from "../../../../vao/vaoUtils";
import {
    createAndInitArrayBuffer,
    createAndInitIndexBuffer
} from "../../../../../../../../utils/worker/render_file/shader/shaderUtils";
import { getVaoConfig } from "../../../../shader/glslSender/glslSenderUtils";
import { it, requireCheckFunc } from "../../../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap } from "../../../../../../../../../utils/objectUtils";

export const init = (gl: any, shaderIndex: number, GLSLSenderDataFromSystem: any, DeferLightPassDataFromSystem: any) => {
    _setFullScreenQuadVaoData(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);
}

const _setFullScreenQuadVaoData = requireCheckFunc((gl: any, shaderIndex: number, GLSLSenderDataFromSystem: any, DeferLightPassDataFromSystem: any) => {
    it("positionLocation, texCoordLocation should be defined in vaoConfig data", () => {
        var vaoConfig = getVaoConfig(shaderIndex, GLSLSenderDataFromSystem);

        expect(vaoConfig.positionLocation).be.a("number");
        expect(vaoConfig.texCoordLocation).be.a("number");
    });
}, (gl: any, shaderIndex: number, GLSLSenderDataFromSystem: any, DeferLightPassDataFromSystem: any) => {
    var fullScreenQuadVertexArray = createVao(gl),
        fullScreenQuadData = _createFullScreenQuadData(),
        {
            positionLocation,
            texCoordLocation
        } = getVaoConfig(shaderIndex, GLSLSenderDataFromSystem);

    bindVao(gl, fullScreenQuadVertexArray);

    //todo create point light sphere for optimize(then no need to use scissor optimize)?
    // var sphere = createSphere({
    //     radius: 100
    // });

    createAndInitArrayBuffer(gl, fullScreenQuadData.positions, positionLocation, _getPositionSize());
    createAndInitArrayBuffer(gl, fullScreenQuadData.texCoords, texCoordLocation, _getTexCoordSize());
    createAndInitIndexBuffer(gl, fullScreenQuadData.indices);

    unbindVao(gl);

    DeferLightPassDataFromSystem.fullScreenQuadVertexArray = fullScreenQuadVertexArray;
    DeferLightPassDataFromSystem.fullScreenQuadIndicesCount = fullScreenQuadData.indices.length;
})

const _getPositionSize = () => 3;

const _getTexCoordSize = () => 2;

const _createFullScreenQuadData = () => {
    var positions = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]),
        indices = new Uint16Array([0, 1, 2, 0, 2, 3]),
        texCoords = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);

    return {
        positions: positions,
        texCoords: texCoords,
        indices: indices
    }
}

export const initData = (DeferAmbientLightPassDataFromSystem: any, DeferDirectionLightPassDataFromSystem: any, DeferPointLightPassDataFromSystem: any) => {
    DeferPointLightPassDataFromSystem.scissorRegionArrayCacheMap = createMap();
}
